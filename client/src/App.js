import React from 'react'
import './App.scss';

/* import Topbar from './components/Topbar/Topbar'; */
import Sidebar from './components/Sidebar/Sidebar';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Proveedores from './pages/proveedores/Proveedores';
import Clientes from './pages/clientes/Clientes';
import Productos from './pages/productos/Productos';
import Insumos from './pages/insumos/Insumos';
import Docs from './pages/documentacion/Docs';
import Login from './pages/login/Login';
import Entradas from './pages/entradas/Entradas';
import Salidas from './pages/salidas/Salidas';
import Inventario from './pages/inventario/Inventario';
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
            <Route path="/insumos" exact={true} component={Insumos}/>
            <Route path="/entradas" exact={true} component={Entradas}/>
            <Route path="/salidas" exact={true} component={Salidas}/>
            <Route path="/inventario" exact={true} component={Inventario}/>
            <Route path="/usuarios" exact={true} component={Usuarios}/>
            <Route path="/Login" exact={true} component={Login}/>
            <Route path="/documentacion" exact={true} component={Docs}/>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
