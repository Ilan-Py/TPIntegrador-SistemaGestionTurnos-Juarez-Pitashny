const { Router } = require("express");
const { darAltaTurno } = require("../controllers/turnos.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/",      verificarToken, verificarRol("paciente", "operador"), darAltaTurno);

module.exports = router;