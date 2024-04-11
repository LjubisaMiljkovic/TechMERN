import { Route, Routes, useLocation } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import { routesConfig } from './config/routesConfig.js';
import ContactPage from './pages/Contact/ContactPage';
import AuthorizationPage from './pages/Authorization/AuthorizationPage';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './config/axiosConfig.js';
import Loader from './components/Loader/Loader.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { localStorageConfig } from './config/localStorageConfig.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/user/userSlice.js';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import AdminProtect from './adminComponents/AminProtect/AdminProtect.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import { showDashboard } from './store/dashboard/dashboardSlice.js';
import AddProduct from './adminComponents/AddProduct/AddProduct.jsx';
import Statistics from './adminComponents/Statistics/Statistics.jsx';
import Users from './adminComponents/Users/Users.jsx';
import Comments from './adminComponents/Comments/Comments.jsx';
import SingleProduct from './pages/SingleProduct/SingleProduct.jsx';
import OrderPage from './pages/Order/OrderPage.jsx';



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isDashboard } = useSelector((state) => state.dashboardStore)

  //Postavljamo usera u Redux ukoliko je logovan a korisnik je reloadovao aplikaciju
  useEffect(() => {
    const userString = localStorage.getItem(localStorageConfig.USER);
    if (userString) dispatch(setUser(JSON.parse(userString)));
  }, [dispatch]);

  // * Togglujemo Navigaciju u odnosu na to da li smo na Dashboardu
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) dispatch(showDashboard(true));
    else dispatch(showDashboard(false));
  }, [location, dispatch]);

  return (
    <>
      <Loader />
      {!isDashboard && <Navigation />}
      <Routes>
        <Route path={routesConfig.SHOP.url} element={<ShopPage />} />
        <Route path={routesConfig.CONTACT.url} element={<ContactPage />} />
        <Route path={routesConfig.AUTHORIZATION.url} element={<AuthorizationPage />} />
        <Route path={routesConfig.SINGLE_PRODUCT.url} element={<SingleProduct/>}/>
        <Route path={routesConfig.ORDER.url} element={<OrderPage/>}/>
        <Route
          path={routesConfig.DASHBOARD.url}
          element={
            <AdminProtect>
              <DashboardPage />
            </AdminProtect>
          }
        >
          <Route index element={<Statistics />} />
          <Route path={routesConfig.DASHBOARD_ADD_PRODUCT.url} element={<AddProduct/>}/>
          <Route path={routesConfig.DASHBOARD_USERS.url} element={<Users/>}/>
          <Route path={routesConfig.DASHBOARD_COMMENTS.url} element={<Comments/>}/>

        </Route>
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
