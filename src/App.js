import React from 'react'
import JoinBlock from "./Components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import Chat from "./Components/Chat";
import axios from "axios";



function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = async (obj) => {
        dispatch ({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN',obj);
        const {data} = await  axios.get(`/rooms/${obj.roomId}`)
     dispatch({
         type: 'SET_DATA',
         payload: data
     })
    }

    const setUsers =(users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        })
    }

React.useEffect(()=> {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', (message) => {
        dispatch( {
            type: 'NEW_MESSAGE',
            payload: message
        })
    });
}, [])


    window.socket = socket

    console.log(state)

    return (
       <div className='wrapper'>
           {!state.joined
               ? <JoinBlock onLogin={onLogin}/>
           : <Chat {...state}/>}
       </div>
    );
}

export default App;
