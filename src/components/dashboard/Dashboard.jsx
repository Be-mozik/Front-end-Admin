import Sidebar from "../sidebar/Sidebar";
import { MdAccountCircle } from "react-icons/md"
import './Dashboard.css'
import { TableDash } from "./Tabledash";

const Dashboard  = () => {
    return(
        <>
            <Sidebar></Sidebar>
            <div className="container-d">
                <div className="header-d">
                    <div className="titre-d">
                        Dashboard
                        <MdAccountCircle />
                    </div>
                </div>
                <div className="info-ds">
                    <div className="info-d">
                        Nombre de client(s)
                        <span>624</span>
                        <hr />
                        +2.5% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        C.A Total
                        <span>175.500 Ar</span>
                        <hr />
                        +15% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        Nombre d'events
                        <span>47</span>
                        <hr />
                        +0.5% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        Vente de billet total
                        <span>512</span>
                        <hr />
                        +1% depuis le mois dernier
                    </div>
                </div>
                <div className="graph-d">
                    <div className="graph-ds">
                        <div className="chart">
                            bloc de chart
                        </div>
                        <div className="titre-chart">
                            Graph 1
                            <select name="" id="">
                                <option value="">2024</option>
                            </select>
                        </div>
                    </div>
                    <div className="graph-ds">
                        <div className="chart">
                            bloc de chart 2
                        </div>
                        <div className="titre-chart">
                            Graph 1
                        </div> 
                    </div>
                </div>
                <div className="table-d">
                    <div className="titre-table">
                        Liste des événements
                        <TableDash></TableDash>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard