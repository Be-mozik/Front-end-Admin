import { routes } from "./AdminRoutes";
import { routesClient } from "./ClientRoutes";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((routes,index) => 
            <Route 
              key= { "routes -" + index }
              path= { routes.path }
              element= { routes.element }
            />
        )}
        {
          routesClient.map((routesClient,index) =>
            <Route
              key={"routes client -"+index}
              path={routesClient.path}
              element={routesClient.element}
            />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;