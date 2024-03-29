import "./App.css";
import { useState } from "react";
import Characters from "./components/Characters";
import Header from "./components/Header";

function App() {
  const [filter, setFilter] = useState();
  return (
    <div className="App">
      <Header setFilter={setFilter} />
      <Characters filter={filter} />
    </div>
  );
}

export default App;
