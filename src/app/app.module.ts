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


@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, NotFoundPageComponent, LeaderComponent, MemberComponent, SuperuserComponent, ClanComponent, WelcomePageComponent
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
    MatToolbarModule
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
    MatToolbarModule
  ], 
  entryComponents : [LoginComponent, RegisterComponent],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
