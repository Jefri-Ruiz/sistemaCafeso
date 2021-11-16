const router = require("express").Router();
const pool = require('../db.js');

//Muestra todos el inventario
router.get("/", async (req, res) => {
    try {
        const inventario = await pool.query("SELECT idInventario, TO_CHAR(fecha, 'YYYY-MM-DD') AS fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario FROM inventario ORDER BY idInventario ASC");
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

//UPDATE a inventario
router.put("/:idInventario", async (req, res) => {
    try {
        const {idInventario} = req.params;
        const {fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario } = req.body;
        const inventarioUpdate = await pool.query("UPDATE inventario SET fecha = $1, hora = $2, sku = $3, descripcion = $4, stockSistema = $5, stockFisico = $6, precioUnitario = $7 WHERE idInventario = $8", [fecha, hora, sku, descripcion, stockSistema, stockFisico, precioUnitario, idInventario]);
        res.json("Fue actualizado!");
    } catch (err) {
        console.error(err.message);
    }
});

//DELETE a inventario
router.delete("/:idInventario", async(req, res) => {
    try {
        const {idInventario} = req.params;
        const inventarioDelete = await pool.query("DELETE FROM inventario WHERE idInventario = $1 ", [idInventario]);
        res.json("Fue eliminado correctamente!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;