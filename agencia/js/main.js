document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      const nombre = (data.get('nombre') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const consent = form.querySelector('#consent').checked;

      if (!nombre || !email || !consent) {
        status.textContent = 'Revisa que hayas rellenado tu nombre, email y aceptado la casilla de protección de datos.';
        status.className = 'form-status show err';
        return;
      }

      const subject = encodeURIComponent(`Solicitud de presupuesto — ${nombre}`);
      const bodyLines = [
        `Nombre: ${nombre}`,
        `Empresa: ${data.get('empresa') || '-'}`,
        `Teléfono: ${data.get('telefono') || '-'}`,
        `Email: ${email}`,
        '',
        (data.get('mensaje') || '').toString()
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:acaagency26@gmail.com?subject=${subject}&body=${body}`;

      status.textContent = 'Se está abriendo tu programa de correo con el mensaje ya preparado. Si no ocurre nada, escríbenos directamente a acaagency26@gmail.com.';
      status.className = 'form-status show ok';
      form.reset();
    });
  }
});
