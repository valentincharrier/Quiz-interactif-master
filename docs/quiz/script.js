/* ============================================
   DONNÉES DU QUIZ
   Chaque question contient :
   - q          : l'énoncé
   - options    : la liste complète des propositions
   - correct    : index des bonnes réponses (dans l'ordre d'origine)
   - multi      : true si plusieurs bonnes réponses
   - explanation: rappel pédagogique après validation
   ============================================ */
const QUIZ = [
  {
    q: "Qu'est-ce que la facturation électronique ?",
    options: [
      "Une facture envoyée par email au format PDF classique",
      "Une facture émise, transmise et reçue dans un format électronique structuré (XML, UBL, Factur-X)",
      "Une facture imprimée puis scannée en JPEG",
      "Une facture créée sur un simple logiciel de comptabilité",
      "Une facture envoyée par SMS au client",
      "Une facture stockée uniquement sur le cloud",
      "Une facture signée numériquement avec un certificat",
      "Une facture qui s'envoie automatiquement chaque mois"
    ],
    correct: [1],
    explanation: "La facturation électronique impose un format STRUCTURÉ (XML, UBL, Factur-X) qui permet un traitement automatisé. Un simple PDF par mail ne suffit plus légalement."
  },
  {
    q: "Quel est le but principal de la facturation électronique ?",
    options: [
      "Augmenter le montant des impôts des entreprises",
      "Remplacer les comptables par des intelligences artificielles",
      "Lutter contre la fraude à la TVA et simplifier les obligations déclaratives",
      "Forcer toutes les entreprises à utiliser le même logiciel",
      "Faciliter uniquement l'envoi international des factures",
      "Réduire la consommation de papier comme seul objectif",
      "Permettre aux clients de payer plus rapidement"
    ],
    correct: [2],
    explanation: "L'objectif premier est de LUTTER CONTRE LA FRAUDE À LA TVA, gagner en productivité et simplifier les déclarations fiscales. Le reste sont des bénéfices secondaires."
  },
  {
    q: "À partir de quand la réception des factures électroniques est-elle obligatoire pour toutes les entreprises ?",
    options: [
      "1er janvier 2024",
      "1er juillet 2025",
      "1er janvier 2026",
      "1er septembre 2026",
      "1er septembre 2027",
      "1er janvier 2028",
      "1er janvier 2030"
    ],
    correct: [3],
    explanation: "La réception est obligatoire pour TOUTES les entreprises assujetties à la TVA à partir du 1er septembre 2026. L'émission est échelonnée selon la taille de l'entreprise."
  },
  {
    q: "Quels sont les différents secteurs présents à l'INSECO ?",
    multi: true,
    options: [
      "Logiciels et formation",
      "Conception de jeux vidéo",
      "Assistance téléphonique",
      "Cybersécurité offensive",
      "Installation des logiciels",
      "Vente des logiciels",
      "Recrutement de comptables externes",
      "Planification de la facturation"
    ],
    correct: [0, 2, 4, 5, 7],
    explanation: "Les 5 secteurs de l'INSECO : Logiciels et formation, Assistance téléphonique, Installation, Vente, et Planification de la facturation. Pas de jeux vidéo, pas de cybersécurité offensive ni de recrutement externalisé."
  },
  {
    q: "Quels sont les différents membres du groupe Altiore MT ?",
    multi: true,
    options: [
      "Inseco",
      "Capgemini",
      "Teamway",
      "Atos",
      "Tdi services",
      "Sopra Steria",
      "Itstore pro",
      "Altiore Digital"
    ],
    correct: [0, 2, 4, 6],
    explanation: "Le groupe Altiore MT réunit 4 entités : Inseco, Teamway, Tdi services et Itstore pro. Les autres sont des grands groupes français du numérique sans lien avec Altiore."
  },
  {
    q: "Parmi ces plateformes, lesquelles sont agréées et utilisées par l'INSECO ?",
    multi: true,
    options: [
      "Salesforce",
      "Sage",
      "QuickBooks",
      "Microsoft Excel",
      "Docuware",
      "Cegid",
      "Pennylane"
    ],
    correct: [1, 4],
    explanation: "Sage et Docuware sont les deux plateformes agréées utilisées par l'INSECO. Les autres existent mais ne sont pas dans le catalogue INSECO."
  },
  {
    q: "Quel est le but premier de l'INSECO ?",
    options: [
      "Développer des applications mobiles pour les particuliers",
      "Vendre, installer et accompagner les entreprises sur des logiciels de gestion",
      "Former les jeunes au métier de comptable",
      "Conseiller juridiquement les TPE",
      "Auditer les comptes des grandes entreprises",
      "Concevoir des logiciels comptables sur-mesure",
      "Vendre du matériel informatique aux entreprises"
    ],
    correct: [1],
    explanation: "L'INSECO accompagne les entreprises dans la digitalisation de leur gestion : vente, installation et formation sur des logiciels (Sage, Docuware...)."
  },
  {
    q: "Qui est M. OMER ?",
    options: [
      "Comptable à Teamway",
      "Commercial sénior à l'Inseco",
      "Directeur technique de l'Inseco",
      "Directeur des ressources humaines",
      "Fondateur du groupe Altiore MT",
      "Responsable formation",
      "Chef de projet Sage",
      "PDG de l'Inseco"
    ],
    correct: [2],
    explanation: "M. OMER est le Directeur technique de l'Inseco."
  },
  {
    q: "En quelle année l'Inseco a-t-elle été créée ?",
    options: [
      "1978",
      "1985",
      "1988",
      "1990",
      "1994",
      "1998",
      "2002",
      "2008"
    ],
    correct: [2],
    explanation: "L'Inseco a été créée en 1988."
  },
  {
    q: "Quel est l'objectif principal d'un commercial à l'Inseco ?",
    options: [
      "Concevoir les logiciels en interne",
      "Faire le support technique des clients",
      "Encadrer les stagiaires",
      "Former les nouveaux clients à l'utilisation",
      "Vendre les logiciels aux clients",
      "Recruter de nouveaux développeurs",
      "Gérer la comptabilité interne du groupe"
    ],
    correct: [4],
    explanation: "L'objectif principal du commercial est de VENDRE les logiciels (Sage, Docuware...) aux clients. La formation et le support sont assurés par d'autres pôles."
  },
  {
    q: "Qu'est-ce que le localStorage en développement web ?",
    options: [
      "Une base de données hébergée chez Google",
      "Une mémoire qui s'efface dès qu'on ferme l'onglet",
      "Un espace de stockage dans le navigateur, persistant et limité à ~5 Mo",
      "Un fichier texte enregistré sur le disque dur de l'utilisateur",
      "Une mémoire RAM allouée au navigateur",
      "Un protocole de transmission de données entre serveurs",
      "Un service de sauvegarde automatique dans le cloud"
    ],
    correct: [2],
    hint: "Pense à un endroit DANS le navigateur (pas sur un serveur, pas sur le disque dur) où les données restent intactes même après avoir fermé l'onglet ou redémarré le PC.",
    explanation: "Le localStorage permet de stocker des paires clé/valeur dans le navigateur. Les données restent après fermeture (contrairement au sessionStorage qui, lui, s'efface à la fermeture de l'onglet)."
  },
  {
    q: "Qu'est-ce qu'une API ?",
    options: [
      "Un type de logiciel antivirus",
      "Une carte graphique pour serveur",
      "Une interface qui permet à deux programmes de communiquer entre eux",
      "Un protocole d'authentification utilisateur",
      "Un langage de programmation moderne",
      "Un format de fichier compressé",
      "Un système d'exploitation embarqué"
    ],
    correct: [2],
    hint: "Ce n'est ni un logiciel, ni un langage, ni un protocole. C'est une INTERFACE — comme un menu de restaurant entre le client (un programme) et le cuisinier (un autre programme).",
    explanation: "Une API (Application Programming Interface) permet à deux logiciels de dialoguer. Exemple : l'API Open-Meteo qui retourne la météo via une requête HTTP."
  }
];

