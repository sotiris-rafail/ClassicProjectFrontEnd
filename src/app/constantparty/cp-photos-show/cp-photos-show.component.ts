import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-cp-photos-show',
  templateUrl: './cp-photos-show.component.html',
  styleUrls: ['./cp-photos-show.component.css']
})
export class CpPhotosShowComponent implements OnInit {

  ngOnInit(): void {

  }

  private transformer = (node: CpPhotos, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}

const TREE_DATA: CpPhotos[] = [{
  name: "Kamikaze",
  children: [
    {
      name: "March 2019",
      children: [
        {
          name: "2 March 2019",
          children:[
            {name:"Photo1"},
            {name:"Photo2"},
            {name:"Photo3"},
            {name:"Photo4"},
            {name:"Photo5"},
            {name:"Photo6"},
            {name:"Photo7"}
          ]
        },
        {
          name: "3 March 2019"
        },
        {
          name: "4 March 2019"
        },
        {
          name: "5 March 2019"
        },
        {
          name: "6 March 2019"
        }]
    },
    {
      name: "April 2019"
    },
    {
      name: "May 2019"
    }
  ]
}]

interface CpPhotos {
  name: string;
  children?: CpPhotos[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
