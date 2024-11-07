import Login from './pagesClient/login/LoginClient'
import Accueil from './pagesClient/accueil/AccueilClient'
import Event from './pagesClient/event/DetailEvent'
import Panier from './pagesClient/panier/Panier'
import Historique from './pagesClient/histo/Historique'
import Merci from './pagesClient/merci/Merci'
import Apropos from './pagesClient/apropos/Apropos'

export const routesClient = [
    {
        path: "/Connexion",
        element: <Login />
    },
    {
        path: "/Accueil",
        element: <Accueil />
    },
    {
        path: "/Evenement/:id",
        element: <Event />
    },
    {
        path: "/Panier",
        element: <Panier />
    },
    {
        path: "/Historique",
        element: <Historique/>
    },
    {
        path: "/Merci",
        element: <Merci/>
    },
    {
        path: "/Apropos",
        element: <Apropos/>
    }

]