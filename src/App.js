import { Link, Outlet, Route, Routes } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header"; 
function App() {
  return (
    <div className="App">
        <div className="top__header">
        <Header />
        <Categories />
        </div>
      <div className="main">
        <div className="container">
        
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
