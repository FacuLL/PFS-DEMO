var params = {}

const serverip = "http://localhost:3000/concesionaria";

function loadQuery() {
    let url = window.location.href;
    let query = url.split('?')[1];
    let queryparams = query.split('&');
    for (let i = 0; i < queryparams.length; i++) {
        const par = queryparams[i];
        let key = par.split('=')[0];
        let value = par.split('=')[1]
        params[key] = value;
    }
}

async function loadVehicle() {
    let respuesta = await fetch(serverip + `/?patente=${params.patente}`);
    if (respuesta.ok) {
        let vehiculos = await respuesta.json();
        if (vehiculos.length == 1) {
            let vehiculo = vehiculos[0]
            document.querySelector('.vehicleType').innerHTML = `${vehiculo.patente} - ${vehiculo.capacidad ? 'Camioneta' : 'Auto'}`;
            document.querySelector('.tipo').value = vehiculo.capacidad ? 'Camioneta' : 'Auto';
            document.querySelector('.marca').value = vehiculo.marca;
            document.querySelector('.modelo').value = vehiculo.modelo;
            document.querySelector('.anio').value = vehiculo.año;
            document.querySelector('.precio').value = vehiculo.precio;
            if (vehiculo.capacidad) {
                document.querySelector('.divcapacidad').style.display = "block";
                document.querySelector('.capacidad').value = vehiculo.capacidad;
            }
        }
        else {
            document.querySelector('.vehicleType').innerHTML = `No existe vehiculo con dicha patente`;
            document.querySelector('.midcontainer').style.display = 'none';
        }
    }
}

loadQuery();
loadVehicle();

document.querySelector('.tipo').addEventListener('change', () => {
    if (document.querySelector('.tipo').value == "Camioneta") document.querySelector('.divcapacidad').style.display = "block";
    else {
        document.querySelector('.divcapacidad').style.display = "none";
        document.querySelector('.capacidad').value = '';
    }
})

document.querySelector('.btDel').addEventListener('click', async () => {
    let respuesta = await fetch(serverip + `/${params.patente}`, {
        method:'DELETE'
    })
    if (respuesta.ok) {
        let text = await respuesta.text();
        if (text == 'Vehiculo eliminado con exito') {
            window.location = '../concesionaria.html'
        }
        else document.querySelector('.error').innerHTML = text;
    }
})

document.querySelector('.submitbt').addEventListener('click', async () => {
    let vehiculo = {
        patente: params.patente,
        tipo: document.querySelector('.tipo').value,
        marca: document.querySelector('.marca').value,
        modelo: document.querySelector('.modelo').value,
        año: parseInt(document.querySelector('.anio').value),
        precio: parseInt(document.querySelector('.precio').value),
        capacidad: document.querySelector('.capacidad').value != "" ? parseInt(document.querySelector('.capacidad').value) : undefined
    }
    let respuesta = await fetch(serverip + `/${params.patente}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
    });
    if (respuesta.ok) {
        let text = await respuesta.text();
        document.querySelector('.error').innerHTML = text;
    }
})