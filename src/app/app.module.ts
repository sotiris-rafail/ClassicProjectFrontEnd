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
import { MatSortModule } from '@angular/material';
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
@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, NotFoundPageComponent, LeaderComponent, MemberComponent, SuperuserComponent, ClanComponent, WelcomePageComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, RaidBossComponent, RegisterRaidBossComponent, DeletePanelComponent, ConstantpartyComponent, TopbarComponent, UpdateTODComponent, ChangeMemberRoleComponent, AddClanComponent, ContastpartyEpicPointsComponent, DeleteMemberComponent, UpdateCharacterComponent, AuctionComponent, SoldItemsComponent, UnSoldItemsComponent, AddNewItemPanelComponent, AuctionBidConfirmationPanelComponent
  ],
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
    MatTooltipModule
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
    MatTooltipModule
  ],
  entryComponents: [AuctionBidConfirmationPanelComponent, AddNewItemPanelComponent, AddClanComponent, ChangeMemberRoleComponent, UpdateTODComponent, RegisterRaidBossComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, DeletePanelComponent, DeleteMemberComponent, UpdateCharacterComponent],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
