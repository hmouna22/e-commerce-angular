import { Component } from '@angular/core';

// Define the Message interface to represent a chat message
interface Message {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messages: Message[] = []; // Array to store the chat messages
  newMessage: string = ''; // Holds the content of the new message input field

  sendMessage() {
    if (this.newMessage.trim()) {
      // Create a new Message object with the content of the new message and set isUser to true
      this.messages.push({ content: this.newMessage, isUser: true });

      // Add logic here to handle the response from the customer service and push it to messages array

      this.newMessage = ''; // Clear the newMessage field after sending the message
    }
  }
}
