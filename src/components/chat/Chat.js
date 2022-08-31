import {  useState } from "react";
import { io } from "socket.io-client";
import Select from 'react-select';

import { NotificationManager} from 'react-notifications';
import Chatting from "./Chatting";
const socket = io.connect('http://localhost:3001')
const Chat = ()=>{
  const [room,setRoom] = useState('');
  const [startChatting,setStartChatting] = useState(false);
  const [username,setUserName] = useState('');
  const options = [
    { value: 'fronend', label: 'Front End' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
  ];


  const toogleChatting = () =>{
    setStartChatting(false);
  }
  const joinRoom = (e) =>{
    e.preventDefault();
    if(room.length>0&&username.length>0){
      socket.emit('join_room',{
        room,username
      });
      NotificationManager.success("You have joind successfully!!")
      setStartChatting(true);
    }else{
      NotificationManager.error('Please fill all requied fields.')
    }
  }
  return <>
      {startChatting?<Chatting  username={username} socket={socket}
        toggle={toogleChatting}
        room={room}
       />: <div className="h-screen bg-blue-900">
         <h1 className="shadow-lg h-12 flex items-center font-semibold uppercase font-serif text-white text-4xl justify-center shadow-orange-50">Chat App</h1>
          <form onSubmit={joinRoom} className="flex mt-4 flex-col items-center space-y-4">
          <input onChange={(e)=>setUserName(e.target.value)} className="rounded border-2 w-full sm:w-1/4 border-orange-500" type="text" placeholder="Username" />
          
          <Select  onChange={(e)=>setRoom(e.value)} className="w-full sm:w-1/4 rounded border-2 border-orange-500" options={options}/>
        <button className="btn" type="submit">Join Room</button>
       </form>
    </div>}
    </>
}

export default Chat;