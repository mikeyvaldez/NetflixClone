// This is where we configure all of our routing logic

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux"
import { store } from "./app/store.ts"; 
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PlansPage from "./pages/PlansPage.tsx";
import BrowsePage from "./pages/BrowsePage.tsx";
import WatchPage from "./pages/WatchPage.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";
import PlansManagePage from "./pages/PlansManage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plans" element={<PrivateRoutes />}>
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/plans/manage" element={<PlansManagePage />} />
      </Route>
      <Route path="/browse" element={<PrivateRoutes />}>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // providing the provider and adding the store gives us access to the global state
  // meaning we can grab any data we want that is configured within our store,
  // from any component we choose.
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
