import React from "react";
import "./home.scss";
import logo from '../../images/Imagotipo.png'
import RevisarYBuscar from '../inventario/RevisarYBuscar';
const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="home__titulo">
            <h1>Bienvenido al Sistema de Inventario</h1>
            <img src={logo} alt="cafeso" className="logo"/>
            <h2>Inventario</h2>
            <RevisarYBuscar />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
