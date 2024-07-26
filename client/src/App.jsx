import  './index.scss'
import HomePage from './routes/HomePage/HomePage'
import ListPage from './routes/ListPage/ListPage'
import {Layout,AuthLayout} from './routes/layout/layout'
import Login from './routes/Login/Login'
import * as React from "react";
import {createBrowserRouter,RouterProvider,Route,Link} from "react-router-dom";
import SinglePage from './routes/SinglePage/SinglePage';
import Profile from './routes/Profile/Profile'
import Register from './routes/Register/Register'
import ProfileUpdatePage from './routes/ProfileUpdatePage/ProfileUpdatePage'
import AddNewPost from './routes/addNewPost/AddNewPost'
import { listPageLoader, singlePageLoader, userPosts } from './lib/loaders'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:'/',
          element:<HomePage/>
        },
        {
          path:'/list',
          element:<ListPage/>,
          loader:listPageLoader
        },
        {
          path:'/:id',
          element:<SinglePage/>,
          loader:singlePageLoader
        },
        {
          path:'/login',
          element:<Login/>
        },
       
        {
          path:'/register',
          element:<Register/>
        }
      ]
    },
    {
      path:"/",
      element:<AuthLayout/>,
      children:[
        {
          path:'/profile',
          element:<Profile/>,
          loader:userPosts
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage/>,
        },
        {
          path: "/new-post",
          element: <AddNewPost/>,
        },

      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}
export default App