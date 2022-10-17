
var vehiculos = [];

const serverip = "http://localhost:3000/concesionaria";

function addVehicleToList() {
    let vehiculo = {
        patente: document.querySelector('.patente').value,
        tipo: document.querySelector('.tipo').value,
        marca: document.querySelector('.marca').value,
        modelo: document.querySelector('.modelo').value,
        año: parseInt(document.querySelector('.anio').value),
        precio: parseInt(document.querySelector('.precio').value),
        capacidad: document.querySelector('.capacidad').value != "" ? parseInt(document.querySelector('.capacidad').value) : undefined
    }
    if (vehiculo.patente && vehiculo.marca && vehiculo.modelo && vehiculo.año && vehiculo.precio) {
        if (vehiculo.tipo == "Camioneta" && !vehiculo.capacidad) document.querySelector('.error').innerHTML = 'Faltan datos';
        else {
            vehiculos.push(vehiculo);
            document.querySelector('.error').innerHTML = '';
        }
    }
    else document.querySelector('.error').innerHTML = 'Faltan datos';
    loadVehicles();
}

function loadVehicles() {
    var listado = "";
    listado+=`
                <tr>
                    <th>Patente</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Precio</th>
                    <th>Año</th>
                    <th>Capacidad</th>
                    <th>Eliminar</th>
                </tr>
    `;
    for (let i = 0; i < vehiculos.length; i++) {
        const vehiculo = vehiculos[i];
        listado+=`
                <tr>
                    <td>${vehiculo.patente}</td>
                    <td>${vehiculo.capacidad ? 'Camioneta' : 'Auto'}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.precio}</td>
                    <td>${vehiculo.año}</td>
                    <td>${vehiculo.capacidad ? vehiculo.capacidad : '-'}</td>
                    <td><button class="btDel">X</button></td>
                </tr>
        `;
    }
    if (vehiculos.length == 0) document.querySelector('.addbt').style.display = "none";
    else document.querySelector('.addbt').style.display = "block";
    console.log(listado);
    document.querySelector('.vehicletable').innerHTML = listado;
    delButtons();
}

function delButtons() {
    let botones = document.getElementsByClassName('btDel');
    for (let i = 0; i < botones.length; i++) {
        const boton = botones[i];
        boton.addEventListener('click', () => {
            deleteFromTable(i);
        });
    }
}

function deleteFromTable(id) {
    console.log("oa");
    vehiculos.splice(id, 1);
    loadVehicles();
}

document.querySelector('.tipo').addEventListener('change', () => {
    if (document.querySelector('.tipo').value == "Camioneta") document.querySelector('.divcapacidad').style.display = "block";
    else {
        document.querySelector('.divcapacidad').style.display = "none";
        document.querySelector('.capacidad').value = undefined;
    }
})

document.querySelector('.submitbt').addEventListener('click', addVehicleToList);

document.querySelector('.addbt').addEventListener('click', async () => {
    console.log(JSON.stringify(vehiculos));
    let respuesta = await fetch(serverip + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculos)
    });
    document.querySelector('.info').innerHTML = await respuesta.text();
    if (respuesta.ok) {
        document.querySelector('.info').style.color = 'green';
    }
    else {
        document.querySelector('.info').style.color = 'red';
    }
})