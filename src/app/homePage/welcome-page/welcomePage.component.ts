import { Component, OnInit, HostBinding } from '@angular/core';
import { routeFadeStateTrigger } from 'src/app/shared/route-animation';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcomePage.template.html',
  styleUrls: ['./welcomePage.style.css'],
  animations: [routeFadeStateTrigger]
})
export class WelcomePageComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  welcomeMessage = 'Welcome to Crusaders Alliance Web Site';
  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
  }

}
