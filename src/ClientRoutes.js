import Login from './pagesClient/login/LoginClient'
import Accueil from './pagesClient/accueil/AccueilClient'
import Event from './pagesClient/event/DetailEvent'

export const routesClient = [
    {
        path: "/clientlol",
        element: <Login />
    },
    {
        path: "/Accueil",
        element: <Accueil />
    },
    {
        path: "/Evenement",
        element: <Event />
    }
]