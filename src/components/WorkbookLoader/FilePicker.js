import { useDispatch } from 'react-redux';
import XLSX from 'xlsx';
import { useState } from 'react';
import { setWorkbookAction, setConfigAction } from '../../redux/actions';
import { setLoading } from './../../redux/actions';

export const FilePicker = () => {
  const defaultCodepageValue = 1251;
  const [codepageValue, setCodepageValue] = useState(defaultCodepageValue);

  const dispatch = useDispatch();

  const fileHandler = async (event) => {
    const file = event.target.files[0];
    let fr = new FileReader();
    dispatch(setLoading(true));
    fr.onload = async () => {
      const src = fr.result;
      const data = new Uint8Array(src);
      const workbook = XLSX.read(data, { type: 'array', codepage: codepageValue || defaultCodepageValue });
      dispatch(setWorkbookAction(workbook));
      dispatch(setConfigAction({ activeSheet: 0 }));
      dispatch(setLoading(false));
    }
    fr.readAsArrayBuffer(file);
  }

  return (
    <div className="row">
      <div className="col s12"><h4>1. Choose .xlsx file</h4>
        <form className="col s12 m9">
          <div className="file-field input-field">
            <div className="btn">
              <span><i className="material-icons left">folder</i>File</span>
              <input type="file" accept=".xlsx" onChange={fileHandler} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>
        <div className="col s12 m3">
          <input
            // placeholder="Codepage"
            id="codepage"
            type="text"
            value={codepageValue}
            onChange={(e) => setCodepageValue(e.target.value)}
          />
          {<label htmlFor="url">Codepage</label>}
        </div>
      </div>
    </div>
  )
}