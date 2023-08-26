
import { Provider } from "react-redux";
import store from "./redux/store";
import AccountApp from "./AccountApp";

function App() {
  return (
    <Provider store={store}>
      <AccountApp />
    </Provider>

  );
}

export default App;
