import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
//Styles
import './LudicRoom.css';
//Components
import { Container, Row, Col } from 'react-bootstrap';
//Images
import backgroundImage from '../../assets/images/ludic-room.png';
import AvatarImage from '../../assets/images/avatar.png';
//Utils
import { drawAvatar, drawText } from '../../utils/ludicUtils';

let socket;

const LudicRoom = () => {

  const [background, setBackground] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([{ id: 1, name: 'Luis' }, { id: 2, name: 'Melisa'}, {id: 3, name: 'Bruno'}]);
  const canvas = useRef(null);

  const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

  const sendChat = e => {
    e.preventDefault();
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 5000)
    setText('');
  }

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = backgroundImage;
    bgImage.onload = () => setBackground(bgImage);
    const avatarImg = new Image();
    avatarImg.src = AvatarImage;
    avatarImg.onload = () => setAvatar(avatarImg);
    socket = io(ENDPOINT);
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])

  useEffect(() => {
    if(canvas && background) {
      const xInitial = 50;
      const yInitial = 350;
      const ctx = canvas.current.getContext('2d');
      ctx.drawImage(background, 0, 0, 1000, 500);
      users.map((user, index) => {
        return drawAvatar(ctx, avatar, xInitial + (index * 150), yInitial, user.name);
      })
      if(message) {
        drawText(ctx, message, xInitial - 50, yInitial - 75)
      }
    }
  }, [canvas, background, message])

  return (
    <Container>
      <Row>
        <Col xl={10}>
          <div className="chat_container mt-3 border border-secondary">
            <div className="bg-primary p-4">
              <h3 className="text-white">Ludic Room</h3>
            </div>
            <div className="chat-content">
              <canvas
                ref={canvas} 
                width={918}
                height={510}
              />
            </div>
            <div>
              <form
                onClick={sendChat} 
                className="p-3 d-flex justify-content-between bg-secondary"
              >
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  name="text"
                  className="mr-1 rounded form-control"
                  maxLength="50"  
                  type="text" />
                <input
                  className="btn btn-primary" 
                  value="Enviar" 
                  type="submit" />
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
 
export default LudicRoom;