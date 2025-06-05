import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgentLayoutComponent } from './agent-layout/agent-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AgentLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'agent-workspace';
}
