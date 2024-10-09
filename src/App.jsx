import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import UploadManuscript from "./pages/UploadManuscript";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadManuscript />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
