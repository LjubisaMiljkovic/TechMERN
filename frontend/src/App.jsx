import { Route, Routes } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import { routesConfig } from './config/routesConfig.js';
import ContactPage from './pages/Contact/ContactPage';
import AuthorizationPage from './pages/Authorization/AuthorizationPage';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navigations from './components/Navigation/Navigations.jsx';
import './config/axiosConfig.js';
import Loader from './components/Loader/Loader.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <Loader />
      <Navigations />
      <Routes>
        <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
        <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
        <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage />} />
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
