import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useContext } from "react";
import Posts from './Posts.jsx'
import LogIn from './LogIn.jsx'
import SignUp from './SignUp.jsx'
import PostDetail from "./PostDetail.jsx";

import App from './App.jsx';


export default function Router() {


    const router = createBrowserRouter([
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: '/posts',
          element: <Posts />,
        },
        {
          path: '/log-in',
          element: <LogIn />,
        },
        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
            path: '/posts/:postid',
            element: <PostDetail />
        }
      ]);

      return <RouterProvider router={router} />
}