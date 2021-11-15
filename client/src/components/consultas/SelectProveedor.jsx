import { useState, useEffect } from "react";

const SelectProveedor = () => {
    const [proveedor, setProveedor] = useState([]);

    const getProveedor = async () => {
        try {
            const response = await fetch("http://localhost:5000/entradas/proveedor");
            const jsonData = await response.json();
            setProveedor(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProveedor();
    
    }, []);

    return proveedor;
}

export default SelectProveedor;
