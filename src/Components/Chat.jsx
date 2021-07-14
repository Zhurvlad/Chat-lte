import React from 'react'
import socket from "../socket";

const Chat = ({users, messages, roomId, userName}) => {
    const [messagesValue, setMessages] = React.useState('')
    const messagesRef = React.useRef(null) //ссылка для рефа

/*    const element = document.getElementById('chatlogs');
    element.scrollTop = element.scrollHeight;*/

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE',{
            userName,
            roomId,
            text: messagesValue
        })
        setMessages('')

    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 999999)
    }, [messages]) //Скролл вниз

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr/>
                <b>Онлайн ({users.length}) :</b>
                <ul>
                    {users.map((name, index)=><li key={name + index}>{name}</li> )}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((messages, index) => (
                        <div key={messages + index} className="message">
                            <p>{messages.text}</p>
                            <div>
                                <span>{messages.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
          <textarea
              value={messagesValue}
              onChange={(e) => setMessages(e.target.value)}
              className="form-control"
              rows="3"></textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat