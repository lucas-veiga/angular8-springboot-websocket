import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greeting = 'Aqui';
  name: string;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
