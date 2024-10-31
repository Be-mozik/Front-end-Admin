import Login from './pagesClient/login/LoginClient'
import Accueil from './pagesClient/accueil/AccueilClient'

export const routesClient = [
    {
        path: "/clientlol",
        element: <Login />
    },
    {
        path: "/Accueil",
        element: <Accueil />
    }
]