import { useMessage } from './hooks/message.hook';
import { MessageContext } from './context/MessageContext';
import { Message } from './components/Message';
import { WorkbookLoader } from './components/WorkbookLoader/WorkbookLoader';
import { Loading } from './components/Loading';

function App() {
  const { showMessage, messages } = useMessage();

  return (
    <MessageContext.Provider value={{ messages, showMessage }}>
      <Message />
      <Loading />
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper teal darken-1">
            <span className="brand-logo center">Spreadsheet Converter</span>
          </div>
        </nav>
      </div>
      <div className="container">
        <h3 className="teal-text text-darken-3 center-align">Convert xlsx files to JSON format</h3>
        <WorkbookLoader />
      </div>
    </MessageContext.Provider>
  );
}

export default App;
