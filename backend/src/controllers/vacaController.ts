import { Request, Response } from 'express';
import pool from '../config/database';

export const vacaController = {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { brinco, nome, raca, peso, data_nascimento } = req.body;

            if (!brinco || !nome || !raca || !peso || !data_nascimento) {
                res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
                return;
            }

            const checkQuery = 'SELECT id FROM vacas WHERE brinco = ? OR nome = ?';
            const [vacasExistentes]: any = await pool.execute(checkQuery, [brinco, nome]);

            if (vacasExistentes.length > 0) {
                res.status(409).json({ erro: 'Já existe uma vaca cadastrada com este Brinco ou Nome!' });
                return;
            }

            const query = 'INSERT INTO vacas (brinco, nome, raca, peso, data_nascimento) VALUES (?, ?, ?, ?, ?)';
            await pool.execute(query, [brinco, nome, raca, peso, data_nascimento]);
            
            res.status(201).json({ mensagem: 'Vaca cadastrada com sucesso!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro interno no servidor ao cadastrar.' });
        }
    },

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const [rows] = await pool.execute('SELECT * FROM vacas');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar os dados.' });
        }
    },

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const [rows]: any = await pool.execute('SELECT * FROM vacas WHERE id = ?', [id]);
            
            if (rows.length === 0) {
                res.status(404).json({ erro: 'Vaca não encontrada.' });
                return;
            }
            res.status(200).json(rows[0]);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar os detalhes.' });
        }
    },

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { brinco, nome, raca, peso, data_nascimento } = req.body;

            if (!brinco || !nome || !raca || !peso || !data_nascimento) {
                res.status(400).json({ erro: 'Todos os campos são obrigatórios para atualizar!' });
                return;
            }

            const checkQuery = 'SELECT id FROM vacas WHERE (brinco = ? OR nome = ?) AND id != ?';
            const [vacasExistentes]: any = await pool.execute(checkQuery, [brinco, nome, id]);

            if (vacasExistentes.length > 0) {
                res.status(409).json({ erro: 'Já existe OUTRA Vaca utilizando este Brinco ou Nome!' });
                return;
            }

            const query = 'UPDATE vacas SET brinco = ?, nome = ?, raca = ?, peso = ?, data_nascimento = ? WHERE id = ?';
            const [result]: any = await pool.execute(query, [brinco, nome, raca, peso, data_nascimento, id]);

            if (result.affectedRows === 0) {
                res.status(404).json({ erro: 'Vaca não encontrada para atualização.' });
                return;
            }

            res.status(200).json({ mensagem: 'Dados atualizados com sucesso!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar os dados.' });
        }
    },

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const [result]: any = await pool.execute('DELETE FROM vacas WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                res.status(404).json({ erro: 'Vaca não encontrada para exclusão.' });
                return;
            }

            res.status(200).json({ mensagem: 'Vaca removida com sucesso!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao deletar.' });
        }
    }
};