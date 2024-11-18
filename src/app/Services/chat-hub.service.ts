import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root' 
})
export class ChatHubService {
  private apiUrl = 'https://localhost:7237'; 
  public hubConnection!: HubConnection; 
  constructor() {}

  public startConnection(): void {debugger
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(`${this.apiUrl}/hub`, {
      withCredentials: true 
    })
    .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.log('Error starting SignalR connection: ' + err));

      this.registerReceiveNotification();
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR connection stopped'));
    }
  }

  private registerReceiveNotification(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received: ', message);
      alert('New notification: ' + message); 
    });
  }
}

