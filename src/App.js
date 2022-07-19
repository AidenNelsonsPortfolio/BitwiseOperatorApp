import './App.css';
import React, {useState, useEffect} from 'react';
import Bitgen from './bitgen/bitgen.jsx';
import Bitgen2 from './bitgen/bitgen2.jsx';

function App() {

  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)

  const [bothInput, setBothInput] = useState(false)
  const [rightInput, setRightInput] = useState(false)
  const[leftInput, setLeftInput] = useState(false)


  function getData(val){
    if(JSON.parse(window.localStorage.getItem('value1')) >=0)
      setLeftInput(true)

    if(leftInput && rightInput)
      setBothInput(true)

    setData(val.target.value)
  }

  function getData2(val){

    if(JSON.parse(window.localStorage.getItem('value2')) >= 0)
      setRightInput(true)

    if(rightInput && leftInput)
      setBothInput(true)

    setData2(val.target.value)

  }

  useEffect(() => {

    document.title = `Bitwise Operator Demo`;

  });

  return (
    <div className="App">
      
      <h1><b>Bitwise Operations Visualizer!</b></h1>

      <br></br>

      <h2>-First Number-</h2>

      

      <Bitgen></Bitgen>

      <input type = 'text' className = "text-box" id = 'mainNum' onChange = {getData} size = '10' maxLength = '3' defaultValue = {JSON.parse(window.localStorage.getItem("value1"))}/>

      <br></br>

      <h6>{(isNaN(data) || parseInt(data) > 255 || parseInt(data) < 0 ||isNaN(data2) || parseInt(data2) > 255 || parseInt(data2) < 0)? "Must Enter A Positive, Whole Number Less Than 256" : ""} </h6>
      
      <br></br>

      <h2> -Second Number-</h2>
      <Bitgen2></Bitgen2>

      <input type = 'text' className = "text-box" id = 'secNum' onChange = {getData2} size = '10' maxLength = '3' defaultValue = {JSON.parse(window.localStorage.getItem("value2"))}/>

      <br></br>
      {
        bothInput?
        <button>See Results</button>
      :null
      }
      <br></br>
      

    </div>
  );

}

export default App;
