import React from 'react'
import './App.scss';

/* import Topbar from './components/Topbar/Topbar'; */
import Sidebar from './components/Sidebar/Sidebar';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Proveedores from './pages/proveedores/Proveedores';
import Clientes from './pages/clientes/Clientes';
import Productos from './pages/productos/Productos';
import Docs from './pages/documentacion/Docs';
import Config from './pages/configuracion/Config';
import Entradas from './pages/entradas/Entradas';
import Salidas from './pages/salidas/Salidas';
import Inventario from './pages/inventario/Inventario';
import Reportes from './pages/reportes/Reportes';
import Usuarios from './pages/usuarios/Usuarios';


function App() {
  return (
    <>
      <Router>
        
        <div className="flex">
          <Sidebar/>
          <div className="content">
            <Route path="/" exact={true} component={Home}/>
            <Route path="/proveedores" exact={true} component={Proveedores}/>
            <Route path="/clientes" exact={true} component={Clientes}/>
            <Route path="/productos" exact={true} component={Productos}/>
            <Route path="/entradas" exact={true} component={Entradas}/>
            <Route path="/salidas" exact={true} component={Salidas}/>
            <Route path="/inventario" exact={true} component={Inventario}/>
            <Route path="/reportes" exact={true} component={Reportes}/>
            <Route path="/usuarios" exact={true} component={Usuarios}/>
            <Route path="/configuracion" exact={true} component={Config}/>
            <Route path="/documentacion" exact={true} component={Docs}/>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;