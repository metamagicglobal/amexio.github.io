
import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, Output, QueryList
} from '@angular/core';
import {TabComponent} from './tabpill.component';
declare var $: any;
@Component({
  selector: 'amexio-tab-pane',
  template : `

    <div [attr.id]="elementId" (window:resize)="onResize($event)">
    <div (click)="leftClick()" class="scroller scroller-left" >
      <span style="display: none;"  [attr.id]="'left-'+elementId"><i class="fa fa-caret-left fa-3x" aria-hidden="true"></i></span>
    </div>
    <div (click)="rightClick()" class="scroller scroller-right">
      <span  style="display: block"  [attr.id]="'right-'+elementId"><i class="fa fa-caret-right fa-3x" aria-hidden="true"></i></span>
    </div>
    
    <div class="wrapper" [attr.id]="'wrapper-'+elementId">
      <ul class="nav nav-tabs" role="tablist" [attr.id]="'list-'+elementId">
        <li class="nav-item" *ngFor="let tab of tabs" >
          <a [class]="getTabClass(tab)" data-toggle="tab"  role="tab" [ngClass]="{'active':tab.active}" style="cursor: pointer;" (click)="tabActive(tab.elementId)" [attr.id]="tab.elementId" >&nbsp;{{tab.title}}&nbsp;&nbsp;<a *ngIf="closable" id="'closable-'+{{tab.elementId}}" style="vertical-align: top; cursor: pointer;" (click)="closeTab(tab.elementId)">&times;</a></a>
        </li>
      </ul>
    </div>
    </div>
    
    <div>
      <ng-content ></ng-content>
    </div>
    
  `,
  styles: [
    `

      .list {
        position:absolute;
        left:0px;
        top:0px;
        margin-left:12px;
        margin-top:0px;
      }

      .list li{
        display:table-cell;
        position:relative;
        text-align:center;
        cursor:grab;
        cursor:-webkit-grab;
        color:#efefef;
        vertical-align:middle;
      }

      .wrapper {
        position:relative;
        margin:0 auto;
        overflow:hidden;
        padding:5px;
        height: 50px;
      }

      .scroller {
        text-align:center;
        cursor:pointer;
        padding-top:15px;
        vertical-align: top;
      }

      .scroller-right{
        float:right;
      }

      .scroller-left {
        float:left;
      }      
    
    `
  ]

})
export class TabPaneComponent implements OnInit, AfterContentInit, AfterViewInit  {

  @Input() closable: boolean;

  @Input() tapPosition: string;

  @ContentChildren(TabComponent)  queryTabs: QueryList<TabComponent>;

  tabs: TabComponent[];

  elementId: string;

  constructor() {
    this.elementId = 'tabpane-' + new Date().getTime();
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.tabs = this.queryTabs.toArray();
  }

  ngAfterViewInit() {
    setTimeout(() => { // adjust tab scrolling once its render
      this.reAdjust();
    });
  }

  closeTab(elementId: string) {
    const newTab  = [];
    const tabs = this.tabs;
    let index = 0;
    let tabHighlightIndex = 0;

    tabs.forEach(tab => {
      tab.active = false;
      if (tab.elementId == elementId) {
        tabHighlightIndex = index;
      }
      if (tab.elementId != elementId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex == newTab.length) {
      tabHighlightIndex--;
    }
    document.getElementById(elementId).parentNode.removeChild(document.getElementById(elementId));
    this.activateTab(newTab[tabHighlightIndex].elementId);
    this.tabs = newTab;
    if (this.tabs.length == 1) {
      this.closable = false;
    }
    this.reAdjust();
  }

  widthOfList() {
    let itemsWidth = 0;
    $('#list-' + this.elementId + ' li').each(function(){
      const itemWidth = $(this).outerWidth();
      itemsWidth += itemWidth;
    });
    return itemsWidth;
  }

  rightClick() {

    this.navAdjust('left-' + this.elementId, 'block');
    const ts = document.getElementById('wrapper-' + this.elementId);
    ts.scrollLeft += 200;

    if ((ts.scrollWidth - ts.offsetWidth - ts.scrollLeft ) <= 0) {
      this.navAdjust('right-' + this.elementId, 'none');
    }
  }

  leftClick() {
    this.navAdjust('right-' + this.elementId, 'block');
    const ts = document.getElementById('wrapper-' + this.elementId);
    ts.scrollLeft -= 200;
    if (ts.scrollLeft == 0 ) {
      this.navAdjust('left-' + this.elementId, 'none');
    }
  }

  reAdjust() {
    const listWidth1 = Math.round(this.widthOfList()) + 1;
    let listWidth  = Math.round($('#' + this.elementId).outerWidth()) + 10;

    console.log(listWidth + '--' + listWidth1);

    if (listWidth1 > listWidth) {
      listWidth = listWidth1;
      this.navAdjust('right-' + this.elementId, 'block');
    }else {
      this.navAdjust('right-' + this.elementId, 'none');
      this.navAdjust('left-' + this.elementId, 'none');
    }
    $('#list-' + this.elementId).css('minWidth', listWidth + 'px');
  }

  navAdjust(elementId: string, display: string) {
    $('#' + elementId).css('display', display);
  }


  onResize(event: any) {
    this.reAdjust();
  }

  getTabClass(tab: any) {
    let cls = 'nav-link ';
    if (tab.active && tab.active == true) {
      cls = cls + ' active';
    }
    if (tab.icon) {
      cls = cls + ' ' + tab.icon;
    }
    return cls;
  }

  tabActive(tabId: string) {
    const tabs = this.tabs;
     tabs.forEach(tab => {
     tab.active = false;
     if (tab.elementId == tabId) {
       tab.active = true;
     }
     });
  }



}
