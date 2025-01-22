import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body/Body";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store.js";
import Feed from "./components/Feed/Feed.jsx";
import Connections from "./components/Connections/Connections.jsx";
import Requests from "./components/Requests/Requests.jsx";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
