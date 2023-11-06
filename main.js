const pacientesAlmacenados = localStorage.getItem("datosPacientes");
let pacientes = pacientesAlmacenados ? JSON.parse(pacientesAlmacenados) : [];

const imagenes = [
  "RandomImagenes/aiony-haust-3TLl_97HNJo-unsplash.jpg",
  "RandomImagenes/christian-buehner-DItYlc26zVI-unsplash.jpg",
  "RandomImagenes/descarga (1).jpeg",
  "RandomImagenes/descarga (2).jpeg",
  "RandomImagenes/descarga (3).jpeg",
  "RandomImagenes/descarga (4).jpeg",
  "RandomImagenes/descarga (5).jpeg",
  "RandomImagenes/descarga (6).jpeg",
  "RandomImagenes/descarga (7).jpeg",
  "RandomImagenes/descarga (8).jpeg",
  "RandomImagenes/descarga (9).jpeg",
  "RandomImagenes/descarga (10).jpeg",
  "RandomImagenes/descarga (11).jpeg",
  "RandomImagenes/descarga (12).jpeg",
  "RandomImagenes/descarga (13).jpeg",
  "RandomImagenes/descarga (14).jpeg",
  "RandomImagenes/descarga.jpeg",
  "RandomImagenes/jurica-koletic-7YVZYZeITc8-unsplash.jpg",
  "RandomImagenes/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
  "RandomImagenes/mohammad-khaksarmadani-4FDsNcCR8iQ-unsplash.jpg",
  "RandomImagenes/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg",
];

if (pacientes.length === 0) {
  pacientes = [
    {
      nombre: "Homero J.",
      apellido: "Simpson",
      edad: 36,
      direccion: "Calle siempreviva 742",
      diagnostico: "Crayon en el cerebro",
      fechaHoraIngreso: "16/10/2022 06:46 AM",
      imagen: "Homero.jpg",
    },
    {
      nombre: "Peter",
      apellido: "Parker",
      edad: 16,
      direccion: "69th Road, en Forest Hills",
      diagnostico: "Delirios de poderes por picadura de araña radioactiva",
      fechaHoraIngreso: "9/03/2023 04:22 PM",
      imagen: "Peter.jpg",
    },
    {
      nombre: "Bruce",
      apellido: "Wayne",
      edad: 40,
      direccion: "Mansion Wayne",
      diagnostico: "Quiroptofobia.",
      fechaHoraIngreso: "11/09/2001 08:46 AM",
      imagen: "Bruce.jpg",
    },
  ];
}

document
  .getElementById("boton-recuperar-contrasena")
  .addEventListener("click", () => {
    Swal.fire({
      title:
        "¿Quién ganó la Copa Mundial Qatar 2022?\n \n1-Uruguay\n2-Argentina\n3-Brasil\n4-Yo soy mas del anime",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (respuesta) => respuesta,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const respuesta = result.value;
        if (respuesta === "4") {
          Swal.fire({
            position: "center",
            icon: "error",
            title:
              "ESAAAA!!! AGUANTE ONE PIECE PAPAAAAA!\n... Ah cierto, Respuesta incorrecta señor usuario.",
            showConfirmButton: false,
            timer: 2200,
          });
        } else if (respuesta === "1" || respuesta === "3") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "¿Dónde vivís?\n ¿Dentro de una tetera?",
            showConfirmButton: false,
            timer: 1850,
          });
        } else if (respuesta === "2") {
          Swal.fire({
            title:
              "Ingresa el nombre del usuario para recuperar la contraseña:",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Buscar",
            showLoaderOnConfirm: true,
            preConfirm: (nombreUsuario) => {
              const usuarioEncontrado = usuariosRegistrados.find(
                (user) => user.username === nombreUsuario
              );
              if (!usuarioEncontrado) {
                Swal.showValidationMessage(
                  "Usuario no encontrado o mal escrito."
                );
              } else {
                const contrasena = usuarioEncontrado.contrasena;
                Swal.fire(
                  `Contraseña para ${nombreUsuario}: ${contrasena}`,
                  "",
                  "success"
                );
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.value) {
              const contrasena = result.value.contrasena;
              Swal.fire(
                `Contraseña para ${nombreUsuario}: ${contrasena}`,
                "",
                "success"
              );
            }
          });
        }
      } else if (isNaN(respuesta) || respuesta === " ") {
        Swal.fire({
          icon: "error",
          title:
            "ESAAAA!!! AGUANTE ONE PIECE PAPAAAAA!\n... Ah cierto, Respuesta incorrecta señor usuario.",
        });
      }
    });
  });

function iniciarSesion(usuario, contraseña) {
  const usuarioEncontrado = usuariosRegistrados.find(
    (user) => user.username === usuario && user.contrasena === contraseña
  );
  if (usuarioEncontrado) {
    return true;
  }
  return false;
}

