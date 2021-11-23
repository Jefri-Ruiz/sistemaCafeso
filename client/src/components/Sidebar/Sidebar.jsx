import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import './sidebar.scss'
import perfil  from '../../images/perfil.jpg'
import logo from '../../images/Imagotipo.png'
import { Button } from 'react-bootstrap'


const Sidebar = () => {

    const [show, setShow] = useState(false);/* por usabilidad se cambio a false */

    return (
        <>
        {show ? (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__top__menu">
                            <img src={logo} alt="cafeso" className="logo"/>
                            <Button variant=" rounded py-2 px-2" onClick={() => {setShow(!show); }}><FaIcons.FaAlignLeft/></Button>
                </div>
                <div className="sidebar__top__perfil">
                    <img src={perfil} alt="perfil"/>
                    <p>Administrador</p>
                </div>
            </div>
            <ul>
                <li>
                    <NavLink to="/" exact className="rounded py-2 px-2 w-100 d-inline-block res" activeClassName="active"><FaIcons.FaHome className="me-2"/> <p>Inicio</p></NavLink>
                </li>
                <li>
                    <NavLink to="/proveedores" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaTruck className="me-2"/> <p>Proveedores</p></NavLink>
                </li>
                <li>
                    <NavLink to="/clientes" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaUserFriends className="me-2"/> <p>Clientes</p></NavLink>
                </li>
                <li>
                    <NavLink to="/productos" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaBoxes className="me-2"/> <p>Productos</p></NavLink>
                </li>
                <li>
                    <NavLink to="/insumos" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaTape className="me-2"/> <p>Insumos</p></NavLink>
                </li>
                <li>
                    <NavLink to="/entradas" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaDollyFlatbed className="me-2"/> <p>Entradas</p></NavLink>
                </li>
                <li>
                    <NavLink to="/salidas" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaTruckLoading className="me-2"/> <p>Salidas</p></NavLink>
                </li>
                <li>
                    <NavLink to="/inventario" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaClipboardList className="me-2"/> <p>Inventario</p></NavLink>
                </li>
                <li>
                    <NavLink to="/reportes" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaFileInvoiceDollar className="me-2"/> <p>Reportes</p></NavLink>
                </li>
                <li>
                    <NavLink to="/usuarios" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaFileInvoiceDollar className="me-2"/> <p>Usuarios</p></NavLink>
                </li>
                <li>
                    <NavLink to="/configuracion" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaCog className="me-2"/> <p>Configuración</p></NavLink>
                </li>
                <li>
                    <NavLink to="/documentacion" exact className="rounded py-2 px-2 w-100 d-inline-block " activeClassName="active"><FaIcons.FaBook className="me-2"/> <p>Documentación</p></NavLink>
                </li>
            </ul>
            <div className="sidebar__fondo">
                <Button variant="outline-dark rounded py-2 px-2 w-100"><FaIcons.FaDoorOpen className="me-2"/> <p>Salir</p></Button>
            </div>
        </div>
        ):(
            <div className="sidebarRes">
            <div className="sidebarRes__top">
                <div className="sidebarRes__top__menu">
                            <img src={logo} alt="Preseguro" className="logo"/>
                            <Button variant=" rounded py-2 px-2" onClick={() => {setShow(!show); }}><FaIcons.FaAlignJustify/></Button>
                </div>
                <div className="sidebarRes__top__perfil">
                    <img src={perfil} alt="perfil"/>
                    <p>Administrador</p>
                </div>
            </div>
            <ul className="sidebarRes__nav">
                <li>
                    <NavLink to="/" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaHome /> </NavLink>
                </li>
                <li>
                    <NavLink to="/proveedores" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaTruck /> </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaUserFriends /> </NavLink>
                </li>
                <li>
                    <NavLink to="/productos" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaBoxes /> </NavLink>
                </li>
                <li>
                    <NavLink to="/insumos" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaTape /> </NavLink>
                </li>
                <li>
                    <NavLink to="/entradas" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaDollyFlatbed /> </NavLink>
                </li>
                <li>
                    <NavLink to="/salidas" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaTruckLoading /> </NavLink>
                </li>
                <li>
                    <NavLink to="/inventario" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaClipboardList /> </NavLink>
                </li>
                <li>
                    <NavLink to="/reportes" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaFileInvoiceDollar /> </NavLink>
                </li>
                <li>
                    <NavLink to="/usuarios" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaUserCheck /> </NavLink>
                </li>
                <li>
                    <NavLink to="/configuracion" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaCog /> </NavLink>
                </li>
                <li>
                    <NavLink to="/documentacion" exact className="rounded py-2 px-2" activeClassName="active"><FaIcons.FaBook /> </NavLink>
                </li>
            </ul>
            <div className="sidebarRes__fondo">
                <Button variant="outline-dark rounded py-2 px-2"><FaIcons.FaDoorOpen/> </Button>
            </div>
        </div>
        )
        }

        </>
    )
}

export default Sidebar
