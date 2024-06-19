
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Movie from './components/movie/movie.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Header from './components/header/header.tsx'
import Favorites from './components/favorites/favorites.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Header/>,
    children: [
      {
        path: "catalog",
        element: <App />,
      },
      {
        path:'movie/:id',
        element:<Movie/>
      }, 
      {
        path:'favorites',
        element:<Favorites/>
      }, 
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
  
)
