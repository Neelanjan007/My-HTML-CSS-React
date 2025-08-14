
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el);
});


(() => {
  'use strict';
  const form = document.getElementById('darshanForm');
  const modalEl = document.getElementById('confirmationModal');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    event.stopPropagation();

    if (form.checkValidity()) {
      
      const btn = document.getElementById('submitBtn');
      btn.classList.add('bounce');
      btn.addEventListener('animationend', () => btn.classList.remove('bounce'), { once: true });

      
      new bootstrap.Modal(modalEl).show();

      
      form.reset();
      form.classList.remove('was-validated');
    } else {
      form.classList.add('was-validated');
    }
  }, false);
})();
