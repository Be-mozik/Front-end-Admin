import Sidebar from "../sidebar/Sidebar";
import { MdAccountCircle } from "react-icons/md"
import './Dashboard.css'


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
                        Block 1
                        <span>512</span>
                        <hr />
                        +3% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        Block 1
                        <span>512</span>
                        <hr />
                        +3% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        Block 1
                        <span>512</span>
                        <hr />
                        +3% depuis le mois dernier
                    </div>
                    <div className="info-d">
                        Block 1
                        <span>512</span>
                        <hr />
                        +3% depuis le mois dernier
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
                    </div>
                    <div className="table-ds">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard