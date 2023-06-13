// Obtener la lista de contactos al cargar la página
obtenerContactos();

var loadingMessage; 

// Manejar el envío del formulario para agregar un nuevo contacto
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario

  // Obtener los valores del formulario
  var nombre = document.getElementById('name').value;
  var apellido = document.getElementById('lastname').value;
  var telefono = document.getElementById('number').value;

  // Crear el objeto de contacto
  var contacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
  };

  // Enviar el contacto al servidor
  agregarContacto(contacto);

  // Limpiar los campos del formulario
  document.getElementById('name').value = '';
  document.getElementById('lastname').value = '';
  document.getElementById('number').value = '';
});

// Función para agregar un nuevo contacto
function agregarContacto(contacto) {
  fetch('https://railway-node-express-production-3b13.up.railway.app/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contacto)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al agregar el contacto');
      }
    })
    .then(function(data) {
      console.log('Contacto agregado:', data);
      obtenerContactos(); // Actualizar la lista de contactos después de agregar uno nuevo
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}



// Función para obtener la lista de contactos
function obtenerContactos() {
  var loadingMessage = document.getElementById('loading-message');
  var showPanel = document.getElementById('show-panel');
  
  loadingMessage.style.display = 'block'; // Mostrar el mensaje de carga
  showPanel.style.display = 'none'; // Ocultar el panel de contactos
  
  fetch('https://railway-node-express-production-3b13.up.railway.app/scrape', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener los contactos');
      }
    })
    .then(function(data) {
      console.log('Contactos obtenidos:', data);
      mostrarContactos(data);
      loadingMessage.style.display = 'none'; // Ocultar el mensaje de carga
      showPanel.style.display = 'block'; // Mostrar el panel de contactos
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

//Mostrarresultados de la busqueda
function mostrarResultados(contactos) {
  var resultadosDiv = document.getElementById('results');
  resultadosDiv.innerHTML = ''; // Limpiar la lista de contactos

  var listaContactos = document.createElement('ul'); // Crear una lista

  contactos.forEach(function(contacto) {
    var contactoLi = document.createElement('li'); // Crear un elemento de lista
    var nombreCompleto = document.createElement('strong');
    nombreCompleto.innerHTML = contacto.nombre + ' ' + contacto.apellido;

    var numeroTelefono = document.createElement('span');
    numeroTelefono.innerHTML = contacto.telefono;

    contactoLi.appendChild(nombreCompleto);
    contactoLi.appendChild(document.createElement('br'));
    contactoLi.appendChild(numeroTelefono);

    // Estilizar el nombre completo y el número de teléfono
    nombreCompleto.style.fontWeight = 'bold';
    nombreCompleto.style.fontSize = '1.2em';
    numeroTelefono.style.fontSize = '1em';

    listaContactos.appendChild(contactoLi);
  });

  resultadosDiv.appendChild(listaContactos); // Agregar la lista al contenedor de contactos
}

// Función para mostrar la lista de contactos
// Función para mostrar la lista de contactos
function mostrarContactos(contactos) {
  var loadingMessage = document.getElementById('loading-message');
  var contactosDiv = document.getElementById('show-panel');
  contactosDiv.innerHTML = ''; // Limpiar la lista de contactos

  var listaContactos = document.createElement('ul'); // Crear una lista

  contactos.forEach(function(contacto) {
    var contactoLi = document.createElement('li'); // Crear un elemento de lista
    var nombreCompleto = document.createElement('strong');
    nombreCompleto.innerHTML = contacto.nombre + ' ' + contacto.apellido;

    var numeroTelefono = document.createElement('span');
    numeroTelefono.innerHTML = contacto.telefono;

    contactoLi.appendChild(nombreCompleto);
    contactoLi.appendChild(document.createElement('br'));
    contactoLi.appendChild(numeroTelefono);

    // Estilizar el nombre completo y el número de teléfono
    nombreCompleto.style.fontWeight = 'bold';
    nombreCompleto.style.fontSize = '1.2em';
    numeroTelefono.style.fontSize = '1em';

    listaContactos.appendChild(contactoLi);
  });

  contactosDiv.appendChild(listaContactos); // Agregar la lista al contenedor de contactos

}


// Event listeners para cambiar entre paneles
document.getElementById('js-show-all').addEventListener('click', function() {
  mostrarPanelContactos();
});

document.getElementById('js-search').addEventListener('click', function() {
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'block';
  document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-add-new').addEventListener('click', function() {
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'block';
});

// Manejar el envío del formulario de búsqueda
document.getElementById('search').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario

  // Obtener el término de búsqueda
  var searchTerm = document.getElementById('search-input').value;

  // Realizar la búsqueda
  buscarContactos(searchTerm);

  // Limpiar el campo de búsqueda
  document.getElementById('search-input').value = '';
});

//Manejar el panel que muestra todos los contactos


// Función para buscar contactos
function buscarContactos(searchTerm) {
  fetch('https://railway-node-express-production-3b13.up.railway.app/scrape', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al buscar los contactos');
      }
    })
    .then(function(data) {
      var results = data.filter(function(contacto) {
        return contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      });
      mostrarResultados(results);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
  mostrarPanelContactos();
});

// Función para mostrar el panel de todos los contactos al cargar la página
function mostrarPanelContactos() {

  document.getElementById('show-panel').style.display = 'block';   
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
  loadingMessage.style.display = 'block'; // Mostrar el mensaje de carga
   obtenerContactos(); // Obtener y mostrar la lista de contactos
}
