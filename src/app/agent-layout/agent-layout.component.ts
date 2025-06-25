import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CcpContainerComponent } from '../ccp-container/ccp-container.component';
import { CustomerCardsComponent } from '../customer-cards/customer-cards.component';
import { ConnectServiceService } from '../connectService/connect-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CcpContainerComponent, CustomerCardsComponent,NgIf],
  templateUrl: './agent-layout.component.html',
  styleUrls: ['./agent-layout.component.scss']
})
export class AgentLayoutComponent implements AfterViewInit {
  
  @ViewChild('leftHost', { read: ViewContainerRef }) leftHost!: ViewContainerRef;
  @ViewChild('rightHost', { read: ViewContainerRef }) rightHost!: ViewContainerRef;
  showLeft = true;
  showRight = false;
  constructor(private resolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    this.loadLeftComponent();
  }
  loadLeftComponent() {
    const leftFactory = this.resolver.resolveComponentFactory(CcpContainerComponent);
    const leftRef = this.leftHost.createComponent(leftFactory);
    leftRef.instance.loaded.subscribe(() => this.loadRightComponent());
  }

  loadRightComponent() {
    const rightFactory = this.resolver.resolveComponentFactory(CustomerCardsComponent);
    this.rightHost.createComponent(rightFactory);
  }

  onLeftLoaded() {
    console.log('Left component loaded');
    this.showRight = true;
  }
  
  // constructor(private connectService: ConnectServiceService,private router: Router){

  // }
  // navigateToDifferentPage(){
  //   this.router.navigate(['contactDetails'])
  // }
}
