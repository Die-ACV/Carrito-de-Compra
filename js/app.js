// variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // cuando agg un curso presionar "Agg al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  //   vaciar carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
  })
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    LeerDatosCursos(cursoSeleccionado);
  }
}

// elimina un curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // elimina del arreglo
    articulosCarrito = articulosCarrito.filter((curso) => curso.Id !== cursoId);

    carritoHTML();
  }
}

// lee el contenido del html al click y estare Inf. del curso
function LeerDatosCursos(curso) {
  // console.log(curso);

  // crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //   revisa si ya existe en el carrito

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // actualizamos cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // agga curso al carrito
    // agg elemnetos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// muestra carrito eHtml

function carritoHTML() {
  // limpiar el html
  limpiarHTML();

  // recorre el carrito y genear html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

    // agg el html del carrito en tbody
    contenedorCarrito.appendChild(row);
  });
}

// elimina los cursos del tbody
function limpiarHTML() {
  //   contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
