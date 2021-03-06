/**
 * Created by sagar on 18/8/17.
 */
import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {MapTitleComponent} from "../maptitle/map.title.component";
import {MapLoaderService} from "../map.loader.service";
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

declare var google: any;
@Component({
  selector: 'amexio-map-treemap', template: `
    <div *ngIf="showChart" #treemapmap
         [style.width]="width"
         [style.height]="height" (window:resize)="onResize($event)"
    >
      <div *ngIf="!hasLoaded" class="lmask">
      </div>
    </div>
  `, styles: [`.lmask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
    opacity: 0.4;
  }

  .lmask.fixed {
    position: fixed;
  }

  .lmask:before {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 35px #2187e7;
    width: 50px;
    height: 50px;
    -moz-animation: spinPulse 1s infinite ease-in-out;
    -webkit-animation: spinPulse 1s infinite linear;
    margin: -25px 0 0 -25px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .lmask:after {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 15px #2187e7;
    width: 30px;
    height: 30px;
    -moz-animation: spinoffPulse 1s infinite linear;
    -webkit-animation: spinoffPulse 1s infinite linear;
    margin: -15px 0 0 -15px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  @-moz-keyframes spinPulse {
    0% {
      -moz-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -moz-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -moz-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-moz-keyframes spinoffPulse {
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spinPulse {
    0% {
      -webkit-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -webkit-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -webkit-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes spinoffPulse {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  `]
})

export class TreeMapComponent implements AfterContentInit, OnInit {

  private options: any;
  private treemapData: any;
  private chart: any;
  hasLoaded: boolean;
  id: any;

  @Input() width: string;

  @Input() height: string;

  showChart:boolean;
  _data:any;

  get data():any{
    return this._data;
  }

  @Input('data')
  set data(data:any){
    if(data){
      this._data=data;
      this.showChart=true;
    }else{
      this.showChart=false;
    }
  }
  @Input('min-color') mincolor: string;

  @Input('mid-color') midcolor: string;

  @Input('max-color') maxcolor: string;

  @Input('show-scale') showscale: boolean;

  @Input('max-post-depth') maxpostdepth: number;

  @ContentChildren(MapTitleComponent) maptleComp: QueryList<MapTitleComponent>;

  mapTitleArray: MapTitleComponent[];

  mapTitleComponent: MapTitleComponent;

  @ViewChild('treemapmap') private treemapmap: ElementRef;

  constructor(private loader: MapLoaderService) {

    // this.id = 'amexio-map-treemap' + Math.floor(Math.random() * 90000) + 10000;
    this.width = '100%';
  }

  drawChart() {
    if(this.showChart){
      this.treemapData = google.visualization.arrayToDataTable(this._data);
      this.options = {
        title: this.mapTitleComponent ? this.mapTitleComponent.title : null,
        titleTextStyle: this.mapTitleComponent ? {
          color: this.mapTitleComponent.color ? this.mapTitleComponent.color : null,
          fontName: this.mapTitleComponent.fontname ? this.mapTitleComponent.fontname : null,
          fontsize: this.mapTitleComponent.fontsize ? this.mapTitleComponent.fontsize : null,
          bold: this.mapTitleComponent.bold ? this.mapTitleComponent.bold : null,
          italic: this.mapTitleComponent.italic ? this.mapTitleComponent.italic : null
        } : null,
        mincolor: this.mincolor ? this.mincolor : null,
        midcolor: this.midcolor ? this.midcolor : null,
        maxcolor: this.maxcolor ? this.maxcolor : null,
        headerHeight: 15,
        fontcolor: 'black',
        showscale: this.showscale ? this.showscale : false,
        maxpostdepth: this.maxpostdepth ? this.maxpostdepth : 1
      };
      if(this.treemapData){
        this.chart = new google.visualization.TreeMap(this.treemapmap.nativeElement);
        this.hasLoaded = true;
        this.chart.draw(this.treemapData, this.options);
        google.visualization.events.addListener(this.chart, 'click', this.click);
      }
    }


  }

  click(e: any) {
  }

  ngAfterContentInit(): void {
    this.mapTitleArray = this.maptleComp.toArray();
    if (this.mapTitleArray.length == 1) {
      this.mapTitleComponent = this.mapTitleArray.pop();
    }
  }

  ngOnInit(): void {
    this.hasLoaded = false;
    this.loader.loadCharts('TreeMap').subscribe(value => console.log(), errror => console.error(errror), () => {
      this.drawChart();
    });
  }

  onResize(event: any) {
    this.drawChart();
  }
}
