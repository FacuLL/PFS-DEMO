const serverip = "http://localhost:3000/concesionaria";

function loadVehicles(vehiculos) {
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
                </tr>
    `;
    for (let i = 0; i < vehiculos.length; i++) {
        const vehiculo = vehiculos[i];
        listado+=`
                <tr>
                    <td><a href="concesionaria/editar.html?patente=${vehiculo.patente}">${vehiculo.patente}</a></td>
                    <td>${vehiculo.capacidad ? 'Camioneta' : 'Auto'}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.precio}</td>
                    <td>${vehiculo.año}</td>
                    <td>${vehiculo.capacidad ? vehiculo.capacidad : '-'}</td>
                </tr>
        `;
    }
    document.querySelector('.vehicletable').innerHTML = listado;
}

async function getAllVehicles() {
    var respuesta = await fetch(serverip + "/");
    if (respuesta.ok) {
        var vehiculos = await respuesta.json();
        loadVehicles(vehiculos);
    }
}

async function filterVehicles() {
    var params = {
        patente: document.querySelector('.patente').value,
        tipo: document.querySelector('.tipo').value,
        marca: document.querySelector('.marca').value,
        modelo: document.querySelector('.modelo').value,
        añoinicial: document.querySelector('.anioinicial').value,
        añofinal: document.querySelector('.aniofinal').value,
        precioinicial: document.querySelector('.precioinicial').value,
        preciofinal: document.querySelector('.preciofinal').value
    }
    var query = '?';
    for (let i = 0; i < Object.keys(params).length; i++) {
        let key = Object.keys(params)[i];
        if(params[key]) query+=`${key}=${params[key]}&`;
    }
    query = query.split('');
    query.splice(query.length - 1, 1);
    query = query.join('');
    console.log(query);
    var respuesta = await fetch(serverip + `/${query}`, {
        method: 'GET'
    });
    if (respuesta.ok) {
        var vehiculos = await respuesta.json();
        console.log(vehiculos);
        loadVehicles(vehiculos);
    }
    else {
        console.log('error')
    }
}

getAllVehicles();

document.querySelector('.submitbt').addEventListener('click', filterVehicles)