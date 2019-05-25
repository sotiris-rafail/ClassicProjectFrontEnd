import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { FullImageShowComponent } from './full-image-show/full-image-show.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  folderResponseMap: TodoItemNode[];
  name: string;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
  folderId: string;
  parent: string[];
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
  folderId: string;
  parent: string[];
}

/**
 * The Json object for to-do list data.
 */

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private cpService?: ConstantPartyService, private snackBar?: MatSnackBar) { }

  initialize(cpId: number) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.cpService.getCpPhotos(cpId, sessionStorage.getItem('access_token'), Number(sessionStorage.getItem('userId')))
      .subscribe(response => {
        let cpFile: TodoItemNode[] = [];
        const item: TodoItemNode = {
          folderId: response.folderId,
          name: response.name,
          type: response.type,
          creationTime: response.creationTime,
          webViewLink: response.webViewLink,
          webContentLink: response.webContentLink,
          parent: response.parent,
          folderResponseMap: this.getChildrenResponse(response.folderResponseMap)
        };
        cpFile.push(item);
        item.folderResponseMap.sort((a, b) => {
          if (a.creationTime > b.creationTime) { return 1; } else if (a.creationTime < b.creationTime) { return -1; } else { return 0; }
        });
        item.folderResponseMap.forEach(child => child.folderResponseMap.sort((a, b) => {
          if (a.creationTime > b.creationTime) { return 1; } else if (a.creationTime < b.creationTime) { return -1; } else { return 0; }
        }));
        this.dataChange.next(cpFile);
      });

    // Notify the change.

  }

  getChildrenResponse(map: Array<any>): Array<TodoItemNode> {
    const array: Array<TodoItemNode> = new Array();
    // tslint:disable-next-line: forin
    map.forEach(child => {
      const item: TodoItemNode = {
        folderId: child.type === 'FOLDER' ? child.folderId : child.fileId,
        name: child.name,
        type: child.type,
        creationTime: child.creationTime,
        webViewLink: child.webViewLink,
        webContentLink: child.webContentLink,
        parent: child.parents,
        folderResponseMap: (child.folderResponseMap && child.folderResponseMap.length > 0) ? this.getChildrenResponse(child.folderResponseMap) : (child.fileResponseMap && child.fileResponseMap.length > 0) ? this.getChildrenResponse(child.fileResponseMap) : []
      };
      array.push(item);
    })
    return array;
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string, parentId: string) {
    if (parent.folderResponseMap) {
      parent.folderResponseMap.push({ name: name, type: 'FOLDER', parent: [parentId] } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string, cpId: number) {
    node.name = name;
    node.folderResponseMap = [];
    node.creationTime = new Date();
    return this.cpService.addNewFolder(cpId, sessionStorage.getItem('access_token'), node)
      .subscribe(
        response => {
          this.dataChange.next(this.data);
        },
        error => {
          this.snackBar.openFromComponent(DisplayingErrorComponent, {
            data: { message: error.message || error.error.message, type: 'error' },
            duration: 5000,
            panelClass: ['snackBarError'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      )
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-cp-photos-show',
  templateUrl: 'cp-photos-show.component.html',
  styleUrls: ['cp-photos-show.component.css'],
  providers: [ChecklistDatabase, ConstantPartyService]
})
export class CpPhotosShowComponent implements OnInit {
  @Input() cpId: number;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  uploading = false;

  constructor(private database: ChecklistDatabase, private dialog: MatDialog, private cpService: ConstantPartyService, private snackBar: MatSnackBar) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.database.initialize(this.cpId);
    this.database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.folderResponseMap;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.name ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.folderResponseMap && (node.type === 'FOLDER' || node.type === 'ROOT');
    flatNode.type = node.type;
    flatNode.creationTime = node.creationTime;
    flatNode.webContentLink = node.webContentLink;
    flatNode.folderId = node.folderId;
    flatNode.webViewLink = node.webViewLink;
    flatNode.parent = node.parent;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '', parentNode.folderId);
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode, itemValue, this.cpId);
  }

  showImageInReal(url) {
    const dialogRef = this.dialog.open(FullImageShowComponent, { data: url, maxWidth: 800, maxHeight: 800, panelClass: ['showImagePanel', 'app-full-image-show'] });
  }

  processFile(imageInput: any, node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.uploading = true;
      this.cpService.uploadImage(file, sessionStorage.getItem('access_token'), this.cpId, node.folderId).subscribe(
        (res) => {
          if (res) {
            this.snackBar.openFromComponent(DisplayingErrorComponent, {
              data: { message: 'Photo uploaded sucessfully', type: 'success' },
              duration: 5000,
              panelClass: ['snackBarSuccess'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          } else {
            this.snackBar.openFromComponent(DisplayingErrorComponent, {
              data: { message: 'Upload failed. Restart the page and try again', type: 'error' },
              duration: 5000,
              panelClass: ['snackBarError'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        },
        (err) => {
          this.snackBar.openFromComponent(DisplayingErrorComponent, {
            data: { message: err.error.message, type: 'error' },
            duration: 5000,
            panelClass: ['snackBarError'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        () => { this.uploading = false; });
    });
    reader.readAsDataURL(file);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */