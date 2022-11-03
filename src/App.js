import './App.css';
import './Component/Board'
import {Game} from "./Component/Game";

function App() {
  return (
    <div className="App">
      <Game
          boardX={15}
          boardY={15}
          rule={5}
          canCancelChess={false}
      />
    </div>



  );
}

export default App;
