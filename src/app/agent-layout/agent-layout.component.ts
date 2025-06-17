import { Component } from '@angular/core';
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
export class AgentLayoutComponent {
  showLeft = true;
  showRight = false;

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
