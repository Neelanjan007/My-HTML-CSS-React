
(function () {
  const form = document.getElementById('rtoForm');
  const submitBtn = document.getElementById('submitBtn');

  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  
  const sectionMap = {
    owner: document.querySelector('#ownerHead .accordion-button'),
    address: document.querySelector('#addrHead .accordion-button'),
    vehicle: document.querySelector('#vehHead .accordion-button'),
    compliance: document.querySelector('#compHead .accordion-button'),
    finance: document.querySelector('#finHead .accordion-button'),
    uploads: document.querySelector('#upHead .accordion-button'),
    decl: document.querySelector('#decHead .accordion-button')
  };

  
  const isHypo = document.getElementById('isHypo');
  const hypoBlock = document.getElementById('hypoBlock');
  const bankInput = form.elements['bank'];
  const agreementInput = form.elements['agreement'];

  
  const capQ = document.getElementById('capQ');
  const capAns = document.getElementById('capAns');
  const capRefresh = document.getElementById('capRefresh');
  let capAnswer = null;

  const terms = document.getElementById('terms');

  
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  const fileRules = {
    idproof: ['application/pdf', 'image/jpeg', 'image/png'],
    inscopy: ['application/pdf', 'image/jpeg', 'image/png'],
    vehimg: ['image/jpeg', 'image/png']
  };

  
  const todayISO = () => new Date().toISOString().slice(0, 10);

  function setValidity(el, isValid) {
    if (isValid) {
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');
    } else {
      el.classList.remove('is-valid');
      el.classList.add('is-invalid');
    }
  }

  function validateDOB() {
    const dob = form.elements['dob'];
    if (!dob.value) return false;
    const d = new Date(dob.value);
    const now = new Date();
    const min = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    const ok = d <= min;
    setValidity(dob, ok);
    return ok;
  }

  function validateNotFuture(input) {
    if (!input.value) return false;
    const ok = new Date(input.value) <= new Date();
    setValidity(input, ok);
    return ok;
  }

  function validateTodayOrLater(input) {
    if (!input.value) return false;
    const today = new Date(todayISO());
    const val = new Date(input.value);
    const ok = val >= today;
    setValidity(input, ok);
    return ok;
  }

  function validateFuel() {
    const radios = Array.from(form.querySelectorAll('input[name="fuel"]'));
    const anyChecked = radios.some(r => r.checked);
    
    const container = radios[0].closest('.col-md-6');
    if (anyChecked) {
      container.classList.remove('js-fuel-invalid');
    } else {
      container.classList.add('js-fuel-invalid');
    }
    return anyChecked;
  }

  function validateFile(input) {
    if (!input.value) {
      
      const ok = !input.required ? true : false;
      setValidity(input, ok);
      return ok;
    }
    const file = input.files[0];
    const types = fileRules[input.name] || [];
    const typeOK = types.length ? types.includes(file.type) : true;
    const sizeOK = file.size <= MAX_FILE_SIZE;
    const ok = typeOK && sizeOK;
    setValidity(input, ok);
    return ok;
  }

  function validateConditionalHypo() {
    if (!isHypo.checked) {
      bankInput.required = false;
      agreementInput.required = false;
      bankInput.classList.remove('is-invalid', 'is-valid');
      agreementInput.classList.remove('is-invalid', 'is-valid');
      return true;
    }
    bankInput.required = true;
    agreementInput.required = true;

    const bankOK = !!bankInput.value.trim();
    setValidity(bankInput, bankOK);

    let dateOK = !!agreementInput.value;
    if (dateOK) {
      
      dateOK = new Date(agreementInput.value) <= new Date();
    }
    setValidity(agreementInput, dateOK);
    return bankOK && dateOK;
  }

  function validatePatternOrRequired(el) {
    if (el.type === 'radio') return validateFuel();
    if (el.type === 'file') return validateFile(el);

    let ok = el.checkValidity();
    // extra rules for specific fields
    if (el.name === 'dob') ok = validateDOB();
    if (el.name === 'purchased') ok = validateNotFuture(el);
    if (el.name === 'insExpiry') ok = validateTodayOrLater(el);
    if (el.name === 'puc') ok = validateTodayOrLater(el);

    setValidity(el, ok);
    return ok;
  }

  function currentRequiredFields() {
    const base = Array.from(form.querySelectorAll('input, select')).filter(el => el.name !== 'capAns');
    return base.filter(el => {
      if (el.closest('#hypoBlock') && !isHypo.checked) return false; // skip hidden hypo fields
      if (el.type === 'radio' && el.name === 'fuel') {
        
        return el === form.querySelector('input[name="fuel"]');
      }
      return el.required;
    });
  }

  function updateProgress() {
    const requiredEls = currentRequiredFields();
    let validCount = 0;

    requiredEls.forEach(el => {
      if (el.name === 'fuel') {
        if (validateFuel()) validCount++;
      } else if (el.type === 'file') {
        if (el.files.length && el.classList.contains('is-valid')) validCount++;
        else if (!el.required && !el.files.length) validCount++;
      } else {
        if (el.classList.contains('is-valid')) validCount++;
      }
    });

    const total = requiredEls.length;
    const pct = total ? Math.round((validCount / total) * 100) : 0;
    progressBar.style.width = pct + '%';
    progressText.textContent = pct + '%';
  }

  function updateSectionTicks() {
    const sections = form.querySelectorAll('.accordion-body[data-section]');
    sections.forEach(sec => {
      const key = sec.getAttribute('data-section');
      const headerBtn = sectionMap[key];
      const inputs = Array.from(sec.querySelectorAll('input, select'));

      const requiredInputs = inputs.filter(el => {
        if (el.closest('#hypoBlock') && !isHypo.checked) return false;
        if (el.type === 'radio' && el.name === 'fuel') return el === form.querySelector('input[name="fuel"]');
        return el.required;
      });

      const allValid = requiredInputs.every(el => {
        if (el.name === 'fuel') return validateFuel();
        if (el.type === 'file') return !el.required ? true : (el.files.length && el.classList.contains('is-valid'));
        return el.classList.contains('is-valid');
      });

      headerBtn.classList.toggle('section-valid', allValid);
    });
  }

  function validateCaptchaOnly() {
    // will not show is-valid on captcha input; just will mark invalid when wrong at submit
    return capAns.value !== '' && Number(capAns.value) === capAnswer;
  }

  function updateSubmitState() {
    
    const formOK = form.checkValidity(); 
    const customOK = [
      validateFuel(),
      validateConditionalHypo(),
      validateDOB(),
      validateNotFuture(form.elements['purchased']),
      validateTodayOrLater(form.elements['insExpiry']),
      validateTodayOrLater(form.elements['puc'])
    ].every(Boolean);

    const filesOK =
      validateFile(form.elements['idproof']) &
      validateFile(form.elements['inscopy']) &
      validateFile(form.elements['vehimg']);

    const termsOK = terms.checked;
    const capOK = validateCaptchaOnly();

    submitBtn.disabled = !(formOK && customOK && filesOK && termsOK && capOK);
  }

  
  Array.from(form.querySelectorAll('input, select')).forEach(el => {
    if (el.name === 'capAns') return; // handled separately
    const evt = el.type === 'radio' || el.tagName === 'SELECT' || el.type === 'file' ? 'change' : 'input';
    el.addEventListener(evt, () => {
      validatePatternOrRequired(el);
      if (el.closest('#hypoBlock')) validateConditionalHypo();
      updateProgress();
      updateSectionTicks();
      updateSubmitState();
    });
    
    el.addEventListener('blur', () => {
      if (!el.checkValidity()) el.classList.add('is-invalid');
    });
  });

  
  form.querySelectorAll('input[name="fuel"]').forEach(r => {
    r.addEventListener('change', () => {
      validateFuel();
      updateProgress();
      updateSectionTicks();
      updateSubmitState();
    });
  });

  
  isHypo.addEventListener('change', () => {
    hypoBlock.classList.toggle('is-hidden', !isHypo.checked);
    validateConditionalHypo();
    updateProgress();
    updateSectionTicks();
    updateSubmitState();
  });

  
  terms.addEventListener('change', updateSubmitState);
  capAns.addEventListener('input', updateSubmitState);
  capRefresh.addEventListener('click', () => {
    buildCaptcha(true);
    updateSubmitState();
  });

  
  ['idproof', 'inscopy', 'vehimg'].forEach(name => {
    form.elements[name].addEventListener('change', () => {
      validateFile(form.elements[name]);
      updateProgress();
      updateSectionTicks();
      updateSubmitState();
    });
  });

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    
    Array.from(form.querySelectorAll('input, select')).forEach(el => {
      if (el.name !== 'capAns' && !validatePatternOrRequired(el) && (el.required || el.type === 'file')) {
        el.classList.add('is-invalid');
      }
    });

    if (!validateCaptchaOnly()) {
      capAns.classList.add('is-invalid');
      updateSubmitState();
      return;
    } else {
      capAns.classList.remove('is-invalid');
    }

    if (submitBtn.disabled) return;

    
    const toast = new bootstrap.Toast(document.getElementById('submitToast'));
    toast.show();

   
    form.reset();
    Array.from(form.querySelectorAll('.is-valid, .is-invalid')).forEach(el => el.classList.remove('is-valid', 'is-invalid'));
    document.querySelectorAll('.section-valid').forEach(h => h.classList.remove('section-valid'));
    hypoBlock.classList.add('is-hidden');
    submitBtn.disabled = true;
    updateProgress();
    updateSectionTicks();
    buildCaptcha(true);
  });

  
  form.addEventListener('reset', () => {
    setTimeout(() => {
      Array.from(form.querySelectorAll('.is-valid, .is-invalid')).forEach(el => el.classList.remove('is-valid', 'is-invalid'));
      document.querySelectorAll('.section-valid').forEach(h => h.classList.remove('section-valid'));
      hypoBlock.classList.add('is-hidden');
      submitBtn.disabled = true;
      updateProgress();
      updateSectionTicks();
      buildCaptcha(true);
    }, 0);
  });

  // ---- Captcha --------------------------------------------------
  function buildCaptcha(forceNew = false) {
    if (!forceNew && capAnswer !== null) return;
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const op = Math.random() > 0.5 ? '+' : '−';
    capQ.textContent = `${a} ${op} ${b}`;
    capAnswer = op === '+' ? a + b : a - b;
    capAns.value = '';
    capAns.classList.remove('is-invalid');
  }

  // ---- Init -----------------------------------------------------
  (function init() {
    buildCaptcha(true);

    
    form.elements['purchased'].setAttribute('max', todayISO());
    agreementInput.setAttribute('max', todayISO());

    
    ['vehimg'].forEach(n => form.elements[n].classList.remove('is-valid', 'is-invalid'));

    updateProgress();
    updateSectionTicks();
    updateSubmitState();
  })();
})();
