import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const dataPath = path.join(__dirname, 'data', 'characters.json');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

const ensureDataDirectory = async () => {
    const dir = path.dirname(dataPath);
    try {
        await fs.promises.mkdir(dir, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
};

const readData = async () => {
    await ensureDataDirectory();
    try {
        const data = await fs.promises.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Créer le fichier avec des données par défaut
            const defaultData = { characters: [] };
            await writeData(defaultData);
            return defaultData;
        }
        throw error;
    }
};

const writeData = async (data) => {
    await ensureDataDirectory();
    await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.get('/characters', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.characters);
    } catch (error) {
        console.error("Erreur de lecture:", error);
        res.status(500).json({ error: 'Erreur de lecture des données' });
    }
});

app.get('/characters/all', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.characters);
    } catch (error) {
        console.error("Erreur de lecture:", error);
        res.status(500).json({ error: 'Erreur de lecture des données' });
    }
});

app.post('/characters', async (req, res) => {
    try {
        const data = await readData();
        const newCharacter = {
            id: Date.now(),
            ...req.body
        };
        data.characters.push(newCharacter);
        await writeData(data);
        res.status(201).json(newCharacter);
    } catch (error) {
        console.error("Erreur de création:", error);
        res.status(500).json({ error: 'Erreur de création' });
    }
});

app.put('/characters/:id', async (req, res) => {
    try {
        const data = await readData();
        const id = parseInt(req.params.id);
        const index = data.characters.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Personnage non trouvé' });
        }

        data.characters[index] = {
            ...data.characters[index],
            ...req.body
        };
        await writeData(data);
        res.json(data.characters[index]);
    } catch (error) {
        console.error("Erreur de mise à jour:", error);
        res.status(500).json({ error: 'Erreur de mise à jour' });
    }
});

app.delete('/characters/:id', async (req, res) => {
    try {
        const data = await readData();
        const id = parseInt(req.params.id);
        const index = data.characters.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Personnage non trouvé' });
        }

        const [deleted] = data.characters.splice(index, 1);
        await writeData(data);
        res.json(deleted);
    } catch (error) {
        console.error("Erreur de suppression:", error);
        res.status(500).json({ error: 'Erreur de suppression' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur backend sur http://localhost:${PORT}`);
});