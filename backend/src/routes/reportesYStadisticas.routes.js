const { Router } = require("express");
const { turnosPorEspecialidad } = require("../controllers/reportesYStadisticas.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/",           verificarToken, turnosPorEspecialidad);

module.exports = router;
