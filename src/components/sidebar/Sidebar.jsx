import './Sidebar.css'
import Logo from '../assets/Logo.png'
import React, { useState } from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb"
import { FaUserLock } from "react-icons/fa6"
import { BsPersonLinesFill } from "react-icons/bs"
import { IoCalendarSharp } from "react-icons/io5"

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
                <div className="submit">
                    <TbLayoutDashboardFilled/>
                    Dashboard
                </div>
                <div className="submit">
                    <FaUserLock />
                    Permission
                </div>
                <div className="submit">
                    <BsPersonLinesFill />    
                    Client
                </div>
                <div className="submit">
                    <IoCalendarSharp />
                    Événement
                </div>
            </div>
        </div>
    )
}

export default Sidebar
