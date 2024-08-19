import logo from './logo.svg';
import './App.css';
import {Navigation} from "./component/NavigationBar"
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Course } from './pages/Courses';
import CartComp from './component/CartComp';
import loginForm from './component/loginForm';


function App() {

  

  return (
   <div className="App">
    <Navigation/>
   <Routes>
    <Route  path="/login" element={<loginForm/>}/>
    <Route  path="/home" element={<Home/>}/>
    <Route  path="/course" element={<Course/>}/>
    <Route  path="/cart" element={<CartComp/>}/>

    
   </Routes>
   </div>


  );
}

export default App;
