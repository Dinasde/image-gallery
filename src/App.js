import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import {Link,Routes,Route} from 'react-router-dom';
import { Starred } from './Components/Starred';
import { Gallery } from './Components/Gallery';


function App() {

  const[originalData,setOriginalData] = useState([])

  const apiKey = 'bEurTuXCv0RO3OGv_O0higY3zM3RFMhwX2d-nQMCZis';


const[backgroundImage,setBackgroundImage] = useState('')



useEffect(()=>{

fetchRandomData()
},[])


const fetchRandomData = async()=>{
try{
  const result = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${apiKey}`)

  
  setBackgroundImage(result?.data?.urls?.small)

}catch(err){

  setBackgroundImage('')
  console.log(err.message)
}
   
 

}






const dataHandler =(produtcs)=>{
setOriginalData(produtcs)
}



  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%', // Make the width 100% to occupy the entire width of the viewport
      height: '100vh'

    }} className="App">

      <Routes>
        <Route path='/' element={<Gallery datas={dataHandler} />}></Route>
        <Route path='/star' element={<Starred items={originalData}/>}></Route>
</Routes>

    </div>
  );
}

export default App;
