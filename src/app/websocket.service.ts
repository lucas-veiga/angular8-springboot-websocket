import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import { AppComponent } from './app.component';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  appComponent: AppComponent;
  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }
  _connect() {
    console.log('Initialize WebSocket Connection');
    this.stompClient = Stomp.client('ws://localhost:8080/ws');
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.topic, (sdkEvent) => {
        this.onMessageReceived(sdkEvent);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message 
   */
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log('Message Received from Server :: ' + message);
    this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
