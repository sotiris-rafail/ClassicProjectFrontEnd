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
import { MatTreeModule  } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AdditionCharacterPanelComponent } from './addition-character-panel/addition-character-panel.component';
import { AdditionMemberPanelComponent } from './addition-member-panel/addition-member-panel.component';
import { RaidBossComponent } from './raid-boss/raid-boss.component';
import { RegisterRaidBossComponent } from './raid-boss/register-raid-boss/register-raid-boss.component';
import { UpdateCPMemberComponent } from './update-cpmember/update-cpmember.component';
import { UpdateCharacterComponent } from './update-character/update-character.component';
import { DeletePanelComponent } from './delete-panel/delete-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConstantpartyComponent } from './constantparty/constantparty.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopbarComponent } from './topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTODComponent } from './raid-boss/update-tod/update-tod.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, NotFoundPageComponent, LeaderComponent, MemberComponent, SuperuserComponent, ClanComponent, WelcomePageComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, RaidBossComponent, RegisterRaidBossComponent, UpdateCPMemberComponent, UpdateCharacterComponent, DeletePanelComponent, ConstantpartyComponent, TopbarComponent, UpdateTODComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
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
    MatDatepickerModule
  ],
  exports : [
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
    MatDatepickerModule
  ], 
  entryComponents : [UpdateTODComponent,RegisterRaidBossComponent, UpdateCPMemberComponent, AdditionCharacterPanelComponent, AdditionMemberPanelComponent, UpdateCharacterComponent, DeletePanelComponent],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
