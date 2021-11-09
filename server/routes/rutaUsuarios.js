const router = require("express").Router();
const pool = require('../db.js');

// todas las rutas de usuarios

//Select todos los usuarios funciona
router.get("/", async(req, res) => {
    try {
        const todoUsuario = await pool.query("SELECT * FROM usuario order by matricula asc"); /* se le puede quitar el order by  */
        res.json(todoUsuario.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Crear nuevo usuario funciona
router.post("/", async(req, res) =>{
    try {
        const {password, nombre, apellidopaterno, apellidomaterno} = req.body;
        const newUsuario = await pool.query("INSERT INTO usuario (password, nombre, apellidopaterno, apellidomaterno ) values ($1, $2, $3, $4) RETURNING *",[password, nombre, apellidopaterno, apellidomaterno] );
        res.json(newUsuario.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});


//Obtener un usuario en especifico funciona
router.get("/:matricula", async(req, res) =>{
    try {
        const {matricula} = req.params;
        const obtener = await pool.query("SELECT * FROM usuario WHERE matricula = $1", [matricula]);
        res.json(obtener.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});


// Actualizar usuario funciona, para editar ir a body objeto con parametro y nuevo valor
router.put("/:matricula", async(req, res) =>{
    try {
        const {matricula} = req.params;
        const {nombre} = req.body;
        const actualiza = await pool.query("UPDATE usuario SET nombre = $1 WHERE matricula = $2", [nombre, matricula]);
        res.json("usuario ha sido actualizado");
    } catch (err) {
        console.error(err.message);
    }
    
});


// Eliminar usuario funciona
router.delete("/:matricula", async(req, res) =>{
    try {
        const {matricula} = req.params;
        const elimina = await pool.query("DELETE from usuario WHERE matricula = $1", [matricula]);
        res.json("usuario ha sido eliminado");
    } catch (err) {
        console.error(err.message);
    }
    
});

module.exports = router;