import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { setMessageAction } from './../redux/actions';

export const useMessage = () => {
  const [messages, setMessage] = useState([]);
  const dispatch = useDispatch();

  const showMessage = useCallback(({text, style = 'success'}) => {
    // use current date as marker for timout (clear current message)
    const date = Date.now();
    setMessage((prevState) => [...prevState, { text, style, date}]);
    // clear every message from local state
    setTimeout(() => setMessage((prevState) => prevState.filter(item => item.date !== date)), 2000);
    // clear message in store
    dispatch(setMessageAction(null));
  }, [dispatch])

  return { messages, showMessage };
};
