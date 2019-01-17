import { WelcomePageComponent } from './homePage/welcome-page/welcomePage.component';
import { AppComponent } from './app.component';
import { ClanComponent } from './clan/clan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './notFoundPage/notFoundPage.component';
import { MemberComponent } from './homePage/member/member.component';

const routes: Routes = [
  { path: '',  component: WelcomePageComponent },
  { path: 'user/:userId', component: MemberComponent},
  { path :'clan' ,component: ClanComponent },
  { path: '**', component : NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
