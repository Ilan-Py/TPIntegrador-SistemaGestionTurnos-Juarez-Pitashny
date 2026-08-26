const { Router } = require("express");
const { darAltaTurno, darDeBajaTurno, atenderTurno, misTurnos, turnosMedico, turnosSede } = require("../controllers/turnos.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/",                verificarToken, verificarRol("paciente", "operador"), darAltaTurno);
router.delete("/:id",           verificarToken, verificarRol("paciente", "operador", "medico"), darDeBajaTurno);
router.patch("/:id/atender",    verificarToken, verificarRol("medico"), atenderTurno);
router.get("/mis-turnos",       verificarToken, verificarRol("paciente"), misTurnos);
router.get("/medico",           verificarToken, verificarRol("medico"), turnosMedico);
router.get("/sede",             verificarToken, verificarRol("operador", "administrador"), turnosSede);

module.exports = router;
