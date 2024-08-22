import Login from "./components/login/Login";
import Demande from "./components/demande/Demande";

export const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/demande",
        element: <Demande />
    }
]