import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import 'amazon-connect-streams'; 
declare const connect: any;

@Component({
  selector: 'app-ccp-container',
  standalone: true,
  template: `<div #ccpDiv id="ccp-container" style="height: 600px;"></div>`,
})
export class CcpContainerComponent implements AfterViewInit {
  @ViewChild('ccpDiv') ccpDiv!: ElementRef;
  private ccpInstance: any;

  ngAfterViewInit(): void {
    connect.core.initCCP(this.ccpDiv.nativeElement, {
      ccpUrl: 'https://i3-lynn-connect-prod.my.connect.aws/ccp-v2/',
      loginPopup: true,
      loginPopupAutoClose: true,
      region: 'us-east-1',
      softphone: { allowFramedSoftphone: true }
    });
    connect.agent((agent: any) => {
      console.log('Agent initialized:', agent);
      this.ccpInstance = connect.core.getInstance();
    });
  }
  getCCPInstance(): any {
    return this.ccpInstance;
  }
}
