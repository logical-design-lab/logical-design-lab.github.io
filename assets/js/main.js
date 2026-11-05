// スクロールに合わせて、各セクションを静かに表示する。
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// 試し読み画像のタップ拡大。
(function () {
  var box = document.getElementById('lightbox');
  var list = document.querySelector('[data-samples]');
  if (!box || !list) return;
  var img = box.querySelector('img');
  var cap = box.querySelector('.lightbox-cap');
  function close() { box.hidden = true; }
  list.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-full]');
    if (!btn) return;
    img.src = btn.getAttribute('data-full');
    img.alt = btn.getAttribute('data-caption') || '';
    cap.textContent = btn.getAttribute('data-caption') || '';
    box.hidden = false;
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
