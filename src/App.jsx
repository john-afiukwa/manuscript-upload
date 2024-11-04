import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import UploadManuscript from "./pages/UploadManuscript";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { ToastContainer } from "react-toastify";
import Manuscript from "./pages/manuscript";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadManuscript />}></Route>
          <Route
            path="/upload-manuscript"
            element={<UploadManuscript />}
          ></Route>
          <Route path="/manuscripts" element={<Manuscript />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
