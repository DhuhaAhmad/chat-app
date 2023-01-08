// import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import "./App.css";
import "./style.scss"
function App() {
  return (
    <>   
    <BrowserRouter>
<Routes>
  <Route path="/">
    <Route index element={<Home/>}/>
    <Route path="signup" element={<SignUp/>}/>
    <Route path="login" element={<LogIn/>}/>

  </Route>
</Routes>
    </BrowserRouter>
    {/* <div className="App"> */}
      <SignUp />
      {/* <LogIn/> */}
      {/* <Home/> */}
    
    {/* </div> */}
    </>
 
  );
}

export default App;
