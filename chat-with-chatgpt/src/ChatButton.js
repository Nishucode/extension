import React, { useState } from 'react';
import { connect } from 'react-redux';
import { activateChat, deactivateChat } from './store';

const mapStateToProps = (state) => {
  return {
    chatActive: state.chatActive,
  };
};

const ChatButton = ({ chatActive, activateChat, deactivateChat }) => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    if (chatActive) {
      deactivateChat();
    } else {
      activateChat();
    }
  };

  const handleMessageSend = () => {
    // Make a request to http://jsonplaceholder.typicode.com/posts with user's message in the body
    fetch('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (echoed message)
        console.log('Echoed message:', data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={handleClick} className="chat-button">
        {chatActive ? 'Deactivate ChatGPT' : 'Activate ChatGPT'}
      </button>
      {chatActive && (
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send Message</button>
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
