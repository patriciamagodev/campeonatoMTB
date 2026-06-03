// 1. INICIALIZAR SUPABASE
const SUPABASE_URL = "https://yjdspomeveywbdnvshba.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZHNwb21ldmV5d2JkbnZzaGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM4MjgsImV4cCI6MjA5NDE1OTgyOH0.iesXBEjC7uNv9cYaNi2E0Pu5ckmYL_a-UaepjQuGGRA";

const clienteSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

// --- OBTENER TASA BCV DINÁMICA (CON MEMORIA CACHÉ Y FALLBACK DE 504.91) ---
async function cargarTasaDinamica() {
  try {
    const { data, error } = await clienteSupabase
      .from("configuracion")
      .select("tasa_bcv")
      .eq("id", 1)
      .single();

    if (error) throw error;

    if (data) {
      const tasa = parseFloat(data.tasa_bcv);

      // Guardamos la tasa exitosa en la memoria del navegador
      localStorage.setItem("ultimaTasaBcvConocida", tasa);

      const costoDolares = 5;
      const totalBs = tasa * costoDolares;

      const elementoTasa = document.getElementById("tasaBcv");
      const elementoTotal = document.getElementById("totalBs");

      if (elementoTasa && elementoTotal) {
        elementoTasa.innerText = tasa.toFixed(2);
        elementoTotal.innerText = totalBs.toFixed(2);
      }
    }
  } catch (error) {
    console.error("Error cargando la tasa BCV desde Supabase:", error);

    // SOLUCIÓN DE CONTINGENCIA (FALLBACK CON CACHÉ)
    const tasaGuardada = localStorage.getItem("ultimaTasaBcvConocida");

    // Si la recuerda, la usamos. Si no, usamos la base actualizada (504.91)
    const tasaEmergencia = tasaGuardada ? parseFloat(tasaGuardada) : 504.91;
    const costoDolares = 5;
    const totalBsEmergencia = tasaEmergencia * costoDolares;

    const elementoTasa = document.getElementById("tasaBcv");
    const elementoTotal = document.getElementById("totalBs");

    if (elementoTasa && elementoTotal) {
      elementoTasa.innerText = tasaEmergencia.toFixed(2);
      elementoTotal.innerText = totalBsEmergencia.toFixed(2);
    }
  }
}

cargarTasaDinamica();

// --- CONTROL DE MODALES ---
const modalExito = document.getElementById("modalExito");
const btnCerrarExito = document.getElementById("btnCerrarExito");

const modalError = document.getElementById("modalError");
const btnCerrarError = document.getElementById("btnCerrarError");
const textoError = document.getElementById("textoError");

btnCerrarExito.addEventListener("click", () => {
  modalExito.classList.add("hidden");
  window.location.reload();
});

btnCerrarError.addEventListener("click", () => {
  modalError.classList.add("hidden");
});

// --- LÓGICA DE CATEGORÍAS ---
const ANO_EVENTO = 2026;

