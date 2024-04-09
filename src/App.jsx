import {useDispatch, useSelector} from "react-redux";
import { insertAPI, updateReady } from "./Store/Slicer";
import axios from "axios";
import { useEffect } from "react";
import React from "react";
import Nav from "./Nav";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://65ed55ba0ddee626c9b1786b.mockapi.io/lamp")
    .then((res)=>{
      dispatch(insertAPI(res.data)) 
      dispatch(updateReady(true))
    })
  }, [])

  return (
    <>
      <div>
        <Nav />
      </div>
    </>
  )
}

export default App
