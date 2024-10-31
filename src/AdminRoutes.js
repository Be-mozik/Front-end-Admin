import Login from './Pages/login/Login'
import Demande from './Pages/demande/Demande'
import Dashboard from './Pages/dashboard/Dashboard'
import DashboardDetail from './Pages/dashboardDetail/DashboardDetail'
import Permission from './Pages/permission/Permission'
import Client from './Pages/client/Client'
import Historique from './Pages/client/HistoriqueAchat'
import Event from './Pages/event/Event'


export const routes = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/demande",
        element: <Demande />
    },
    {
        path:"/dashboard",
        element: <Dashboard />
    },
    {
        path:"/detailsdash/:id",
        element: <DashboardDetail />
    },
    {
        path:"/permission",
        element: <Permission />
    },
    {
        path:"/client",
        element: <Client />
    },
    {
        path:"/achat/:id",
        element: <Historique />
    },
    {
        path:"/event",
        element: <Event />
    }
    
]