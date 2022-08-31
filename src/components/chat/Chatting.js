import { useState,useEffect} from 'react';
import selection from '../../assets/images/selection.png'
import user from '../../assets/images/user.png';
import Picker from '@emoji-mart/react';
import ScrollToBottom from 'react-scroll-to-bottom';
import data from '@emoji-mart/data';
const Chatting = ({socket,username,room,toggle}) =>{
     const [pick,setPick] = useState(false)
     const [chosenEmoji, setChosenEmoji] = useState(null);
     const [messageData,setMessageData] = useState([]);
     const [message,setMessage] = useState('');
     const onEmojiClick = (event, emojiObject) => {
       setChosenEmoji(emojiObject);
     }
     useEffect(()=>{
    socket.off('receive_message').on('receive_message',(data)=>{
          setMessageData((prevState)=>{
            return [...prevState,data]
          })
       })
     },[socket])
     const sendMessage = (e) =>{
         e.preventDefault();
         const msgData = { username,
          room,
          message,
          time:new Date().getHours()+':'+
          new Date().getMinutes()+':'+
          new Date().getSeconds()
        }
         socket.emit('send_message',msgData)
        setMessageData((prevState)=>{
          return [...prevState,msgData];
        })
     }
     return <>
         <div className="bg-blue-900 h-screen p-4">
            <div className="container mx-auto 
              w-1/2
            shadow-lg rounded-lg shadow-gray-100
               relative
             bg-white h-1/2">
                <div   className='flex bg-blue-600 
                p-2
                justify-between'>
                <h1 className='bg-blue-900 
                font-bold shadow-lg rounded-lg
                 shadow-blue-400 uppercase 
                 relative
                 left-20
                text-center text-3xl text-white
                '>Start Chatting</h1>
                  <p
                    onClick={toggle}
                  className="bg-white 
                    rounded-lg
                    hover:cursor-pointer
                  flex items-center text-2xl px-4 font-bold
                    text-red-500
                  ">Leave Channel</p>
                </div>
               <div className="flex h-full divide-x-4 divide-blue-900">
               <div className="bg-blue-100   w-1/4">
                <img src={user}
                className={'h-12 absolute top-4'} 
                alt={'User Profile'}/>
                <h1 className="text-2xl capitalize 
                  text-blue-900
                  rounded
                  hover:cursor-pointer
                  mt-2
                  transition
                  hover:text-white
                  duration-800
                  hover:bg-gray-500
                shadow-sm shadow-blue-900">{username}</h1></div>
              <div className=" bg-blue-200 relative w-3/4">
              <ScrollToBottom className="chat-container">
                 <div>
                 {messageData.map((message)=>{
                    return <p id={message.username==username?'you':'someone'}>
                      <span>{message.message}</span>
                      <span style={{display:'block'}}>{message.time}</span>
                    </p>
                  })}
                 </div>
               </ScrollToBottom>
                <form onSubmit={sendMessage} 
                className='absolute w-full px-0 items-end  bottom-0 flex'>
                 {pick? <Picker
                data={data} onEmojiSelect={(e)=>{
                    setPick(false)
                  setMessage((prevState)=>{
                    return prevState+' '+e.native;
                  })
                }} />:<img src={selection} 
                 
                onClick={()=>{
                  setPick(true)
                }} className="h-12 shadow-lg border-2 hover:cursor-pointer rounded-lg border-gray-900" />}
                  <input type={'text'} value={message} 
                   onChange={(e)=>{
                   setMessage(e.target.value)
                   }}
                  className="w-full rounded-sm text-xl capitalize outline-none" />
                  <button className='btn'>send</button>
                </form>
              </div>
             </div>           
            </div>
         </div>
       </>
}

export default Chatting;