// ===== CONFIGURACIÓN (cambia aquí lo básico) =====
const PRECIO = 29.90;   // precio por unidad
const MAX_UNIDADES = 10;

// ===== ELEMENTOS =====
const nav = document.getElementById('nav');
const qtyEl = document.getElementById('qty');
const priceEl = document.getElementById('price');
const toast = document.getElementById('toast');
let cantidad = 1;

// ===== Barra de navegación: línea al hacer scroll =====
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Aparecer elementos al hacer scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== Selector de cantidad =====
function actualizar() {
  qtyEl.textContent = cantidad;
  const total = (PRECIO * cantidad).toFixed(2).replace('.', ',');
  priceEl.textContent = total;
}

document.getElementById('plus').addEventListener('click', () => {
  if (cantidad < MAX_UNIDADES) { cantidad++; actualizar(); }
});
document.getElementById('minus').addEventListener('click', () => {
  if (cantidad > 1) { cantidad--; actualizar(); }
});

// ===== Botón añadir a la bolsa =====
document.getElementById('addToCart').addEventListener('click', () => {
  mostrarAviso(`${cantidad} × Orbe añadido a la bolsa`);
  // Aquí puedes conectar tu carrito o enlace de pago real
});

function mostrarAviso(texto) {
  toast.textContent = texto;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

actualizar();
