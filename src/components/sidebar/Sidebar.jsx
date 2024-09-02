import './Sidebar.css'
import Logo from '../../assets/Logo.png'
import React, { useState } from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { FaUserLock } from "react-icons/fa6"
import { BsPersonLinesFill } from "react-icons/bs"
import { IoCalendarSharp } from "react-icons/io5"
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return(
        <div className="container">
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
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
    )
}

export default Sidebar
