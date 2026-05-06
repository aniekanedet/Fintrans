 /* FAQ accordion */
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
  });

  //  Formspree AJAX 

  window.formspree = window.formspree || function () {
    (formspree.q = formspree.q || []).push(arguments);
  };
 
  formspree('initForm', {
    formElement: '#cta-form',
    formId: 'mykowapd',
    onSubmit: function() {
      var btn = document.querySelector('.form-submit-btn');
      btn.classList.add('loading');
      btn.disabled = true;
    },
    onSuccess: function() {
      var form    = document.getElementById('cta-form');
      var success = document.querySelector('.form-success');
      var btn     = document.querySelector('.form-submit-btn');
      btn.classList.remove('loading');
      btn.disabled = false;
      form.style.display    = 'none';
      success.style.display = 'block';
    },
    onError: function() {
      var btn = document.querySelector('.form-submit-btn');
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });

  /* ── Back to Top ── */
  const bttBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  }, { passive: true });

  bttBtn.addEventListener('click', function (e) {
    /* ripple effect */
    const ripple = this.querySelector('.btt-ripple');
    const rect   = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left    = x + 'px';
    ripple.style.top     = y + 'px';
    ripple.style.opacity = '1';
    ripple.style.animation = 'none';
    void ripple.offsetWidth; /* reflow */
    ripple.style.animation = 'btt-ripple-anim .55s ease forwards';

    /* smooth scroll */
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Google reCAPTCHA required attribute fix
window.onload = function() {
  var el = document.getElementById('g-recaptcha-response');
  if (el) {
    el.setAttribute('required', 'required');
  }
}