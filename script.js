
let currentYear = new Date().getFullYear();
const owner = "Stephen";
document.getElementById("year").textContent = currentYear;


document.getElementById("welcome").textContent =
  `Welcome to my portfolio! Thanks for visiting, ${owner}.`;


const codingSkills = [
  { name: "HTML", value: 80 },
  { name: "CSS", value: 75 },
  { name: "JavaScript", value: 20 },
  { name: "Python", value: 5 }
];
const professionalSkills = [
  { name: "Web Design", value: 70 },
  { name: "Graphic Design", value: 60 },
  { name: "UI/UX Design", value: 60 },
  { name: "Problem Solving", value: 60 }
];


const createPills = (...tags) => {
  const wrap = document.getElementById("hobbyTags");
  tags.forEach(t => {
    const el = document.createElement("span");
    el.className = "pill";
    el.textContent = t;
    wrap.appendChild(el);
  });
};

createPills("Coding", "Drawing", "Gaming");


const makeBar = ({ name, value }) => {
  const row = document.createElement("div");
  row.style.margin = "12px 0";
  row.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
      <span>${name}</span><span>${value}%</span>
    </div>
    <div class="bar"><span data-target="${value}"></span></div>
  `;
  return row;
};

//loop
const renderSkills = (list, mountId) => {
  const mount = document.getElementById(mountId);
  list.forEach(skill => mount.appendChild(makeBar(skill)));
};
renderSkills(codingSkills, "codingList");
renderSkills(professionalSkills, "proList");


const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("section")];
const setActive = () => {
  const y = window.scrollY + 90;
  for (const s of sections) {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(a =>
        a.classList.toggle("active", a.getAttribute("href").slice(1) === s.id)
      );
    }
  }
};
window.addEventListener("scroll", setActive);


const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.querySelectorAll(".bar > span").forEach(span => {
        const pct = +span.dataset.target || 0;
        requestAnimationFrame(() => span.style.width = pct + "%");
      });
    }
  });
}, { threshold: .14 });
document.querySelectorAll(".reveal, section .container").forEach(el => io.observe(el));

//Arrow function 
const note = document.getElementById("formNote");
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

 // desstructuring 
  const obj = Object.fromEntries(data.entries());
  const { fullName, email } = obj;

 
  note.textContent = `Thanks, ${fullName || "friend"}! I’ll reach out at ${email || "stephencarl.licdan@hcdc.edu.ph"} soon.`;
  e.currentTarget.reset();
});



const heroImg = document.querySelector(".hero-img img");
heroImg.addEventListener("mousemove", (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - left - width / 2) / width * 6;
  const y = (e.clientY - top - height / 2) / height * 6;
  heroImg.style.transform = `translate(${x}px, ${y}px)`;
});
heroImg.addEventListener("mouseleave", () => heroImg.style.transform = "translate(0,0)");
