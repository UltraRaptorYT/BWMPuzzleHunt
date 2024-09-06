import { Route, Routes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Error from "@/pages/404";
import Home from "@/pages/Home";
import Player from "@/pages/P2ayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Player />} />
        <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
