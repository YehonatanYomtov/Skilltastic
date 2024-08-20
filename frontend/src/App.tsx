//* react-router
import { RouterProvider } from "react-router-dom";

//* router
import BrowserRouter from "./routes/AppRouter";

function App() {
  return <RouterProvider router={BrowserRouter()} />;
}

export default App;
