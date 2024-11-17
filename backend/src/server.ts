import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const movieRentRoutes = require("./routes/movieRentRoutes");

app.use(
  cors({
    origin: "http://localhost:3002", // Permitir solicitações vindas do domínio da sua aplicação Next.js
    credentials: true, // Permitir que a aplicação Next.js envie cookies junto com a requisição (se aplicável)
  })
);

app.use("/", userRoutes);
app.use("/", movieRoutes);
app.use("/", movieRentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
