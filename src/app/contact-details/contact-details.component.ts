import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AgentState, ConnectServiceService, ContactState } from '../connectService/connect-service.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [NgIf],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit{
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


    this.subscriptions.push(
      this.connectService.agentState$.subscribe(state => {
        this.agentState = state;
      }),
      this.connectService.contactState$.subscribe(state => {
        this.contactState = state;
      })
    );
  }

}
