import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface AgentState {
  name: string;
  routingProfile: any;
  isOnline: boolean;
}

export interface ContactState {
  contactId: string;
  state: string;
  type: string;
}
declare const connect: any;
@Injectable({
  providedIn: 'root'
})
export class ConnectServiceService {
  private agentStateSubject = new BehaviorSubject<AgentState | null>(null);
  private contactStateSubject = new BehaviorSubject<ContactState | null>(null);

  agentState$: Observable<AgentState | null> = this.agentStateSubject.asObservable();
  contactState$: Observable<ContactState | null> = this.contactStateSubject.asObservable();
  private ccpInstance: any;
  private initialized = false;
  private ccpInstanceSubject = new BehaviorSubject<any>(null);
  ccpInstance$ = this.ccpInstanceSubject.asObservable();
  constructor() { }
  initCCP(container: HTMLElement, ccpUrl: string, region: string) {
    connect.core.initCCP(container, {
      ccpUrl,
      loginPopup: true,
      region,
      softphone: {
        allowFramedSoftphone: true,
        disableRingtone: false,
      }
    });

    connect.agent((agent:any) => {
      this.updateAgentState(agent);

      agent.onRefresh(() => this.updateAgentState(agent));
      agent.onStateChange(() => this.updateAgentState(agent));
    });

    connect.contact((contact:any) => {
      this.updateContactState(contact);

      contact.onConnecting(() => this.updateContactState(contact));
      contact.onAccepted(() => this.updateContactState(contact));
      contact.onEnded(() => this.updateContactState(contact));
    });
  }

  private updateAgentState(agent: connect.Agent) {
    const state: AgentState = {
      name: agent.getName(),
      routingProfile: agent.getRoutingProfile(),
      isOnline: agent.getState().name==='Available'? true : false
    };
    this.agentStateSubject.next(state);
  }

  private updateContactState(contact: connect.Contact) {
    const state: ContactState = {
      contactId: contact.getContactId(),
      state: contact.getStatus().type,
      type: contact.getType()
    };
    this.contactStateSubject.next(state);
  }
 
  init(container: HTMLElement) {
    if (this.initialized) return;
    connect.core.initCCP(container, {
      ccpUrl: 'https://i3-lynn-connect-prod.my.connect.aws/ccp-v2/',
      loginPopup: true,
      loginPopupAutoClose: true,
      region: 'us-east-1', // Change as needed
      softphone: {
        allowFramedSoftphone: true
      }
    });
    this.initialized = true;
  }
  getCoreInstance() {
    return connect.core.getInstance(); // Must be called AFTER initCCP and iframe load
  }

  getAgent() {
    return connect.agent(); // Should also be used via event hook
  }
  
}
