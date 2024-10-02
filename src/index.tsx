import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main';
import { BrowserRouter, Navigate } from 'react-router-dom'
import { StaticLayout } from './components/Layouts/StaticLayout';
import { Routes, Route } from 'react-router-dom'
import User from './context/UserContext';
import { Account } from './components/Confirmation/Account';
import setupAxiosInterceptors from './services/Interceptor';

setupAxiosInterceptors()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Se quito React.StrictMode para reenderizar solo una vez las funciones  */}
    <BrowserRouter>
      <Routes>
        <Route
          path='/*'
          element={
            <User>
              <StaticLayout>
                <Main />
              </StaticLayout>z
            </User>

          }
        />
        <Route path='/accountconfirm/:token' element={<Account />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
