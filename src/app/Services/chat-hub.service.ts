import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root' 
})
export class ChatHubService {
  private apiUrl = 'http://192.168.208.217:5112';  //  192.168.208.217
  
  public hubConnection!: HubConnection; 
  constructor() {}

  public startConnection(): void {
    debugger;
    const token = localStorage.getItem("token"); 
  
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/hub`, {
        accessTokenFactory: () => token ? token : '',
        withCredentials: false 
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.log('Error starting SignalR connection: ' + err));

      this.registerReceiveNotification();
  }

  public sendMessage(user: string, message: string): Promise<void> {
    if (this.hubConnection) {
      return this.hubConnection
        .invoke('SendMessage', user, message)
        .catch((err) => {
          console.error('SignalR message sending failed', err);
          throw err; // Ensure error handling in case of failure
        });
    }
    return Promise.reject('Hub connection is not established');
  }
  

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR connection stopped'));
    }
  }

  public registerReceiveNotification(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received: ', message);
      alert('New notification: ' + message); 
    });
  }
}

