// Smooth scroll
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");

    // ✅ Only apply smooth scroll for internal links
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Bounce
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // Mouse attraction
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      p.x += dx * 0.02;
      p.y += dy * 0.02;
    }

    // Particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00f5ff";
    ctx.fill();
  });

  // Connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(0,255,255,0.08)";
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

// Resize fix
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const text = [
  "ML Engineer",
  "Python Developer",
  "AI Enthusiast",
  "Web Developer"
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function type() {
  currentText = text[i];

  if (!isDeleting) {
    document.getElementById("typing").innerHTML =
      currentText.substring(0, j++);
  } else {
    document.getElementById("typing").innerHTML =
      currentText.substring(0, j--);
  }

  if (j === currentText.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

const form = document.querySelector(".contact-form");
const msg = document.getElementById("success-msg");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop default reload

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      msg.style.display = "block";   // show success message
      form.reset();                 // 🔥 clear form fields
    } else {
      alert("❌ Something went wrong!");
    }
  })
  .catch(() => {
    alert("❌ Network error!");
  });
});

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active"); // 🔥 closes menu
  });
});

const resumeBtn = document.querySelector(".resume-btn");

resumeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
});