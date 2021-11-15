import { useState, useEffect } from "react";

const SelectProductos = () => {
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const response = await fetch("http://localhost:5000/entradas/producto");
            const jsonData = await response.json();
            setProductos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProductos();
    
    }, []);

    return productos;
}

export default SelectProductos;