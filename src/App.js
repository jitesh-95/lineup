import "./App.css";
import { Box } from "@chakra-ui/react";
import MainRoutes from "./pages/MainRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <MainRoutes />
    </Box>
  );
}

export default App;
