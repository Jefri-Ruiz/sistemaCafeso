import { useState, useEffect } from "react";

const SelectClientes = () => {
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {

            const response = await fetch("http://localhost:5000/entradas/cliente");
            const jsonData = await response.json();
            setClientes(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getClientes();
    
    }, []);

    return clientes;
}

export default SelectClientes;