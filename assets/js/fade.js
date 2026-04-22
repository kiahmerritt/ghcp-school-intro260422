// IntersectionObserver による 1 回だけのフェードイン
(() => {
  const els = document.querySelectorAll('.fade');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1 });
  els.forEach((el) => io.observe(el));
})();
