import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
function App() {
  return (
    <>
      <div className="wrapper bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 min-h-screen w-full">
        <div className="header">
          <Header></Header>
        </div>
        <div className="main">
          <Main></Main>
        </div>
      </div>
    </>
  );
}

export default App;
