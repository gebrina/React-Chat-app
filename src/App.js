import Chat from "./components/chat/Chat";
import {Routes,Route} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import './App.css'
import Chatting from "./components/chat/Chatting";
const App = () =>{
  return  <>
      <NotificationContainer/>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path='/chat' element={<Chatting/>}/>
      </Routes>
    </>
}
export default App;