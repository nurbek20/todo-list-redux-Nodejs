import "./App.css";
import Main from "./pages/main";
import Header from "./components/header/header"

const App = () => {
  return (
    <div className="app">
      <Header/>
      <Main />
    </div>
  );
};

export default App;