/* ============================================
   SONS (Web Audio API — pas de fichiers à charger)
   Tous les sons sont synthétisés à la volée.
   ============================================ */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Joue une note simple avec attaque + release
function tone(freq, duration, type = 'sine', volume = 0.3, delay = 0) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const start = audioCtx.currentTime + delay;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  } catch (e) { /* audio context indisponible */ }
}

// "Ding" de bonne réponse — deux notes montantes joyeuses
function playCorrect() {
  tone(523.25, 0.15, 'sine', 0.3);            // C5
  tone(783.99, 0.25, 'sine', 0.3, 0.12);      // G5
}

// "Buzz" de mauvaise réponse — deux notes descendantes
function playWrong() {
  tone(349.23, 0.2, 'sawtooth', 0.18);        // F4
  tone(174.61, 0.4, 'sawtooth', 0.18, 0.15);  // F3
}

// Musique de victoire — inspirée du "Course Clear" de Super Mario Bros
// (style chiptune 8-bit, onde carrée, arpège ascendant qui monte sur 2 octaves)
function playVictory() {
  const sq = 'square';
  const b = 0.095; // durée d'une croche (tempo rapide style NES)
  let t = 0;

  // Arpège ascendant : Sol - Do - Mi - Sol - Do - Mi (sur 2 octaves)
  const ascend = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
  ascend.forEach(f => { tone(f, b * 0.95, sq, 0.22, t); t += b; });

  // Note aiguë tenue (Sol6)
  tone(1567.98, b * 4, sq, 0.24, t); t += b * 4;

  // Petite descente
  tone(1318.51, b, sq, 0.18, t); t += b;
  tone(1046.50, b, sq, 0.18, t); t += b;

  // Accord final triomphant (Do majeur en deux octaves, tenu)
  tone(1318.51, b * 8, sq, 0.24, t);
  tone(1046.50, b * 8, sq, 0.20, t);
  tone(783.99,  b * 8, sq, 0.18, t);
  tone(523.25,  b * 8, sq, 0.16, t);
}

