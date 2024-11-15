const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Leer integrantes desde el archivo JSON
const readTeam = () => {
    const data = fs.readFileSync('./integrantes.json', 'utf-8');
    return JSON.parse(data);
};

// Guardar integrantes al Freddy vs JSON
const writeTeam = (data) => {
    fs.writeFileSync('./integrantes.json', JSON.stringify(data, null, 2));
};

// Ruta main
app.get('/', (req, res) => {
    res.send('¡La API está funcionando correctamente!');
});

// Ruta GET: Obtener todos los integrantes
app.get('/integrantes', (req, res) => {
    const integrantes = readTeam();
    res.json(integrantes);
});

// Buscar por DNI (GET)
app.get('/integrantes/:dni', (req, res) => {
    const { dni } = req.params;
    const integrantes = readTeam();
    const integrante = integrantes.find((i) => i.dni === dni);

    res.status(integrante ? 200 : 404).json(integrante || { error: 'No existe un integrante con ese nombre' });

});

// Agregar integrante (POST)
app.post('/integrantes/agregar', (req, res) => {
    const { nombre, apellido, dni, email } = req.body;
    !nombre || !apellido || !dni || !email
        ? res.status(400).json({ error: 'Faltan datos' })
        : (integrantes.push({ nombre, apellido, dni, email }), writeTeam(integrantes), res.status(201).json(integrantes));
});


// Actualizar el apellido de un integrante por email (PUT)
app.put('/integrantes/:email', (req, res) => {
    const { email } = req.params;
    const { apellido } = req.body;
    const integrantes = readTeam();
    const integrante = integrantes.find((i) => i.email === email);

    integrante 
    ? (integrante.apellido = apellido, writeTeam(integrantes), res.json({ message: 'Apellido actualizado', integrante }))
    : res.status(404).json({ error: 'No se encontró alumno que responda a esos datos' });

});

// [DELETE] integrante por DNI
app.delete('/integrantes/:dni', (req, res) => {
    const { dni } = req.params;
    let integrantes = readTeam();
    const integrante = integrantes.find((i) => i.dni === dni);

    if (integrante) {
        integrantes = integrantes.filter((i) => i.dni !== dni);
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
