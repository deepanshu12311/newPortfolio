document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const success = document.querySelector('.success-message');
  const sendBtn = document.getElementById('sendBtn');

  // Entrance animation: add stagger classes and CSS variable delays
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const els = [contactForm.querySelector('h2')]
      .concat(Array.from(contactForm.querySelectorAll('form > *')))
      .concat([contactForm.querySelector('.success-message'), contactForm.querySelector('.socials')])
      .filter(Boolean);

    els.forEach((el, idx) => {
      el.classList.add('stagger-el');
      el.style.setProperty('--i', idx + 1);
    });

    // Wait until navbar animation finishes before playing form entrance.
    // Navbar CSS: animation 1.5s with 1.2s delay => ~2700ms; add small buffer
    const FORM_ANIM_DELAY = 2800; // milliseconds
    setTimeout(() => contactForm.classList.add('play'), FORM_ANIM_DELAY);
  }

  // Ripple effect on button click
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      circle.classList.add('ripple');
      btn.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      success.textContent = 'Please fill in all fields.';
      success.classList.add('error');
      success.classList.remove('visible');

      // shake the form briefly to draw attention
      contactForm.classList.add('shake');
      setTimeout(() => contactForm.classList.remove('shake'), 460);
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      success.textContent = 'Please enter a valid email address.';
      success.classList.add('error');
      success.classList.remove('visible');

      contactForm.classList.add('shake');
      setTimeout(() => contactForm.classList.remove('shake'), 460);
      return;
    }

    // Prepare a mailto link that opens the user's email client with prefilled content
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    // Show a quick sent state on the button and show the message, then open mail client
    if (sendBtn) {
      sendBtn.classList.add('sent');
      setTimeout(() => sendBtn.classList.remove('sent'), 800);
    }

    // Open mail client (works as a no-backend solution) after a tiny delay so animation is visible
    setTimeout(() => {
      window.location.href = `mailto:deepanshu.rwr2010@gmail.com?subject=${subject}&body=${body}`;
    }, 140);

    // Show a friendly message and reset
    success.textContent = 'Your message is ready to send via your email client.';
    success.classList.remove('error');
    success.classList.add('visible');
    form.reset();
  });
});