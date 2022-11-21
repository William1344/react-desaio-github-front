import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Main } from './pages';

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: '/login',
        element: <Login/>,
        loader: () => import('./pages/Login/Login'),
      },{
        path: '/',
        element: <Main/>,
        loader: () => import('./pages/Main/Main'),
      }
    ])}/>
  );
}

export default App;
