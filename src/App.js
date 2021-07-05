import "./App.css";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Search</NavLink>
      </nav>
      <Switch>
        <Route exact path="/" component={PokemonList} />
        <Route exact path="/pokemon/:pokemon" component={Pokemon} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
