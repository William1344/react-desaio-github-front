import React from 'react';
import { AuthProvider, AuthContext } from './contexts/auth';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Login, Main } from './pages';

function App() {
  const PrivateRoute = ({children}) => {
    const context = React.useContext(AuthContext);
    if(context.load) return <div className='loading'>Carregando...</div>;
    if(!context.authenticated) return <Navigate to="/login" />;
    return children; 
  };
  return (
    <AuthProvider>
      <RouterProvider router={createBrowserRouter([
        {
          path: '/login',
          element: <Login/>,
          loader: () => import('./pages/Login/Login'),
        },{
          path: '/',
          element: <PrivateRoute><Main/></PrivateRoute>,
          loader: () => import('./pages/Main/Main'),
        }
      ])}/>
    </AuthProvider>
  );
}

export default App;
