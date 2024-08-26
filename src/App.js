import { routes } from "./routes";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((routes,index) => 
            <Route 
              key= { "routes" + index }
              path= { routes.path }
              element= { routes.element }
            />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;