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
import Message from './Pages/Message/Message'
import Notification from './Pages/Notification/Notification'
import Settings from './Pages/Settings/Settings'
import UserLoggedIn from "./PrivateRoutes/UserLoggedIn";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<UserLoggedIn/>}>
          <Route element={<RouteLayouts/>}>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Message" element={<Message/>}/>
            <Route path="/Notification" element={<Notification/>}/>
            <Route path="/Settings" element={<Settings/>}/>
          </Route>
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
