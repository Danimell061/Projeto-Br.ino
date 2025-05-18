import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Formulario, { Contador } from './formulario.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB", error);
  }
};
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rotas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/contato", async (req, res) => {
  try {
    const novoFormulario = await Formulario.create(req.body);
    // res.json(novoFormulario);
    res.status(201).json({ message: "Mensagem enviada com sucesso!" });
    console.log("Dados recebidos:", req.body);
  }catch (error) {
    console.error("Erro ao salvar no MongoDB", error);
  }
});