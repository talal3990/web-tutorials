// ---------- JOB HANDLING ----------

// Save job to localStorage
function postJob(event) {
  event.preventDefault();

  let title = document.getElementById("jobTitle").value;
  let location = document.getElementById("jobLocation").value;
  let salary = document.getElementById("jobSalary").value;

  let newJob = { title, location, salary };

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push(newJob);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("✅ Job Posted: " + title);

  document.getElementById("jobTitle").value = "";
  document.getElementById("jobLocation").value = "";
  document.getElementById("jobSalary").value = "";
}

// Load jobs on Jobs Page
function loadJobs() {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let jobGrid = document.getElementById("jobGrid");

  if (!jobGrid) return;

  jobGrid.innerHTML = "";

  if (jobs.length === 0) {
    jobGrid.innerHTML = "<p>No jobs available. Post one!</p>";
    return;
  }

  function loadJobs() {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let jobGrid = document.getElementById("jobGrid");

  if (!jobGrid) return; // only run on jobs.html

  jobGrid.innerHTML = "";

  if (jobs.length === 0) {
    jobGrid.innerHTML = "<p>No jobs available. Post one!</p>";
    return;
  }

  jobs.forEach((job, index) => {
    let jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>Location: ${job.location}</p>
      <p>Salary: ${job.salary}</p>
      <button onclick="applyJob('${job.title}')">Apply</button>
      <button onclick="deleteJob(${index})">Delete</button>
    `;
    jobGrid.appendChild(jobCard);
  });
}
  jobs.forEach((job, index) => {
    let jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>Location: ${job.location}</p>
      <p>Salary: ${job.salary}</p>
      <button onclick="applyJob('${job.title}')">Apply</button>
      <button onclick="deleteJob(${index})">Delete</button>
    `;
    jobGrid.appendChild(jobCard);
  })
}

// Delete job
function deleteJob(index) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  loadJobs(); // refresh list
}

// ---------- APPLY JOB ----------
function applyJob(title) {
  alert("📩 You applied for: " + title);
}

// ---------- AUTH HANDLING ----------
function showAuthForm(type) {
  if (type === "login") {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
  } else {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  }
}
