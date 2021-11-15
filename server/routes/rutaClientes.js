const router = require("express").Router();
const pool = require('../db.js');

router.get("/", async(req, res) => {
    try {
        const todoCliente = await pool.query("SELECT * FROM cliente");
        res.json(todoCliente.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/", async(req, res) =>{
    try {
        const {telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc} = req.body;
        const newCliente = await pool.query("INSERT INTO cliente (telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc) values ($1, $2, $3, $4, $5, $6) RETURNING telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc",[telefono, correo, nombre, apellidoPaterno, apellidoMaterno, rfc]);
        res.json(newCliente.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:idCliente", async(req, res) =>{
    try {
        const {idCliente} = req.params;
        const obtener = await pool.query("SELECT * FROM cliente WHERE idcliente = $1", [idCliente]);
        res.json(obtener.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

router.put("/:idCliente", async(req, res) =>{
    try {
        const {idCliente} = req.params;
        const {nombre} = req.body;
        const actualiza = await pool.query("UPDATE cliente SET idcliente = $1 WHERE  nombre= $2", [idCliente, nombre]);
        res.json("Cliente ha sido actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/:idCliente", async(req, res) =>{
    try {
        const {idCliente} = req.params;
        const elimina = await pool.query("DELETE from cliente WHERE idcliente = $1", [idCliente]);
        res.json("Cliente ha sido eliminado");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;