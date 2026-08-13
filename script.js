document.addEventListener("DOMContentLoaded", function () {
  /* Menú móvil */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Formulario de contacto -> abre el cliente de correo con el mensaje listo */
  var form = document.querySelector("#contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nombre = form.nombre.value.trim();
      var empresa = form.empresa.value.trim();
      var email = form.email.value.trim();
      var telefono = form.telefono.value.trim();
      var mensaje = form.mensaje.value.trim();

      var asunto = "Solicitud de presupuesto - " + (empresa || nombre || "web para empresa de reformas");

      var cuerpo =
        "Nombre: " + nombre + "\n" +
        "Empresa: " + empresa + "\n" +
        "Email: " + email + "\n" +
        "Teléfono: " + telefono + "\n\n" +
        "Mensaje:\n" + mensaje;

      var mailto =
        "mailto:acaagency26@gmail.com" +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);

      window.location.href = mailto;
    });
  }
});
