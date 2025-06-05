import { AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { CcpContainerComponent } from '../ccp-container/ccp-container.component';
// import * as connect from 'amazon-connect-streams';
declare const window: any;
@Component({
  selector: 'app-customer-cards',
  standalone: true,
  imports: [NgFor,CcpContainerComponent],
  templateUrl: './customer-cards.component.html',
  styleUrls: ['./customer-cards.component.scss']
})
export class CustomerCardsComponent implements OnInit {
  customers = signal<any[]>([]);
   ccpStreamInstance: any;
   contactId: WritableSignal<string> = signal('N/A');
  status: WritableSignal<string> = signal('Initializing...');


  constructor(private http: HttpClient) {
  //   this.ccpContainer.getCCPInstance().onContact((contact: any) => {
  //     this.contactId.set(contact.getContactId());
  //     this.status.set(contact.getStatus().name);
  //     console.log('Contact ID:', this.contactId());
  //     console.log('Contact Status:', this.status());
  // });
  }


  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/customers',{headers: {'Content-Type': 'application/json','Authorization':'Bearer eyJraWQiOiI4ZGQzYzZkOS0wY2U3LTQ4NzMtYjhkZi04NDdmMmU3YjAxZDAiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiaW4yOG1pbnV0ZXMiLCJleHAiOjE3NDkxNjA0NzYsImlhdCI6MTc0OTE1NTA3Niwic2NvcGUiOiJST0xFX1VTRVIifQ.LjjHHdiXelnrgwOIzD_Dv6jSLL3FpIlitl4Jmowq1Oqo3-oXDj1Ql6GnswOTAg20754SwJs7742EVfbJr5VLIy28HqqpYwy5avM1og8JJmUQEqeoH3jXbHznOIAwNkqvb7QdkQCkBooim2d3rTyueyQPBXtIdkYqLD1w6SdcnxPZgtor4gq1Nx4qUBUO8Sf75brmcUT610OkwvZSsiba5E4bzz_C4Nmr0fk7cu2PWAyFltLWWqX6_Nbi9xsACNGKGlW9gRVf63GTzCH_W161Ahvbnk0WwuBekp1YYzetM3EH3-0YC4r8s4xgjKzx9_bqnlTadtT59NZElJTWg_bwpw'}})
      .subscribe(data => this.customers.set(data));    
}
}
