import { Center } from "@chakra-ui/react";
import Login from "./components/Login";
import { Routes, Route } from "react-router";
import Signup from "./components/Signup";
import Main from "./components/Main";

function App() {
  return (
    <Center h="100vh" w="100vw">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Center>
  );
}

export default App;
