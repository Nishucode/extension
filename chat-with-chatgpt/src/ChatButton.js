import React, { useState } from 'react';
import { connect } from 'react-redux';
import { activateChat, deactivateChat } from './store';
import fetch from 'node-fetch';

const mapStateToProps = (state) => {
  return {
    chatActive: state.chatActive,
  };
};

const ChatButton = ({ chatActive, activateChat, deactivateChat }) => {
  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleClick = () => {
    if (chatActive) {
      deactivateChat();
    } else {
      activateChat();
    }
  };

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setResponseMessage(data.message);
  };

  return (
    <div>
      <button onClick={handleClick} className="chat-button">
        {chatActive ? 'Deactivate ChatGPT' : 'Activate ChatGPT'}
      </button>
      {chatActive && (
        <div>
          <input type="text" value={userMessage} onChange={handleInputChange} />
          <button onClick={handleSendMessage}>Send Message</button>
          {responseMessage && <p>Response: {responseMessage}</p>}
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateChat: () => {
      dispatch(activateChat());
    },
    deactivateChat: () => {
      dispatch(deactivateChat());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatButton);
