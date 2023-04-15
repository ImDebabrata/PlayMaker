import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Navbar />
      <Signup />
    </div>
  );
}

export default App;
