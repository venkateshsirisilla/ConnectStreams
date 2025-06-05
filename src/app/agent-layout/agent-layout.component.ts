import { Component } from '@angular/core';
import { CcpContainerComponent } from '../ccp-container/ccp-container.component';
import { CustomerCardsComponent } from '../customer-cards/customer-cards.component';

@Component({
  selector: 'app-agent-layout',
  standalone: true,
  imports: [CcpContainerComponent, CustomerCardsComponent],
  templateUrl: './agent-layout.component.html',
  styleUrls: ['./agent-layout.component.scss']
})
export class AgentLayoutComponent {}
