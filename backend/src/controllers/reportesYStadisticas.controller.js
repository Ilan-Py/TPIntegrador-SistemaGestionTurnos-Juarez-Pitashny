const pool = require("../database/database");

const formatearFecha = (fechas) => {
    const fecha = new Date(fechas);

    if (isNaN(fecha.getTime())) {
        return null;
    };

    return fecha;
};

//Muestra de turnos por especialidad - Administrador
const turnosPorEspecialidad = async (req, res) =>  {

    try {
        
        //Si el rol distinto de Admin. error 403
        if (req.usuario.rol !== "administrador") {
                return res.status(403).json ({
                    codigo: 403,
                    estado: "Solo el administrador puede acceder a los reportes y estadisticas",
                    datos: null
                }); 
            }

            const { desde, hasta, id_especialidad } = req.body;

            //Si los input estan vacios error 400
            if (!desde?.trim() || !hasta?.trim()) {
                return res.status(400).json({
                    codigo: 400,
                    estado: "Fecha ingresada invalida"
                });
            };

            //Si los input no pertenecen al tipo Date error 400
            if (!(formatearFecha(desde) instanceof Date) || !(formatearFecha(hasta) instanceof Date)) {
                return res.status(400).json({
                    codigo: 400,
                    estado: "Dato ingresado invalido, formato de fecha año-mes-día"
                });
            };

            //Si la primer fecha es mayor error 400
            if (formatearFecha(desde) > formatearFecha(hasta)) {
                return res.status(400).json({
                    codigo: 400,
                    estado: "La primer fecha debe ser menor o igual a la segunda fecha"
                });
            };

            const fechaDesde = formatearFecha(desde).toLocaleDateString('en-CA');
            const fechaHasta = formatearFecha(hasta).toLocaleDateString('en-CA');

            //Si el input id no es un dato numero o esta vacio error 400
            if (!id_especialidad || isNaN(id_especialidad) || id_especialidad <= 0) {
                return res.status(400).json({
                    codigo: 400,
                    estado: "Dato ingresado invalido",
                    datos: null
                });
            }

        const [turnos] = await pool.query(
            `SELECT t.id AS id_turno, t.fecha, t.id_paciente, e.descripcion
            FROM turno t
            INNER JOIN agenda a ON a.id = t.id_agenda
            INNER JOIN especialidad e ON e.id = a.id_especialidad
            WHERE e.id = ?
            AND t.fecha BETWEEN ? AND ?
            ORDER BY t.fecha`,
            [id_especialidad, fechaDesde, fechaHasta ]
        );

        //Si especialidad con ese id no existe o no posee turnos error 404
        if (turnos.length === 0) {
            return res.status(404).json({
                codigo: 404,
                estado: "Especialidad inexistente o sin turnos",
                datos: null
            });
        };

        return res.status(200).json({
            codigo: 200,
            estado: `Cantidad de turnos existentes en la especialidad ${turnos[0]?.descripcion ?? "sin turnos disponibles en ese rango de fechas"}: ${turnos.length}`,
            datos: turnos
        });

    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            codigo: 500,
            estado: "Error al obtener el reporte",
            datos: null
        });
    }
};

module.exports = { turnosPorEspecialidad };