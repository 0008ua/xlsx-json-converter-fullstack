import { useContext, useEffect } from 'react';
import { MessageContext } from '../context/MessageContext';
import { useError } from './../hooks/error.hook';
import { useSelector, useDispatch } from 'react-redux';

export const Message = () => {
  const { messages, showMessage } = useContext(MessageContext);
  const { setError } = useError();
  const dispatch = useDispatch();

  const errorSelector = useSelector((state) => state.app.error);
  const messageSelector = useSelector((state) => state.app.message);

  // listening on error action
  useEffect(() => {
    if (errorSelector) {
      setError(errorSelector);
    }
  }, [errorSelector, setError]);

  // listening on message action
  useEffect(() => {
    if (messageSelector) {
      showMessage(messageSelector);
    }
  }, [messageSelector, showMessage, dispatch]);

  return (
    <div className="message">
      {messages.length > 0 && messages.map((item, idx) => {
        return (
          <div key={idx} className={`message__wrapper message__wrapper_${item.style}`}>
            <div className="message__text">{item.text}</div>
          </div>
        )
      })}
    </div>
  )
}