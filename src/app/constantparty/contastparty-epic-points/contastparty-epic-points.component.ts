import { Component, OnInit, Input } from '@angular/core';
import { ConstantPartyService } from '../constantPartyService/constantParty.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';


@Component({
  selector: 'contastparty-epic-points',
  templateUrl: './contastparty-epic-points.component.html',
  styleUrls: ['./contastparty-epic-points.component.css']
})
export class ContastpartyEpicPointsComponent {

  @Input() aqPoints: number = 0;
  @Input() corePoints: number = 0;
  @Input() orfenPoints: number = 0;
  @Input() cpId: number = NaN;
  aqPointsToAdd = 0;
  corePointsToAdd = 0;
  orfenPointsToAdd = 0;
  constructor() { }
}
