import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, Input} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  folderResponseMap: TodoItemNode[];
  name: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
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

  constructor(private http? : HttpClient) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    let data = this.getCpPhotos(1, sessionStorage.getItem('access_token'), Number(sessionStorage.getItem('userId')))
    .pipe(
        map(response => {return response}),
    );
    data.subscribe(response => {
        this.dataChange.next(this.buildFileTree(response, 0));
    })
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
     
      if (value.type === 'FOLDER' || value.type === 'ROOT') {
        if (value.folderResponseMap.length > 0) {
            value.folderResponseMap.forEach(element => {
                console.log(element)
                node.folderResponseMap = this.buildFileTree(element, level + 1);
            });
        } else if (value.fileResponseMap.length > 0) {
            value.folderResponseMap.forEach(element => {
                console.log(element)
                node.folderResponseMap = this.buildFileTree(element, level + 1);
            });
        }
    } else {
        console.log(value)
            node.name = value.name;
    }
      
      return accumulator.concat(value);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.folderResponseMap) {
      parent.folderResponseMap.push({name: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.name = name;
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

  constructor(private database: ChecklistDatabase) {
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
    flatNode.expandable = !!node.folderResponseMap;
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
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */