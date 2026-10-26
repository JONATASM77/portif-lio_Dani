document.documentElement.classList.add("js");

const preloader = document.getElementById("preloader");
const brainSvg = document.querySelector(".preloader-brain");
const brainPath = document.getElementById("preloaderBrainPath");
const loadingBar = document.querySelector(".preloader-bar");

document.documentElement.classList.add("preloader-lock");

const hidePreloader = () => {
  document.documentElement.classList.remove("preloader-lock");
  preloader.setAttribute("aria-hidden", "true");
  preloader.remove();
};

const startPreloader = () => {
  if (!preloader || preloader.dataset.started) return;
  preloader.dataset.started = "true";

  if (!window.gsap) {
    hidePreloader();
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const drawingDuration = 1.2;
  const pathLength = brainPath.getTotalLength();

  gsap.set(brainPath, {
    strokeDasharray: pathLength,
    strokeDashoffset: reducedMotion ? 0 : pathLength,
  });
  gsap.set(brainSvg, {
    clipPath: reducedMotion ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
  });
  gsap.set(loadingBar, {
    clipPath: reducedMotion ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
  });

  if (reducedMotion) {
    gsap.to(preloader, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: hidePreloader,
    });
    return;
  }

  gsap
    .timeline({
      defaults: { ease: "power1.inOut" },
      onComplete: hidePreloader,
    })
    .to(
      brainPath,
      { strokeDashoffset: 0, duration: drawingDuration },
      0,
    )
    .to(
      brainSvg,
      { clipPath: "inset(0 0 0 0)", duration: drawingDuration },
      0,
    )
    .to(
      loadingBar,
      { clipPath: "inset(0 0 0 0)", duration: drawingDuration },
      0,
    )
    .to(
      preloader,
      { autoAlpha: 0, duration: 0.25, ease: "power2.out" },
      drawingDuration,
    );
};

requestAnimationFrame(startPreloader);

const interests = {
  ux: {
    n: "01",
    k: "Área de interesse · 01",
    title: "UX Research",
    text: "Investigar como as pessoas usam produtos e serviços, compreender suas necessidades e transformar descobertas em experiências mais claras, acessíveis e úteis. Interessa-me a conexão entre comportamento humano, pesquisa e tecnologia.",
    tags: ["pesquisa com usuários", "comportamento", "tecnologia"],
  },

  rh: {
    n: "02",
    k: "Experiência e interesse · 02",
    title: "RH · Administrativo",
    text: "Uma área que já faz parte da minha trajetória por meio da experiência como Jovem Aprendiz em RH Generalista na Eurofarma e do contato atual com rotinas administrativas na recepção. Quero continuar desenvolvendo organização de processos, comunicação e compreensão da experiência das pessoas no ambiente de trabalho.",
    tags: ["RH generalista", "rotinas administrativas", "processos e pessoas"],
  },

  hospital: {
    n: "03",
    k: "Área de interesse · 03",
    title: "Psicologia Hospitalar",
    text: "Conhecer as formas de cuidado psicológico em contextos de saúde, considerando pacientes, familiares e equipes. Interessa-me o acolhimento em momentos de vulnerabilidade e a atuação integrada entre profissionais.",
    tags: ["cuidado em saúde", "acolhimento", "equipe multiprofissional"],
  },
  sport: {
    n: "04",
    k: "Área de interesse · 04",
    title: "Psicologia do Esporte",
    text: "Compreender aspectos psicológicos relacionados à prática esportiva, como motivação, foco, trabalho em equipe, confiança e manejo da pressão. É uma área que une comportamento, saúde e desempenho.",
    tags: ["motivação", "desempenho", "trabalho em equipe"],
  },

  military: {
    n: "05",
    k: "Área de interesse · 05",
    title: "Psicologia Militar",
    text: "Investigar a atuação da Psicologia em contextos militares e operacionais, incluindo adaptação, relações de equipe, fatores humanos, saúde mental e exigências específicas do serviço. É um campo que desejo conhecer melhor durante minha formação.",
    tags: ["fatores humanos", "adaptação", "contexto operacional"],
  },
  
  design: {
    n: "06",
    k: "Área de interesse · 06",
    title: "Design",
    text: "Explorar como a linguagem visual, a hierarquia da informação e as escolhas de interface influenciam a compreensão de uma mensagem. Quero aprofundar a relação entre criatividade, acessibilidade e necessidades reais das pessoas.",
    tags: ["comunicação visual", "acessibilidade", "criatividade"],
  },
};
document.querySelectorAll("[data-interest]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const d = interests[btn.dataset.interest];
    document.querySelectorAll("[data-interest]").forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-pressed", String(isActive));
    });
    document.getElementById("detailKicker").textContent = d.k;
    document.getElementById("detailTitle").textContent = d.title;
    document.getElementById("detailText").textContent = d.text;
    document.getElementById("detailNumber").textContent = d.n;
    const tags = document.getElementById("detailTags");
    tags.replaceChildren(
      ...d.tags.map((t) => {
        const s = document.createElement("span");
        s.className = "chip";
        s.textContent = t;
        return s;
      }),
    );
  }),
);
const nav = document.getElementById("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("scrolled", window.scrollY > 20),
);
const menuButton = document.getElementById("menu");
const navLinks = document.getElementById("navlinks");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".navlinks a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  }),
);
const obs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

/*COLOCAR EMAIL */

const professionalEmail = "vitoriadanielle094@gmail.com";

document
  .getElementById("emailBtn")
  .addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(professionalEmail);
      alert("E-mail copiado: " + professionalEmail);
    } catch {
      alert("Meu e-mail profissional é: " + professionalEmail);
    }
  });
// Foto de Danielle incorporada ao arquivo para funcionar sem depender de imagens externas.
