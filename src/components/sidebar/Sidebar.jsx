import './Sidebar.css'
import Logo from '../../assets/Logo.png'
import React, { useState, useEffect } from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { FaUserLock } from "react-icons/fa6"
import { BsPersonLinesFill } from "react-icons/bs"
import { IoCalendarSharp } from "react-icons/io5"
import { Link, useLocation } from 'react-router-dom'
import utilisateurApi from '../../api/utilisateurApi'

const Sidebar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (location.pathname === '/Dashboard') {
            setActiveLink('/dashboard');
        } else {
            setActiveLink(location.pathname);
        }
    }, [location.pathname]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const tokenName = 'token';
                const decoded = await utilisateurApi.getProfile(tokenName);
                if (decoded) {
                    setUser(decoded);
                } else {
                    console.log('Token non trouvé');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return (
        <div className="container">
            <div className="headerbar">
                <div className="logobar">
                    <img src={Logo} alt="Logobar" />
                </div>
            </div>
            <div className="trait">
                <hr />
            </div>
            <div className="liens">
                <Link 
                    to="/dashboard" 
                    className={`link-custom ${activeLink === '/dashboard' ? 'active' : ''}`} 
                    onClick={() => handleLinkClick('/dashboard')}
                >
                    <div className="submit">
                        <TbLayoutDashboardFilled/>
                        Dashboard
                    </div>
                </Link>
                {user && user.statususer && (
                    <Link 
                        to="/permission" 
                        className={`link-custom ${activeLink === '/permission' ? 'active' : ''}`} 
                        onClick={() => handleLinkClick('/permission')}
                    >
                        <div className="submit">
                            <FaUserLock />
                            Permission
                        </div>
                    </Link>
                )}
                <Link 
                    to="/client" 
                    className={`link-custom ${activeLink === '/client' ? 'active' : ''}`} 
                    onClick={() => handleLinkClick('/client')}
                >
                    <div className="submit">
                        <BsPersonLinesFill />    
                        Client
                    </div>
                </Link>
                <Link 
                    to="/event" 
                    className={`link-custom ${activeLink === '/event' ? 'active' : ''}`} 
                    onClick={() => handleLinkClick('/event')}
                >
                    <div className="submit">
                        <IoCalendarSharp />
                        Événement
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
