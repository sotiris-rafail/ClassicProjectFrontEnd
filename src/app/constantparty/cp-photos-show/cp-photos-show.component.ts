import { FullImageShowComponent } from './full-image-show/full-image-show.component';
import { MatDialog } from '@angular/material/dialog';
import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cp-photos-show',
  templateUrl: './cp-photos-show.component.html',
  styleUrls: ['./cp-photos-show.component.css'],
  providers: [ConstantPartyService]
})
export class CpPhotosShowComponent implements OnInit {

  cpFile: CpFile[] = [];
  private transformer = (node: CpFile, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      type: node.type,
      folderId : node.folderId,
      creationTime: node.creationTime,
      webViewLink: node.webViewLink,
      webContentLink: node.webContentLink,
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl: FlatTreeControl<{}> | FlatTreeControl<ExampleFlatNode>;
  // tslint:disable-next-line: member-ordering
  treeFlattener: MatTreeFlattener<{}, {}> | MatTreeFlattener<CpFile, { expandable: boolean; name: String; level: number; }>;

  // tslint:disable-next-line: member-ordering
  dataSource: MatTreeFlatDataSource<{}, {}>;

  ngOnInit(): void {
    // tslint:disable-next-line: member-ordering
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
    // tslint:disable-next-line: member-ordering
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

    // tslint:disable-next-line: member-ordering
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
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
    });
  }

  constructor(private constantPartyService: ConstantPartyService, private dialog: MatDialog) {
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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  showImageInReal(url) {
    const dialogRef = this.dialog.open(FullImageShowComponent, {data : url, maxWidth : 800, maxHeight : 800, panelClass : ['showImagePanel', 'app-full-image-show']});
  }
}

export interface RootFolderResponse {
  folderId: String;
  name: String;
  parent: Array<String>;
  type: String;
  creationTime: Date;
  webViewLink: String;
  webContentLink: String;
  folderResponseMap: Map<String, SubFolderResponse>;
}

export interface SubFolderResponse {
  folderId: String;
  name: String;
  parent: Array<String>;
  type: String;
  creationTime: Date;
  webViewLink: String;
  webContentLink: String;
  folderResponseMap: Map<String, SubFolderResponse>;
  fileResponseMap: Array<[String, FileResponse]>;
}

export interface FileResponse {
  fileId: String;
  name: String;
  parent: Array<String>;
  type: String;
  creationTime: Date;
  webViewLink: String;
  webContentLink: String;
}

interface CpFile {
  folderId: String;
  name: String;
  parent: Array<String>;
  type: String;
  creationTime: Date;
  webViewLink: String;
  webContentLink: String;
  children?: CpFile[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