const categoriasDB = [
  // MASCULINO
  { nombre: "PRE INFANTIL A", genero: "Masculino", min: 5, max: 6 },
  { nombre: "PREINFANTIL B", genero: "Masculino", min: 7, max: 8 },
  { nombre: "PREINFANTIL C", genero: "Masculino", min: 9, max: 10 },
  { nombre: "PRE INFANTIL D", genero: "Masculino", min: 11, max: 12 },
  { nombre: "INFANTIL", genero: "Masculino", min: 13, max: 14 },
  { nombre: "PRE - JUVENIL", genero: "Masculino", min: 15, max: 16 },
  { nombre: "JUVENIL", genero: "Masculino", min: 17, max: 18 },
  { nombre: "SUB 23", genero: "Masculino", min: 19, max: 22 },
  { nombre: "ELITE", genero: "Masculino", min: 23, max: 99 },
  { nombre: "MASTER A", genero: "Masculino", min: 35, max: 39 },
  { nombre: "MASTER B1", genero: "Masculino", min: 40, max: 44 },
  { nombre: "MASTER B2", genero: "Masculino", min: 45, max: 49 },
  { nombre: "MASTER C1", genero: "Masculino", min: 50, max: 54 },
  { nombre: "MASTER C2", genero: "Masculino", min: 55, max: 59 },
  { nombre: "MASTER D1", genero: "Masculino", min: 60, max: 64 },
  { nombre: "MASTER D2", genero: "Masculino", min: 65, max: 69 },
  { nombre: "MASTER E", genero: "Masculino", min: 70, max: 99 },
  // MASCULINO E-BIKE
  {
    nombre: "E BIKE OPEN MASCULINO 55 N.M.",
    genero: "Masculino",
    min: 16,
    max: 99,
  },
  { nombre: "E BIKE MASTER A 55 N.M.", genero: "Masculino", min: 35, max: 39 },
  { nombre: "E-BIKE MASTER B 55 N.M.", genero: "Masculino", min: 40, max: 44 },
  { nombre: "E-BIKE MASTER C 55 N.M.", genero: "Masculino", min: 50, max: 54 },
  {
    nombre: "E BIKE ELITE-OPEN MASCULINO FULL MOTOR",
    genero: "Masculino",
    min: 16,
    max: 99,
  },
  {
    nombre: "E-BIKE JUVENIL FULL MOTOR",
    genero: "Masculino",
    min: 17,
    max: 18,
  },
  { nombre: "E-BIKE SUB 23 FULL MOTOR", genero: "Masculino", min: 19, max: 22 },
  {
    nombre: "E-BIKE MASTER A FULL MOTOR",
    genero: "Masculino",
    min: 35,
    max: 39,
  },
  {
    nombre: "E-BIKE MASTER B1 FULL MOTOR",
    genero: "Masculino",
    min: 40,
    max: 44,
  },
  {
    nombre: "E-BIKE MASTER B2 FULL MOTOR",
    genero: "Masculino",
    min: 45,
    max: 49,
  },
  {
    nombre: "E-BIKE MASTER C1 FULL MOTOR",
    genero: "Masculino",
    min: 50,
    max: 54,
  },
  {
    nombre: "E-BIKE MASTER C2 FULL MOTOR",
    genero: "Masculino",
    min: 55,
    max: 59,
  },
  {
    nombre: "E-BIKE MASTER D FULL MOTOR",
    genero: "Masculino",
    min: 60,
    max: 69,
  },
  // FEMENINO
  { nombre: "PRE INFANTIL A", genero: "Femenino", min: 5, max: 6 },
  { nombre: "PREINFANTIL B", genero: "Femenino", min: 7, max: 8 },
  { nombre: "PREINFANTIL C", genero: "Femenino", min: 9, max: 10 },
  { nombre: "PRE INFANTIL D", genero: "Femenino", min: 11, max: 12 },
  { nombre: "INFANTIL", genero: "Femenino", min: 13, max: 14 },
  { nombre: "PRE - JUVENIL", genero: "Femenino", min: 15, max: 16 },
  { nombre: "JUVENIL", genero: "Femenino", min: 17, max: 18 },
  { nombre: "SUB 23", genero: "Femenino", min: 19, max: 22 },
  { nombre: "ELITE", genero: "Femenino", min: 23, max: 99 },
  { nombre: "FEMENINO A", genero: "Femenino", min: 35, max: 39 },
  { nombre: "FEMENINO B1", genero: "Femenino", min: 40, max: 44 },
  { nombre: "FEMENINO B2", genero: "Femenino", min: 45, max: 49 },
  { nombre: "FEMENINO C1", genero: "Femenino", min: 50, max: 54 },
  { nombre: "FEMENINO C2", genero: "Femenino", min: 55, max: 59 },
  { nombre: "FEMENINO D1", genero: "Femenino", min: 60, max: 69 },
  { nombre: "FEMENINO D2", genero: "Femenino", min: 70, max: 99 },
  // FEMENINO E-BIKE
  {
    nombre: "E BIKE OPEN FEMENINO 55 N.M.",
    genero: "Femenino",
    min: 16,
    max: 99,
  },
  {
    nombre: "E BIKE ELITE-OPEN FEMENINO FULL MOTOR",
    genero: "Femenino",
    min: 16,
    max: 99,
  },
  { nombre: "E-BIKE JUVENIL FULL MOTOR", genero: "Femenino", min: 17, max: 18 },
  { nombre: "E-BIKE MASTER FULL MOTOR", genero: "Femenino", min: 35, max: 39 },
];

const fechaInput = document.getElementById("fechaNacimiento");
const generoInput = document.getElementById("genero");
const categoriaSelect = document.getElementById("categoria");

