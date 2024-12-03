import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from 'screens/HomeScreen';
import ProductScreen from 'screens/ProductScreen';
import { Provider } from 'react-redux';
import store from 'store';
import CartScreen from 'screens/CartScreen';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import ShippingScreen from 'screens/ShippingScreen';
import PrivateRoute from 'components/PrivateRoute';
import PaymentScreen from 'screens/PaymentScreen';
import { PlaceOrderScreen } from 'screens/PlaceOrderScreen';
import OrderScreen from 'screens/OrderScreen';
import ProfileScreen from 'screens/ProfileScreen';
import AdminRoute from 'screens/AdminRoute';
import OrderListScreen from 'screens/admin/OrderListScreen';
import ProductListScreen from 'screens/admin/ProductListScreen';
import ProductEditScreen from 'screens/admin/ProductEditScreen';
import UserListScreen from 'screens/admin/UserListScreen';
import UserEditScreen from 'screens/admin/UserEditScreen';
import ProductReviewScreen from 'screens/ProductReviewScreen';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route
          path="/admin/product/:id/review"
          element={<ProductReviewScreen />}
        />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));

// console.log(`ClientID:_`, process.env.PAYPAL_CLIENT_ID);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      {/* <App /> */}
      <Provider store={store}>
        <PayPalScriptProvider
          // deferLoading={true}
          options={{
            clientId:
              'AUedUJR_O8lf0FZu1XarB67m9PIBmG3VOLOIDaYFjyzb3yS6lW8YevT1hjYHRIE1_pgpgc9RDQ0vPM1J'
          }}
        >
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
