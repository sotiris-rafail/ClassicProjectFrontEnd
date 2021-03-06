import { RaidBossHistoryComponent } from './raid-boss/raid-boss-history/raid-boss-history.component';
import { VerificationEmailPageComponent } from './homePage/member/verification-email-page/verification-email-page.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { AuctionComponent } from './auction/auction.component';
import { ConstantpartyComponent } from './constantparty/constantparty.component';
import { WelcomePageComponent } from './homePage/welcome-page/welcomePage.component';
import { ClanComponent } from './clan/clan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './notFoundPage/notFoundPage.component';
import { MemberComponent } from './homePage/member/member.component';
import { RaidBossComponent } from './raid-boss/raid-boss.component';

const routes: Routes = [
  { path: '',  component: WelcomePageComponent },
  { path: 'user/:userId', component: MemberComponent},
  { path: 'user/verify/:code', component: VerificationEmailPageComponent, data : {'code' : ':code'}},
  { path: 'clan' ,component: ClanComponent },
  { path: 'cp/:cpId', component : ConstantpartyComponent},
  { path: 'raidboss', component: RaidBossComponent},
  { path: 'raidboss/history', component: RaidBossHistoryComponent},
  { path: 'auction', component : AuctionComponent},
  { path: 'adminDashboard', component : AdminDashBoardComponent},
  { path: '**', component : NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
