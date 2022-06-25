//  const dotenv = require('dotenv');
import './App.css';
import CompanyHome from './component/CompanyHome';
import Login from './component/Login';
import Signup from './component/SignUp';
import CustomerHome from './component/CustomerHome';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import VerificationPage from './component/VerificationPage';
import AdminPortal from './component/admin/AdminPortal';
import CustomerList from './component/admin/CustomerList';
import CompanyList from './component/admin/CompanyList';
import SingleProduct from './component/admin/SingleProduct';
import { Routes, Route, Navigate } from 'react-router-dom';
//import { Admin } from '../../server/model/admin';

function App() {
  const user = localStorage.getItem('token');
  const res = JSON.parse(localStorage.getItem('token'));
  // const env = dotenv.config().parsed;
  return (
    <div className='App'>
      <Routes>
        {/*{user && <Route path="/" exact element={<Home />} />}*/}

        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/forgotpassword' exact element={<ForgotPassword />} />
        <Route path='/resetpassword' exact element={<ResetPassword />} />
        <Route path='/verificationpage' element={<VerificationPage />} />
        <Route path='/customerhome' exact element={<CustomerHome />} />
        <Route path='/companyhome' exact element={<CompanyHome />} />
        <Route path='/adminportal' exact element={<AdminPortal/>} />
        <Route path='/customerlist' exact element={<CustomerList/>}/>
        <Route path='/companylist' exact element={<CompanyList/>}/>
        <Route path='/single-product' exact element={<SingleProduct/>}/>
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
