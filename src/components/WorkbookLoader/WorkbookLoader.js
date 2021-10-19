import { FilePicker } from './FilePicker';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import XLSX from 'xlsx';
import { setConfigAction, setSheetAction } from '../../redux/actions';
import { SourceSheet } from './SourceSheet';
import { uploadJSON } from '../../redux/actions';
import { setLoading, setMessageAction } from './../../redux/actions';

export const WorkbookLoader = () => {
  const [urlValue, setUrlValue] = useState('');

  const dispatch = useDispatch();
  const configSelector = useSelector((state) => state.data.config);
  const workbookSelector = useSelector((state) => state.data.workbook);
  const sheetSelector = useSelector((state) => state.data.sheet);

  const generatePreview = useCallback((range) => {
    const rowsCount = range.e.r - range.s.r + 1;
    const rowsToDisplay = 5;
    let lastRow;
    if (rowsCount > rowsToDisplay) {
      dispatch(setConfigAction({ shrinkPreviewSheet: true }));
      lastRow = range.s.r + rowsToDisplay;
    } else {
      dispatch(setConfigAction({ shrinkPreviewSheet: false }));
      lastRow = range.e.r
    }
    range = {
      ...range,
      e: { ...range.e, r: lastRow }
    };
    const previewSheet = XLSX.utils.sheet_to_json(workbookSelector.Sheets[workbookSelector.SheetNames[configSelector.activeSheet]], {
      range,
      header: 1,
      defval: '',
      blankrows: false,
    });
    dispatch(setConfigAction({ previewSheet }));
  }, [dispatch, workbookSelector, configSelector.activeSheet]);

  const storeHandler = useCallback(async () => {
    dispatch(setSheetAction(null))
    if (workbookSelector) {
      let initialRange;
      const wb = workbookSelector.Sheets[workbookSelector.SheetNames[(configSelector.activeSheet)]];
      if (wb['!ref']) {
        // set start of workbook (!ref) to top row
        wb['!ref'] = XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: XLSX.utils.decode_range(wb['!ref']).e });

        initialRange = XLSX.utils.decode_range(wb['!ref']);
      } else {
        initialRange = { s: { c: 0, r: 0 }, e: { c: 3, r: 0 } };
      }
      console.log('initialRange', initialRange)
      dispatch(setConfigAction({ initialRange }));
      dispatch(setConfigAction({ selectableSheet: true }));
      generatePreview(initialRange);
    }
  }, [workbookSelector, dispatch, generatePreview, configSelector.activeSheet]);

  useEffect(() => {
    storeHandler();
  }, [storeHandler]);

  const generateJsonHandler = useCallback(() => {
    dispatch(setLoading(true));
    let opts = {
      blankrows: false,
    };
    switch (configSelector.filetype) {
      case 'json':
        opts.defval = '';
        if (configSelector.headerA) {
          opts.header = 'A';
        }
        break;

      case 'csv':
        break;

      default:
      // opts = {};

    }
    // const opts = {
    //   range: configSelector.range,
    //   defval: '',
    // }
    // if (configSelector.headerA) {
    //   opts.header = 'A';
    // }
    console.log('decode', configSelector.range);
    console.log('encode', XLSX.utils.encode_range(configSelector.range));
    const sht = workbookSelector.Sheets[workbookSelector.SheetNames[0]];
    sht['!ref'] = XLSX.utils.encode_range(configSelector.range);
    console.log('sht', sht);
    const sheet = XLSX.utils['sheet_to_' + configSelector.filetype](sht, opts);
    // const sheet = XLSX.utils['sheet_to_' + configSelector.filetype](workbookSelector.Sheets[workbookSelector.SheetNames[0]], opts);

    // const sheet = XLSX.utils.sheet_to_json(
    //   XLSX.utils.decode_range(workbookSelector.Sheets[workbookSelector.SheetNames[0]][, opts)
    //   );
    dispatch(setSheetAction(sheet));
    generatePreview(configSelector.range);
    dispatch(setConfigAction({ selectableSheet: false }));
    dispatch(setLoading(false));

  }, [dispatch, configSelector.range, configSelector.headerA, configSelector.filetype, workbookSelector, generatePreview])

  const uploadJSONHandler = () => {
    if (!urlValue) {
      dispatch(setMessageAction({ text: 'Please insert url', style: 'danger' }))
      return;
    }
    dispatch(uploadJSON({
      url: urlValue, //'https://localhost:8085/api/data/test',
      method: 'POST',
      body: sheetSelector,
      headers: {},
    }));
  }

  const downloadJSONHandler = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content, null, 2)], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const headingsRadioHandler = (event) => {
    dispatch(setConfigAction({ headerA: event.target.value === 'true' }));
  }

  const filetypeRadioHandler = (event) => {
    dispatch(setConfigAction({ filetype: event.target.value }));
  }

  return (
    <>
      <div className="row">
        <div className="col s12"><FilePicker /></div>
      </div>
      {configSelector.previewSheet && <>
        <div className="row">
          <div className="col s12"><SourceSheet /></div>
        </div>
      </>}
      {configSelector.previewSheet && <div className="row align-block align-block">
        <div className="col s6 l4 align-block__wrapper align-block__wrapper_justified-start">
          <div>
            <p>
              <label htmlFor="headingsRadio0">
                <input
                  id="headingsRadio0"
                  type="radio"
                  name="headingsRadio"
                  checked={!configSelector.headerA}
                  value={'false'}
                  onChange={headingsRadioHandler}
                  disabled={!configSelector.selectableSheet || configSelector.filetype === 'csv'}
                />
                <span>Headings as keys</span>
              </label>
            </p>
            <p>
              <label htmlFor="headingsRadio1">
                <input
                  id="headingsRadio1"
                  type="radio" name="headingsRadio"
                  checked={configSelector.headerA}
                  value={'true'}
                  onChange={headingsRadioHandler}
                  disabled={!configSelector.selectableSheet || configSelector.filetype === 'csv'}
                />
                <span>A B C.. as keys</span>
              </label>
            </p>
          </div>
        </div>
        <div className="col s6 l3 align-block__wrapper align-block__wrapper_justified-start">
          <div>
            <p>
              <label htmlFor="filetypeRadio0">
                <input
                  id="filetypeRadio0"
                  type="radio"
                  name="filetypeRadio"
                  checked={configSelector.filetype === 'json'}
                  value={'json'}
                  onChange={filetypeRadioHandler}
                  disabled={!configSelector.selectableSheet}
                />
                <span>JSON</span>
              </label>
            </p>
            <p>
              <label htmlFor="filetypeRadio1">
                <input
                  id="filetypeRadio1"
                  type="radio" name="filetypeRadio"
                  checked={configSelector.filetype === 'csv'}
                  value={'csv'}
                  onChange={filetypeRadioHandler}
                  disabled={!configSelector.selectableSheet}
                />
                <span>CSV</span>
              </label>
            </p>
          </div>
        </div>
        <div className="col s8 l3 align-block__wrapper align-block__wrapper_justified-center">
          <button
            className="btn"
            onClick={() => generateJsonHandler()}
            disabled={!configSelector.selectableSheet}
          ><i className="material-icons left">account_tree</i>Generate {configSelector.filetype}</button>
        </div>
        {/* <div className="col s8 m3 align-block__wrapper align-block__wrapper_justified-start">
          <button
            className="btn"
            onClick={() => generateJsonHandler()}
            disabled={!configSelector.selectableSheet}
          >Generate</button>
        </div> */}
        <div className="col s4 l2 align-block__wrapper align-block__wrapper_justified-center">
          <button
            className="btn-floating waves-effect waves-light teal lighten-2"
            onClick={() => storeHandler()}
            disabled={configSelector.selectableSheet}
          ><i className="material-icons left">restart_alt</i></button>
        </div>
      </div>}

      {configSelector.previewSheet && !configSelector.selectableSheet && <div className="row align-block">
        <div className="col s12">
          <h4>3. Save result as file or upload to url</h4>
        </div>
        <div className="col s7 m4 l3 align-block__wrapper align-block__wrapper_justified-start">
          <button
            className="btn light-blue full-width"
            onClick={() => downloadJSONHandler(sheetSelector, 'result.' + configSelector.filetype, 'text/plain')}
          ><i className="material-icons left">file_download</i>Download {configSelector.filetype}</button>
        </div>
        <div className="col s5 m8 hide-on-large-only"></div>
        <div className="col s7 m4 l3 align-block__wrapper align-block__wrapper_justified-start">
          <button
            className="btn light-blue full-width"
            onClick={() => uploadJSONHandler()}
          ><i className="material-icons left">file_upload</i>Upload to</button>
        </div>
        <div className="input-field col s5 m8 l6">
          <input
            id="url"
            type="text"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
          />
          {!urlValue && <label htmlFor="url">Server url</label>}
        </div>
        <div className="col l9 offset-l3 ">
          <p>
            It Makes POST request with header 'Content-Type': 'application/json' and generated JSON in body
          </p>
          <ul className="grey-text darken-2">
            <li><strong>Don't forget to add CORS rules on your server</strong></li>
            <li>'Access-Control-Allow-Origin': 'https://xlsx-json-converter.herokuapp.com'</li>
            <li>'Access-Control-Allow-Headers': 'Content-Type'</li>
            <li>'Access-Control-Allow-Methods': 'POST'</li>
          </ul>
        </div>
      </div>}
    </>
  );
}
