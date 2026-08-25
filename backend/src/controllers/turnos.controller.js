const pool = require("../database/database");

const darAltaTurno = async (req, res) => {
    try {
        const { id_medico, id_especialidad, id_sede, fecha, hora, nota } = req.body;
        let { id_paciente, id_cobertura } = req.body;

        if (!id_medico || !id_especialidad || !id_sede || !fecha || !hora) {
            return res.status(400).json({ codigo: 400, estado: "Todos los campos son requeridos", datos: null });
        }

        if (!nota || !nota.trim()) {
            return res.status(400).json({ codigo: 400, estado: "La nota es obligatoria", datos: null });
        }

        if (req.usuario.rol === "paciente") {
            id_paciente = req.usuario.id;
        } else if (req.usuario.rol === "operador") {
            if (!id_paciente) {
                return res.status(400).json({ codigo: 400, estado: "El operador debe indicar el id_paciente", datos: null });
            }
        }

        const [pacientes] = await pool.query(
            "SELECT id, id_cobertura FROM usuario WHERE id = ? AND rol = 'paciente'",
            [id_paciente]
        );

        if (pacientes.length === 0) {
            return res.status(400).json({ codigo: 400, estado: "El id_paciente indicado no corresponde a un paciente existente", datos: null });
        }

        if (!id_cobertura) {
            id_cobertura = pacientes[0].id_cobertura;
        }

        if (!id_cobertura) {
            return res.status(400).json({ codigo: 400, estado: "El paciente no tiene una cobertura asignada", datos: null });
        }

        const [agendas] = await pool.query(
            "SELECT id, hora_entrada, hora_salida FROM agenda WHERE id_medico = ? AND id_especialidad = ? AND id_sede = ? AND fecha = ?",
            [id_medico, id_especialidad, id_sede, fecha]
        );

        if (agendas.length === 0) {
            return res.status(404).json({ codigo: 404, estado: "No existe agenda para ese medico, especialidad, sede y fecha", datos: null });
        }

        const agenda = agendas.find(a => hora >= a.hora_entrada && hora < a.hora_salida);

        if (!agenda) {
            return res.status(400).json({ codigo: 400, estado: "La hora ingresada no esta dentro del horario de atencion del medico", datos: null });
        }

        const [ocupado] = await pool.query(
            "SELECT id FROM turno WHERE id_agenda = ? AND fecha = ? AND hora = ? AND estado != 'cancelado'",
            [agenda.id, fecha, hora]
        );

        if (ocupado.length > 0) {
            return res.status(400).json({ codigo: 400, estado: "Ese horario ya se encuentra reservado", datos: null });
        }

        const [result] = await pool.query(
            "INSERT INTO turno (nota, id_agenda, fecha, hora, id_paciente, id_cobertura, estado) VALUES (?, ?, ?, ?, ?, ?, 'confirmado')",
            [nota.trim(), agenda.id, fecha, hora, id_paciente, id_cobertura]
        );

        return res.status(201).json({
            codigo: 201,
            estado: "ok",
            datos: {
                id: result.insertId,
                nota: nota.trim(),
                id_agenda: agenda.id,
                fecha,
                hora,
                id_paciente,
                id_cobertura,
                estado: "confirmado"
            }
        });
    } catch (error) {
        return res.status(500).json({ codigo: 500, estado: error.message, datos: null });
    }
};

module.exports = { darAltaTurno };