// Son de défaite (pour score <= 7/12) — différent du buzz d'erreur :
// long, mélancolique, descendant
function playDefeat() {
  const notes = [392.00, 369.99, 349.23, 329.63, 293.66]; // descente lente
  notes.forEach((f, i) => tone(f, 0.5, 'sawtooth', 0.2, i * 0.25));
}

// Bruit d'explosion de feu d'artifice
function playFirework() {
  try {
    // Bruit blanc en décroissance pour le "boum"
    const bufferSize = audioCtx.sampleRate * 0.5;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
    noise.stop(audioCtx.currentTime + 0.5);
    // Sifflet aigu avant le boum pour varier
    tone(600 + Math.random() * 600, 0.08, 'square', 0.08);
  } catch (e) { /* ignore */ }
}

/* ============================================
   FEUX D'ARTIFICE (canvas plein écran)
   ============================================ */
function launchFireworks(durationMs = 6000) {
  const canvas = document.createElement('canvas');
  // z-index 1 → canvas DERRIÈRE la card .container (qui a z-index 10)
  // background:transparent → on voit le fond violet ET la card par-dessus
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:1;background:transparent;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = ['#ff6b6b', '#ffe66d', '#4ecdc4', '#a78bfa', '#fb923c', '#34d399', '#f472b6'];
  const particles = [];

  function burst(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 50 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.15;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color
      });
    }
    playFirework();
  }

  const startTime = performance.now();
  const burstInterval = setInterval(() => {
    if (performance.now() - startTime > durationMs - 800) return;
    const x = canvas.width * (0.15 + Math.random() * 0.7);
    const y = canvas.height * (0.15 + Math.random() * 0.5);
    burst(x, y);
  }, 550);

  // Premier feu immédiat
  burst(canvas.width * 0.5, canvas.height * 0.4);

  let animId;
  function animate() {
    // Effet de traînée SANS peindre du noir :
    // destination-out efface progressivement les pixels existants
    // → le canvas reste TRANSPARENT (on voit le fond violet + la card derrière)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravité
      p.life -= 0.012;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      // Petit halo lumineux autour de chaque particule
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    animId = requestAnimationFrame(animate);
  }
  animate();

  setTimeout(() => {
    clearInterval(burstInterval);
    setTimeout(() => {
      cancelAnimationFrame(animId);
      canvas.remove();
    }, 1800);
  }, durationMs);
}

/* ============================================
   ÉTAT DU QUIZ
   ============================================ */
let currentIndex = 0;
let score = 0;
let selected = new Set();          // contient les INDEX ORIGINAUX des options sélectionnées
let currentShuffled = [];          // ordre affiché : [{ original, text }, ...]
let answered = false;

/* ============================================
   UTILITAIRES
   ============================================ */
// Mélange un tableau (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================================
   GESTION DES ÉCRANS
   ============================================ */
const screens = {
  welcome: document.getElementById('welcome'),
  question: document.getElementById('question'),
  results: document.getElementById('results')
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  lucide.createIcons();
}

/* ============================================
   AFFICHER UNE QUESTION
   - Mélange les options à chaque chargement
   - Garde la trace de l'index ORIGINAL pour la validation
   ============================================ */
function displayQuestion(index) {
  const item = QUIZ[index];
  selected.clear();
  answered = false;

  // Mise à jour barre de progression
  document.getElementById('q-num').textContent = index + 1;
  document.getElementById('q-total').textContent = QUIZ.length;
  document.getElementById('progress-fill').style.width =
    ((index + 1) / QUIZ.length * 100) + '%';

  // Énoncé
  document.getElementById('question-text').textContent = item.q;
  document.getElementById('question-hint').hidden = !item.multi;

  // Mélange aléatoire des options en gardant l'index original
  currentShuffled = shuffle(
    item.options.map((text, original) => ({ original, text }))
  );

  // Rendu des options
  const list = document.getElementById('options-list');
  list.innerHTML = '';

  currentShuffled.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.dataset.original = opt.original;
    btn.innerHTML = `
      <span class="option-marker">
        <i data-lucide="${item.multi ? 'square' : 'circle'}"></i>
      </span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => toggleOption(opt.original, btn, item.multi));
    list.appendChild(btn);
  });

  // Reset des boutons et du feedback
  document.getElementById('validate-btn').hidden = false;
  document.getElementById('validate-btn').disabled = true;
  document.getElementById('next-btn').hidden = true;
  document.getElementById('feedback').hidden = true;

  // Bouton Indice : visible uniquement si la question a un champ "hint"
  const hintBtn = document.getElementById('hint-btn');
  const hintCallout = document.getElementById('hint-callout');
  hintBtn.hidden = !item.hint;
  hintCallout.hidden = true;

  lucide.createIcons();
}

/* ============================================
   SÉLECTION / DÉSÉLECTION D'UNE OPTION
   On travaille uniquement avec les INDEX ORIGINAUX
   ============================================ */
function toggleOption(originalIndex, btn, multi) {
  if (answered) return;

  const setIconTo = (button, name) => {
    const icon = button.querySelector('[data-lucide]');
    if (icon) icon.setAttribute('data-lucide', name);
  };

  if (multi) {
    if (selected.has(originalIndex)) {
      selected.delete(originalIndex);
      btn.classList.remove('selected');
      setIconTo(btn, 'square');
    } else {
      selected.add(originalIndex);
      btn.classList.add('selected');
      setIconTo(btn, 'check-square');
    }
  } else {
    // Single : on désélectionne toutes les autres
    selected.clear();
    document.querySelectorAll('.option').forEach(b => {
      b.classList.remove('selected');
      setIconTo(b, 'circle');
    });
    selected.add(originalIndex);
    btn.classList.add('selected');
    setIconTo(btn, 'circle-check-big');
  }

  document.getElementById('validate-btn').disabled = selected.size === 0;
  lucide.createIcons();
}

/* ============================================
   VALIDER LA RÉPONSE
   - Compare les index originaux sélectionnés avec item.correct
   - Bonne réponse = MÊME ensemble (ni plus, ni moins)
   ============================================ */
function validate() {
  const item = QUIZ[currentIndex];
  answered = true;

  const correctSet = new Set(item.correct);

  // Comparaison stricte d'ensembles
  const isCorrect =
    correctSet.size === selected.size &&
    [...correctSet].every(c => selected.has(c));

  if (isCorrect) {
    score++;
    playCorrect();
  } else {
    playWrong();
  }

  // Colorisation des options (via leur index original stocké en dataset)
  document.querySelectorAll('.option').forEach(btn => {
    const original = parseInt(btn.dataset.original);
    btn.disabled = true;
    if (correctSet.has(original)) {
      btn.classList.add('correct');
    } else if (selected.has(original)) {
      btn.classList.add('wrong');
    }
  });

  // Feedback
  const fb = document.getElementById('feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = `
    <strong>${isCorrect ? '✓ Bravo, bonne réponse !' : '✗ Pas tout à fait...'}</strong>
    ${item.explanation}
  `;

  // Échange Valider → Suivante + on masque le bouton Indice
  document.getElementById('validate-btn').hidden = true;
  document.getElementById('next-btn').hidden = false;
  document.getElementById('hint-btn').hidden = true;
  lucide.createIcons();
}

/* ============================================
   QUESTION SUIVANTE / FIN
   ============================================ */
function next() {
  if (currentIndex < QUIZ.length - 1) {
    currentIndex++;
    displayQuestion(currentIndex);
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('score-display').innerHTML =
    `<strong>${score}</strong> / ${QUIZ.length}`;

  const pct = score / QUIZ.length;
  let msg;
  if (pct === 1) msg = "Parfait, vous vous y connaissez mieux que moi !";
  else if (pct >= 0.75) msg = "Excellent, mon exposé n'a pas servi à rien ;)";
  else if (pct >= 0.5) msg = "Pas mal, mais il y a encore des points à améliorer.";
  else msg = "Apparemment, mon exposé n'a pas suffi...";

  document.getElementById('score-message').textContent = msg;
  showScreen('results');

  // Célébration (≥ 8/12) ou son de défaite final
  if (score >= 8) {
    playVictory();
    launchFireworks(6000);
  } else {
    playDefeat();
  }
}

/* ============================================
   BOUTONS PRINCIPAUX
   ============================================ */
document.getElementById('start-btn').addEventListener('click', () => {
  // Les navigateurs bloquent l'audio tant qu'il n'y a pas eu d'interaction utilisateur
  if (audioCtx.state === 'suspended') audioCtx.resume();
  currentIndex = 0;
  score = 0;
  displayQuestion(0);
  showScreen('question');
});

document.getElementById('validate-btn').addEventListener('click', validate);
document.getElementById('next-btn').addEventListener('click', next);

// Affiche l'indice de la question courante
document.getElementById('hint-btn').addEventListener('click', () => {
  const item = QUIZ[currentIndex];
  if (!item.hint) return;
  document.getElementById('hint-text').textContent = item.hint;
  document.getElementById('hint-callout').hidden = false;
  // L'indice peut être lu plusieurs fois mais on cache le bouton après usage
  document.getElementById('hint-btn').hidden = true;
  lucide.createIcons();
});

document.getElementById('restart-btn').addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  showScreen('welcome');
});

// Init des icônes Lucide au chargement
lucide.createIcons();

/* ============================================
   EFFET DE SURPRISE — révéler le quiz à l'Espace
   Le quiz démarre invisible. L'utilisateur appuie
   sur Espace → fondu d'apparition de 1.8 s.
   ============================================ */
function revealQuiz() {
  if (!document.body.classList.contains('hidden-start')) return;
  document.body.classList.remove('hidden-start');
  // Petit son d'apparition (doux, accord montant)
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    tone(523.25, 0.4, 'sine', 0.15, 0);     // C5
    tone(659.25, 0.4, 'sine', 0.15, 0.15);  // E5
    tone(783.99, 0.6, 'sine', 0.15, 0.3);   // G5
  } catch (e) { /* ignore */ }
  // Retire l'indication du DOM une fois la transition terminée
  setTimeout(() => {
    const hint = document.getElementById('reveal-hint');
    if (hint) hint.remove();
  }, 2000);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ') {
    if (document.body.classList.contains('hidden-start')) {
      e.preventDefault();
      revealQuiz();
    }
  }
});
