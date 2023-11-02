const pacientesAlmacenados = localStorage.getItem('datosPacientes');
let pacientes = pacientesAlmacenados ? JSON.parse(pacientesAlmacenados) : [];

if (pacientes.length === 0) {
    pacientes = [
        {
            nombre: "Homero J.",
            apellido: "Simpson",
            edad: 36,
            direccion: "Calle siempreviva 742",
            diagnostico: "Crayon en el cerebro",
            fechaHoraIngreso: "16/10/2022 06:46 AM"
        },
        {
            nombre: "Peter",
            apellido: "Parker",
            edad: 16,
            direccion: "69th Road, en Forest Hills",
            diagnostico: "Delirios de poderes por picadura de araña radioactiva",
            fechaHoraIngreso: "9/03/2023 04:22 AM"
        },
        {
            nombre: "Bruce",
            apellido: "Wayne",
            edad: 40,
            direccion: "Mansion Wayne",
            diagnostico: "quiroptofobia.",
            fechaHoraIngreso: "11/09/2001 08:46 AM"
        }
    ];
}

document.getElementById("boton-recuperar-contrasena").addEventListener("click", function () {
    Swal.fire({
      title: '¿Quién ganó la Copa Mundial Qatar 2022?\n \n1-Uruguay\n2-Argentina\n3-Brasil\n4-Yo soy mas del anime',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (respuesta) => {
        return respuesta;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const respuesta = result.value;
        if (respuesta === "4") {
            Swal.fire({position: 'center',
            icon: 'error',
            title: 'ESAAAA!!! AGUANTE ONE PIECE PAPAAAAA!\n... Ah cierto, Respuesta incorrecta señor usuario.',
            showConfirmButton: false,
            timer: 2200});
        } else if (respuesta === "1" || respuesta === "3") {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¿Dónde vivís?\n ¿Dentro de una tetera?',
            showConfirmButton: false,
            timer: 1850
          });
        } else if (respuesta === "2") {
            Swal.fire({
              title: 'Ingresa el nombre del usuario para recuperar la contraseña:',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Buscar',
              showLoaderOnConfirm: true,
              preConfirm: (nombreUsuario) => {
                const usuarioEncontrado = usuariosRegistrados.find(user => user.username === nombreUsuario);
                if (!usuarioEncontrado) {
                  Swal.showValidationMessage('Usuario no encontrado o mal escrito.');
                }
                else {
                    const contrasena = usuarioEncontrado.contrasena;
                    Swal.fire(`Contraseña para ${nombreUsuario}: ${contrasena}`, '', 'success');
                  }
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.value) {
                const contrasena = result.value.contrasena;
                Swal.fire(`Contraseña para ${nombreUsuario}: ${contrasena}`, '', 'success');
              }
            });
          }
        } else if (isNaN(respuesta) || (respuesta === " ")) {
            Swal.fire({icon: 'error',
            title:'ESAAAA!!! AGUANTE ONE PIECE PAPAAAAA!\n... Ah cierto, Respuesta incorrecta señor usuario.'});
        }
      }
    );
});
function iniciarSesion(usuario, contraseña) {
    const usuarioEncontrado = usuariosRegistrados.find(user => user.username === usuario && user.contrasena === contraseña);
    if (usuarioEncontrado) {
        return true; 
    }
    return false; 
}


function agregarPaciente(nombre, apellido, edad, direccion, diagnostico) {
    if (!nombre || !apellido || isNaN(edad) || !direccion || !diagnostico) {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Por favor ingrese datos validos para el paciente!',
          })
        return false;
    }
    const fechaHoraIngreso = new Date();
    const horaIngreso = `${fechaHoraIngreso.getHours()}:${fechaHoraIngreso.getMinutes()} ${fechaHoraIngreso.getHours() >= 12 ? 'PM' : 'AM'}`;
    const fechaIngreso = `${fechaHoraIngreso.getDate()}/${fechaHoraIngreso.getMonth() + 1}/${fechaHoraIngreso.getFullYear()}`;
    pacientes.push({
        nombre,
        apellido,
        edad,
        direccion,
        diagnostico,
        fechaHoraIngreso: `${fechaIngreso} ${horaIngreso}`
    });
    Swal.fire({
        icon: 'success',
        title: 'Paciente agregado con exito!',
      });
    actualizarListaPacientes();
    localStorage.setItem('datosPacientes', JSON.stringify(pacientes));
    return true;
}

function eliminarPaciente(indice) {
    pacientes.splice(indice, 1);
    actualizarListaPacientes();
    localStorage.setItem('datosPacientes', JSON.stringify(pacientes));
}

