import express from 'express';
import cors from 'cors';
import vacaRoutes from './routes/vacaRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', vacaRoutes);

app.listen(port, () => {
    console.log(`Servidor Backend rodando com sucesso em http://localhost:${port}`);
});