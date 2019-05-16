import { MatBadgeModule } from '@angular/material/badge';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { NotFoundPageComponent } from './notFoundPage/notFoundPage.component';
import { LeaderComponent } from './homePage/leader/leader.component';
import { MemberComponent } from './homePage/member/member.component';
import { SuperuserComponent } from './homePage/superuser/superuser.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ClanComponent } from './clan/clan.component';
import { MatListModule } from '@angular/material/list';
import { WelcomePageComponent } from './homePage/welcome-page/welcomePage.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AdditionCharacterPanelComponent } from './homePage/member/addition-character-panel/addition-character-panel.component';
import { RaidBossComponent } from './raid-boss/raid-boss.component';
import { RegisterRaidBossComponent } from './raid-boss/register-raid-boss/register-raid-boss.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConstantpartyComponent } from './constantparty/constantparty.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTODComponent } from './raid-boss/update-tod/update-tod.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeMemberRoleComponent } from './homePage/member/change-member-role/change-member-role.component';
import { AddClanComponent } from './clan/add-clan/add-clan.component';
import { MatSortModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { ContastpartyEpicPointsComponent } from './constantparty/contastparty-epic-points/contastparty-epic-points.component';
import { FormsModule } from '@angular/forms';
import { DeleteMemberComponent } from './constantparty/delete-member/delete-member.component';
import { DeletePanelComponent } from './homePage/member/delete-panel/delete-panel.component';
import { AdditionMemberPanelComponent } from './constantparty/addition-member-panel/addition-member-panel.component';
import { UpdateCharacterComponent } from './homePage/member/update-character/update-character.component';
import { AuctionComponent } from './auction/auction.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SoldItemsComponent } from './auction/sold-items/sold-items.component';
import { UnSoldItemsComponent } from './auction/un-sold-items/un-sold-items.component';
import { AddNewItemPanelComponent } from './auction/add-new-item-panel/add-new-item-panel.component';
import { AuctionBidConfirmationPanelComponent } from './auction/auction-bid-confirmation-panel/auction-bid-confirmation-panel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DisplayingErrorComponent } from './displaying-error/displaying-error.component';
import { RemoveClanMemberComponent } from './clan/remove-clan-member/remove-clan-member.component';
import { AddUserToCpFromClanPageComponent } from './constantparty/add-user-to-cp-from-clan-page/add-user-to-cp-from-clan-page.component';
import { AddNewConstantPartyComponent } from './constantparty/add-new-constant-party/add-new-constant-party.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UsersInfoDashboardDisplayComponent } from './admin-dash-board/users-info-dashboard-display/users-info-dashboard-display.component';
import { EpicPointsDashboardDisplayComponent } from './admin-dash-board/epic-points-dashboard-display/epic-points-dashboard-display.component';
import { ConstantPartyNumbersInfoComponent } from './admin-dash-board/constant-party-numbers-info/constant-party-numbers-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteUserComponent } from './homePage/member/delete-user/delete-user.component';
import { CpPhotosShowComponent } from './constantparty/cp-photos-show/cp-photos-show.component';
import { MatProgressBarModule } from '@angular/material';
import { FullImageShowComponent } from './constantparty/cp-photos-show/full-image-show/full-image-show.component'; 

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, NotFoundPageComponent, LeaderComponent, MemberComponent, SuperuserComponent, ClanComponent,
    WelcomePageComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, RaidBossComponent, RegisterRaidBossComponent,
    DeletePanelComponent, ConstantpartyComponent, TopbarComponent, UpdateTODComponent, ChangeMemberRoleComponent, AddClanComponent,
    ContastpartyEpicPointsComponent, DeleteMemberComponent, UpdateCharacterComponent, AuctionComponent, SoldItemsComponent,
    UnSoldItemsComponent, AddNewItemPanelComponent, AuctionBidConfirmationPanelComponent, DisplayingErrorComponent, RemoveClanMemberComponent,
    AddUserToCpFromClanPageComponent, AddNewConstantPartyComponent, AdminDashBoardComponent, UsersInfoDashboardDisplayComponent, EpicPointsDashboardDisplayComponent,
    ConstantPartyNumbersInfoComponent, DeleteUserComponent, CpPhotosShowComponent, FullImageShowComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    FlexLayoutModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  entryComponents: [AddNewConstantPartyComponent, AddUserToCpFromClanPageComponent, RemoveClanMemberComponent, DisplayingErrorComponent,
    AuctionBidConfirmationPanelComponent, AddNewItemPanelComponent, AddClanComponent, ChangeMemberRoleComponent, UpdateTODComponent,
    RegisterRaidBossComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, DeletePanelComponent, DeleteMemberComponent,
    UpdateCharacterComponent, DeleteUserComponent, FullImageShowComponent],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
