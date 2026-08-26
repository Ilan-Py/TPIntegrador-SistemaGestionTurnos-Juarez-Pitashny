const pool = require("../database/database");

const obtenerHistorial = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const usuario = req.usuario;

        if (usuario.rol === "paciente" && Number(id_paciente) !== usuario.id) {
            return res.status(403).json({ codigo: 403, estado: "Solo podés ver tu propio historial clínico", datos: null });
        }

        let query;
        let params;

        if (usuario.rol === "medico") {
            query = `
                SELECT h.id, h.diagnostico, h.tratamiento, h.observaciones, h.fecha_registro,
                       t.fecha AS fecha_turno, t.hora AS hora_turno,
                       u.nombre AS paciente_nombre, u.apellido AS paciente_apellido
                FROM historial_clinico h
                JOIN turno t ON t.id = h.id_turno
                JOIN usuario u ON u.id = h.id_paciente
                WHERE h.id_paciente = ? AND h.id_medico = ?
                ORDER BY h.fecha_registro DESC
            `;
            params = [id_paciente, usuario.id];
        } else {
            query = `
                SELECT h.id, h.diagnostico, h.tratamiento, h.observaciones, h.fecha_registro,
                       t.fecha AS fecha_turno, t.hora AS hora_turno,
                       m.nombre AS medico_nombre, m.apellido AS medico_apellido,
                       e.descripcion AS especialidad
                FROM historial_clinico h
                JOIN turno t ON t.id = h.id_turno
                JOIN agenda a ON a.id = t.id_agenda
                JOIN usuario m ON m.id = h.id_medico
                JOIN especialidad e ON e.id = a.id_especialidad
                WHERE h.id_paciente = ?
                ORDER BY h.fecha_registro DESC
            `;
            params = [id_paciente];
        }

        const [rows] = await pool.query(query, params);

        return res.json({ codigo: 200, estado: "ok", datos: rows });

    } catch(error) {
        return res.status(500).json({ codigo: 500, estado: error.message, datos: null });
    };
};

module.exports = { obtenerHistorial };
