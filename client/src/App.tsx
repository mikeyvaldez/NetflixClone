import { useState } from "react";
import "./App.css";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;
