import { FullImageShowComponent } from './full-image-show/full-image-show.component';
import { MatDialog } from '@angular/material/dialog';
import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { forEach } from '@angular/router/src/utils/collection';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cp-photos-show',
  templateUrl: './cp-photos-show.component.html',
  styleUrls: ['./cp-photos-show.component.css'],
  providers: [ConstantPartyService]
})
export class CpPhotosShowComponent implements OnInit {
  response: Map<String, RootFolderResponse> = new Map<String, RootFolderResponse>();

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<string, CpFile>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<string, ExampleFlatNode>();
  
  dataChange = new BehaviorSubject<CpFile[]>([]);
  get data(): CpFile[] { return this.dataChange.value; }

  cpFile: CpFile[] = [];
  private transformer = (node: CpFile, level: number) => {
    const existingNode = this.nestedNodeMap.get(node.folderId);
    const flatNode = existingNode && existingNode.folderId === node.folderId ? existingNode : new ExampleFlatNode();
    this.flatNodeMap.set(node.folderId, node);
    this.nestedNodeMap.set(node.folderId, flatNode);
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      type: node.type,
      folderId: node.folderId,
      creationTime: node.creationTime,
      webViewLink: node.webViewLink,
      webContentLink: node.webContentLink,
      parent: node.parent,
      children: node.children,
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl: FlatTreeControl<ExampleFlatNode>;
  // tslint:disable-next-line: member-ordering
  treeFlattener: MatTreeFlattener<CpFile, { expandable: boolean; name: String; level: number; }>;

  // tslint:disable-next-line: member-ordering
  dataSource: MatTreeFlatDataSource<{}, {}>;

  ngOnInit(): void {

    this.constantPartyService.getCpPhotos(1, '', 1).subscribe(response => {
      const item: CpFile = {
        folderId: response.folderId,
        name: response.name,
        parent: response.parent,
        type: response.type,
        creationTime: response.creationTime,
        webViewLink: response.webViewLink,
        webContentLink: response.webContentLink,
        children: this.getChildren(response.folderResponseMap)
      };
      this.cpFile.push(item);
      item.children.sort((a, b) => {
        if (a.creationTime > b.creationTime) { return 1; } else if (a.creationTime < b.creationTime) { return -1; } else { return 0; }
      });
      item.children.forEach(child => child.children.sort((a, b) => {
        if (a.creationTime > b.creationTime) { return 1; } else if (a.creationTime < b.creationTime) { return -1; } else { return 0; }
      }));
      this.dataSource.data = this.cpFile;
      this.dataChange.next(this.cpFile);
    });
  }

  constructor(private constantPartyService: ConstantPartyService, private dialog: MatDialog) {
    // tslint:disable-next-line: member-ordering
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
    // tslint:disable-next-line: member-ordering
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

    // tslint:disable-next-line: member-ordering
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    })
  }

  getChildren(map: Map<String, any>): Array<CpFile> {
    const array: Array<CpFile> = new Array();
    // tslint:disable-next-line: forin
    for (const key in map) {
      const item: CpFile = {
        folderId: map[key].type === 'FOLDER' ? map[key].folderId : map[key].fileId,
        name: map[key].name,
        parent: map[key].parent,
        type: map[key].type,
        creationTime: map[key].creationTime,
        webViewLink: map[key].webViewLink,
        webContentLink: map[key].webContentLink,
        children: (map[key].folderResponseMap && Object.keys(map[key].folderResponseMap).length > 0) ? this.getChildren(map[key].folderResponseMap) : this.getChildren(map[key].fileResponseMap)
      };
      array.push(item);
    }
    return array;
  }

  getLevel = (node: ExampleFlatNode) => node.level;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  hasNoContent = (_: number, node: ExampleFlatNode) => node.name === '';

  showImageInReal(url) {
    const dialogRef = this.dialog.open(FullImageShowComponent, { data: url, maxWidth: 800, maxHeight: 800, panelClass: ['showImagePanel', 'app-full-image-show'] });
  }

  addNewItem(node: ExampleFlatNode, level: number) {
    console.log(node)
    const parentNode = this.flatNodeMap.get(node.folderId);
    console.log(this.flatNodeMap)
    parentNode.children.push({ name: '', parent: [node.folderId], folderId : node.folderId+1 } as CpFile);
    this.dataChange.next(this.data);
    this.treeControl.expand(node);
  }

  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return node;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  saveNode(node: ExampleFlatNode, itemValue: string) {
    const nestedNode = this.nestedNodeMap.get(node.folderId);
    nestedNode.name = name;
    this.dataChange.next(this.data);
    this.treeControl.expand(node);
  }

}

export interface RootFolderResponse {
  folderId: string;
  name: string;
  parent: Array<string>;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
  folderResponseMap: Map<string, SubFolderResponse>;
}

export interface SubFolderResponse {
  folderId: string;
  name: string;
  parent: Array<string>;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
  folderResponseMap: Map<string, SubFolderResponse>;
  fileResponseMap: Map<string, FileResponse>;
}

export interface FileResponse {
  fileId: string;
  name: string;
  parent: Array<string>;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
}

export class CpFile {
  folderId: string;
  name: string;
  parent: Array<string>;
  type?: string;
  creationTime?: Date;
  webViewLink?: string;
  webContentLink?: string;
  children?: CpFile[];

  constructor(name?: string, parent?: string) {
    this.name = name;
    this.children = [];
    this.type = '';
    this.parent = new Array().concat(parent);
  }
}

class ExampleFlatNode {
  expandable: boolean;
  level: number;
  folderId: string;
  name: string;
  parent: Array<string>;
  type: string;
  creationTime: Date;
  webViewLink: string;
  webContentLink: string;
  children: CpFile[];
}
