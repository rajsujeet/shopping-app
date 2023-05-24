import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppRouters } from './comonents';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouters />
      </Router>
    </Provider>
  );
}

export default App;
