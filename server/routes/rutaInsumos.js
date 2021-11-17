const router = require("express").Router();
const pool = require('../db.js');

router.get("/", async(req, res) => {
    try {
        const todoInsumo = await pool.query("SELECT * FROM insumo");
        res.json(todoInsumo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/", async(req, res) =>{
    try {
        const {sku, descripcion, costoUnitario, unidadMedida, stockSistema} = req.body;
        const newInsumo = await pool.query("INSERT INTO insumo (sku, descripcion, costoUnitario, unidadMedida, stockSistema) values ($1, $2, $3, $4, $5) RETURNING sku, descripcion, costoUnitario, unidadMedida, stockSistema",[sku, descripcion, costoUnitario, unidadMedida, stockSistema]);
        res.json(newInsumo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const obtener = await pool.query("SELECT * FROM insumo WHERE sku = $1", [sku]);
        res.json(obtener.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

router.put("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const {descripcion, costoUnitario, unidadMedida, stockSistema} = req.body;
        const actualiza = await pool.query("UPDATE insumo SET descripcion = $1, costoUnitario = $2, unidadMedida = $3, stockSistema = $4 WHERE sku = $5", [descripcion, costoUnitario, unidadMedida, stockSistema, sku]);
        res.json("Insumo ha sido actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

router.delete("/:sku", async(req, res) =>{
    try {
        const {sku} = req.params;
        const elimina = await pool.query("DELETE from insumo WHERE sku = $1", [sku]);
        res.json("Insumo ha sido eliminado");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;