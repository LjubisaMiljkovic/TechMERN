import { Route, Routes } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import { routesConfig } from './config/routesConfig.js';
import ContactPage from './pages/Contact/ContactPage';
import AuthorizationPage from './pages/Aurorization/AutorizationPage';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navigations from './components/Navigation/Navigations.jsx';



function App() {

  return (
    <>
      <Navigations />
      <Routes>
        <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
        <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
        <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage />} />
      </Routes>

    </>
  )
}

export default App
