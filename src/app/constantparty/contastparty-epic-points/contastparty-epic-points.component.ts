import { Component, OnInit, Input } from '@angular/core';
import { ConstantPartyService } from '../constantPartyService/constantParty.service';

@Component({
  selector: 'contastparty-epic-points',
  templateUrl: './contastparty-epic-points.component.html',
  styleUrls: ['./contastparty-epic-points.component.css'],
  providers : [ConstantPartyService]
})
export class ContastpartyEpicPointsComponent implements OnInit {

  @Input() aqPoints : number  = 0;
  @Input() corePoints : number  = 0;
  @Input() orfenPoints : number  = 0;
  @Input() cpId : number = NaN;
  aqPointsToAdd = NaN;
  corePointsToAdd = NaN;
  orfenPointsToAdd = NaN;
  constructor(private constantPartyService : ConstantPartyService) { }

  ngOnInit() {
  }

  updatePoints(rb : string, pointsToAdd : number){
    this.constantPartyService.updateEpicPoints(sessionStorage.getItem("access_token"), rb, pointsToAdd).subscribe(
      response =>{

      },
      error => console.log(error))
  }
}
