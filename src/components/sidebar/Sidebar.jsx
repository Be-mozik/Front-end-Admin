import './Sidebar.css'
import Logo from '../../assets/Logo.png'
import React from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { FaUserLock } from "react-icons/fa6"
import { BsPersonLinesFill } from "react-icons/bs"
import { IoCalendarSharp } from "react-icons/io5"
import { Link } from 'react-router-dom'

const Sidebar = () => {

    return(
        <div className="container">
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="trait">
                <hr />
            </div>
            <div className="liens">
                <Link to ="/dashboard" className='link-custom'>
                    <div className="submit">
                        <TbLayoutDashboardFilled/>
                        Dashboard
                    </div>
                </Link>
                <Link to="/permission" className='link-custom'>
                    <div className="submit">
                        <FaUserLock />
                        Permission
                    </div>
                </Link>
                <Link to="/client" className='link-custom'>
                    <div className="submit">
                        <BsPersonLinesFill />    
                        Client
                    </div>
                </Link>
                <Link to="/event" className='link-custom'>
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
