import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {
  previusUrl: string = "";
  ngOnInit(): void {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'User\'s Info', cols: 1, rows: 1, number: 1 },
          { title: 'Core Points', cols: 1, rows: 1, number: 2 },
          { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
          { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 }
        ];
      }

      return [
        { title: 'User\'s Info', cols: 2, rows: 1, number: 1 },
        { title: 'Core Points', cols: 1, rows: 1, number: 2 },
        { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
        { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }
}
