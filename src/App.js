import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes/Routes";

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
