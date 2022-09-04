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
      alert(`${options.text?.TAP_TO_CAPTURE} = TAP_TO_CAPTURE`)
    AcuantCameraUI.start(
        cameraCallback, //shown above
        (error, code) => {
          console.log(error ,"err", code)
          alert(`${JSON.stringify(error)} + error + \ + ${JSON.stringify(code)} + code `)

        }, //error will be more specific, while the code broader. See current list of codes below. Please handle different or null codes, though they are not expected to occur.
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
      console.log(response,'onCaptured' )
      alert(`${JSON.stringify(response)} + onCaptured `)

    },
    onCropped: function(response) {
      if (response) {
        console.log(response,'onCropped' )
        alert(`${JSON.stringify(response)} + onCropped `)

        //use response
      } else {
        alert(`error response`)

        //cropping error
        //restart capture
      }
    },
    onFrameAvailable: function(response) {
      console.log(response ,"onFrameAvailable")
      alert(`${JSON.stringify(response)} + onFrameAvailable `)

    }
  }
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={capture}>capture</button>
        <div id="acuant-camera"></div>

      </header>
    </div>
  );
}

export default App;
