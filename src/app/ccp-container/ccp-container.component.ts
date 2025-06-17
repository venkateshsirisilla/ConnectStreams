import { Component, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import 'amazon-connect-streams'; 
import { ConnectServiceService } from '../connectService/connect-service.service';
declare const connect: any;

@Component({
  selector: 'app-ccp-container',
  standalone: true,
  template: `<div #ccpDiv id="ccp-container" style="height: 600px;"></div>`,
})
export class CcpContainerComponent implements AfterViewInit {
  @Output() loaded = new EventEmitter<void>();
  @ViewChild('ccpDiv') ccpDiv!: ElementRef;
  // private ccpInstance: any;
  constructor(private connectservice:ConnectServiceService ) {
  }

  ngAfterViewInit(): void {
    // this.connectservice.initCCP('ccp-container', 'https://i3-lynn-connect-prod.my.connect.aws/ccp-v2/');
   this.connectservice.initCCP(this.ccpDiv.nativeElement,'https://i3-lynn-connect-prod.my.connect.aws/ccp-v2/', 'us-east-1');
  //  console.log('Core instance:', this.connectservice.getCoreInstance());
    // connect.core.initCCP(this.ccpDiv.nativeElement, {
    //   ccpUrl: 'https://i3-lynn-connect-prod.my.connect.aws/ccp-v2/',
    //   loginPopup: true,
    //   loginPopupAutoClose: true,
    //   region: 'us-east-1',
    //   softphone: { allowFramedSoftphone: true }
    // });
    // connect.agent((agent: any) => {
    //   console.log('Agent initialized:', agent);
    //   this.ccpInstance = connect.core.getInstance();
    // });
    setTimeout(() => {
      console.log('Left component initialized');
      this.loaded.emit();
    }, 1000);
  }
  // getCCPInstance(): any {
  //   return this.ccpInstance;
  // }
}
