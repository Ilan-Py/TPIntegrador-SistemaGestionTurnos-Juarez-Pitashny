const { Router } = require("express");
const { listarEspecialidades, darDeAlta, actualizarEspecialidad, darDeBaja } = require("../controllers/especialidad.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",       verificarToken, verificarRol("administrador"), listarEspecialidades);
router.post("/",      verificarToken, verificarRol("administrador"), darDeAlta);
router.put("/:id",    verificarToken, verificarRol("administrador"), actualizarEspecialidad);
router.delete("/:id", verificarToken, verificarRol("administrador"), darDeBaja);

module.exports = router;
