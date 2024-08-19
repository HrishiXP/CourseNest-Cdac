import './App.css';
import Header from './components/Header';

import NavBar from './components/NavBar';

import AdminLogin from './components/AdminLogin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import About from './components/About';

import AdminProfile from './components/AdminProfile';


import MyOrders from './components/MyOrders';
import Orders from './components/Orders';
import ViewCart from './components/ViewCart';
import AllCourse from './components/AllCourses';
import RegInstructor from './components/RegInstructor';
import InstructorLogin from './components/InstructorLogin';
import StudentLogin from './components/StudentLogin';
import InstructorProfile from './components/InstructorProfile';
import StudentProfile from './components/StudentProfile';
import EditCourse from './components/EditCourse';
import MyCourses from './components/MyCourses';
import AddCourse from './components/AddCourse';
import RegStudent from './components/RegStudent';
import AllStudents from './components/AllStudents';
import AllInstructors from './components/AllInstructors';


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-2">
        </div>
        <Switch>
          <Route component={AllCourse} path="/" exact />
          <Route component={AllCourse} path="/cat/:coursecat/:subcat" />
          <Route component={RegInstructor} path="/reginstructors" />
          <Route component={RegStudent} path="/register" />
          <Route component={AdminLogin} path="/alogin" />
          <Route component={InstructorLogin} path="/ilogin" />
          <Route component={StudentLogin} path="/slogin" />
          <Route component={InstructorProfile} path="/iprofile" />
          <Route component={StudentProfile} path="/sprofile" />
          <Route component={AddCourse} path="/add-course" />
          <Route component={EditCourse} path="/edit/:courseid" />
          <Route component={MyCourses} path="/mycourses" />
          <Route component={About} path="/about" />





                
          <Route component={AdminProfile} path="/aprofile" />          
        
          <Route component={AllStudents} path="/students" />          
          <Route component={AllInstructors} path="/instructors" />                  
      
          <Route component={MyOrders} path="/myorders" />          
          <Route component={Orders} path="/orders" />          
          <Route component={ViewCart} path="/cart" />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
