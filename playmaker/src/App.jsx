import "./App.css";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Login />
      <Signup /> */}
      <Events />
    </div>
  );
}

export default App;
