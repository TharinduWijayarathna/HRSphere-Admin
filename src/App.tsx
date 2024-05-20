import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import Dashboard from './pages/home/Dashboard';
import TenantIndex from './pages/tenant/Index';
import withAuth from './utils/auth';
import UserIndex from './pages/users/Index';

const TenantIndexWithAuth = withAuth(TenantIndex);
const UserIndexWithAuth = withAuth(UserIndex);
const DashboardWithAuth = withAuth(Dashboard);

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardWithAuth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tenants' element={<TenantIndexWithAuth />} />
          <Route path='/users' element={<UserIndexWithAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
