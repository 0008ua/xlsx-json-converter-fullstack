import { createContext } from 'react';

function noop() {}

export const state = {
  messages: [],
  showMessage: noop,
};

export const MessageContext = createContext(state);
