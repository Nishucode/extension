import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  chatActive: false,
};

const activateChat = () => {
  return {
    type: 'ACTIVATE_CHAT',
  };
};

const deactivateChat = () => {
  return {
    type: 'DEACTIVATE_CHAT',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTIVATE_CHAT':
      return {
        ...state,
        chatActive: true,
      };
    case 'DEACTIVATE_CHAT':
      return {
        ...state,
        chatActive: false,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

export default store;
export { activateChat, deactivateChat };
