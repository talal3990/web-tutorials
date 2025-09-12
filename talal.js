// Switch between Login & Register Tabs (keep this global)
function showForm(form) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const tabBtns = document.querySelectorAll(".tab-btn");

  if (form === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    tabBtns[0].classList.add("active");
    tabBtns[1].classList.remove("active");
  } else {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    tabBtns[1].classList.add("active");
    tabBtns[0].classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------- PREP: make existing Apply buttons consistent ----------------- */
  document.querySelectorAll('.job-card').forEach(card => {
    // ensure there is an applications container visible
    if (!card.querySelector('.applications')) {
      const apps = document.createElement('div');
      apps.className = 'applications';
      apps.innerHTML = '<h4 style="margin:0.5rem 0 0.25rem 0;">Applications</h4><ul></ul>';
      card.appendChild(apps);
    }
    // mark first button in card as apply-btn (this makes detection reliable)
    const btn = card.querySelector('button');
    if (btn) btn.classList.add('apply-btn');
  });

  /* ----------------- Modal elements ----------------- */
  const modal = document.getElementById('apply-modal');
  const applyForm = document.getElementById('apply-form');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('apply-modal-title');

  if (!modal || !applyForm || !closeModalBtn) {
    console.warn('Apply modal / form / close button missing. Make sure you added the modal HTML with correct IDs.');
  }

  // store reference to the job card the user is applying to
  modal.currentJob = null;

  /* ----------------- Event delegation: handle Apply clicks + Cancel ----------------- */
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    // OPEN modal when clicking an apply button
    if (btn.classList.contains('apply-btn')) {
      const jobCard = btn.closest('.job-card');
      if (!jobCard) return;

      modal.currentJob = jobCard;
      const titleEl = jobCard.querySelector('h3');
      const title = titleEl ? titleEl.textContent.trim() : 'Job';
      if (modalTitle) modalTitle.textContent = `Apply for: ${title}`;
      modal.classList.remove('hidden');
      return;
    }

    // CLOSE modal when Cancel clicked
    if (btn.id === 'close-modal') {
      closeModal();
      return;
    }
  });

  // also allow Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    if (applyForm) applyForm.reset();
    modal.currentJob = null;
  }

  /* ----------------- Submit application ----------------- */
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = applyForm.querySelector('#applicant-name').value.trim();
      const email = applyForm.querySelector('#applicant-email').value.trim();
      const resume = applyForm.querySelector('#applicant-resume').value.trim();
      const jobCard = modal.currentJob;

      if (!jobCard) {
        alert('No job selected. Please try again.');
        closeModal();
        return;
      }

      // Append application to the job-card's applications list
      let ul = jobCard.querySelector('.applications ul');
      if (!ul) {
        // create container if missing
        const apps = document.createElement('div');
        apps.className = 'applications';
        apps.innerHTML = '<h4>Applications</h4><ul></ul>';
        jobCard.appendChild(apps);
        ul = apps.querySelector('ul');
      }

      const li = document.createElement('li');
      const time = new Date().toLocaleString();
      // create a small entry and a "View resume" button
      li.textContent = `${name} (${email}) — ${time} `;

      const viewBtn = document.createElement('button');
      viewBtn.type = 'button';
      viewBtn.textContent = 'View resume';
      viewBtn.style.marginLeft = '0.5rem';
      viewBtn.addEventListener('click', () => {
        // simple demo: show resume in alert - replace with modal or UI as needed
        alert(`Resume for ${name}:\n\n${resume}`);
      });

      li.appendChild(viewBtn);
      ul.appendChild(li);

      alert('✅ Application submitted!');
      closeModal();
    });
  }

  /* ----------------- JOB SEARCH (fresh query each time) ----------------- */
  const searchBtn = document.querySelector(".search button");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const titleInput = (document.querySelectorAll(".search input")[0]?.value || '').toLowerCase();
      const locationInput = (document.querySelectorAll(".search input")[1]?.value || '').toLowerCase();

      const cards = document.querySelectorAll(".job-card");
      cards.forEach(card => {
        const title = (card.querySelector("h3")?.textContent || '').toLowerCase();
        const locationEl = Array.from(card.querySelectorAll('p')).find(p => p.textContent.toLowerCase().includes('location'));
        const location = (locationEl?.textContent || '').toLowerCase();

        if (title.includes(titleInput) && location.includes(locationInput)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  /* ----------------- POST JOB (adds apply-btn + applications container) ----------------- */
  const postForm = document.querySelector("#post-job form");
  const jobGrid = document.querySelector(".job-grid");
  if (postForm && jobGrid) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const company = document.getElementById("company").value;
      const location = document.getElementById("location").value;
      const desc = document.getElementById("desc").value;

      const newJob = document.createElement("div");
      newJob.classList.add("job-card");
      newJob.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p>${desc}</p>
        <button class="apply-btn" type="button">Apply</button>
        <div class="applications"><h4>Applications</h4><ul></ul></div>
      `;

      jobGrid.appendChild(newJob);
      postForm.reset();
    });
  }

  /* ----------------- LOGIN / REGISTER (demo) ----------------- */
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Logged in successfully (demo only)");
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = document.getElementById("reg-password").value;
      const confirm = document.getElementById("confirm-password").value;
      if (password !== confirm) {
        alert("Passwords do not match!");
      } else {
        alert("Registered successfully (demo only)");
        registerForm.reset();
        showForm('login');
      }
    });
  }
});
