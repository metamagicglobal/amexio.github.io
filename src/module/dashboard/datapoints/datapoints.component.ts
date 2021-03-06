/**
 * Created by ketangote on 8/16/17.
 */


import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'amexio-datapoints', template: `

  <div class="datapoints" [ngClass]="dpClass">
      <table width="100%" [style.background-color]="backgroundcolor" [style.color]="fontcolor">
        <tr *ngIf="north">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-north"></ng-content>
          </td>
        </tr>
        <tr>
          <td *ngIf="west">
            <ng-content select="amexio-west"></ng-content>
          </td>
          <td *ngIf="center">
            <ng-content select="amexio-center"></ng-content>
          </td>
          <td *ngIf="east">
            <ng-content select="amexio-east"></ng-content>
          </td>
        </tr>
        <tr *ngIf="south">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-south"></ng-content>
          </td>
        </tr>
      </table>
    </div>


  `, styles: [`
    .amexio-datapoints {

    }
  `]
})

export class DataPointsComponent implements OnInit {

  @Input() north: boolean;

  @Input() south: boolean;

  @Input() west: boolean;

  @Input() center: boolean;

  @Input() east: boolean;

  @Input('background-color') backgroundcolor: string;

  @Input('font-color') fontcolor: string;

  @Input('amexio-color') amexiocolor: string = "";
  
  colspan: number;

  dpClass : string="datapoint";

  constructor() {
    this.colspan = 1;
  }

  ngOnInit() {

    if (this.amexiocolor!="")
      this.dpClass = this.amexiocolor;

    if (this.west) this.colspan++;

    if (this.east) this.colspan++;


  }


}