function actualizarListaPacientes() {
    const listaPacientes = document.getElementById("lista-pacientes");
    listaPacientes.innerHTML = "";

    pacientes.forEach((paciente, indice) => {
        const itemPaciente = document.createElement("li");
        itemPaciente.innerHTML = `
            <div>
                <b>${paciente.nombre} ${paciente.apellido}</b><br>
                Edad: ${paciente.edad}<br>
                Direccion: ${paciente.direccion}<br>
                Hora y Fecha de Ingreso: ${paciente.fechaHoraIngreso}<br>
                Diagnóstico: ${paciente.diagnostico}
            </div>
            <button class="eliminar-paciente" data-indice="${indice}">Eliminar</button>
        `;

        const botonEliminar = itemPaciente.querySelector(".eliminar-paciente");
        botonEliminar.addEventListener("click", function() {
            const indice = this.getAttribute("data-indice");
            eliminarPaciente(indice);
            Swal.fire({
                icon: 'success',
                title: 'Paciente eliminado con exito!',
              });
        });

        listaPacientes.appendChild(itemPaciente);
    });
}

function cerrarSesion() {
    const contenedorLogin = document.querySelector(".contenedor-login");
    contenedorLogin.style.display = "block";
    const contenedorAdmin = document.querySelector(".contenedor-admin");
    contenedorAdmin.style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("contenedor-mensaje").style.display = "none";
}

function Usuario(nombre, edad, email, sexo, username, contrasena) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.sexo = sexo;
    this.username = username;
    this.contrasena = contrasena;
}

const usuariosRegistrados = [
    {
    nombre: "Codersito",
    edad: 0, 
    email: "correo@coder.com",
    sexo: "M",
    username: "Coder", 
    contrasena: "lapelucaloca123"
}
];
const url = "https://randomapi.com/api/4569b93697e9e06412f2930702a5385a";

document.getElementById("boton-agregar-pacientes-api").addEventListener("click", function () {
  obtenerPacientesDesdeAPI();
});

function obtenerPacientesDesdeAPI() {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      const resultados = data.results;
      resultados.forEach((item) => {
        const nombre = item.first;
        const apellido = item.last;
        const edad = item.age;
        const direccion = item.address;
        const diagnostico = item.diagnosis;

        agregarPaciente(nombre, apellido, edad, direccion, diagnostico);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
    });
}



document.getElementById("boton-registrarse").addEventListener("click", function () {
    const contenedorLogin = document.querySelector(".contenedor-login");
    contenedorLogin.style.display = "none";
    const contenedorRegistro = document.querySelector(".contenedor-registro");
    contenedorRegistro.style.display = "block";
});

document.getElementById("formulario-registro").addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const sexo = document.getElementById("sexo").value;
    const username = document.getElementById("username").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar-contrasena").value;

    if (contrasena !== confirmarContrasena) {
        Swal.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden, por favor intente de nuevo',
          });
        return;
    }

    const nuevoUsuario = new Usuario(nombre, edad, email, sexo, username, contrasena);
    if (usuariosRegistrados.find(user => user.username === nuevoUsuario.username)) {
        Swal.fire({
            icon: 'error',
            title: 'El usuario ya existe, por favor se un poco mas original!',
          });;
    } else {
        usuariosRegistrados.push(nuevoUsuario);
        Swal.fire({
            icon: 'success',
            title: `Se ha registrado al usuario ${username} correctamente.`,
          });
     
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sexo").value = "";
        document.getElementById("username").value = "";
        document.getElementById("contrasena").value = "";
        document.getElementById("confirmar-contrasena").value = "";

        const contenedorLogin = document.querySelector(".contenedor-login");
        contenedorLogin.style.display = "block";
        const contenedorRegistro = document.querySelector(".contenedor-registro");
        contenedorRegistro.style.display = "none";
    }
});
document.getElementById("formulario-login").addEventListener("submit", function (evento) {
    evento.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (iniciarSesion(usuario, contraseña)) {
        const contenedorLogin = document.querySelector(".contenedor-login");
        contenedorLogin.style.display = "none";
        const contenedorAdmin = document.querySelector(".contenedor-admin");
        contenedorAdmin.style.display = "block";
        actualizarListaPacientes();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas. Intente de nuevo',
          });
    }
});

document.getElementById("boton-cerrar-sesion").addEventListener("click", cerrarSesion);

document.getElementById("boton-agregar-paciente").addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "block";
    document.getElementById("formulario-paciente").style.display = "block";
});

document.getElementById("cerrarFormulario").addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "none";
    document.getElementById("formulario-paciente").style.display = "none";
});

document.getElementById("confirmarPaciente").addEventListener("click", function () {
    const nombre = document.getElementById("nombre-paciente").value;
    const apellido = document.getElementById("apellido-paciente").value;
    const edad = document.getElementById("edad-paciente").value;
    const direccion = document.getElementById("direccion-paciente").value;
    const diagnostico = document.getElementById("diagnostico-paciente").value;

    if (agregarPaciente(nombre, apellido, edad, direccion, diagnostico)) {
        const superposicion = document.getElementById("superposicion");
        superposicion.style.display = "none";
        document.getElementById("formulario-paciente").style.display = "none";
    }
});