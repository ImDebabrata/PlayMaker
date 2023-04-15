import "./App.css";
import Navbar from "./components/Navbar";
import EventForm from "./pages/AddEvent";
import AllRoutes from "./pages/AllRoutes";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
