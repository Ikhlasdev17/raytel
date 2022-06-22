import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
        <div className="top__header">
        <Header />
        <Categories />
        </div>
      <Main />
    </div>
  );
}

export default App;
