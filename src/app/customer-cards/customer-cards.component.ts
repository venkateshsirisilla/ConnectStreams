import { AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { CcpContainerComponent } from '../ccp-container/ccp-container.component';
import { AgentState, ConnectServiceService, ContactState } from '../connectService/connect-service.service';
import { Subscription } from 'rxjs';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
// import * as connect from 'amazon-connect-streams'; const window: any;
@Component({
  selector: 'app-customer-cards',
  standalone: true,
  imports: [NgFor,NgIf,ContactDetailsComponent],
  templateUrl: './customer-cards.component.html',
  styleUrls: ['./customer-cards.component.scss']
})
export class CustomerCardsComponent implements OnInit {
  customers = signal<any[]>([]);
  ccpStreamInstance: any;
  contactIdState: WritableSignal<ContactState | null> = signal<ContactState | null>(null);
  status: WritableSignal<string> = signal('Initializing...');
  agentState: AgentState | null = null;
  contactState: ContactState | null = null;
   private subscriptions: Subscription[] = [];


  constructor(private http: HttpClient,private connectService: ConnectServiceService) {
    

  }


  ngOnInit(): void {
    // this.http.get<any[]>('http://localhost:8080/customers', { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJraWQiOiI4ZGQzYzZkOS0wY2U3LTQ4NzMtYjhkZi04NDdmMmU3YjAxZDAiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiaW4yOG1pbnV0ZXMiLCJleHAiOjE3NDkxNjA0NzYsImlhdCI6MTc0OTE1NTA3Niwic2NvcGUiOiJST0xFX1VTRVIifQ.LjjHHdiXelnrgwOIzD_Dv6jSLL3FpIlitl4Jmowq1Oqo3-oXDj1Ql6GnswOTAg20754SwJs7742EVfbJr5VLIy28HqqpYwy5avM1og8JJmUQEqeoH3jXbHznOIAwNkqvb7QdkQCkBooim2d3rTyueyQPBXtIdkYqLD1w6SdcnxPZgtor4gq1Nx4qUBUO8Sf75brmcUT610OkwvZSsiba5E4bzz_C4Nmr0fk7cu2PWAyFltLWWqX6_Nbi9xsACNGKGlW9gRVf63GTzCH_W161Ahvbnk0WwuBekp1YYzetM3EH3-0YC4r8s4xgjKzx9_bqnlTadtT59NZElJTWg_bwpw' } })
    //   .subscribe(data => this.customers.set(data));

    this.subscriptions.push(
      this.connectService.agentState$.subscribe(state => {
        this.agentState = state;
      }),
      this.connectService.contactState$.subscribe(state => {
        this.contactState = state;
        // if(state){
        // this.contactIdState.set(state) ;
        // }
      })
    );
  }
}
