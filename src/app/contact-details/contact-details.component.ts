import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ConnectServiceService } from '../connectService/connect-service.service';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit{
  ccpStreamInstance: any;
  contactId: WritableSignal<string> = signal('N/A');
  status: WritableSignal<string> = signal('Initializing...');

   constructor(private connectService: ConnectServiceService) {

   }
  ngOnInit(): void {
    window.connect.agent((agent: any) => {
      console.log('Agent initialized:', agent);
      
    });
    window.connect.contact((contact:any)=> {
      console.log('New contact:', contact);
      
      contact.onConnecting(() => console.log('Contact connecting'));
      contact.onAccepted(() => console.log('Contact accepted'));
      contact.onEnded(() => console.log('Contact ended'));
    });
  }

}
