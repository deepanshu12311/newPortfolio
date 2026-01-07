document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const ul = nav.querySelector('ul');
  const links = Array.from(ul.querySelectorAll('a'));

  // Ensure active li matches current page (set by URL)
  const path = window.location.pathname.split('/').pop() || 'index.html';
  let activeLink = links.find(a => a.getAttribute('href') === path);
  if (!activeLink) {
    // fallback: match by filename contained in href
    activeLink = links.find(a => path.includes(a.getAttribute('href')));
  }
  links.forEach(a => a.parentElement.classList.remove('active'));
  if (activeLink) activeLink.parentElement.classList.add('active');

  // Create indicator element
  let indicator = ul.querySelector('.nav-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    ul.appendChild(indicator);
  }

  function moveToElement(el) {
    const rect = el.getBoundingClientRect();
    const ulRect = ul.getBoundingClientRect();
    indicator.style.left = (rect.left - ulRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
    indicator.style.opacity = '1';
  }

  function resetIndicator() {
    const active = ul.querySelector('li.active');
    if (active) {
      moveToElement(active);
    } else {
      indicator.style.opacity = '0';
      indicator.style.width = '0';
    }
  }

  // set initial position after layout
  setTimeout(resetIndicator, 60);

  links.forEach(a => {
    const li = a.parentElement;
    a.addEventListener('mouseenter', () => moveToElement(li));
    a.addEventListener('focus', () => moveToElement(li));
    a.addEventListener('mouseleave', () => resetIndicator());
    a.addEventListener('blur', () => resetIndicator());
  });

  window.addEventListener('resize', resetIndicator);
});