require("dotenv").config();

const express    = require("express");
const morgan     = require("morgan");
const cors       = require("cors");
const authRoutes = require("./routes/auth.routes");
const sedeRoutes = require("./routes/sede.routes");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/sedes", sedeRoutes);

app.get("/health", (req, res) => {
  res.json({ codigo: 200, estado: "ok", datos: { mensaje: "Servidor activo" } }); //puse para verificar el estado del servidor mas facil
});

app.use((req, res) => {
  res.status(404).json({ codigo: 404, estado: "Ruta no encontrada", datos: null });
});

module.exports = app;
