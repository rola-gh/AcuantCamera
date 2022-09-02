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

    AcuantJavascriptWebSdk.initialize(
       "QWRtaW5fUFZfREVNT0Bwb2Myb3BzLmNvbTp3MTNrXl5LUzZETXB0cFg=", //Acuant credentials in base64 (basic auth format id:pass)
       "https://preview.acas.acuant.net", //endpoint for Acuant's ACAS server
       callback, //callback shown below
      0 //set to 1 if hosting via cdn, defaults to 0
  );








  },200)
  let workerCallback = () => {console.log("workerCallback")} //no params, void function, called when workers are ready.

  let callback = {
    onSuccess:function() {
      AcuantJavascriptWebSdk.startWorkers(
          workerCallback, //callback shown below
      );
      console.log("success")
      //proceed with using the sdk
    },
    onFail:function(code, description) {
      //handle the error
      console.log("error",code, description)

    }
  }

  const capture =()=>{
    // AcuantCamera.start(
    //     (response) => {console.log(response ,"res")}, //detect callback (see onFrameAvalible in part 3 of AcauntCameraUI for response body)
    //     (error, code) => {console.log(error,code,"camera")} //error callback (see part 4 of AcuantCameraUI)
    // )
    //
    // acuantCamera.addEventListener('acuantcameracreated', ()=>{
    //   console.log("start camera")
    // })

    alert(AcuantCamera.isCameraSupported)
    if(AcuantCamera.isCameraSupported){
    AcuantCameraUI.start(
        cameraCallback, //shown above
        (error, code) => {console.log(error ,"err")}, //error will be more specific, while the code broader. See current list of codes below. Please handle different or null codes, though they are not expected to occur.
        options //shown above
    )}
    else{
      startManualCapture()
    }
  }

  const startManualCapture=()=> {
    AcuantCamera.startManualCapture(cameraCallback);
  }

  let options = {
    text:{
      NONE: "ALIGN",
      SMALL_DOCUMENT: "MOVE CLOSER",
      BIG_DOCUMENT: "TOO CLOSE",
      GOOD_DOCUMENT: null,//if let null will show a countdown
      CAPTURING: "CAPTURING",
      TAP_TO_CAPTURE: "TAP TO CAPTURE"
    }
  };
  var cameraCallback = {
    onCaptured: function(response) {
      //document captured
      //this is not the final result of processed image
      //show a loading screen until onCropped is called
    },
    onCropped: function(response) {
      if (response) {
        //use response
      } else {
        //cropping error
        //restart capture
      }
    },
    onFrameAvailable: function(response) {
      console.log(response ,"res")
      //this is optional
      //Use only if you plan to display custom UI elements in addition to what is already displayed by the camera.
      // response = {
      //   type: Number,
      //   dimensions: Object,
      //   dpi: Number,
      //   isCorrectAspectRatio: Boolean,
      //   points: Array,
      //   state: Number => {
      //     NO_DOCUMENT: 0,
      //         SMALL_DOCUMENT: 1,
      //         BIG_DOCUMENT: 2,
      //         GOOD_DOCUMENT: 3
      //   }
      // }
    }
  }
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
        <button onClick={capture}>capture</button>
        {/*<div id="acuant-camera"></div>*/}


      </header>
    </div>
  );
}

export default App;
