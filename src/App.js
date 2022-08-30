import logo from './logo.svg';
import './App.css';
import useScript from './hooks/useScript';

function App() {
  useScript('AcuantJavascriptWebSdk.min.js');
  useScript('AcuantCamera.js');
  useScript('AcuantPassiveLiveness.min.js');
  useScript('opencv.min.js');
  setTimeout(()=>{
    if(window.loadAcuantSdk) window.loadAcuantSdk()

    console.log(window.AcuantJavascriptWebSdk ,"window.AcuantJavascriptWebSdk")

  },200)


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
