const { Router } = require("express");
const { turnosPorEspecialidad } = require("../controllers/reportesYEstadisticas.controller");
const { verificarToken } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/",           verificarToken, turnosPorEspecialidad);

module.exports = router;
