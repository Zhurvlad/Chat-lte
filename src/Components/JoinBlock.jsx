import React from 'react'
import axios from "axios";

const JoinBlock = ({onLogin}) => {
   const [roomId, setRoomId] = React.useState('')
   const [userName, setUserName] = React.useState('')
   const [isLoading, setLoading] = React.useState(false)

    const onSetRoomId = (e) => {
        setRoomId(e.target.value)
    }

    const onSetName = (e) => {
        setUserName((e.target.value))
    }

    const onEnter = async () => {
        if (!roomId || !userName){
return  alert("Suck My Dick")
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true)
      await axios.post('/rooms', obj
      );
        onLogin(obj)
    }


    return (

            <div className="join-block">
                <input value={roomId} onChange={onSetRoomId} type='text' placeholder='Room ID'/>
                <input value={userName}  onChange={onSetName} type='text' placeholder='Your name'/>
                <button disabled={isLoading} onClick={onEnter} className='btn btn-success'>{isLoading ? 'Вход...' : 'Войти'}</button>
            </div>

    )
}

export default JoinBlock;