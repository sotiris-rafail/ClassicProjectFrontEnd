import { DeleteUserComponent } from './../../homePage/member/delete-user/delete-user.component';
import { Component, OnInit, ViewChild, Input, OnChanges, ChangeDetectorRef, HostBinding } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { UsersInfoDashboardDiaplyDataSource as UsersInfoDashboardDisplayDataSource } from './users-info-dashboard-display-datasource';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AdminDashbordService } from '../adminDashboard.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';
import { User } from '../admin-dash-board.component';
import { filter } from 'rxjs/operators';
import { ChangeMemberRoleComponent } from 'src/app/homePage/member/change-member-role/change-member-role.component';
import { AddUserToCpFromAdminPageComponent } from 'src/app/constantparty/add-user-to-cp-from-clan-page/add-user-to-cp-from-clan-page.component';
import { DeleteCharacterComponent } from 'src/app/clan/remove-clan-member/remove-clan-member.component';
import { DeleteMemberComponent } from 'src/app/constantparty/delete-member/delete-member.component';
import { routeSlideLeftToRightStateTrigger } from 'src/app/shared/route-animation';

@Component({
  selector: 'app-users-info-dashboard-display',
  templateUrl: './users-info-dashboard-display.component.html',
  styleUrls: ['./users-info-dashboard-display.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    routeSlideLeftToRightStateTrigger],
  providers: [AdminDashbordService, DisplayingErrorComponent]
})
export class UsersInfoDashboardDisplayComponent implements OnInit, OnChanges {
  //@HostBinding('@routeSlideLeftToRightState') routeAnimation = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersInfoDashboardDisplayDataSource;
  displayingView = [];
  @Input() filter = "";
  @Input() searchByCharacter = false;
  @Input() isSuperUser;
  actualData = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['userId', 'email', 'typeOfUser', 'cpName', 'more'];

  roles = [
    { value: '0', viewValue: 'CPLEADER' },
    { value: '1', viewValue: 'CPMEMBER' },
    { value: '2', viewValue: 'RAIDBOSSER' },
    { value: '3', viewValue: 'CPLEADER' }
  ];

  ngOnInit() {
    this.adminService.getUsersForDashboard(sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.actualData = response;
        this.dataSource = new UsersInfoDashboardDisplayDataSource(response, this.paginator, this.sort);
      }, error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarError',
            data: { message: error.error.message || error.error.error_description, type: 'error' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        if (Number(error.status) === 401) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  ngOnChanges() {
    if (this.filter !== "") {
      this.dataSource = new UsersInfoDashboardDisplayDataSource(this.actualData, this.paginator, this.sort);
      if (this.searchByCharacter) {
        this.dataSource = new UsersInfoDashboardDisplayDataSource(this.dataSource.filterByCharacterName(this.filter), this.paginator, this.sort);
      } else {
        this.dataSource = new UsersInfoDashboardDisplayDataSource(this.dataSource.filterByEmail(this.filter), this.paginator, this.sort);
      }
    } else {
      this.dataSource = new UsersInfoDashboardDisplayDataSource(this.actualData, this.paginator, this.sort);
    }
  }


  constructor(private adminService: AdminDashbordService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
    this.displayingView['userId'] = 'ID';
    this.displayingView['email'] = 'Email';
    this.displayingView['typeOfUser'] = 'Type Of User';
    this.displayingView['cpName'] = 'CP Name';
    this.displayingView['more'] = 'Action';
    this.displayingView['MAIN'] = 'Main';
    this.displayingView['BOX'] = 'Box';
    this.displayingView['SUPERUSER'] = 'Super User';
    this.displayingView['CPMEMBER'] = 'CP Member';
    this.displayingView['RAIDBOSSER'] = 'Raid Bosser';
    this.displayingView['CPLEADER'] = 'CP Leader';
  }

  handleDelete(user_id: number, email: string) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { 'user_id': user_id, 'email': email }
    })

    dialogRef.afterClosed().subscribe(response => {
      if (response.button) {
        const member = this.actualData.find((member) => member.userId == response.user_id);
        const index = this.actualData.indexOf(member, 0);
        this.actualData.splice(index, 1);
        this.ngOnChanges();
      }
    });
  }

  showInfo(member: any, typeOfUser: string, userId: number) {
    member.typeOfUser = typeOfUser;
    let dialogRef = this.dialog.open(ChangeMemberRoleComponent,
      {
        data: { member: member },
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(typeOfUser => {
      if(typeOfUser) {
        let indexOfUpdatedUser = this.actualData.findIndex((member) => member.userId == userId);
        this.actualData[indexOfUpdatedUser].typeOfUser = this.roles[typeOfUser].viewValue;
      }
    })
  }

  addToCp(member: any, userId: number) {
    let dialogRef = this.dialog.open(AddUserToCpFromAdminPageComponent,
      {
        data: { member: member },
        disableClose: true
      });
    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        let indexOfUpdatedUser = this.actualData.findIndex((member) => member.userId == userId);
        this.actualData[indexOfUpdatedUser].responseConstantParty.cpName = response;
      }
    })
  }

  deleteCharFromAdminPage(member: any, userId: number) {
    let dialogRef = this.dialog.open(DeleteCharacterComponent,
      {
        data: { member: member },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(response => {
        if(response) {
          let indexOfUpdatedUser = this.actualData.findIndex((member) => member.userId == userId);
          let deletedCharIndex = this.actualData[indexOfUpdatedUser].chars.findIndex((char) => char.characterId == response);
          this.actualData[indexOfUpdatedUser].chars.splice(deletedCharIndex, 1);
          this.ngOnChanges();
        }
      })
  }

  handleDeleteCpMember(member: any, cpName: string, userId: number) {
    member.cpName = cpName;
    const dialogRef = this.dialog.open(DeleteMemberComponent, {
      data : {
        'member' : member
      },
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        let indexOfUpdatedUser = this.actualData.findIndex((member) => member.userId == userId);
        this.actualData[indexOfUpdatedUser].responseConstantParty.cpName = "";
      }
    })
  }

}
