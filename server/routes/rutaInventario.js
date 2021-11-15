const router = require("express").Router();
const pool = require('../db.js');

//Muestra todos el inventario
router.get("/", async (req, res) => {
    try {
        const inventario = await pool.query("SELECT * FROM inventario");
        res.json(inventario.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Crear nuevo folio
router.post("/", async (req, res) => {
    try {
        const { idInventario, fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario } = req.body;
        const newInventario = await pool.query("INSERT INTO Inventario VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idInventario, fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario", [idInventario, fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario]);
        res.json(newInventario.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;