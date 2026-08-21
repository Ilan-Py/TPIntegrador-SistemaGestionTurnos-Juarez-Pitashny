const { Router } = require("express");
const { 
    darAltaAgenda, 
    listarAgenda, 
    actualizarAgenda, 
    darDeBajaAgenda 
} = require("../controllers/agendas.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",      verificarToken, verificarRol("operador", "medico"), listarAgenda);
router.post("/",     verificarToken, verificarRol("operador", "medico"), darAltaAgenda);
router.put("/:id",   verificarToken, verificarRol("operador", "medico"), actualizarAgenda);
router.delete("/:id", verificarToken, verificarRol("operador", "medico"), darDeBajaAgenda);

module.exports = router;