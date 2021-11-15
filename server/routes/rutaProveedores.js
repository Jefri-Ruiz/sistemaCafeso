const router = require("express").Router();
const pool = require('../db.js');

router.get("/", async (req, res) => {
    try {
        const todoProveedor = await pool.query("SELECT * FROM Proveedor");
        res.json(todoProveedor.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const { razonSocial, rfc, telefono, correo, direccion } = req.body;
        const newProveedor = await pool.query("INSERT INTO Proveedor (razonSocial, rfc, telefono, correo, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING razonSocial, rfc, telefono, correo, direccion", [razonSocial, rfc, telefono, correo, direccion]);
        res.json(newProveedor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:idProveedor", async (req, res) => {
    try {
        const { idProveedor } = req.params;
        const obtener = await pool.query("SELECT * FROM proveedor WHERE idProveedor = $1", [idProveedor]);
        res.json(obtener.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

router.put("/:idProveedor", async (req, res) => {
    try {
        const { idProveedor } = req.params;
        const { razonSocial } = req.body;
        const actualiza = await pool.query("UPDATE proveedor SET razonSocial = $1 WHERE idProveedor = $2", [idProveedor, razonSocial]);
        res.json("proveedor ha sido actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/:idProveedor", async (req, res) => {
    try {
        const { idProveedor } = req.params;
        const elimina = await pool.query("DELETE from proveedor WHERE idProveedor = $1", [idProveedor]);
        res.json("proveedor ha sido eliminado");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;