document.documentElement.classList.add('js');

// ---------- Config ----------
const GITHUB_USER = 'Joshthatking';
// Repos already shown as featured cards (or not worth listing) are skipped in "More on GitHub".
const HIDDEN_REPOS = [
  'Joshthatking.github.io',
  'LDT3-Language-Tool',
  'Restaurant-IR',
  'RecipeSite',
  'dinopodds-python',
];
const LANG_COLORS = {
  Python: '#3572A5', 'Jupyter Notebook': '#DA5B0B', JavaScript: '#f1e05a',
  HTML: '#e34c26', CSS: '#563d7c', R: '#198CE7', TypeScript: '#3178c6', SQL: '#e38c00',
};

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.section-title, .card, .project-feature, .project-card, .stat, .skill-group');
revealTargets.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => observer.observe(el));

// ---------- GitHub repos ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function loadRepos() {
  const grid = document.getElementById('repo-grid');
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error(res.status);
    const repos = (await res.json())
      .filter(r => !r.fork && !r.archived && !HIDDEN_REPOS.includes(r.name));

    if (!repos.length) {
      grid.innerHTML = `<p class="muted">See everything at <a href="https://github.com/${GITHUB_USER}">github.com/${GITHUB_USER}</a>.</p>`;
      return;
    }

    grid.innerHTML = repos.map(r => `
      <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
        <h4>${escapeHtml(r.name)}</h4>
        <p>${escapeHtml(r.description || 'No description yet.')}</p>
        <div class="repo-meta">
          ${r.language ? `<span><span class="lang-dot" style="background:${LANG_COLORS[r.language] || '#8b949e'}"></span>${escapeHtml(r.language)}</span>` : ''}
          ${r.stargazers_count ? `<span>&#9733; ${r.stargazers_count}</span>` : ''}
          <span>Updated ${new Date(r.pushed_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
        </div>
      </a>`).join('');
  } catch (err) {
    grid.innerHTML = `<p class="muted">Couldn't load repositories right now. Browse them at <a href="https://github.com/${GITHUB_USER}?tab=repositories">github.com/${GITHUB_USER}</a>.</p>`;
  }
}
loadRepos();
