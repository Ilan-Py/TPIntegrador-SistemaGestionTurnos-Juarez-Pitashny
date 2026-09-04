const database = require("../database/database");

const listarLogAuditoria = async () => {
    try {

        

    } catch (error) {
        console.error("Error al listar el log de auditoría:", error);
    }
};

const log = async (id_usuario, accion, entidad, id_entidad, detalle) => {

    try {
        const [logs] = await database.query(
        "INSERT INTO log_auditoria (id_usuario, accion, entidad, id_entidad, detalle) VALUES (?, ?, ?, ?, ?)",
        [id_usuario, accion, entidad, id_entidad, detalle]
    );

    return logs.insertId;

    } catch (error) {
        console.error("Error al dar el log de alta de auditoría: ", error);
    }

};

const logDarAlta = log;

const logDarBaja = log;

const logModificar = log;

module.exports = {
    logDarAlta,
    logDarBaja,
    logModificar,
    log
};