import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.js';
import connectDB from './database/database.js';

const __filename = fileURLToPath(import.meta.url); // Pega onde ta localizado esse arquivo
const __dirname = path.dirname(__filename); // Transforma em uma formatação mais acessivel, e pega o nome do diretorio onde ta localizado

const app = express();
const port = process.env.PORT;

// MongoDB
connectDB()

// Uses
app.use(express.json()); // Para ler arquivos JSON
app.use(express.urlencoded({ extended: true })); // Para receber urlencoded no body
app.use(express.static(path.join(__dirname, 'public'))); // Lê todos arquivos no diretorio /public e disponibiliza ao iniciar o servidor
app.use(router) // Para ler as rotas

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