function actualizarCategorias() {
  const fechaVal = fechaInput.value;
  const generoVal = generoInput.value;

  if (fechaVal && generoVal) {
    const añoNacimiento = parseInt(fechaVal.split("-")[0]);
    const edad = ANO_EVENTO - añoNacimiento;

    const categoriasValidas = categoriasDB.filter(
      (cat) => cat.genero === generoVal && edad >= cat.min && edad <= cat.max,
    );

    categoriaSelect.innerHTML =
      '<option value="">Selecciona tu categoría...</option>';

    if (categoriasValidas.length > 0) {
      categoriasValidas.forEach((cat) => {
        const option = document.createElement("option");
        const textoCompleto = `${cat.nombre}: ${cat.min} - ${cat.max} AÑOS`;

        option.value = textoCompleto;
        option.textContent = textoCompleto;

        categoriaSelect.appendChild(option);
      });
      categoriaSelect.disabled = false;
    } else {
      categoriaSelect.innerHTML =
        '<option value="">No hay categorías para esta edad y género</option>';
      categoriaSelect.disabled = true;
    }
  } else {
    categoriaSelect.innerHTML =
      '<option value="">Completa Edad y Género primero</option>';
    categoriaSelect.disabled = true;
  }
}

fechaInput.addEventListener("change", actualizarCategorias);
generoInput.addEventListener("change", actualizarCategorias);

// --- MODAL DE TÉRMINOS ---
const modal = document.getElementById("modalTerminos");
const btnAbrir = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");
const btnAceptar = document.getElementById("btnAceptarTerminos");
const checkboxTerminos = document.getElementById("aceptoTerminos");

btnAbrir.addEventListener("click", () => modal.classList.remove("hidden"));
btnCerrar.addEventListener("click", () => modal.classList.add("hidden"));

btnAceptar.addEventListener("click", () => {
  checkboxTerminos.checked = true;
  modal.classList.add("hidden");
});

// --- ENVÍO A SUPABASE ---
document
  .getElementById("registroElemental")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = "Subiendo comprobante...";
    btn.disabled = true;

    try {
      const form = e.target;
      const formData = new FormData(form);

      // A. SUBIR LA IMAGEN A STORAGE
      const file = formData.get("comprobante");

      // Validación extra para asegurar que es una imagen
      if (!file.type.startsWith('image/')) {
        throw new Error("Por favor, sube un archivo de imagen válido.");
      }

      const MAX_SIZE_MB = 3;
      const maxSizeInBytes = MAX_SIZE_MB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        throw new Error(
          `La imagen pesa demasiado. Por favor, sube un archivo que pese menos de ${MAX_SIZE_MB}MB.`,
        );
      }

      // Sanitización de cédula para prevenir errores en el nombre del archivo
      const cedulaSucia = formData.get("cedula");
      const cedulaLimpia = cedulaSucia.replace(/[^a-zA-Z0-9]/g, "");

      const fileExt = file.name.split(".").pop();
      const fileName = `${cedulaLimpia}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } =
        await clienteSupabase.storage
          .from("comprobantes")
          .upload(fileName, file);

      if (uploadError)
        throw new Error("Error al subir la imagen: " + uploadError.message);

      btn.innerHTML = "Guardando registro...";

      // B. OBTENER LA URL PÚBLICA DE LA IMAGEN
      const {
        data: { publicUrl },
      } = clienteSupabase.storage.from("comprobantes").getPublicUrl(fileName);

      // C. INSERTAR LOS DATOS EN LA TABLA
      const { error: insertError } = await clienteSupabase
        .from("inscritos_elemental")
        .insert([
          {
            nombres: formData.get("nombres"),
            apellidos: formData.get("apellidos"),
            cedula: formData.get("cedula"),
            fecha_nacimiento: formData.get("fecha_nacimiento"),
            correo: formData.get("correo"),
            telefono: formData.get("telefono"),
            estado: formData.get("estado"), // Actualizado para capturar el estado dinámico
            ciudad: formData.get("ciudad"),
            genero: formData.get("genero"),
            categoria: formData.get("categoria"),
            equipo: formData.get("equipo"),
            referencia: formData.get("referencia"),
            comprobante_url: publicUrl,
          },
        ]);

      if (insertError)
        throw new Error("Error al guardar datos: " + insertError.message);

      // Mostrar el modal de éxito
      modalExito.classList.remove("hidden");

      form.reset();
      categoriaSelect.innerHTML =
        '<option value="">Completa Edad y Género primero</option>';
      categoriaSelect.disabled = true;
    } catch (error) {
      console.error(error);
      textoError.innerText = error.message;
      modalError.classList.remove("hidden");
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
