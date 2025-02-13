import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { MyBonds } from "./pages/MyBonds";
import { CreateBonds } from "./pages/CreateBonds";
import { BuyBonds } from "./pages/BuyBonds";
import {Toaster} from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';


{/* funcion principal para desplegar la aplicacion*/}
function App() {
  
  return (
    <BrowserRouter>
      <div className="container mx-auto">
 
        {/*rutas de la api*/}
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/my" element={<MyBonds />} />
          <Route path="/create" element={<CreateBonds />} />
          <Route path="/buy" element={<BuyBonds />} />
        </Routes>
        <Toaster/>
        </div>
    </BrowserRouter>
  );
}

export default App;
