import Greeting from "./components/Greeting";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <Greeting name="Arthur" />
      <Counter />
      <Greeting name ="Leonheart" />
      <Counter />
      <Greeting  name="Pendragon" />
      <Counter />      
    </div>
  );
}

export default App;