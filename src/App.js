import Header from "./components/Header/index.jsx";
import { AppRouter } from "./AppRoute.jsx";
import { BrowserRouter as Router } from "react-router";

function App() {
  return (
    <Router>
      <Header />
      
        <AppRouter />
      
    </Router>
  );
}

export default App;