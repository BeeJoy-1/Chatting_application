import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Authorization/Login"
import Registration from "./Pages/Authorization/Registration"
import Error from "./Pages/Error/Error";
import RouteLayouts from "./Components/Layouts/RouteLayouts";
import Home from './Pages/Home/Home'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RouteLayouts/>}>
          <Route path="/Home" element={<Home/>}/>
        </Route>
        <Route path="/" element={<Login/>} />
        <Route path="*" element={<Error/>} />
        <Route path="/Registration" element={<Registration/>} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider
        router={router}
      />
    </>
  )
}

export default App
