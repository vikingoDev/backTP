const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Leer integrantes desde el archivo JSON
const readTeam = () => {
    try {
        const data = fs.readFileSync('./integrantes.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo:', error.message);
        return [];
    }
};

// Guardar integrantes al Freddy vs JSON
const writeTeam = (data) => {
    try {
        fs.writeFileSync('./integrantes.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error escribiendo el archivo:', error.message);
    }
};

// Inicializar la lista de integrantes
let integrantes = readTeam();

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡La API está funcionando correctamente!');
});

// Ruta GET: Obtener todos los integrantes
app.get('/integrantes', (req, res) => {
    res.json(integrantes);
});

// Buscar por DNI (GET)
app.get('/integrantes/:dni', (req, res) => {
    const { dni } = req.params;
    const integrante = integrantes.find((i) => i.dni === dni);

    res.status(integrante ? 200 : 404).json(integrante || { error: 'No existe un integrante con ese DNI' });
});

// Agregar integrante (POST)
app.post('/integrantes/agregar', (req, res) => {
    const { nombre, apellido, dni, email } = req.body;
    if (!nombre || !apellido || !dni || !email) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const nuevoIntegrante = { nombre, apellido, dni, email };
    integrantes.push(nuevoIntegrante);
    writeTeam(integrantes);
    res.status(201).json(integrantes);
});

// Actualizar el apellido de un integrante por email (PUT)
app.put('/integrantes/:email', (req, res) => {
    const { email } = req.params;
    const { apellido } = req.body;
    const integrante = integrantes.find((i) => i.email === email);

    if (integrante) {
        integrante.apellido = apellido;
        writeTeam(integrantes);
        res.json({ message: 'Apellido actualizado', integrante });
    } else {
        res.status(404).json({ error: 'No se encontró un integrante con ese email' });
    }
});

// [DELETE] integrante por DNI
app.delete('/integrantes/:dni', (req, res) => {
    const { dni } = req.params;
    const integranteIndex = integrantes.findIndex((i) => i.dni === dni);

    if (integranteIndex !== -1) {
        integrantes.splice(integranteIndex, 1); // Eliminar el integrante
        writeTeam(integrantes);
        res.json(integrantes);
    } else {
        res.status(404).json({ error: 'Integrante no encontrado' });
    }
});

// Run server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});