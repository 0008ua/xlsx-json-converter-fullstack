export const SET_WORKBOOK = 'data/setWorkbook';
export const SET_SHEET = 'data/setSheet';
export const SET_CONFIG = 'data/setConfig';

export const UPLOAD_JSON = 'server/uploadJSON';
export const UPLOAD_JSON_SUCCESS = 'server/uploadJSON success';

export const SET_ERROR = 'app/set error';
export const CLEAR_ERROR = 'app/clear error';
export const SET_LOADING = 'app/loading';
export const SET_MESSAGE = 'app/message';

export const setWorkbookAction = (workbook) => {
  return {
    type: SET_WORKBOOK,
    payload: workbook,
  }
}

export const setSheetAction = (sheet) => {
  return {
    type: SET_SHEET,
    payload: sheet,
  }
}

export const setConfigAction = (sheet) => {
  return {
    type: SET_CONFIG,
    payload: sheet,
  }
}

export const uploadJSON = (sheet) => {
  return {
    type: UPLOAD_JSON,
    payload: sheet,
  }
}

export const uploadJSONSuccess = (response) => {
  return {
    type: UPLOAD_JSON_SUCCESS,
    payload: response,
  }
}

export const setErrorAction = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
    error: true
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
    error: false
  }
}

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  }
}

export const setMessageAction = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  }
}