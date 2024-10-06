document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');

    function agregarContacto(contacto) {
        console.log('Enviando contacto en JSON:', JSON.stringify(contacto));

        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            body: JSON.stringify(contacto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            obtenerContactos();
        })
        .catch(error => {
            console.error('Error en la solicitud POST:', error);
        });
    }

    function obtenerContactos() {
        fetch('http://www.raydelto.org/agenda.php')
            .then(response => response.json())
            .then(data => {
                const contactList = document.getElementById('contactList');
                contactList.innerHTML = ''; 
                data.forEach(contacto => {
                    const li = document.createElement('li');
                    li.textContent = `${contacto.nombre} ${contacto.apellido} - ${contacto.telefono}`;
                    contactList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error al obtener los contactos:', error);
            });
    }

    submitButton.addEventListener('click', function() {
        const nuevoContacto = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            telefono: document.getElementById('telefono').value.trim()
        };

        if (nuevoContacto.nombre && nuevoContacto.apellido && nuevoContacto.telefono) {
            agregarContacto(nuevoContacto);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('telefono').value = '';
        } else {
            console.error('Faltan campos obligatorios');
        }
    });

    obtenerContactos();
});
