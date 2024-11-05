import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomeBanner from "./components/HomeBanner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar />
      <HomeBanner />
    </div>
  );
}

export default App;
