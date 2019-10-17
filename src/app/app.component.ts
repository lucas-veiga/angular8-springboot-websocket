import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8-springboot-websocket';

  response = 'Aqui estara a resposta apos a emissao do evento';
  name: string;

  webSocketEndPoint = 'http://localhost:8080/ws';
  stompClient;

  ngOnInit() {
  }

  connect() {
    console.log('Initialize WebSocket Connection');
    this.stompClient = Stomp.client('ws://localhost:8080/ws');
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('/topic/location/1', (sdkEvent) => {
        this.onMessageReceived(sdkEvent);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  sendMessage() {
    console.log('calling logout api via web socket');
    navigator.geolocation.getCurrentPosition((res) => {
      const coords = res.coords;
      this.stompClient.send(
        `/app/location/${coords.latitude}/${coords.longitude}/driverId/${1}`,
        {},
        {});
    });
  }

  onMessageReceived(message) {
    console.log('Message Received from Server :: ' + message);
    this.response = JSON.parse(message.body);
  }

  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
}
