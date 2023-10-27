import "../styles/App.css";
import REPL from "./REPL";
import CommandRegistry from './CommandRegistration';
import { mode } from "../functions/Mode";
import { load } from "../functions/Load";
import { view } from "../functions/View";
import { broadband } from "../functions/Broadband";
import { search } from "../functions/Search";
import { mockload } from "../functions/MockLoad";
import { mockview } from "../functions/MockView";
import { mocksearch } from "../functions/MockSearch";
import { DataProvider } from './DataContext';



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
    CommandRegistry.registerCommand('broadband', broadband);
    CommandRegistry.registerCommand('mock_load_file', mockload);
    CommandRegistry.registerCommand('mock_view', mockview);
    CommandRegistry.registerCommand('mock_search', mocksearch);

return (
    <DataProvider> 
      <div className="App">
        <div className="App-header">
          <h1 aria-label="title">Mock</h1>
        </div>
        <REPL />
      </div>
    </DataProvider> 
  );
}

export default App;
