import "../styles/App.css";
import REPL from "./REPL";
import CommandRegistry from './CommandRegistration';
import { mode } from "../functions/Mode";
import { load } from "../functions/Load";
import { view } from "../functions/View";
import { search } from "../functions/Search";


/**
 * This is the highest level component!
 * It contains our REPL component, which is where everything is displayed: 
 * the REPLHistory and the REPLInput areas!
 */
function App() {
    CommandRegistry.registerCommand('mode', mode);
    CommandRegistry.registerCommand('load_file', load);
    CommandRegistry.registerCommand('view', view);
    CommandRegistry.registerCommand('search', search);

  return (
    <div className="App">
      <div className="App-header">
        <h1 aria-label="title">Mock</h1>
      </div>
      <REPL />
    </div>
  );
}

export default App;
