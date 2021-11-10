import { useState, useEffect } from "react";

const SelectProveedor = () => {
    const [proveedor, setProveedor] = useState([]);

    const getProveedor = async () => {
        try {
            const response = await fetch("http://localhost:5000/Entradas/Proveedor");
            const jsonData = await response.json();
            setProveedor(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProveedor();
    
    }, []);

    // useEffect(() => {
    //     getProveedor();
        
    // }, [proveedor])
    return proveedor;
}

export default SelectProveedor;
