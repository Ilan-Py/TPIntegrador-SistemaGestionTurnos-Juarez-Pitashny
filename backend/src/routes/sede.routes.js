const { Router } = require("express");
const { listarSedes, darDeAlta, actualizarSede, darDeBaja } = require("../controllers/sede.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",       verificarToken, verificarRol("administrador"), listarSedes);
router.post("/",      verificarToken, verificarRol("administrador"), darDeAlta);
router.put("/:id",    verificarToken, verificarRol("administrador"), actualizarSede);
router.delete("/:id", verificarToken, verificarRol("administrador"), darDeBaja);

module.exports = router;
