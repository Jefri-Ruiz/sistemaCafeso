const router = require("express").Router();
const pool = require('../db.js');

router.get("/", async(req, res) => {
    try {
        const todoProducto = await pool.query("SELECT * FROM producto");
        res.json(todoProducto.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/", async(req, res) =>{
    try {
        const {sku, descripcion, precioUnitario, stockSistema} = req.body;
        const newProducto = await pool.query("INSERT INTO producto (sku, descripcion, precioUnitario, stockSistema) values ($1, $2, $3, $4) RETURNING sku, descripcion, precioUnitario, iva, precioPublico, stockSistema, valorAlmacen",[sku, descripcion, precioUnitario, stockSistema]);
        res.json(newProducto.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const obtener = await pool.query("SELECT * FROM producto WHERE sku = $1", [sku]);
        res.json(obtener.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

router.put("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const {descripcion} = req.body;
        const actualiza = await pool.query("UPDATE producto SET sku = $1 WHERE descripcion= $2", [sku, descripcion]);
        res.json("Cliente ha sido actualizado");
    } catch (err) {
        console.error(err.message);
    }
    
});

router.delete("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const elimina = await pool.query("DELETE from producto WHERE sku = $1", [sku]);
        res.json("Producto ha sido eliminado");
    } catch (err) {
        console.error(err.message);
    }
    
});

module.exports = router;