const { Router } = require("express");
const { darAltaTurno, darDeBajaTurno } = require("../controllers/turnos.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/",      verificarToken, verificarRol("paciente", "operador"), darAltaTurno);
router.delete("/",    verificarToken, verificarRol("paciente", "operador", "medico"), darDeBajaTurno);

module.exports = router;