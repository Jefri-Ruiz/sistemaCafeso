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

module.exports = router;