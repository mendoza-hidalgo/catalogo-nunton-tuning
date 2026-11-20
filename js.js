const modelos = [

    {
        id: "yz250",
        marca: "Yamaha",
        modelo: "YZ 250",
        categoria: "motocross",
        descripcion:
            "Diseños personalizados para Yamaha YZ 250.",
        imagen: "imagenes/yamaha.jpg"
    },

    {
        id: "crf250",
        marca: "Honda",
        modelo: "CRF 250",
        categoria: "motocross",
        descripcion:
            "Gráficos personalizados para Honda CRF 250.",
        imagen: "imagenes/honda.jpg"
    },

    {
        id: "duke390",
        marca: "KTM",
        modelo: "Duke 390",
        categoria: "deportivas",
        descripcion:
            "Diseños deportivos para KTM Duke 390.",
        imagen: "imagenes/ktm.jpg"
    },

    {
        id: "tenere700",
        marca: "Yamaha",
        modelo: "Tenere 700",
        categoria: "tracking",
        descripcion:
            "Diseños para Yamaha Tenere 700.",
        imagen: "imagenes/ejemplo.jpg"
    }

];


/* MENU */

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.getElementById("menu");


if (menuBtn && menu) {

    menuBtn.addEventListener(
        "click",
        () => {

            menu.classList.toggle("abierto");

        }
    );

}


/* CREAR TARJETA */

function crearTarjeta(moto) {

    return `

        <article class="modelo-card">

            <div class="modelo-imagen">

                <img
                    src="${moto.imagen}"
                    alt="${moto.marca} ${moto.modelo}"
                    loading="lazy"
                >

            </div>

            <div class="modelo-info">

                <div class="modelo-marca">
                    ${moto.marca}
                </div>

                <h3>
                    ${moto.modelo}
                </h3>

                <p>
                    ${moto.descripcion}
                </p>

                <a
                    href="Modelo.html?id=${moto.id}"
                    class="modelo-boton"
                >
                    Ver catálogo →
                </a>

            </div>

        </article>

    `;

}


/* MODELOS DESTACADOS */

const destacados =
    document.getElementById(
        "modelosDestacados"
    );


if (destacados) {

    destacados.innerHTML =
        modelos
            .map(crearTarjeta)
            .join("");

}


/* CATÁLOGO */

const lista =
    document.getElementById(
        "listaModelos"
    );


const busqueda =
    document.getElementById(
        "busqueda"
    );


let categoriaActual = "todos";


function actualizarCatalogo() {

    if (!lista) return;


    const texto =
        busqueda
            ? busqueda.value
                .toLowerCase()
                .trim()
            : "";


    const filtrados =
        modelos.filter(moto => {

            const coincideCategoria =
                categoriaActual === "todos" ||
                moto.categoria === categoriaActual;


            const contenido =
                ${moto.marca} ${moto.modelo}
                    .toLowerCase();


            const coincideTexto =
                contenido.includes(texto);


            return (
                coincideCategoria &&
                coincideTexto
            );

        });


    lista.innerHTML =
        filtrados
            .map(crearTarjeta)
            .join("");


    const sinResultados =
        document.getElementById(
            "sinResultados"
        );


    if (sinResultados) {

        sinResultados.style.display =
            filtrados.length
                ? "none"
                : "block";

    }

}


if (busqueda) {

    busqueda.addEventListener(
        "input",
        actualizarCatalogo
    );

}


document
    .querySelectorAll(".filtro")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filtro")
                    .forEach(b =>
                        b.classList.remove("activo")
                    );


                boton.classList.add("activo");


                categoriaActual =
                    boton.dataset.categoria;


                actualizarCatalogo();

            }
        );

    });


/* CATEGORIA DESDE URL */

const parametros =
    new URLSearchParams(
        window.location.search
    );


const categoriaURL =
    parametros.get("categoria");


if (categoriaURL && lista) {

    categoriaActual =
        categoriaURL;


    document
        .querySelectorAll(".filtro")
        .forEach(boton => {

            boton.classList.toggle(
                "activo",
                boton.dataset.categoria ===
                    categoriaURL
            );

        });

}


/* INICIAR CATÁLOGO */

actualizarCatalogo();


/* BUSCADOR DE INICIO */

const busquedaInicio =
    document.getElementById(
        "busquedaInicio"
    );


const resultadosInicio =
    document.getElementById(
        "resultadosInicio"
    );


if (busquedaInicio) {

    busquedaInicio.addEventListener(
        "input",
        () => {

            const texto =
                busquedaInicio.value
                    .toLowerCase()
                    .trim();


            if (!texto) {

                resultadosInicio.innerHTML = "";

                return;

            }


            const encontrados =
                modelos.filter(moto => {

                    return ${moto.marca} ${moto.modelo}
                        .toLowerCase()
                        .includes(texto);

                });


            resultadosInicio.innerHTML =
                encontrados.map(moto => `

                    <a
                        class="resultado-item"
                        href="modelo.html?id=${moto.id}"
                    >

                        <strong>
                            ${moto.marca}
                            ${moto.modelo}
                        </strong>

                    </a>

                `).join("");

        }
    );

}


/* PÁGINA INDIVIDUAL */

const modeloContenido =
    document.getElementById(
        "modeloContenido"
    );


if (modeloContenido) {

    const id =
        parametros.get("id");


    const moto =
        modelos.find(
            item => item.id === id
        );


    if (moto) {

        document.title =
            ${moto.marca} ${moto.modelo};


        modeloContenido.innerHTML = `

            <div class="modelo-portada">

                <img
                    src="${moto.imagen}"
                    alt="${moto.marca} ${moto.modelo}"
                >

            </div>


            <div class="modelo-detalles">

                <div class="modelo-marca">
                    ${moto.marca}
                </div>

                <h1>
                    ${moto.modelo}
                </h1>

                <p>
                    ${moto.descripcion}
                </p>

                <a
                    class="whatsapp"
                    target="_blank"
                    href="https://wa.me/5192128694?text=${encodeURIComponent(
                        Hola, estoy interesado en los stickers para ${moto.marca} ${moto.modelo}.
                    )}"
                >
                    Comprar por WhatsApp
                </a>

            </div>

        `;

    } else {

        modeloContenido.innerHTML = `

            <div>

                <h1>
                    Modelo no encontrado
                </h1>

                <p>
                    Regresa al catálogo para elegir
                    otro modelo.
                </p>

            </div>

        `;

    }

}