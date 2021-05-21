import { useState, useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { clearError, setMessageAction } from './../redux/actions';

export const useError = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const errorNormilizer = (err) => {
    const error = new Error();
    return Object.assign(error, { message: err.message, name: err.name })
  };

  // listening on error action is in Message component
  // it's in root Context folder
  const showError = useCallback(() => {
    if (error && error.message) {
      // show error alert
      dispatch(setMessageAction({ text: error.message, style: 'danger'}));
      // clear local state
      setError(null);
      // clear store
      dispatch(clearError());
    }
  }, [error, dispatch])

  useEffect(() => {
      showError();
  }, [showError])

  return { errorNormilizer, error, setError}
}



