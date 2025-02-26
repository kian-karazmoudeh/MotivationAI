import { Center } from "@chakra-ui/react"
import Login from "./Components/Login"
import { Routes, Route } from "react-router";
import Signup from "./Components/Signup";
import Main from "./Components/Main";
import RequireAuth from '@auth-kit/react-router/RequireAuth';

function App() {


  return (
    <Center h="100vh" w="100vw">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Center>
  );
}

export default App;
