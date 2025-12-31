class TabManager {
  constructor() {
    this.tabBtns = document.querySelectorAll(".tab-btn");
    this.tabPanes = document.querySelectorAll(".tab-pane");
    this.init();
  }

  init() {
    this.tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.switchTab(btn));
    });

    const heroContactBtn = document.querySelector(".btn-explore");
    if (heroContactBtn) {
      heroContactBtn.addEventListener("click", () => {
        const contactTabBtn = document.querySelector('[data-tab="contact"]');
        if (contactTabBtn) this.switchTab(contactTabBtn);
      });
    }

    this.renderSkills();
    this.renderEducation();
    this.renderAchievements();
    this.renderProjects();
  }

  switchTab(btn) {
    this.tabBtns.forEach((b) => b.classList.remove("active"));
    this.tabPanes.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    const pane = document.getElementById(tabId);
    if (pane) {
      pane.classList.add("active");
      if (window.innerWidth < 768) {
        pane.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
  renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = cvData.skills
      .map(
        (group) => `
      <div class="skill-card-wrapper">
        <h4 class="skill-category-title">${group.category}</h4> 
        <p class="skill-text-content">
          ${group.items.join(", ")}
        </p>
      </div>
    `
      )
      .join("");
  }

  renderEducation() {
    const container = document.querySelector(".education-container");
    if (!container) return;
    let html = cvData.education

      .map(
        (edu) => `
      <div class="education-item">
        <div class="education-title">${edu.school}</div>
        <div class="education-org">${edu.major}</div>
        <div class="education-date">${edu.date}</div>
      </div>
    `
      )
      .join("");
    html += `<h3 style="color: #ff0000; margin: 30px 0 20px 0; font-size: 18px;"> Certificates & Courses</h3>`;
    html += cvData.certificates
      .map(
        (cert) => `
      <div class="education-item">
        <h4>${cert.title}</h4>
        <p>${cert.organization}</p>
         <div class="education-date">${cert.date}</div>
        <a href="${cert.link}" target="_blank" style="color: var(--color-primary); text-decoration: none; font-weight: 600; display: inline-block; margin-top: 10px;">View Certificates →</a>
      </div>
    `
      )
      .join("");
    container.innerHTML = html;
  }

  renderAchievements() {
    const container = document.querySelector(".achievements-container");
    if (!container) return;
    container.innerHTML = cvData.achievements
      .map(
        (ach) => `
      <div class="achievement-card">
        <h4>${ach.title}</h4>
        <p>${ach.event}</p>
      </div>
    `
      )
      .join("");
  }

  renderProjects() {
    const container = document.querySelector(".projects-container");
    if (!container) return;
    container.innerHTML = cvData.projects
      .map(
        (pj) => `
      <div class="feature-card">
        <h4>${pj.title}</h4>
        <p>${pj.description}</p>
        <a href="${pj.link}" target="_blank" style="color: var(--color-primary); text-decoration: none; font-weight: 600; display: inline-block; margin-top: 10px;">View Project →</a>
      </div>
    `
      )
      .join("");
  }
}

// Initialize application on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new TabManager();
});

const container = document.getElementById("skills-container");

cvData.skills.forEach((skill) => {
  const group = document.createElement("div");
  group.className = "skill-group";

  const title = document.createElement("span");
  title.className = "skill-category-title";
  title.textContent = skill.category;

  const tagsWrapper = document.createElement("div");
  tagsWrapper.className = "tags-wrapper";

  skill.items.forEach((item) => {
    const tag = document.createElement("span");
    tag.className = "skill-tag";
    tag.textContent = item;
    tagsWrapper.appendChild(tag);
  });

  group.appendChild(title);
  group.appendChild(tagsWrapper);
  container.appendChild(group);
});
