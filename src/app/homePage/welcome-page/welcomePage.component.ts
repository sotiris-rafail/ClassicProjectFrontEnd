import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcomePage.template.html',
  styleUrls: ['./welcomePage.style.css']
})
export class WelcomePageComponent implements OnInit {
  welcomeMessage = "Welcome to Inquisition Alliance Web Site";
  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
  }

}
