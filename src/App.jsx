import { PlayerProvider } from "./features/player/context/PlayerContext";
import MainLayout from "./layouts/MainLayout";
import Player from "./features/player/Player";
import "./App.css"; // Now contains Tailwind directives

function App() {
  return (
    <PlayerProvider>
      <MainLayout>
        <Player />
      </MainLayout>
    </PlayerProvider>
  );
}

export default App;
