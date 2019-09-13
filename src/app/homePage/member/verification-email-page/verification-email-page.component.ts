import { MemberService } from './../userService/member.service';
import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification-email-page',
  templateUrl: './verification-email-page.component.html',
  styleUrls: ['./verification-email-page.component.css'],
  providers: [MemberService]
})
export class VerificationEmailPageComponent implements AfterContentInit {
  beforeVerify = true;
  code = "";
  alreadyVerified = false;
  error;
  isError = false;
  constructor(private memberService: MemberService, private router: ActivatedRoute) { }

  ngAfterContentInit() {
    this.router.params.subscribe(value => {
      if (this.code === "") {
        this.code = value.code;
      }
    });
    if (this.beforeVerify && this.code !== "") {
      this.memberService.verification(this.code).subscribe(
        response => {
          if (response === 'VERIFIED') {
            this.beforeVerify = false;
          } else if(response === 'ALREADY_VERIFIED') {
            this.beforeVerify = false;
            this.alreadyVerified = true;
          }
        },
        error => {
          this.isError = true;
          this.error = error;
          this.beforeVerify = false;
        });
    }
  }

}
