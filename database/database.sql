CREATE DATABASE IF NOT EXISTS fazenda_crud;
USE fazenda_crud;

CREATE TABLE vacas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brinco VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    peso DECIMAL(6, 2) NOT NULL,
    data_nascimento DATE NOT NULL
);

INSERT INTO vacas (brinco, nome, raca, peso, data_nascimento) VALUES
('BR-1001', 'Mimosa', 'Holandesa', 550.50, '2021-04-15'),
('BR-1002', 'Estrela', 'Nelore', 620.00, '2020-08-10'),
('BR-1003', 'Fumaça', 'Angus', 480.20, '2022-01-22');