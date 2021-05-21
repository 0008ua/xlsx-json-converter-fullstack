import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfigAction } from '../../redux/actions';
import { useCallback } from 'react';

export const SourceSheet = () => {
  const [headingRow, setHeadingRow] = useState(0);
  const alphabet = useMemo(() => Array(24).fill().map((_, idx) => String.fromCharCode(65 + idx)), [])
  const dispatch = useDispatch();
  const configSelector = useSelector((state) => state.data.config);
  const workbookSelector = useSelector((state) => state.data.workbook);

  const previewSheet = configSelector.previewSheet;

  const selectRowHandler = (index) => {
    if (!configSelector.selectableSheet) {
      return;
    }
    setHeadingRow(index);
  }

  const selectHandler = useCallback((e) => {
    dispatch(setConfigAction({ activeSheet: e.target.value }))
  }, [dispatch]);

  useEffect(() => {
    const range = { ...configSelector.initialRange, s: { ...configSelector.initialRange.s, r: headingRow } }
    dispatch(setConfigAction({ range }))
    if (!configSelector.selectableSheet) {
      setHeadingRow(0);
    }
    const elem = document.getElementById('sheetSelector');
    window.M.FormSelect.init(elem, []);
  }, [headingRow, dispatch, configSelector.initialRange, configSelector.selectableSheet])

  return (
    <>
      <div className="row">
        <div className="col s12">
          <h4>2. Select row with headings</h4>
        </div>
        <div className="col s12">
          {workbookSelector && <div className="row align-block">
            <div className="col s3 m2 align-block__wrapper align-block__wrapper_justified-center">
              <h6>Worksheet</h6>
            </div>
            <div className="input-field col s9 m10">
              <select
                id="sheetSelector"
                aria-label="Sheet selector"
                onChange={selectHandler}
                value={configSelector.activeSheet}
              >
                {workbookSelector.SheetNames.map((sheetName, idx) =>
                  <option value={idx} key={idx}>{sheetName}</option>)}
              </select>
            </div>
          </div>}

          <table>
            <thead>
              <tr>
                <th scope="col" className="grey lighten-2"></th>
                {alphabet
                  .slice(0, configSelector.initialRange.e.c + 1)
                  .map((el, idx) => {
                    return <th scope="col" key={idx} className="grey lighten-2">{el}</th>
                  })}
              </tr>
            </thead>
            <tbody>
              {previewSheet.map((row, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                    onClick={() => selectRowHandler(rowIndex)}
                  >
                    <th scope="row"
                      className={((rowIndex) === headingRow ? 'lighten-1 ' : 'lighten-2 ') + 'grey'}
                    >{rowIndex + 1}
                    </th>
                    {row.map((col, colIndex) => {
                      return (
                        <td className={(headingRow === rowIndex ? 'teal lighten-5' : '') + ' text-center'} key={colIndex}>{col} </td>
                      );
                    })}
                  </tr>
                );
              })}
              {configSelector.shrinkPreviewSheet && <tr>
                <th
                  scope="row"
                  className="grey lighten-2"
                >{previewSheet.length + 1}</th>
                {Array(configSelector.initialRange.e.c + 1).fill('').map((col, colIndex) => {
                  return (
                    <td className="" key={colIndex}>...</td>
                  );
                })}
              </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
