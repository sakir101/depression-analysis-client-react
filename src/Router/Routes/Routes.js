import { createBrowserRouter } from "react-router-dom";
import Home from "../../Home/Home/Home";
import Prediction from "../../Pages/Prediction/Prediction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/prediction",
    element: <Prediction></Prediction>,
  },
]);

export default router;
