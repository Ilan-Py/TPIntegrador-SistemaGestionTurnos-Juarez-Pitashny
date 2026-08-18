const { Router } = require("express");
const { listarSedes, darDeAlta, actualizarSede, darDeBaja } = require("../controllers/auth.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",       verificarToken, verificarRol("admin"), listarSedes);
router.post("/",      verificarToken, verificarRol("admin"), darDeAlta);
router.put("/:id",    verificarToken, verificarRol("admin"), actualizarSede);
router.delete("/:id", verificarToken, verificarRol("admin"), darDeBaja);

module.exports = router;