function agregarPacienteManual(nombre, apellido, edad, direccion, diagnostico) {
  const imagenInput = document.getElementById("imagen-paciente");
  const previewImagen = document.getElementById("preview-imagen");
  const imagenRuta = imagenInput.value;

  if (
    !nombre ||
    !apellido ||
    isNaN(edad) ||
    !direccion ||
    !diagnostico ||
    !imagenRuta
  ) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Por favor ingrese datos válidos y una ruta de imagen válida.",
    });
    return false;
  }

  const fechaHoraIngreso = new Date();
  const horaIngreso = `${fechaHoraIngreso.getHours()}:${fechaHoraIngreso.getMinutes()} ${
    fechaHoraIngreso.getHours() >= 12 ? "PM" : "AM"
  }`;
  const fechaIngreso = `${fechaHoraIngreso.getDate()}/${
    fechaHoraIngreso.getMonth() + 1
  }/${fechaHoraIngreso.getFullYear()}`;

  const paciente = {
    nombre,
    apellido,
    edad,
    direccion,
    diagnostico,
    fechaHoraIngreso: `${fechaIngreso} ${horaIngreso}`,
    imagen: previewImagen.src,
  };

  pacientes.push(paciente);

  Swal.fire({
    icon: "success",
    title: "Paciente agregado con éxito!",
  });

  previewImagen.src = "";
  previewImagen.style.display = "none";

  actualizarListaPacientes();
  localStorage.setItem("datosPacientes", JSON.stringify(pacientes));
  return true;
}

function agregarPacienteServidor(
  nombre,
  apellido,
  edad,
  direccion,
  diagnostico,
  imagen
) {
  if (!nombre || !apellido || isNaN(edad) || !direccion || !diagnostico) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Por favor ingrese datos válidos.",
    });
    return false;
  }

  if (!imagen) {
    imagen = seleccionarImagenAleatoria();
  }

  if (!imagen) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se pudo seleccionar una imagen para el paciente.",
    });
    return false;
  }

  const fechaHoraIngreso = new Date();
  const horaIngreso = `${fechaHoraIngreso.getHours()}:${fechaHoraIngreso.getMinutes()} ${
    fechaHoraIngreso.getHours() >= 12 ? "PM" : "AM"
  }`;
  const fechaIngreso = `${fechaHoraIngreso.getDate()}/${
    fechaHoraIngreso.getMonth() + 1
  }/${fechaHoraIngreso.getFullYear()}`;

  const paciente = {
    nombre,
    apellido,
    edad,
    direccion,
    diagnostico,
    fechaHoraIngreso: `${fechaIngreso} ${horaIngreso}`,
    imagen,
  };

  pacientes.push(paciente);

  Swal.fire({
    icon: "success",
    title: "Paciente agregado desde el servidor con éxito!",
  });

  actualizarListaPacientes();
  localStorage.setItem("datosPacientes", JSON.stringify(pacientes));
  return true;
}

function eliminarPaciente(indice) {
  pacientes.splice(indice, 1);
  actualizarListaPacientes();
  localStorage.setItem("datosPacientes", JSON.stringify(pacientes));
}

