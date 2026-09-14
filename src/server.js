import express from "express";
import { prisma} from "./lib/prisma.ts"
import cors from "cors"

const app = express()
const PORT = 3001
app.use(cors());
app.use(express.json());



app.post("/treinos", async (req, res) =>{
    const {nome, objetivo} = req.body;
    try{
        const novoTreino = await prisma.treino.create({
            data: {nome, objetivo}
        });
        
        res.status(201).json(novoTreino)
    } catch(error){
        res.status(400).json({error: "Erro ao criar o treino"})
    }
})

app.get("/treinos", async (req, res) =>{
    try{
        const treinos = await prisma.treino.findMany()
        res.json(treinos)

    } catch(error){
        res.status(500).json({error: "Erro ao buscar os treinos"})
    }
});

app.post("/exercicios", async (req, res) =>{
    const {nome, grupoMuscular} = req.body;
    try{
        const novoExercicio = await prisma.exercicios.create({
            data: {nome, grupoMuscular}
        });

        res.status(201).json(novoExercicio)
    } catch(error){
        res.status(400).json({error: "Erro ao criar o exercício"})
    }
})

app.get("/exercicios", async (req, res) =>{
    try{
        const exercicios = await prisma.exercicios.findMany();
        res.json(exercicios);
    } catch(error){
        res.status(500).json({error: "Erro ao listar os exercícios"})
    }
})

app.post("/treinos/vincular", async (req, res) =>{
    const {treinoId, exercicioId} = req.body;
    try{
        const vinculo = await prisma.treinoExercicio.create({
            data: {treinoId, exercicioId}
        });

        res.status(201).json(vinculo)
    } catch(error){
        res.status(400).json({error: "Erro ao vincular o exercício ao treino."})
    }
})

app.get("/treinos/:id/exercicios", async (req, res) =>{
    const {id} = req.params;
    try{
        const exercicios = await prisma.treinoExercicio.findMany({
            where: {
                treinoId: Number(id)
            },
            include: {
                exercicio: true
            }
        });

        res.json(exercicios);
    } catch(error){
        res.status(500).json({error: "Erro ao buscar exercícios do treino."})
    }
})

app.put("/treinos/:id", async (req, res) =>{
    const {id} = req.params;
    const {nome, objetivo} = req.body;
    try{
        const atualizado = await prisma.treino.update({
            where: {id: Number(id)},
            data: {nome, objetivo}
        });
        res.json(atualizado)
    } catch(error){
        res.status(404).json({error: "Treino não encontrado"})
    }
})

app.delete("/treinos/:id/exercicios/:exercicioId", async (req, res) => {
    const {id, exercicioId} = req.params;

    try {
        await prisma.treinoExercicio.delete({
            where: {
                treinoId_exercicioId: {
                    treinoId: Number(id),
                    exercicioId: Number(exercicioId)
                }
            }
        });

        res.status(204).send();
    } catch (error) {
        res.status(404).json({
            error: "Vínculo não encontrado"
        });
    }
});

app.delete("/treinos/:id", async (req, res) =>{
    const {id} = req.params;
    try{
        await prisma.treino.delete({
            where: {id: Number(id)}
        })
        res.status(204).send()
    } catch(error){
        res.status(404).json({error: "Treino não encontrado"})
    }
})

app.listen(PORT, () =>{
    console.log(`API rodando em: http://localhost:${PORT}`)
})