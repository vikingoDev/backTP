# Readme de proyecto

## ¿Qué hace cada ruta?
GET / = Saludo para verificar que la API funciona.

GET /integrantes = Devuelve todos los integrantes.

GET /integrantes/:dni = Busca un integrante específico por su DNI.

POST /integrantes/agregar = Permite agregar un nuevo integrante.

PUT /integrantes/:email = Actualiza el apellido de un integrante usando su email.

DELETE /integrantes/:dni = Elimina un integrante del archivo JSON usando su DNI.

* * *

### 1. Iniciar el servidor
Ejecutar el servidor Express (previo a iniciar Postman): node app.js
Respuesta esperada: Servidor ejecutándose en http://localhost:3000

* * *

### 2. Iniciar Postman
Seleccioná el método HTTP correspondiente (GET, POST, PUT, DELETE).
Configurá la URL base: http://localhost:3000

* * *

### 3. Pruebas de ruta
Método: GET
- **URL:** http://localhost:3000/
Respuesta esperada: "API funcionando Ok"

* * *

### 4. Pruebas de métodos


#### **4.1 - GET**

4.1.1 Llamar lista de alumno
<ul>
<li>URL: http://localhost:3000/integrantes</li>
<li>Respuesta esperada: Lista de integrantes del equipo en formato JSON</li>
</ul>

4.1.2 Buscar alumno por DNI
<ul>
<li>URL: http://localhost:3000/integrantes/12345678</li>
<li>Respuesta esperada: Datos del integrante con ese DNI</li>
<li>Mensaje de error: "No se encontró alumno que responda a esos datos"</li>
</ul>

  
#### **4.2 POST**

4.2.1 Agregar alumno
<ul>
<li>URL: http://localhost:3000/integrantes/agregar</li>
<li>Body (JSON): Seleccioná raw → JSON. Agregar el formato JSON con los datos del nuevo integrante:</li>
</ul>
       
        {
        "nombre": "Cacho",
        "apellido": "Castaña",
        "dni": "001122334",
        "email": "cacho.johnson@gmail.com"
        }     

<ul>
<li>Respuesta esperada: Listado de JSON actualizado con nuevo integrante.</li>
<li>Mensaje de error: *"Faltan datos"*</li>
</ul>
       

#### 4.3 PUT

4.3.1 Actualizar apellido identificando por email
<ul>
<li>URL: http://localhost:3000/integrantes/cacho.johnson@gmail.com</li>
<li>Body (JSON): Seleccioná raw → JSON. ASeleccioná raw → JSON. Agregar en formato JSON:</li>
</ul>
       
        {
        "apellido": "Johnson"
        }   

<ul>
<li>Respuesta esperada: Elemento de JSON con datos del integrante actualizados (Cacho Johnson)</li>
<li>Mensaje de error: "No se encontró alumno que responda a esos datos"</li>
</ul>


#### 4.4 DELETE

4.4.1 Eliminar un integrante por DNI
<ul>
<li>URL: http://localhost:3000/integrantes/55555555</li>
<li>Respuesta esperada: Listado de JSON actualizado sin el integrante con el DNI ingresado.</li>
<li>Mensaje de error: "No se encontró alumno que responda a esos datos"</li>
</ul>