function actualizarListaPacientes() {
  const listaPacientes = document.getElementById("lista-pacientes");
  listaPacientes.innerHTML = "";

  pacientes.forEach((paciente, indice) => {
    const itemPaciente = document.createElement("li");
    itemPaciente.innerHTML = `
      <img src="${paciente.imagen}" alt="${paciente.nombre} ${paciente.apellido}" class="imagen paciente-imagen">
      <div>
          <b>${paciente.nombre} ${paciente.apellido}</b><br>
          Edad: ${paciente.edad}<br>
          Direccion: ${paciente.direccion}<br>
          Hora y Fecha de Ingreso: ${paciente.fechaHoraIngreso}<br>
          Diagnóstico: ${paciente.diagnostico}
      </div>
      <button class="editar-paciente" data-indice="${indice}">Editar</button>
      <button class="eliminar-paciente" data-indice="${indice}">Eliminar</button>
      `;

    const botonEditar = itemPaciente.querySelector(".editar-paciente");
    botonEditar.addEventListener("click", function () {
      const indice = this.getAttribute("data-indice");
      editarPaciente(indice);
    });
    function editarPaciente(indice) {
      const paciente = pacientes[indice];

      Swal.fire({
        title: "Editar Paciente",
        html: `
            <label for="nombre">Nombre</label>
            <input id="nombre" class="swal2-input" value="${paciente.nombre}" placeholder="Nombre">
            <label for="apellido">Apellido</label>
            <input id="apellido" class="swal2-input" value="${paciente.apellido}" placeholder="Apellido">
            <label for="edad">Edad</label>
            <input id="edad" class="swal2-input" type="number" value="${paciente.edad}" placeholder="Edad">
            <label for="direccion">Dirección</label>
            <input id="direccion" class="swal2-input" value="${paciente.direccion}" placeholder="Dirección">
            <label for="diagnostico">Diagnóstico</label>
            <input id="diagnostico" class="swal2-input" value="${paciente.diagnostico}" placeholder="Diagnóstico">
          `,
        confirmButtonText: "Guardar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const nombre = Swal.getPopup().querySelector("#nombre").value;
          const apellido = Swal.getPopup().querySelector("#apellido").value;
          const edad = Swal.getPopup().querySelector("#edad").value;
          const direccion = Swal.getPopup().querySelector("#direccion").value;
          const diagnostico =
            Swal.getPopup().querySelector("#diagnostico").value;

          if (nombre && apellido && !isNaN(edad) && direccion && diagnostico) {
            paciente.nombre = nombre;
            paciente.apellido = apellido;
            paciente.edad = parseInt(edad);
            paciente.direccion = direccion;
            paciente.diagnostico = diagnostico;

            actualizarListaPacientes();
            localStorage.setItem("datosPacientes", JSON.stringify(pacientes));
            Swal.fire({
              icon: "success",
              title: "Paciente editado con éxito!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Por favor, ingrese datos válidos para el paciente.",
            });
          }
        }
      });
    }

    const botonEliminar = itemPaciente.querySelector(".eliminar-paciente");
    botonEliminar.addEventListener("click", function () {
      const indice = this.getAttribute("data-indice");
      eliminarPaciente(indice);
      Swal.fire({
        icon: "success",
        title: "Paciente eliminado con éxito!",
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
    contrasena: "lapelucaloca123",
  },
];
const url = "https://randomapi.com/api/4569b93697e9e06412f2930702a5385a";

document
  .getElementById("boton-agregar-pacientes-api")
  .addEventListener("click", function () {
    obtenerPacientesDesdeAPI();
  });

const imagenesUtilizadas = [];

function seleccionarImagenAleatoria() {
  if (imagenes.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * imagenes.length);
  const imagenAleatoria = imagenes[index];
  imagenesUtilizadas.push(imagenAleatoria);
  imagenes.splice(index, 1);

  return imagenAleatoria;
}

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
        const imagen = seleccionarImagenAleatoria();

        agregarPacienteServidor(
          nombre,
          apellido,
          edad,
          direccion,
          diagnostico,
          imagen
        );
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
    });
}

document
  .getElementById("boton-registrarse")
  .addEventListener("click", function () {
    const contenedorLogin = document.querySelector(".contenedor-login");
    contenedorLogin.style.display = "none";
    const contenedorRegistro = document.querySelector(".contenedor-registro");
    contenedorRegistro.style.display = "block";
  });

document
  .getElementById("formulario-registro")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const sexo = document.getElementById("sexo").value;
    const username = document.getElementById("username").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById(
      "confirmar-contrasena"
    ).value;

    if (contrasena !== confirmarContrasena) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden, por favor intente de nuevo",
      });
      return;
    }

    const nuevoUsuario = new Usuario(
      nombre,
      edad,
      email,
      sexo,
      username,
      contrasena
    );
    if (
      usuariosRegistrados.find(
        (user) => user.username === nuevoUsuario.username
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "El usuario ya existe, por favor se un poco mas original!",
      });
    } else {
      usuariosRegistrados.push(nuevoUsuario);
      Swal.fire({
        icon: "success",
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
document
  .getElementById("formulario-login")
  .addEventListener("submit", function (evento) {
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
        icon: "error",
        title: "Credenciales incorrectas. Intente de nuevo",
      });
    }
  });

document
  .getElementById("boton-cerrar-sesion")
  .addEventListener("click", cerrarSesion);

document
  .getElementById("boton-agregar-paciente")
  .addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "block";
    document.getElementById("formulario-paciente").style.display = "block";
    document.getElementById("imagen-paciente").value = "";
  });

document
  .getElementById("cerrarFormulario")
  .addEventListener("click", function () {
    const superposicion = document.getElementById("superposicion");
    superposicion.style.display = "none";
    document.getElementById("formulario-paciente").style.display = "none";
  });

document
  .getElementById("confirmarPaciente")
  .addEventListener("click", function () {
    const nombre = document.getElementById("nombre-paciente").value;
    const apellido = document.getElementById("apellido-paciente").value;
    const edad = document.getElementById("edad-paciente").value;
    const direccion = document.getElementById("direccion-paciente").value;
    const diagnostico = document.getElementById("diagnostico-paciente").value;

    if (agregarPacienteManual(nombre, apellido, edad, direccion, diagnostico)) {
      const superposicion = document.getElementById("superposicion");
      superposicion.style.display = "none";
      document.getElementById("formulario-paciente").style.display = "none";
    }
  });
document
  .getElementById("imagen-paciente")
  .addEventListener("change", function () {
    const previewImagen = document.getElementById("preview-imagen");
    const fileInput = this;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImagen.src = e.target.result;
        previewImagen.style.display = "block";
      };

      reader.readAsDataURL(fileInput.files[0]);
    } else {
      previewImagen.style.display = "none";
    }
  });
document.getElementById("reset-imagen").addEventListener("click", function () {
  const imagenInput = document.getElementById("imagen-paciente");
  const previewImagen = document.getElementById("preview-imagen");

  imagenInput.value = "";
  previewImagen.style.display = "none";
});
