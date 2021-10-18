import { combineReducers } from "redux";
import {
  SET_WORKBOOK, SET_SHEET, SET_CONFIG,
  UPLOAD_JSON_SUCCESS,
  SET_ERROR, CLEAR_ERROR, SET_LOADING, SET_MESSAGE
} from "./actions";

const initialState = {
  data: {
    workbook: null,
    sheet: null,
    config: {
      initialRange: null,
      previewSheet: null,
      activeSheet: 0,
      shrinkPreviewSheet: false,
      range: null,
      selectableSheet: true,
      headerA: false,
      filetype: 'json',
    },
  },
  server: {
    response: null,
    // error: null,
  },
  app: {
    error: null,
    loading: false,
    message: null,
  }
}

const dataReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case SET_WORKBOOK:
      return {
        ...state,
        workbook: action.payload
      }
    case SET_SHEET:
      return {
        ...state,
        sheet: action.payload
      }
    case SET_CONFIG:
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      }
    default: return state;
  }
}

const serverReducer = (state = initialState.server, action) => {
  switch (action.type) {
    case UPLOAD_JSON_SUCCESS:
      return {
        ...state,
        response: action.payload
      }
    default: return state;
  }
}

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default: return state;
  }
}

export const rootReducer = combineReducers({
  data: dataReducer,
  server: serverReducer,
  app: appReducer,
});


