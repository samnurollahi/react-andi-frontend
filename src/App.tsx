import { Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index";
import Container from "./components/container/Container";
import Builder from "./pages/builder/Builder";
import Auth from "./context/Auth";
import About from "./pages/about/About";
import { Login } from "./pages/login/Login";

function App() {
  console.log(`
██╗   ██╗ ██████╗ ██╗     ██╗   ██╗
██║   ██║██╔═══██╗██║     ██║   ██║
██║   ██║██║   ██║██║     ██║   ██║
╚██╗ ██╔╝██║   ██║██║     ██║   ██║
 ╚████╔╝ ╚██████╔╝███████╗╚██████╔╝
  ╚═══╝   ╚═════╝ ╚══════╝ ╚═════╝ 
              volv.ir
`);

  return (
    <>
      <Auth>
        <Container>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/builder"
              element={
                // <Praivate>
                <Builder />
                // </Praivate>
              }
            />
          </Routes>
        </Container>
      </Auth>
    </>
  );
}

export default App;
