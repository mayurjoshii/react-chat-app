import React, { Component } from 'react';
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import './App.css';

import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

class App extends Component {

  constructor(props){
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.userTyping = this.userTyping.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);

    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      roomId: null

    }
  }

  componentDidMount(){

    //Credentials for initial connection to the chatkit server
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:8a405af9-019e-4048-8750-cece087a5670',
      userId: 'Mayur',
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8a405af9-019e-4048-8750-cece087a5670/token'})
    });


    //What to do when connection is established
    chatManager.connect()
      .then( currentUser => {

        //Making the currentUser instance to be scoped globally
        this.currentUser = currentUser;
        this.getRooms();

        console.log('Successful initial connection ');
      })
      .catch(err => { 
        console.log('Error in initial connection', err);
      });
  }

  subscribeToRoom(roomId){
    this.setState({
      messages: []
    });
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: message => {
          //console.log('New Message received = ', message.text);
          this.setState({
            messages: [...this.state.messages, message]
          });
        } 
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      });
      this.getRooms();
    })
    .catch(err => console.log('Error ',err))
  }

  getRooms(){
    //JoinableRoom gives the room which the current user hasn't joined
    this.currentUser.getJoinableRooms()
    .then(rooms => {
      this.setState({
        //rooms gives all the unsubscribed rooms
        joinableRooms: rooms,
        //joined rooms gives the room of current user
        joinedRooms: this.currentUser.rooms
      });
    })
    .catch(err => {
      console.log('Joinable rooms error ',err);
    })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
    .then(message => {
      console.log('Message success: ', message, text);
    })
    .catch(err => {
      console.log('Error in sending message ', err);
    })
  }
  
  userTyping(){
    this.currentUser.isTypingIn({roomId: this.state.roomId})
      .then(() => {
        console.log(`User is typing in ${this.state.roomId}`);
      })
      .catch(err => {
        console.log('Error in typing ',err);
      })
  }

  createNewRoom(name){
    this.currentUser.createRoom({
      name,
      addUserIds: ['Mayur'] 
    })
    .then(room => {
      console.log('Room is created ',room.name);
      this.getRooms();
    })
    .catch(err => {
      console.log('Error in room creation ',err);
    })
  }

  render() {
    return (
      <div className="app">
        <MessageList message={this.state.messages} />
        <RoomList 
            roomId={this.state.roomId}
            subscribeToRoom={this.subscribeToRoom} 
            rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]} />
        <NewRoomForm createNewRoom={this.createNewRoom} />
        <SendMessageForm 
            sendMessage={this.sendMessage} 
            userTyping={this.userTyping} />
      </div>
    );
  }
}

export default App;
