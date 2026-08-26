const { Router } = require("express");
const { obtenerHistorial } = require("../controllers/historial.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/:id_paciente", verificarToken, verificarRol("paciente", "medico"), obtenerHistorial);

module.exports = router;
