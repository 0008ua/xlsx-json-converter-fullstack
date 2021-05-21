import { combineEpics, ofType } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, from, merge } from 'rxjs';
import { UPLOAD_JSON, uploadJSONSuccess, setErrorAction, setLoading, setMessageAction } from './actions';
import { request } from '../modules/request.module';

const req = (action$) => action$.pipe(
  ofType(UPLOAD_JSON),
  map((action) => action.payload),
  switchMap((payload) => merge(
    from(request(payload)).pipe(
      switchMap((data) => [uploadJSONSuccess(data), setLoading(false), setMessageAction({ text: 'Uploaded successfully!', style: 'success'})]),
      catchError((err) => [setErrorAction(err), setLoading(false)])
    ),
    of(setLoading(true))
  )),
  catchError((err) => [setErrorAction(err), setLoading(false)])
);

export const rootEpic = combineEpics(
  req,
);

