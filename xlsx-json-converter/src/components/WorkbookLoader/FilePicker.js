import { useDispatch } from 'react-redux';
import XLSX from 'xlsx';

import { setWorkbookAction, setConfigAction } from '../../redux/actions';
import { setLoading } from './../../redux/actions';

export const FilePicker = () => {
  const dispatch = useDispatch();

  const fileHandler = async (event) => {
    const file = event.target.files[0];
    let fr = new FileReader();
    dispatch(setLoading(true));
    fr.onload = async () => {
      const src = fr.result;
      const data = new Uint8Array(src);
      const workbook = XLSX.read(data, { type: 'array' });
      dispatch(setWorkbookAction(workbook));
      dispatch(setConfigAction({ activeSheet: 0 }));
      dispatch(setLoading(false));
    }
    fr.readAsArrayBuffer(file);
  }

  return (
    <div className="row">
      <div className="col s12"><h4>1. Choose .xlsx file</h4>
        <form className="col s12">
          <div className="file-field input-field">
            <div className="btn">
              <span><i className="material-icons left">folder</i>File</span>
              <input type="file" onChange={fileHandler} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}