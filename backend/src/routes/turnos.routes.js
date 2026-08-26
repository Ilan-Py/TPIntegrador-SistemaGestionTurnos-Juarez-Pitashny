const { Router } = require("express");
const { darAltaTurno, darDeBajaTurno } = require("../controllers/turnos.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/altaTurno",      verificarToken, verificarRol("paciente", "operador"), darAltaTurno);
router.post("/bajaTurno",    verificarToken, verificarRol("paciente", "operador", "medico"), darDeBajaTurno);

module.exports = router;