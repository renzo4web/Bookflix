import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";

import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <AppRouter />
    </Provider>
  );
}

export default App;
