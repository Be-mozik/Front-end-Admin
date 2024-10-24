import Sidebar from "../../components/sidebar/Sidebar";
import { MdAccountCircle } from "react-icons/md"
import './Dashboard.css'
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import graphApi from '../../api/graphApi';
import DropdwnUser from "../../components/dropdown/DropdownUser";
import {  useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { BsInfoSquareFill } from "react-icons/bs"
import BlocInfo from "../../components/bloc-info/BlocInfo";
import { Link } from "react-router-dom";
import eventApi from "../../api/eventApi";
import { format } from "date-fns";
import clientSApi from "../../api/clientSummary"
import caApi from "../../api/caApi";
import eventSApi from "../../api/eventSummary";
import achatSApi from "../../api/achatSummary";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

const Dashboard  = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [events,setEvent] = useState([]);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [chartData, setChartData] = useState({});
    const [clientS,setClientS] = useState({
        nb_client: 0,
        clients_last_30_days: 0,
        percentage_increase: 0,
    });
    const [caS,setCaS]= useState({
        montant: 0,
        augmentation: 0,
    });
    const [eventS, setEventS] = useState({
        nb_event: 0,
        increase: 0,
    });
    const [achatS,setAchatS] = useState({
        nb_achat: 0,
        increase: 0,
    });
    const [years,setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [chartData2,setChartData2] = useState({});
    const [years2,setYears2] = useState([]);
    const [selectedYear2, setSelectedYear2] = useState(null);


    const fetchDataEvent = async () => {
        try {
            const events = await eventApi.getEvents();
            setEvent(events.data);
        } catch (error) {
            console.log('Error: ', error);
        }
    };


    useEffect(() => {
        fetchDataEvent();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const formattedData = events.map((e) => {
                if (e.dateheureevenement) {
                    const parts = e.dateheureevenement.split(' ');
                    if (parts.length === 2) {
                        const datePart = parts[0].split('-');
                        const timePart = parts[1];
                        const formattedDateString = `${datePart[2]}-${datePart[1]}-${datePart[0]}T${timePart}`;
                        const date = new Date(formattedDateString);
                        if (!isNaN(date.getTime())) {
                            return { ...e, formattedDate: format(date, 'dd-MM-yyyy') };
                        } else {
                            console.error('Date invalide:', formattedDateString);
                            return { ...e, formattedDate: 'Date invalide' };
                        }
                    } else {
                        console.error('Format de date inattendu:', e.dateheureevenement);
                        return { ...e, formattedDate: 'Format de date inattendu' };
                    }
                } else {
                    return { ...e, formattedDate: 'Date manquante' };
                }
            });
            setFormattedEvents(formattedData);
        }
    }, [events]);

    useEffect(() => {
        const fetchClientSummary = async () => {
          try {
            const response = await clientSApi.getClientS();
            setClientS(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération du résumé client:', error);
          }
        };
        fetchClientSummary();
      }, []);

    useEffect(() => {
        const fetchCaSummary = async () => {
            try {
                const rep = await caApi.getCaSummary();
                setCaS(rep.data);
            } catch (error) {
                console.log('Erreur lors de la récupération du résumé ca: ',error);
            }
        };
        fetchCaSummary();
    },[]);

    useEffect(() => {
        const fetchEventSummary = async () => {
            try {
                const rep = await eventSApi.getEventS();
                setEventS(rep.data);
            } catch (error) {
                console.log('Erreur lors de la récupération du résumé event: ',error);
            }
        };
        fetchEventSummary();
    },[]);

    useEffect(() => {
        const fetchAchatSummary = async () => {
            try {
                const rep = await achatSApi.getAchatS();
                setAchatS(rep.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAchatSummary();
    },[]);

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

    const fetchChartData = async (year) => {
        try {
            const response = await graphApi.getDataGraph1(year);
            const data = response.data;
            const labels = data.map(item => `${item.mois}`);
            const values = data.map(item => parseFloat(item.montant_total));
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Montant total (Ar)',
                        data: values,
                        backgroundColor: '#EB8218',
                        borderColor: '#EB8218',
                        borderWidth: 2,
                    }
                ]
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };
    useEffect(() => {
        if (selectedYear) {
            fetchChartData(selectedYear);
        }
    },[selectedYear]);

    useEffect(() => {
        const fetchYear = async () => {
            try {
                const rep = await achatSApi.getYears();
                console.log(rep.data);
                setYears(rep.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchYear();
    },[]);

    const fetchChartData2 = async (year) => {
        try {
          const response = await eventSApi.getEventStat(year);
          const data = response.data;
          const labels = data.map((item) => `${item.mois}`);
          const values = data.map((item) => parseFloat(item.nombre));
          setChartData2({
            labels: labels,
            datasets: [
              {
                label: `Event de ce mois`,
                data: values,
                backgroundColor: '#EB8218',
                borderColor: '#EB8218',
                borderWidth: 2,
              },
            ],
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
    
      useEffect(() => {
        if (selectedYear2) {
          fetchChartData2(selectedYear2);
        }
      }, [selectedYear2]);

      useEffect(() => {
        const fetchYear2 = async () => {
            try {
                const rep = await eventSApi.getYears();
                setYears2(rep.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchYear2();
    },[]);
    
    
    
    return(
        <>
            <Sidebar></Sidebar>
            <div className="container-d">
                <div className="header-d">
                    <div className="titre-d">
                        Dashboard
                        <MdAccountCircle className="user" onClick={() => setOpenDrop(true)}/>
                        {openDrop && (
                            <DropdwnUser onCloseDrop={handleClickDrop}></DropdwnUser>
                        )}
                    </div>
                </div>
                <div className="info-ds">
                    <BlocInfo>
                        Nombre de client(s)
                        <span>{clientS.nb_client}</span>
                        <hr />
                        + {clientS.increase}% ces 30 derniers jours
                    </BlocInfo>
                    <BlocInfo>
                        C.A Total
                        <span>{parseFloat(caS.montant).toLocaleString('fr-FR', { 
                                minimumFractionDigits: 1, 
                                maximumFractionDigits: 1 
                            }).replace(/ /g, '.')} Ar
                        </span>
                        <hr />
                        + {caS.augmentation}% ces 30 derniers jours
                    </BlocInfo>
                    <BlocInfo>
                        Nombre d'events
                        <span>{eventS?.nb_event ?? 0}</span>
                        <hr />
                        + {eventS?.increase ?? 0.0}% ces 30 derniers jours
                    </BlocInfo>
                    <BlocInfo>
                        Vente de billet total
                        <span>{achatS.nb_achat}</span>
                        <hr />
                        + {achatS.increase}% ces 30 derniers jours
                    </BlocInfo>
                </div>
                <div className="graph-d">
                    <div className="graph-ds">
                        <div className="chart">
                        {chartData.labels ? (
                            <Line data={chartData} />
                        ) : (
                            <p>Sélectionnez une année</p>
                        )}
                        </div>
                        <div className="titre-chart">
                            <p>Montant total des achats</p>
                            <select name="years" id="years" onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value="">Sélectionnez une année</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="graph-ds">
                        <div className="chart">
                        {chartData2.labels ? (
                            <Bar data={chartData2} />
                        ) : (
                            <p>Sélectionnez une année</p>
                        )}
                        </div>
                        <div className="titre-chart">
                            <p>Nombre d'events par mois</p>
                            <select name="years" id="years" onChange={(e) => setSelectedYear2(e.target.value)}>
                                <option value="">Sélectionnez une année</option>
                                {years2.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div> 
                    </div>
                </div>
                <div className="table-d">
                    <div className="titre-table">
                        Liste des événements
                    </div>
                        <Table 
                            childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Lieu</th>
                                <th>Statut</th>
                                <th>Details</th>
                            </tr>
                            }
                            childrenBody={
                            <>
                                { formattedEvents.map((e)=> (
                                    <tr key={e.idevenement}>
                                        <td>{e.idevenement}</td>
                                        <td>{e.nomevenement}</td>
                                        <td>{e.formattedDate}</td>
                                        <td>{e.lieuevenement}</td>
                                        <td>
                                        {
                                            !e.estvalide ? (
                                                <span style={{ color: '#FF0000' }}>Passé</span>
                                            ): (
                                                <span style={{ color: '#2ACD30' }}>À venir</span>

                                            )
                                        }
                                        </td>
                                        <td>
                                            <span className="actions">
                                                <Link to={`/detailsdash/${e.idevenement}`}>
                                                    <BsInfoSquareFill className="info"/>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            }
                        />
                </div>
            </div>
        </>
    )
}

export default Dashboard