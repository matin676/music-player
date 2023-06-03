import "./App.css";
import Record from "./components/Record";
import MusicList from "./components/MusicList";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <div className="wrapper">
        <TopBar />
        <Record />
        <MusicList />
      </div>
    </>
  );
}

export default App;
