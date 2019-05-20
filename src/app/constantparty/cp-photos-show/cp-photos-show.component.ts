import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { FullImageShowComponent } from './full-image-show/full-image-show.component';
import { MatDialog } from '@angular/material';

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

  constructor(private http?: HttpClient) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.getCpPhotos(1, sessionStorage.getItem('access_token'), Number(sessionStorage.getItem('userId')))
      .subscribe(response => {
        let cpFile: TodoItemNode[] = [];
        const item: TodoItemNode = {
          folderId: response.folderId,
          name: response.name,
          type: response.type,
          creationTime: response.creationTime,
          webViewLink: response.webViewLink,
          webContentLink: response.webContentLink,
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

  public getCpPhotos(cpId: number, access_token: string, userId: number): Observable<TodoItemNode> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<TodoItemNode>('http://83.212.102.61:8080/cp/' + cpId + '/' + userId + '/photos', { headers: headers });
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj, level: number): TodoItemNode[] {
    return Object.keys(obj.folderResponseMap).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj;
      const node = new TodoItemNode();
      node.name = value.name;
      node.type = value.type
      if (node.type === 'FOLDER' || node.type === 'ROOT') {
        if (value.folderResponseMap.length > 0) {
          value.folderResponseMap.forEach(element => {
            node.folderResponseMap = this.buildFileTree(element, level + 1);
          });
        }
        console.log(value.fileResponseMap && value.fileResponseMap.length > 0)
        if (value.fileResponseMap && value.fileResponseMap.length > 0) {
          value.fileResponseMap.forEach(element => {
            node.folderResponseMap = this.buildFileTree(element, level + 1);
          });
        }
      } else if (node.type === 'IMAGE') {
        node.name = value.name;
      } else {
        node.name = value.name;
      }

      return accumulator.concat(value);
    }, []);
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
        folderResponseMap: (child.folderResponseMap && child.folderResponseMap.length > 0) ? this.getChildrenResponse(child.folderResponseMap) : (child.fileResponseMap && child.fileResponseMap.length > 0) ? this.getChildrenResponse(child.fileResponseMap) : []
      };
      array.push(item);
    })
    return array;
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.folderResponseMap) {
      parent.folderResponseMap.push({ name: name, type: 'FOLDER' } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.name = name;
    node.folderResponseMap = [];
    node.creationTime = new Date();
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-cp-photos-show',
  templateUrl: 'cp-photos-show.component.html',
  styleUrls: ['cp-photos-show.component.css'],
  providers: [ChecklistDatabase]
})
export class CpPhotosShowComponent {
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

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private database: ChecklistDatabase, private dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      console.log(this.treeControl.dataNodes)
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
    const flatNode = existingNode && existingNode.item === node.name
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.folderResponseMap && (node.type === 'FOLDER' || node.type === 'ROOT');
    flatNode.type = node.type;
    flatNode.creationTime = node.creationTime;
    flatNode.webContentLink = node.webContentLink;
    flatNode.folderId = node.folderId;
    flatNode.webViewLink = node.webViewLink;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
    console.log(this.treeControl.isExpanded(node))
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

  showImageInReal(url) {
    const dialogRef = this.dialog.open(FullImageShowComponent, { data: url, maxWidth: 800, maxHeight: 800, panelClass: ['showImagePanel', 'app-full-image-show'] });
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */