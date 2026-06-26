/* ============================================
   0. ICÔNES LUCIDE (initialisation)
   On appelle lucide.createIcons() après chaque
   modification du DOM qui contient des <i data-lucide="...">
   ============================================ */
lucide.createIcons();

/* ============================================
   1. HORLOGE + MESSAGE DE BIENVENUE
   ============================================ */
const clockEl = document.getElementById('clock');
const greetingTextEl = document.getElementById('greeting-text');
const greetingIconEl = document.getElementById('greeting-icon');
const dateEl = document.getElementById('date-text');

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}:${s}`;
}

// Une grande banque de citations philosophiques — une est tirée au hasard à chaque chargement
const PHILO_QUOTES = [
  // Antiquité grecque
  { quote: "Connais-toi toi-même", author: "Socrate" },
  { quote: "Tout ce que je sais, c'est que je ne sais rien", author: "Socrate" },
  { quote: "Une vie sans examen ne vaut pas la peine d'être vécue", author: "Socrate" },
  { quote: "La sagesse commence dans l'émerveillement", author: "Socrate" },
  { quote: "Le commencement est la moitié de tout", author: "Platon" },
  { quote: "Le courage, c'est savoir ce qu'il ne faut pas craindre", author: "Platon" },
  { quote: "Nous sommes ce que nous faisons à plusieurs reprises", author: "Aristote" },
  { quote: "Le bonheur dépend de nous-mêmes", author: "Aristote" },
  { quote: "L'homme est par nature un animal politique", author: "Aristote" },
  { quote: "L'amitié est une âme en deux corps", author: "Aristote" },
  { quote: "L'espoir est le rêve de l'homme éveillé", author: "Aristote" },
  { quote: "La nature ne fait rien en vain", author: "Aristote" },
  { quote: "L'éducation est le meilleur viatique pour la vieillesse", author: "Aristote" },
  { quote: "Ôte-toi de mon soleil", author: "Diogène" },
  { quote: "Je cherche un homme", author: "Diogène" },
  { quote: "L'homme est la mesure de toute chose", author: "Protagoras" },
  { quote: "On ne se baigne jamais deux fois dans le même fleuve", author: "Héraclite" },
  { quote: "Tout s'écoule", author: "Héraclite" },
  { quote: "La nature aime à se cacher", author: "Héraclite" },
  { quote: "L'art est long, la vie est brève", author: "Hippocrate" },

  // Stoïciens
  { quote: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles", author: "Sénèque" },
  { quote: "Tant que tu ne sauras pas vivre, tu ne sauras pas mourir", author: "Sénèque" },
  { quote: "Vivre, c'est combattre", author: "Sénèque" },
  { quote: "La vie est longue si on sait s'en servir", author: "Sénèque" },
  { quote: "Pour l'homme qui ne sait pas où il va, il n'y a pas de vent favorable", author: "Sénèque" },
  { quote: "Tant qu'il y a vie, il y a espoir", author: "Sénèque" },
  { quote: "Si tu veux te faire aimer, aime", author: "Sénèque" },
  { quote: "L'âme se teint de la couleur de ses pensées", author: "Marc Aurèle" },
  { quote: "Vis chaque jour comme si c'était le dernier", author: "Marc Aurèle" },
  { quote: "L'art de vivre est plus proche de la lutte que de la danse", author: "Marc Aurèle" },
  { quote: "Que tes actes te plaisent, c'est assez", author: "Marc Aurèle" },
  { quote: "Ce n'est pas ce qui arrive qui nous trouble, mais l'idée que nous nous en faisons", author: "Épictète" },
  { quote: "Il y a des choses qui dépendent de nous, d'autres non", author: "Épictète" },
  { quote: "N'attends pas que les événements arrivent comme tu le souhaites", author: "Épictète" },
  { quote: "Errare humanum est, perseverare diabolicum", author: "Sénèque (attribué)" },
  { quote: "Festina lente — hâte-toi lentement", author: "Suétone (Auguste)" },
  { quote: "Carpe diem", author: "Horace" },
  { quote: "Memento mori", author: "Locution latine" },

  // Sagesses orientales
  { quote: "Un voyage de mille lieues commence par un pas", author: "Lao Tseu" },
  { quote: "Connaître les autres, c'est sagesse ; se connaître soi-même, c'est sagesse supérieure", author: "Lao Tseu" },
  { quote: "Qui se vainc soi-même est puissant", author: "Lao Tseu" },
  { quote: "Le sage se gouverne par l'intérieur, non par l'extérieur", author: "Lao Tseu" },
  { quote: "Qui sait s'arrêter ne périclite pas", author: "Lao Tseu" },
  { quote: "Choisis un travail que tu aimes et tu n'auras pas à travailler un seul jour de ta vie", author: "Confucius" },
  { quote: "Là où vous allez, allez avec tout votre cœur", author: "Confucius" },
  { quote: "Celui qui déplace une montagne commence par déplacer de petites pierres", author: "Confucius" },
  { quote: "Apprendre sans réfléchir est vain", author: "Confucius" },
  { quote: "Le silence est un ami qui ne trahit jamais", author: "Confucius" },
  { quote: "Mieux vaut allumer une bougie que maudire l'obscurité", author: "Confucius (attribué)" },
  { quote: "Trois choses ne peuvent rester longtemps cachées : le soleil, la lune et la vérité", author: "Bouddha" },
  { quote: "Tu ne seras pas puni pour ta colère, tu seras puni par ta colère", author: "Bouddha" },
  { quote: "Ne crois en rien parce que tu en as entendu parler", author: "Bouddha" },
  { quote: "Mieux vaut se conquérir soi-même que de vaincre mille batailles", author: "Bouddha" },
  { quote: "L'art de la guerre, c'est de soumettre l'ennemi sans combat", author: "Sun Tzu" },
  { quote: "Connais ton ennemi et connais-toi toi-même", author: "Sun Tzu" },
  { quote: "Lorsque l'oiseau est en cage, la liberté de l'oiseau est dans son chant", author: "R. Tagore" },
  { quote: "L'eau qui coule ne se corrompt pas", author: "Proverbe chinois" },

  // Saint Augustin, Saint Thomas, Saint Bernard
  { quote: "Aime, et fais ce que tu veux", author: "Saint Augustin" },
  { quote: "L'enfer est pavé de bonnes intentions", author: "Saint Bernard de Clairvaux" },

  // Renaissance / 16e
  { quote: "La fin justifie les moyens", author: "N. Machiavel" },
  { quote: "Que sais-je ?", author: "M. de Montaigne" },
  { quote: "Si la vie n'est qu'un passage, sur ce passage au moins semons des fleurs", author: "M. de Montaigne" },
  { quote: "Le monde est mouvement", author: "M. de Montaigne" },

  // 17e siècle
  { quote: "Je pense, donc je suis", author: "R. Descartes" },
  { quote: "Le bon sens est la chose du monde la mieux partagée", author: "R. Descartes" },
  { quote: "Pour bien faire, il faut bien penser", author: "R. Descartes" },
  { quote: "Cogito ergo sum", author: "R. Descartes" },
  { quote: "Le cœur a ses raisons que la raison ne connaît point", author: "B. Pascal" },
  { quote: "L'homme n'est qu'un roseau, le plus faible de la nature, mais c'est un roseau pensant", author: "B. Pascal" },
  { quote: "Tout le malheur des hommes vient d'une seule chose, qui est de ne savoir pas demeurer en repos dans une chambre", author: "B. Pascal" },
  { quote: "Le silence éternel des espaces infinis m'effraie", author: "B. Pascal" },
  { quote: "Sentir que nous sommes éternels", author: "B. Spinoza" },
  { quote: "Le désir est l'essence même de l'homme", author: "B. Spinoza" },
  { quote: "Le mensonge est la plus grande des servitudes", author: "B. Spinoza" },

  // Lumières (18e)
  { quote: "Il faut cultiver notre jardin", author: "Voltaire" },
  { quote: "Le doute n'est pas un état plaisant, mais l'assurance est un état ridicule", author: "Voltaire" },
  { quote: "Le mieux est l'ennemi du bien", author: "Voltaire" },
  { quote: "J'ai décidé d'être heureux parce que c'est bon pour la santé", author: "Voltaire" },
  { quote: "Les préjugés sont la raison des sots", author: "Voltaire" },
  { quote: "L'homme est né libre, et partout il est dans les fers", author: "J.-J. Rousseau" },
  { quote: "La modération seule donne du prix aux jouissances de la vie", author: "J.-J. Rousseau" },
  { quote: "La patience est amère, mais son fruit est doux", author: "J.-J. Rousseau" },
  { quote: "On n'a jamais assez d'amour pour pouvoir s'en passer", author: "D. Diderot" },
  { quote: "Agis comme si la maxime de ton action devait être érigée par ta volonté en loi universelle", author: "E. Kant" },
  { quote: "Aie le courage de te servir de ton propre entendement", author: "E. Kant" },
  { quote: "Le ciel étoilé au-dessus de moi, la loi morale en moi", author: "E. Kant" },

  // 19e siècle
  { quote: "Rien de grand ne s'est accompli dans le monde sans passion", author: "G. W. F. Hegel" },
  { quote: "L'histoire est le tribunal du monde", author: "G. W. F. Hegel" },
  { quote: "Tout vouloir provient d'un besoin, donc d'un manque, donc d'une souffrance", author: "A. Schopenhauer" },
  { quote: "Le talent atteint sa cible, le génie atteint une cible que personne d'autre ne voit", author: "A. Schopenhauer" },
  { quote: "Ce qui ne me tue pas me rend plus fort", author: "F. Nietzsche" },
  { quote: "Dieu est mort", author: "F. Nietzsche" },
  { quote: "Sans la musique, la vie serait une erreur", author: "F. Nietzsche" },
  { quote: "Deviens ce que tu es", author: "F. Nietzsche" },
  { quote: "Il faut avoir du chaos en soi pour donner naissance à une étoile dansante", author: "F. Nietzsche" },
  { quote: "Celui qui combat des monstres doit prendre garde à ne pas devenir monstre lui-même", author: "F. Nietzsche" },
  { quote: "Vivre dangereusement", author: "F. Nietzsche" },
  { quote: "Tout ce qui est profond aime le masque", author: "F. Nietzsche" },
  { quote: "La vie ne peut être comprise qu'en regardant en arrière, mais elle doit être vécue en regardant en avant", author: "S. Kierkegaard" },
  { quote: "L'angoisse est le vertige de la liberté", author: "S. Kierkegaard" },
  { quote: "Ceux qui vivent, ce sont ceux qui luttent", author: "V. Hugo" },
  { quote: "Un seul être vous manque et tout est dépeuplé", author: "A. de Lamartine" },

  // 20e siècle
  { quote: "L'existence précède l'essence", author: "J.-P. Sartre" },
  { quote: "L'enfer, c'est les autres", author: "J.-P. Sartre" },
  { quote: "Nous sommes condamnés à être libres", author: "J.-P. Sartre" },
  { quote: "L'homme n'est rien d'autre que ce qu'il se fait", author: "J.-P. Sartre" },
  { quote: "Il faut imaginer Sisyphe heureux", author: "A. Camus" },
  { quote: "La vraie générosité envers l'avenir consiste à tout donner au présent", author: "A. Camus" },
  { quote: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible", author: "A. Camus" },
  { quote: "Il n'y a qu'un problème philosophique vraiment sérieux : le suicide", author: "A. Camus" },
  { quote: "On ne naît pas femme, on le devient", author: "S. de Beauvoir" },
  { quote: "Que la femme prenne conscience de ce qu'elle est", author: "S. de Beauvoir" },
  { quote: "Les limites de mon langage signifient les limites de mon propre monde", author: "L. Wittgenstein" },
  { quote: "Ce dont on ne peut parler, il faut le taire", author: "L. Wittgenstein" },
  { quote: "L'avenir n'est pas ce qui va nous arriver, mais ce que nous allons en faire", author: "H. Bergson" },
  { quote: "L'intelligence est la faculté de fabriquer des objets artificiels", author: "H. Bergson" },
  { quote: "Le visage interdit de tuer", author: "E. Levinas" },
  { quote: "Autrui m'oblige", author: "E. Levinas" },
  { quote: "La banalité du mal", author: "H. Arendt" },
  { quote: "La pensée se tient en éveil", author: "H. Arendt" },
  { quote: "Le savoir est pouvoir", author: "M. Foucault" },
  { quote: "Le malheur des hommes vient de ce qu'ils ignorent à quel point ils sont heureux", author: "B. Russell" },
  { quote: "L'amour est plus fort que la mort", author: "S. Freud" },
  { quote: "Le moi n'est pas maître dans sa propre maison", author: "S. Freud" },
  { quote: "Rien n'est donné, tout est construit", author: "G. Bachelard" },
  { quote: "L'être est ce qui se montre", author: "M. Heidegger" },
  { quote: "Là où croît le danger croît aussi ce qui sauve", author: "F. Hölderlin / Heidegger" },

  // Saint-Exupéry & autres écrivains-philosophes
  { quote: "On ne voit bien qu'avec le cœur, l'essentiel est invisible pour les yeux", author: "A. de Saint-Exupéry" },
  { quote: "Fais de ta vie un rêve, et d'un rêve, une réalité", author: "A. de Saint-Exupéry" },
  { quote: "Chaque homme doit inventer son chemin", author: "A. de Saint-Exupéry" },
  { quote: "L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction", author: "A. de Saint-Exupéry" },
  { quote: "Tu deviens responsable pour toujours de ce que tu as apprivoisé", author: "A. de Saint-Exupéry" },

  // Cioran
  { quote: "Vivre, c'est se perdre", author: "E. Cioran" },
  { quote: "Pas une seule joie qui ne se révèle imposture", author: "E. Cioran" },
  { quote: "Penser, c'est ne pas croire ce que l'on pense", author: "E. Cioran" },

  // Krishnamurti
  { quote: "Il n'y a pas de chemin vers le bonheur, le bonheur est le chemin", author: "J. Krishnamurti" },
  { quote: "L'observation pure est la plus haute forme d'intelligence", author: "J. Krishnamurti" },

  // Gandhi
  { quote: "Sois le changement que tu veux voir dans le monde", author: "M. Gandhi" },
  { quote: "Vis comme si tu devais mourir demain, apprends comme si tu devais vivre toujours", author: "M. Gandhi" },
  { quote: "La force ne provient pas des capacités physiques mais d'une volonté indomptable", author: "M. Gandhi" },

  // Einstein
  { quote: "L'imagination est plus importante que le savoir", author: "A. Einstein" },
  { quote: "La folie c'est de faire toujours la même chose et de s'attendre à un résultat différent", author: "A. Einstein" },
  { quote: "La vie c'est comme une bicyclette : il faut avancer pour ne pas perdre l'équilibre", author: "A. Einstein" },

  // Marie Curie
  { quote: "La vie n'est facile pour aucun de nous. Et alors ? Il faut avoir de la persévérance", author: "M. Curie" },
  { quote: "Rien dans la vie n'est à craindre, tout doit être compris", author: "M. Curie" },

  // Saint Galilée / autres
  { quote: "Et pourtant elle tourne", author: "G. Galilée" },
  { quote: "Eureka !", author: "Archimède" },

  // Proverbes & latin
  { quote: "Veni, vidi, vici", author: "J. César" },
  { quote: "Audaces fortuna juvat", author: "Virgile" },
  { quote: "Hic et nunc", author: "Locution latine" },
  { quote: "L'avenir appartient à ceux qui se lèvent tôt", author: "Proverbe français" },
  { quote: "L'amour est de tous les âges", author: "Voltaire" },

  // Tagore, Hugo, divers
  { quote: "Tout ce qui est excessif est insignifiant", author: "Talleyrand" },
  { quote: "Le poème ne dit pas, il fait", author: "P. Valéry" },
  { quote: "Le tout est plus que la somme des parties", author: "Aristote" }
];


function updateGreeting() {
  const hour = new Date().getHours();
  let icon;
  if (hour < 6) icon = 'moon';
  else if (hour < 12) icon = 'sun';
  else if (hour < 18) icon = 'sun-medium';
  else icon = 'sunset';

  // Une citation philosophique au hasard à chaque chargement
  const meme = PHILO_QUOTES[Math.floor(Math.random() * PHILO_QUOTES.length)];
  greetingTextEl.innerHTML = `
    <span class="quote-text">« ${meme.quote} »</span>
    <span class="quote-author">— ${meme.author}</span>
  `;
  greetingIconEl.setAttribute('data-lucide', icon);
  lucide.createIcons();

  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  dateEl.textContent = new Date().toLocaleDateString('fr-FR', options);
}

updateClock();
updateGreeting();
setInterval(updateClock, 1000);

/* ============================================
   2. THÈME CLAIR / SOMBRE
   ============================================ */
const themeBtn = document.getElementById('theme-toggle');

function setThemeIcon(isDark) {
  themeBtn.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;
  lucide.createIcons();
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  setThemeIcon(true);
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  setThemeIcon(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ============================================
   3. TO-DO LIST (avec localStorage)
   ============================================ */
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.done) span.classList.add('done');

    // Bouton crayon → édition inline
    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.title = 'Modifier';
    editBtn.innerHTML = '<i data-lucide="pencil"></i>';
    editBtn.addEventListener('click', () => startEditTodo(li, span, index));

    const delBtn = document.createElement('button');
    delBtn.className = 'delete';
    delBtn.title = 'Supprimer';
    delBtn.innerHTML = '<i data-lucide="trash-2"></i>';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
  lucide.createIcons();
}

// Remplace le texte par un champ de saisie. Entrée = valider, Échap = annuler.
function startEditTodo(li, span, index) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = todos[index].text;
  li.replaceChild(input, span);
  input.focus();
  input.select();

  const finish = (save) => {
    const newText = input.value.trim();
    if (save && newText) {
      todos[index].text = newText;
      saveTodos();
    }
    renderTodos();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true);
    else if (e.key === 'Escape') finish(false);
  });
  input.addEventListener('blur', () => finish(true));
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  saveTodos();
  renderTodos();
  todoInput.value = '';
});

renderTodos();

/* ============================================
   4. MÉTÉO (API Open-Meteo, sans clé)
   ============================================ */
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const weatherEl = document.getElementById('weather');

async function getWeather(city) {
  weatherEl.innerHTML = '<p class="weather-hint">Chargement...</p>';
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      weatherEl.innerHTML = '<p class="weather-hint">Ville introuvable</p>';
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temp = Math.round(weatherData.current_weather.temperature);
    const code = weatherData.current_weather.weathercode;

    weatherEl.innerHTML = `
      <div class="weather-main">
        <i data-lucide="${getWeatherIcon(code)}"></i>
        <div class="weather-temp">${temp}°C</div>
      </div>
      <div class="weather-city">${name}, ${country}</div>
      <div class="weather-desc">${getWeatherDesc(code)}</div>
    `;
    lucide.createIcons();

    localStorage.setItem('city', city);
  } catch (err) {
    weatherEl.innerHTML = '<p class="weather-hint">Erreur de chargement</p>';
  }
}

function getWeatherIcon(code) {
  if (code === 0) return 'sun';
  if (code <= 3) return 'cloud-sun';
  if (code <= 48) return 'cloud-fog';
  if (code <= 67) return 'cloud-rain';
  if (code <= 77) return 'snowflake';
  if (code <= 82) return 'cloud-drizzle';
  if (code <= 99) return 'cloud-lightning';
  return 'cloud';
}

function getWeatherDesc(code) {
  if (code === 0) return 'Ciel dégagé';
  if (code <= 3) return 'Partiellement nuageux';
  if (code <= 48) return 'Brouillard';
  if (code <= 67) return 'Pluie';
  if (code <= 77) return 'Neige';
  if (code <= 82) return 'Averses';
  if (code <= 99) return 'Orage';
  return 'Météo inconnue';
}

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

const savedCity = localStorage.getItem('city');
if (savedCity) {
  cityInput.value = savedCity;
  getWeather(savedCity);
}

/* ============================================
   5. ACTU KARATÉ (flux RSS Google News)
   ============================================ */
const newsEl = document.getElementById('news');
const newsBtn = document.getElementById('news-refresh');

const RSS_URL = 'https://news.google.com/rss/search?q=karat%C3%A9&hl=fr&gl=FR&ceid=FR:fr';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

async function getNews() {
  newsEl.innerHTML = '<p class="news-hint">Chargement des actualités...</p>';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      newsEl.innerHTML = '<p class="news-hint">Aucune actualité trouvée</p>';
      return;
    }

    const articles = data.items.slice(0, 5);

    newsEl.innerHTML = articles.map(article => {
      const parts = article.title.split(' - ');
      const source = parts.length > 1 ? parts.pop() : '';
      const title = parts.join(' - ');

      return `
        <div class="news-item">
          <a href="${article.link}" target="_blank">${title}</a>
          ${source ? `<span class="news-source"><i data-lucide="map-pin"></i> ${source}</span>` : ''}
        </div>
      `;
    }).join('');
    lucide.createIcons();
  } catch (err) {
    newsEl.innerHTML = '<p class="news-hint">Impossible de charger les actualités</p>';
  }
}

newsBtn.addEventListener('click', getNews);
getNews();

/* ============================================
   5b. ACTU FOOT (flux RSS Google News)
   ============================================ */
const newsFootEl = document.getElementById('news-foot');
const newsFootBtn = document.getElementById('news-foot-refresh');

const FOOT_RSS_URL = 'https://news.google.com/rss/search?q=football&hl=fr&gl=FR&ceid=FR:fr';
const FOOT_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FOOT_RSS_URL)}`;

async function getFootNews() {
  newsFootEl.innerHTML = '<p class="news-hint">Chargement des actualités...</p>';
  try {
    const res = await fetch(FOOT_API_URL);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      newsFootEl.innerHTML = '<p class="news-hint">Aucune actualité trouvée</p>';
      return;
    }

    const articles = data.items.slice(0, 5);

    newsFootEl.innerHTML = articles.map(article => {
      const parts = article.title.split(' - ');
      const source = parts.length > 1 ? parts.pop() : '';
      const title = parts.join(' - ');

      return `
        <div class="news-item">
          <a href="${article.link}" target="_blank">${title}</a>
          ${source ? `<span class="news-source"><i data-lucide="map-pin"></i> ${source}</span>` : ''}
        </div>
      `;
    }).join('');
    lucide.createIcons();
  } catch (err) {
    newsFootEl.innerHTML = '<p class="news-hint">Impossible de charger les actualités</p>';
  }
}

newsFootBtn.addEventListener('click', getFootNews);
getFootNews();

/* ============================================
   6. POMODORO (avec temps paramétrable)
   ============================================ */
const timerEl = document.getElementById('timer');
const timerModeEl = document.getElementById('timer-mode');
const startBtn = document.getElementById('timer-start');
const resetBtn = document.getElementById('timer-reset');
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');
const saveBtn = document.getElementById('timer-save');

// On charge les temps sauvegardés (en minutes) ou on prend les valeurs par défaut
let workMinutes = parseInt(localStorage.getItem('workMinutes')) || 25;
let breakMinutes = parseInt(localStorage.getItem('breakMinutes')) || 5;

workInput.value = workMinutes;
breakInput.value = breakMinutes;

let timeLeft = workMinutes * 60;
let isWork = true;
let isRunning = false;
let timerId = null;

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  timerEl.textContent = formatTime(timeLeft);
  const icon = isWork ? 'book-open' : 'coffee';
  const label = isWork ? 'Travail' : 'Pause';
  timerModeEl.innerHTML = `<i data-lucide="${icon}"></i> <span>${label}</span>`;
  lucide.createIcons();
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
  } else {
    isWork = !isWork;
    timeLeft = (isWork ? workMinutes : breakMinutes) * 60;
    updateTimerDisplay();
    alert(isWork ? 'Pause terminée, au travail !' : 'Bravo, fais une pause !');
  }
}

function setStartButton(running) {
  const icon = running ? 'pause' : 'play';
  const label = running ? 'Pause' : 'Démarrer';
  startBtn.innerHTML = `<i data-lucide="${icon}"></i> ${label}`;
  lucide.createIcons();
}

startBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerId);
    isRunning = false;
    setStartButton(false);
  } else {
    timerId = setInterval(tick, 1000);
    isRunning = true;
    setStartButton(true);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  isRunning = false;
  isWork = true;
  timeLeft = workMinutes * 60;
  setStartButton(false);
  updateTimerDisplay();
});

saveBtn.addEventListener('click', () => {
  const newWork = parseInt(workInput.value);
  const newBreak = parseInt(breakInput.value);
  if (isNaN(newWork) || newWork < 1 || isNaN(newBreak) || newBreak < 1) {
    alert('Entre des minutes valides (au moins 1).');
    return;
  }
  workMinutes = newWork;
  breakMinutes = newBreak;
  localStorage.setItem('workMinutes', workMinutes);
  localStorage.setItem('breakMinutes', breakMinutes);

  // On remet le timer à zéro avec les nouvelles valeurs
  clearInterval(timerId);
  isRunning = false;
  isWork = true;
  timeLeft = workMinutes * 60;
  setStartButton(false);
  updateTimerDisplay();
});

updateTimerDisplay();

/* ============================================
   6b. PUNCHLINES DE LA BANDE
   ============================================ */
const PUNCHLINES = [
  "Gaspard connaît la date exacte de Marignan mais pas le jour de son prochain DST.",
  "Gaspard parle à son lapin comme à un ami d'enfance, et franchement, c'est sa relation la plus stable.",
  "Arthur a vu Rome, Athènes, Berlin… mais pas encore le fond de son sac.",
  "Le téléphone d'Arthur charge une page web le temps que Gaspard récite tous les rois de France.",
  "Amaury a perdu sa monétisation YouTube en 48h et il en parle encore comme de son âge d'or.",
  "Le bot de trading d'Amaury a une stratégie révolutionnaire : transformer les euros en leçons de vie.",
  "Elias a fait 50m en piscine, eu une crampe, et le raconte comme s'il avait traversé la Manche.",
  "La bio Instagram d'Elias est mise à jour plus souvent que ses devoirs.",
  "Arthur et Gaspard sur BlockBlast : deux cerveaux brillants alignant des carrés depuis 3 heures.",
  "Amaury ne révise jamais mais a 17 partout. La classe enquête comme sur un cold case.",
  "L'accent anglais d'Amaury fait pleurer la prof, mais lui se prend pour un trader de Wall Street.",
  "Les mains d'Amaury racontent deux histoires : muscu et escalade. Aucune ne parle d'hydratation.",
  "Elias est le seul de la classe avec un casier judiciaire scolaire. Une légende.",
  "Gaspard a un cahier impeccable, des fiches colorées… et joue à BlockBlast pendant les cours.",
  "Arthur s'inscrit à tous les voyages. Il va finir par avoir une carte de fidélité du lycée.",
  "Amaury attend que son bot lui rapporte des millions. C'est surtout son broker qui s'enrichit.",
  "Si Elias passait autant de temps en cours qu'en story, il aurait 20 et un Pulitzer.",
  "Gaspard te dira ce qui s'est passé en 1515 mais pas ce qu'il a mangé hier midi.",
  "Arthur a vu la Tour de Pise en vrai mais n'a jamais vu Pronote sans bugger.",
  "Amaury se prend pour un youtubeur, un trader et un athlète. En vrai c'est un lycéen aux mains pelées.",
  "Le lapin de Gaspard en sait plus sur Charlemagne que la prof d'histoire elle-même.",
  "Arthur a déjà préparé sa valise pour son voyage de l'an prochain.",
  "Amaury est tellement persuadé que son bot va décoller qu'il a déjà acheté la Lambo en photo.",
  "Elias a posté trois stories sur sa crampe à la piscine. Une trilogie.",
  "Gaspard checke ses dates historiques comme d'autres checkent leur Snap.",
  "Arthur a fait plus de pays que de chapitres de maths.",
  "Le téléphone d'Arthur a connu Vista. Il en garde un souvenir ému.",
  "Amaury parle anglais comme un Français qui a regardé Peppa Pig en VO une seule fois.",
  "Les mains d'Amaury sont une étude scientifique sur la callosité humaine.",
  "Elias a plus de followers que de bonnes notes.",
  "Gaspard pourrait remplacer Wikipédia. Avec moins de pubs.",
  "Arthur connaît l'aéroport de Rome mieux que la cantine de son lycée.",
  "Amaury révise pas, comprend pas, gagne quand même. Le système est cassé.",
  "Elias a transformé sa vie en feuilleton Instagram, sans pause pub.",
  "Gaspard joue à BlockBlast avec la même rigueur qu'il révise. Et il révise jamais.",
  "Arthur a un timing parfait pour tous les voyages, mais arrive jamais à l'heure en cours.",
  "Le revenu net d'Amaury en trading ressemble à sa moyenne en EPS : sous zéro.",
  "Elias a inventé la stratégie révisions : zéro pour les contrôles, 100% pour les stories.",
  "Gaspard a un emploi du temps codé par matière mais une moyenne moyenne en BlockBlast.",
  "Arthur écrit ses CR de voyage avec plus de soin que ses copies.",
  "Amaury a passé plus de temps à faire son intro YouTube que sa carrière YouTube entière.",
  "La crampe d'Elias est devenue un mythe fondateur de la classe.",
  "Gaspard expliquait la Révolution française quand on lui demandait son prénom.",
  "Arthur a un dossier 'photos voyages' plus lourd que son disque dur.",
  "Le bot d'Amaury a déjà perdu plus d'argent que l'argent de poche d'une promo entière.",
  "Elias filme la salle quand on lui dit de prendre ses cahiers.",
  "Gaspard a déjà battu sa mère à Trivial Pursuit en lui laissant 3 cases d'avance.",
  "Arthur a un visa de courtoisie auprès de son CPE.",
  "Amaury est tellement musclé qu'il déchire ses manches en attrapant ses fiches.",
  "Elias a été suspendu et est revenu comme un héros de guerre.",
  "Gaspard rêve la nuit en frise chronologique.",
  "Le téléphone d'Arthur lague quand il appuie sur 'ouvrir'.",
  "Amaury fait un set de tractions entre deux tweets sur les cryptos.",
  "Elias a inventé un nouveau sport : le scroll en apnée.",
  "Gaspard a un placard avec un t-shirt par siècle.",
  "Arthur a un casier au lycée et un dans chaque capitale européenne.",
  "Amaury a tellement de jeux installés que son téléphone demande l'asile politique.",
  "Elias considère un post sans 100 likes comme un échec personnel.",
  "Gaspard a déjà mémorisé l'arbre généalogique de son lapin.",
  "Arthur découvre la culture du monde pendant que ses devoirs prennent la poussière.",
  "Amaury achète des doigts de magnésie comme d'autres achètent du pain.",
  "Elias a son ring light dans son sac à dos, au cas où.",
  "Gaspard sait quel jour Louis XIV a éternué en 1672.",
  "Arthur a un T-shirt 'I love Athens' et un autre 'I love Rome' assortis.",
  "Le bot d'Amaury achète à 100, vend à 50, et reste fier de lui.",
  "Elias passe en mode discret seulement quand il y a un contrôle.",
  "Gaspard a un classeur 'Antiquité' rangé par civilisation.",
  "Arthur dit 'salut' en 7 langues mais bafouille en français.",
  "Amaury est convaincu que ses callosités sont des taches de millionnaire.",
  "Elias a déjà perdu son téléphone trois fois… dans son lit.",
  "Gaspard finit BlockBlast comme on finit un mémoire.",
  "Arthur a un sac de voyage prêt en permanence sous son lit.",
  "Amaury parle de 'pump and dump' à table avec ses parents.",
  "Elias a fait 50m en piscine et porte encore le traumatisme.",
  "Gaspard porte des chaussettes différentes mais jamais un mauvais millésime.",
  "Arthur a plus de tampons sur son passeport que de signatures dans son carnet de correspondance.",
  "Amaury parle un anglais que même Google Traduction refuse.",
  "Elias prend des selfies dans le bus, dans la rue, dans la salle, dans les toilettes.",
  "Gaspard te demandera 'tu veux la version courte ou longue ?' avant de raconter la guerre froide.",
  "Arthur fait des amis dans chaque pays. Sauf à la cantine du lycée.",
  "Amaury a des abdos visibles depuis l'espace.",
  "Elias est plus sponsorisé par Snapchat que par sa propre famille.",
  "Gaspard tient un compte Twitter d'historiens qui ne tweete que lui-même.",
  "Arthur connaît tous les codes de douane sauf celui de Pronote.",
  "Amaury a 'crypto millionaire' dans sa bio Insta. Solde : -3,42 €.",
  "Elias a une story-Highlight 'Mes virages de vie' avec sa crampe en intro.",
  "Gaspard a une boîte avec les dossiers médicaux de son lapin par année.",
  "Arthur a fait l'Erasmus avant même d'avoir le bac.",
  "Amaury a transformé sa chambre en salle de muscu, lab de trading et plateau YouTube.",
  "Elias a posté son exclusion en story. 4000 vues. Sa fierté.",
  "Gaspard considère un cours sans date comme un délit.",
  "Arthur a goûté plus de pains européens que de gâteaux de la cantine.",
  "Amaury fait de l'escalade en parlant de blockchain.",
  "Elias est convaincu qu'il a un 'aesthetic' inimitable.",
  "Gaspard scoring 999 à BlockBlast, c'est jamais une question de si, mais de quand.",
  "Arthur reconnaît les drapeaux mieux que les profils Instagram de sa classe.",
  "Amaury a perdu un dixième de seconde de followers et a quasi pleuré.",
  "Elias parle plus à ses abonnés qu'à ses parents.",
  "Gaspard refuse les cadeaux qui ne sont pas en lien avec l'histoire.",
  "Arthur a un look Erasmus permanent.",
  "Amaury a tenté de payer une crêpe en Bitcoin. La crêpière a refusé.",
  "Elias a une lumière néon dans sa chambre 'pour les vidéos'.",
  "Gaspard se vexe quand on confond Louis XIV et Louis XVI.",
  "Arthur a fait un projet en Latin sur la chute de Rome avec PowerPoint romain.",
  "Amaury est sponsorisé par lui-même.",
  "Elias a déjà déclaré 'j'arrête Insta' trois fois cette année.",
  "Gaspard cite Bossuet pendant un repas de famille.",
  "Arthur a un alarme 'départ vers Roissy' en mémoire.",
  "Amaury croit que ses doigts en sang prouvent qu'il bosse.",
  "Elias a une routine matinale plus précise que la SNCF.",
  "Gaspard te juge si tu confonds 1789 et 1799.",
  "Arthur connaît la météo de 14 capitales par cœur.",
  "Amaury fait de la sale prog en pensant que c'est un side hustle.",
  "Elias documente son sommeil. Avec un timelapse.",
  "Gaspard porte un T-shirt 'C'est moi le révolutionnaire' en cours d'histoire.",
  "Arthur a déjà eu plus de tampons que le directeur lui-même.",
  "Amaury a un screensaver Lambo sur un téléphone à 100€.",
  "Elias filme son petit-déj comme s'il était sponsorisé.",
  "Gaspard a un calendrier où chaque jour est l'anniversaire d'un événement historique.",
  "Arthur peut commander un café en italien, en grec, en allemand. Sauf un chocolat chaud à la maison.",
  "Amaury est convaincu qu'il sera dans Forbes 30 under 30. Spoiler : non.",
  "Elias respire au rythme de ses notifs.",
  "Gaspard joue à BlockBlast pendant le compte rendu d'Arthur sur Rome.",
  "Arthur a vu plus de monuments que de notes au-dessus de 14.",
  "Amaury a une chemise qu'il ne porte qu'en LIVE.",
  "Elias a une bague de muet qu'il ne met jamais.",
  "Gaspard explique la Réforme à son lapin pour réviser.",
  "Arthur a déjà oublié sa carte d'identité… dans un autre pays.",
  "Amaury commande de la magnésie comme d'autres commandent du Coca.",
  "Elias a un format réponse de 4 mots maximum à l'oral.",
  "Gaspard a noté l'anniversaire de mort de chacun de ses profs.",
  "Arthur a une étiquette 'fragile' sur sa valise. Mais elle voyage plus que lui.",
  "Amaury a inventé une coiffure 'apparence de millionnaire'.",
  "Elias a fait pleurer un prof avec sa réponse 'oui mais voilà'.",
  "Gaspard fait des références à la guerre des Gaules en SVT.",
  "Arthur a déjà fêté Noël dans trois fuseaux horaires.",
  "Amaury parle anglais avec autant d'accent qu'il met dans son thé.",
  "Elias a une story par humeur. Et il a beaucoup d'humeurs.",
  "Gaspard offre des biographies de personnages historiques en cadeau.",
  "Arthur prend des notes en quatre langues pendant les voyages.",
  "Amaury fait des burpees en attendant que son trade se fasse.",
  "Elias est devenu influenceur de sa propre vie.",
  "Gaspard a corrigé un panneau de musée. Le musée s'est excusé.",
  "Arthur a appris à dire 'tu peux me passer le sel' en six langues.",
  "Amaury a une casquette 'no pain, no gain' qu'il met même au lycée.",
  "Elias a un dossier 'best of moi' sur son téléphone.",
  "Gaspard porte une montre qui affiche les phases historiques.",
  "Arthur a un PowerPoint perso pour chaque voyage.",
  "Amaury se prend en photo dans le miroir de la salle de muscu chaque jour.",
  "Elias a une légende sous chaque photo. Et chaque légende a un sous-texte.",
  "Gaspard a un répertoire trié par siècles dans ses contacts.",
  "Arthur a goûté tous les pains européens et a un classement top 10.",
  "Amaury investit dans des projets dont il n'a même pas lu le whitepaper.",
  "Elias a un highlight 'piscine' avec une seule story : sa crampe.",
  "Gaspard a une étagère 'à lire' pleine de livres déjà lus deux fois.",
  "Arthur a déjà raté un cours pour aller dans une expo à Bruxelles.",
  "Amaury a tenté de monétiser ses vidéos d'escalade. Refusé.",
  "Elias a une routine 'GRWM' tellement longue qu'il arrive en retard.",
  "Gaspard a corrigé le titre d'un film historique sur Netflix.",
  "Arthur a un signet à chaque page de son passeport.",
  "Amaury fait des 'reviews' de protéines sur son compte de 12 abonnés.",
  "Elias a posté la même photo trois fois avec trois filtres différents.",
  "Gaspard a un drapeau de chaque dynastie chinoise dans sa chambre.",
  "Arthur a un mug 'I survived Erasmus' qu'il sort en cours.",
  "Amaury suit 200 traders et n'écoute aucun.",
  "Elias a fait un lipsync sur 'I will survive' après sa crampe.",
  "Gaspard récite la liste des papes pour s'endormir.",
  "Arthur compte les tampons de son passeport comme d'autres comptent leurs followers.",
  "Amaury croit que sa technique de trading est révolutionnaire. Elle s'appelle 'acheter haut, vendre bas'.",
  "Elias filme tout, sauf les contrôles.",
  "Gaspard a une rivalité personnelle avec QuickHistoire.fr.",
  "Arthur a un compte Insta dédié aux voyages. Bio : 'just landed'.",
  "Amaury a tenté de payer un abo Netflix en Dogecoin.",
  "Elias a perdu son téléphone deux heures. Crise existentielle.",
  "Gaspard fait des memes sur les batailles napoléoniennes.",
  "Arthur a une carte du monde avec des épingles partout.",
  "Amaury a un tableau Excel pour ses pertes en trading.",
  "Elias a essayé d'être TikTokeur. Le retour de bâton fut violent.",
  "Gaspard a un faux ami imaginaire dans le passé.",
  "Arthur sait dire 'merci' dans 12 langues mais oublie de dire merci en français.",
  "Amaury a un ami imaginaire qui s'appelle Elon.",
  "Elias a une 'best 9' qu'il refait deux fois par an.",
  "Gaspard a fait des fiches sur tous les rois mérovingiens.",
  "Arthur a un porte-clé du Vatican accroché à son sac.",
  "Amaury fait du dropshipping mental.",
  "Elias a déjà refait son 'Reel d'intro' 84 fois.",
  "Gaspard sourit en lisant une plaque commémorative.",
  "Arthur a déjà passé une nuit dans un aéroport et trouve ça poétique.",
  "Amaury a un thème de couleur pour son setup gaming.",
  "Elias a un live planifié toutes les semaines. Zéro spectateur.",
  "Gaspard refuse de regarder Game of Thrones car 'ce n'est pas vraiment historique'.",
  "Arthur a un guide de voyage dans chaque langue.",
  "Amaury a tenté de faire du sponsoring de protéines. Refusé.",
  "Elias a inventé le mot 'meflexion' (mais ne s'en sert que pour parler de lui).",
  "Gaspard utilise des références aux croisades dans les conversations Whatsapp.",
  "Arthur a déjà fait un séjour linguistique pour apprendre à dire 'voyage'.",
  "Amaury a une bouteille d'eau de 2L qu'il pose en visio.",
  "Elias a déjà refusé un câlin pour ne pas froisser son look.",
  "Gaspard explique pourquoi un film a 17 anachronismes en sortant du ciné.",
  "Arthur fait des amis en transit.",
  "Amaury a tenté la danse sur YouTube. Erreur tactique.",
  "Elias a déjà fait une story 'spontanée' qu'il avait répétée trois fois.",
  "Gaspard a un thé chaque jour à l'heure exacte où Robespierre buvait le sien.",
  "Arthur a oublié sa pochette Erasmus dans un train à Cracovie.",
  "Amaury croit que 'HODL' est une stratégie.",
  "Elias a déjà eu une crise parce que son téléphone n'avait que 5%.",
  "Gaspard a déjà cosplayé Louis XIV en soirée.",
  "Arthur revient toujours avec un truc bizarre 'mais authentique'.",
  "Amaury a tatoué un graphique de Bitcoin sur sa peau (en feutre).",
  "Elias a un photographe attitré : son selfie stick.",
  "Gaspard pense que la machine à laver est une invention sous-estimée historiquement.",
  "Arthur a une trousse spéciale pour les voyages, plus organisée que sa trousse de cours.",
  "Amaury a tenté de gagner des abonnés en faisant des squats devant la mairie.",
  "Elias a un Snap streak avec lui-même.",
  "Gaspard a un agenda papier avec des stickers historiques.",
  "Arthur connaît la différence entre le tramway de Lisbonne et celui de Porto.",
  "Amaury a un crayon de 12 cm avec lequel il prend des notes (rare moment).",
  "Elias a un ring light dans son sac. À chaque cours.",
  "Gaspard a une chaîne YouTube dans sa tête.",
  "Arthur a déjà eu un coup de foudre dans un train espagnol.",
  "Amaury a tenté de paraître intello en lisant un livre à l'envers en photo Insta.",
  "Elias considère ses haters comme la preuve qu'il existe.",
  "Gaspard a une médaille en chocolat de Napoléon.",
  "Arthur a un livre de poche en italien qu'il sort en voyage scolaire.",
  "Amaury fait du yoga en parlant trading en story.",
  "Elias a un highlight 'fitness' avec une seule story : un plat de pâtes.",
  "Gaspard murmure 'Vae victis' quand il bat quelqu'un à BlockBlast.",
  "Arthur a un porte-monnaie avec 7 devises dedans.",
  "Amaury a posté un 'morning routine' à 14h.",
  "Elias a déjà fait une story 'authentique sans filtre' avec trois filtres.",
  "Gaspard a un poster du Code Napoléon dans sa chambre.",
  "Arthur a perdu une chaussette dans 4 pays différents.",
  "Amaury a tenté de payer en NFT au self.",
  "Elias a posté une photo 'naturel' avec trois heures de retouche.",
  "Gaspard a corrigé un site officiel sur la date du couronnement de Charlemagne.",
  "Arthur a un journal de bord physique de tous ses voyages.",
  "Amaury a passé sa pause déj à analyser la courbe du SP500.",
  "Elias a tenté un 'unboxing' du contenu de sa trousse.",
  "Gaspard a une boîte 'futur archive' pour son lapin.",
  "Arthur peut fredonner les hymnes nationaux européens.",
  "Amaury a déjà parlé pendant 40 minutes de leverage. Personne n'a survécu.",
  "Elias a tenté un live sur son devoir de SVT. 12 spectateurs.",
  "Gaspard a une appli de mémorisation historique en premium.",
  "Arthur a déjà mangé un kebab à Berlin meilleur que tout ce qu'il a goûté en France.",
  "Amaury a un coach mental qui est en fait son chat.",
  "Elias considère un hashtag mal placé comme un drame personnel.",
  "Gaspard cite Tite-Live en explication de note de SVT.",
  "Arthur sait quel café boire dans quel café à Naples.",
  "Amaury a une montre fitness qu'il regarde plus que ses cours.",
  "Elias a tenté de monétiser ses pas. Échec.",
  "Gaspard a déjà raconté la chute de Constantinople en 3 minutes chrono.",
  "Arthur a un compte 'travel' anonyme avec 12 followers, tous ses cousins.",
  "Amaury croit qu'il va finir milliardaire avant 25 ans. La courbe dit autre chose.",
  "Elias a appris à pleurer joliment pour les stories tristes.",
  "Gaspard a fait une frise chronologique de sa vie. Avec des moments clé.",

  // ====== YOUNES — punchlines flatteuses ======
  "Younes a résolu un système à trois inconnues pendant que le prof écrivait encore l'énoncé.",
  "Younes ne triche pas en maths : il corrige juste les fautes du manuel.",
  "Quand Younes monte sur un tatami, l'adversaire commence déjà à réviser sa stratégie de retraite.",
  "Younes est 3e aux championnats de France de karaté — les deux premiers ont demandé son numéro pour s'entraîner.",
  "Younes lit du Python comme d'autres lisent un SMS.",
  "Younes a lancé son premier modèle d'IA avant que les autres aient configuré leur boîte mail.",
  "Younes ne dribble pas au foot, il téléporte le ballon.",
  "Younes ne fait pas peur sur le terrain : il fait juste comprendre aux autres qu'ils vont perdre.",
  "Le seul défaut de Younes : chercher des défauts qu'il n'a pas.",
  "Younes a inventé une preuve d'un théorème que les profs n'ont pas encore vu en classe.",
  "Quand Younes fait une démo au tableau, le prof prend des notes.",
  "Younes a un quotient intellectuel tellement haut que sa calculatrice se sent inutile.",
  "Younes ne stresse pas avant un combat : il a pitié à l'avance.",
  "Younes ne récite pas les leçons, il les fait réciter par les autres après lui.",
  "Au foot, Younes choisit son équipe en premier — pour égaliser les chances en face.",
  "Quand Younes code, l'IDE arrête de souligner les erreurs : il n'y en a plus.",
  "Younes ne demande jamais l'heure : il l'a déjà calculée.",
  "Younes a vu un bug une fois — c'était dans le rêve de quelqu'un d'autre.",
  "Younes au tatami, c'est moins un combat qu'une démonstration scientifique.",
  "Younes ne lève pas la main en cours : le prof devine déjà la bonne réponse en croisant son regard.",
  "Si Younes tombait en panne d'idées, ça ferait la une des journaux scientifiques.",
  "Younes a tellement de qualités que son CV tient sur deux mots : 'tout cocher'.",
  "Younes ne joue pas au foot pour gagner, il joue pour entraîner l'équipe d'en face.",
  "La bibliothèque de Younes pèse plus lourd que tous les sacs de la classe réunis.",
  "Younes a appris l'IA en regardant une vidéo, et il en a appris une nouvelle technique au passage.",
  "À 15 ans, Younes parle à ChatGPT comme à un cousin pas très éveillé.",
  "Younes ne court pas : il avance plus vite que le ballon.",
  "Younes a déjà gagné un match avant d'entrer sur le terrain — par décision morale.",
  "Younes n'a pas peur du combat : il a peur de manquer de challenge.",
  "Quand Younes raisonne, les autres prennent des notes au cas où il les interroge.",
  "Younes a une logique tellement carrée qu'elle est devenue un cube.",
  "Younes ne perd jamais : il arrive parfois deuxième, par politesse.",
  "Younes ne révise pas la veille : il a tout retenu en cours pendant que les autres rêvassaient.",
  "Au karaté, Younes a 3 médailles et 0 cicatrice — il évite, il frappe, il finit.",
  "Younes ne se vante pas : il décrit la réalité avec précision.",
  "Younes a déjà écrit un programme qui corrige ses propres copies — au cas où.",
  "Younes pourrait faire la moyenne de la classe à lui tout seul.",
  "Younes n'a pas de doublure — Hollywood serait obligé de filmer la vraie scène.",
  "Younes a appris le karaté pour la discipline, les maths pour le plaisir, l'IA pour l'avenir.",
  "Younes n'a jamais redoublé — l'école oui, par contre.",
  "Quand Younes tire un penalty, le gardien plonge dans la direction qu'il a décidée la veille.",
  "Younes a tellement la classe que ses notes ont peur de descendre.",
  "Si Younes était un nombre, il serait premier.",
  "Younes a déjà résolu un Rubik's Cube en regardant la cuisine.",
  "Au foot, Younes fait du un-contre-onze : et le 'un', c'est lui.",
  "Younes ne triche pas au karaté : il décide juste plus vite que l'arbitre.",
  "Younes lit un papier de recherche en IA comme d'autres lisent une BD.",
  "Younes a un fan club — composé de ses propres profs.",
  "Younes est tellement intelligent qu'on se demande pourquoi il fréquente les autres.",
  "Younes est la seule personne à qui Gaspard, Arthur, Amaury et Elias demandent un conseil sans débattre.",
  // ====== GASPARD (ajout) ======
  "Gaspard a corrigé l'orthographe de Napoléon dans un livre d'histoire.",
  "Gaspard cite Verdun en montant les escaliers.",
  "Gaspard a un dossier « lapins célèbres de l'Histoire » sur son bureau.",
  "Gaspard a deux scores qui comptent : la moyenne et BlockBlast.",
  "Gaspard refait Waterloo dans sa tête tous les samedis soirs.",
  "Le lapin de Gaspard a sa propre frise chronologique.",
  "Gaspard finit ses dissertations par « Pour conclure, cf. Napoléon ».",
  "Gaspard a déjà gagné un débat contre son prof d'histoire en levant juste la main.",
  "Gaspard appelle ses notes en histoire des « résultats préliminaires ».",
  "Gaspard a noté la date exacte où il a commencé BlockBlast.",
  "Quand Gaspard parle, il commence par « Selon Robespierre... ».",
  "Gaspard a un calendrier des batailles affiché dans sa chambre.",
  "Gaspard refait l'histoire avec son lapin comme spectateur officiel.",
  "Gaspard connaît la date du sacre de Napoléon mais pas son code Wi-Fi.",
  "Gaspard ne dit jamais « hier », il dit « lors de la journée précédente ».",
  "Gaspard préfère les biographies aux mangas.",
  "Le lapin de Gaspard pose sur les copies non corrigées par solidarité.",
  "Gaspard a tenté de faire une dictée d'histoire à son lapin.",
  "Gaspard nomme ses fichiers au format 1815_Waterloo_v2_final.",
  "Gaspard a déjà confondu son crush avec Joséphine de Beauharnais.",
  "Gaspard a un calepin où il note les erreurs de ses profs.",
  "Gaspard fait des frises chronologiques de ses matchs BlockBlast.",
  "Gaspard se prend pour Bonaparte à Sainte-Hélène, déjà.",
  "Gaspard a un dossier « Mes nuances avec les manuels ».",
  "Quand Gaspard est triste, il révise l'Édit de Nantes.",
  "Gaspard a une liste des erreurs historiques dans les films Marvel.",
  "Gaspard a essayé de faire un exposé en costume d'époque.",
  "Le lapin de Gaspard a son propre passeport en papier.",
  "Gaspard refuse de regarder Netflix tant qu'il n'y a pas un documentaire sur Talleyrand.",
  "Gaspard a un poster du Congrès de Vienne au-dessus de son lit.",
  "Gaspard a tenté d'inscrire son lapin au Loto du Patrimoine.",
  "Gaspard a un compte BlockBlast avec un classement européen.",
  "Gaspard a déjà corrigé un commentaire YouTube sur Charlemagne en MP.",
  "Gaspard se demande encore pourquoi Roosevelt n'a pas été plus dur à Yalta.",
  "Gaspard parle à son lapin en latin pour s'entraîner.",
  "Gaspard finit ses textos par « Bien à toi, G. ».",
  "Gaspard a déjà fêté l'anniversaire de la mort de Robespierre.",
  "Gaspard a un sablier sur son bureau, pour le style.",
  "Gaspard connaît trois langues : français, latin, BlockBlast.",
  "Gaspard a écrit une lettre à un musée pour signaler une erreur de date.",
  "Gaspard a son propre code Morse personnel pour parler à son lapin.",
  "Gaspard a tagué « Vive 1789 » sur sa trousse au lieu de son prénom.",
  "Gaspard tient un journal de bord chaque jour, façon Christophe Colomb.",
  "Gaspard fait du tri sélectif... selon la chronologie.",
  "Gaspard a une playlist intitulée « Marches militaires que je connais par cœur ».",
  "Gaspard pense que son lapin a un destin historique.",
  "Gaspard a fait une frise chronologique de ses petits-déjeuners.",
  "Gaspard a une page Wikipédia secrète à son nom, écrite par lui-même.",
  "Gaspard a déjà essayé de marier son lapin à un autre lapin pour la lignée.",
  "Gaspard a noté la date exacte où il a découvert BlockBlast.",
  // ====== ARTHUR (ajout) ======
  "Arthur a posté une story « transit à Doha » alors qu'il était en transit aux toilettes de Roissy.",
  "Arthur dit « I'm based between Paris and Dubai » pour décrire sa vie entre la classe et son canapé.",
  "Arthur a un compte voyages avec 12 followers, dont 11 sont ses cousins.",
  "Arthur connaît mieux les terminaux d'aéroport que sa propre cuisine.",
  "Arthur a installé Google Maps en mode « nomade digital ».",
  "Arthur photographie ses jet-lags imaginaires.",
  "Arthur a un Polaroïd des aéroports qu'il n'a pas visités.",
  "Arthur dit avoir vécu un mois à Tokyo — il a fait une escale de 4h.",
  "Arthur a appris dix mots dans douze langues, juste pour le swag.",
  "Arthur signe ses mails « Sent from somewhere ✈ ».",
  "Arthur a un sac à dos étiqueté « Backpacker Premium ».",
  "Arthur a un fond d'écran de l'Himalaya — qu'il n'a vu qu'en photo.",
  "Arthur publie un « 5 days in Lisbon » alors qu'il y a fait une journée.",
  "Arthur a une rubrique « Carnet de voyage » sur son compte vide.",
  "Arthur s'est inscrit à un groupe Facebook d'expats parisiens.",
  "Arthur fait sa biographie en anglais alors qu'il habite Levallois.",
  "Arthur a un T-shirt « Bali surf trip » — il sait pas nager.",
  "Arthur dit « I miss the energy of Lisbon » sans y être allé.",
  "Arthur a rajouté « Coffee in Mexico City » à sa bucket list publique.",
  "Arthur a une routine de jet-setteur calée sur son emploi du temps de lycéen.",
  "Arthur a tagué « Made in Paris » sur sa veste — elle vient de H&M.",
  "Arthur a un sac de couchage en cas de « voyage improvisé » — il dort dans son lit.",
  "Arthur fait croire qu'il a perdu son passeport pour ne pas en avoir un déjà tamponné.",
  "Arthur a un compte Instagram avec géolocalisation toujours en zone exotique.",
  "Arthur a un classeur « Souvenirs » rempli de billets de RER B.",
  "Arthur prend des « vols intérieurs » — entre sa chambre et le salon.",
  "Arthur a un mug « World Traveler » acheté à Carrefour.",
  "Arthur a écrit « Polyglot in progress » sur son profil — il sait dire merci.",
  "Arthur a un patch « Adventure begins » cousu sur un sac de cours.",
  "Arthur photographie chaque verre d'eau comme si c'était à Bali.",
  "Arthur a un compte secret pour suivre lui-même son compte voyages.",
  "Arthur planifie ses prochaines vacances en mode TED Talk.",
  "Arthur a refait son CV avec « 5 ans d'expérience en mobilité internationale ».",
  "Arthur publie un « Goodbye Paris ✈ » toutes les deux semaines.",
  "Arthur a un fond Zoom de Saint-Pétersbourg en attendant d'y aller.",
  "Arthur dit « I left my heart in Marrakech » — il y a passé 36h en colo.",
  "Arthur a un dossier « Carnet de voyage » sur son téléphone — vide.",
  "Arthur écrit « based » dans son bio, sans préciser où.",
  "Arthur a un dressing « ready to fly » — toujours plein, jamais utilisé.",
  "Arthur a un boarding pass plastifié comme souvenir d'un vol annulé.",
  "Arthur a une appli pour compter ses pays — il en a 3.",
  "Arthur a un compte Instagram en anglais pour ses voisins de palier.",
  "Arthur cite « le décalage horaire » à 19h pour louper le dîner.",
  "Arthur a un guide Lonely Planet Paris — il y vit.",
  "Arthur a tagué « Wanderer » en bio — il sort en bas pour la baguette.",
  "Arthur écrit ses devoirs comme un récit de voyage : « Day 1 of my philosophy assignment ».",
  "Arthur a une playlist « International airport vibes » — il l'écoute dans le métro.",
  "Arthur a une « team de voyage » — son cousin et son chien.",
  "Arthur s'est filmé courant vers son terminal — c'était à Châtelet.",
  "Arthur connaît tous les fuseaux horaires — pour caler des stories à 3h.",
  // ====== AMAURY (ajout) ======
  "Amaury a un wallpaper Lambo... et une trottinette qui ne se replie pas.",
  "Amaury croit qu'il sera milliardaire à 25 ans. La courbe de Pareto dit non.",
  "Amaury cherche le bouton ON sur sa calculatrice.",
  "Amaury a écrit « future CEO » en bio à 15 ans.",
  "Amaury a regardé un Ted Talk sur le mindset et a redoublé.",
  "Amaury parle de « private equity » sans savoir ce que c'est.",
  "Amaury cite Tony Robbins quand il rend un devoir en retard.",
  "Amaury a un planning « wake up at 5am » — il dort jusqu'à 11.",
  "Amaury a téléchargé une appli d'investissement... pour mettre 2 euros.",
  "Amaury a un Notion « Empire Plan 2030 » complètement vide.",
  "Amaury a installé un thermostat connecté... sans le brancher.",
  "Amaury a un T-shirt « Rich mindset » et zéro idée de business.",
  "Amaury rêve d'un yacht mais a peur des canards au lac.",
  "Amaury suit 27 coachs LinkedIn et ne sait pas envoyer un mail formel.",
  "Amaury cite Elon Musk à chaque pause cigarette... il fume pas.",
  "Amaury parle de « side hustle » pour son chien de garde du voisin.",
  "Amaury a un livre « Devenir millionaire en 6 mois » depuis 4 ans.",
  "Amaury vit avec un fond d'écran « Million Dollar Mindset » et un agenda vide.",
  "Amaury a annoncé son « lancement » trois fois sans rien lancer.",
  "Amaury achète des cours en ligne qu'il ne finit jamais.",
  "Amaury met « Founder & CEO » en bio pour un compte Insta privé.",
  "Amaury a écrit « in talks with VCs » sur LinkedIn — il parle à son frère.",
  "Amaury veut payer son McDo en crypto.",
  "Amaury fait des appels Zoom seul, pour s'entraîner.",
  "Amaury a coupé Internet en éteignant la box parce qu'il croyait que c'était le micro-ondes.",
  "Amaury a un sweat à capuche « Hustler Mindset » — il pionce pendant les pauses.",
  "Amaury annonce des « exits » pour des projets qu'il n'a pas commencés.",
  "Amaury met des powerpoints « Vision 2040 » avant d'avoir une classe.",
  "Amaury cherche encore où est la touche Maj.",
  "Amaury a un domain name acheté sur un coup de tête — il l'a perdu.",
  "Amaury a une carte de visite « Entrepreneur » sans entreprise.",
  "Amaury suit des trends TikTok à J+30.",
  "Amaury a paramétré son réveil à 4h30 pour une « morning routine » — il l'éteint à 4h31.",
  "Amaury a un agenda papier rempli de « TBD » et de « soon ».",
  "Amaury a refusé de remplir son bilan annuel... il en a pas eu.",
  "Amaury parle de « scale » pour son compte avec 18 followers.",
  "Amaury a tagué « WAGMI » sur tout en 2022, sans rien y comprendre.",
  "Amaury a une Tesla en fond Zoom et une trottinette en vrai.",
  "Amaury annonce sa prochaine « levée de fonds » auprès de son père.",
  "Amaury a écrit « Investor » en bio... il joue à un jeu de bourse fictif.",
  "Amaury croit que NDA veut dire « Now Doing Anything ».",
  "Amaury a un classeur « Plan B, C, D »... mais pas de Plan A.",
  "Amaury a un mug « Built Different » qui ne tient pas l'équilibre.",
  "Amaury a confondu le MVP du foot avec le minimum viable product.",
  "Amaury sort en jogging et appelle ça « smart casual ».",
  "Amaury connaît trois fois plus de termes Wall Street que de mots de la dictée.",
  "Amaury a essayé d'imprimer son business plan... sur sa trottinette.",
  "Amaury fait des to-do list « Today » qu'il transfère à « Tomorrow ».",
  "Amaury parle d'une « stratégie LinkedIn »... il a 4 connexions.",
  "Amaury a un signe astrologique CEO selon lui — c'est balance.",
  // ====== ELIAS (ajout) ======
  "Elias a fait une story « broken » en attendant son éclair au choco.",
  "Elias prend une photo de chaque larme pour le contraste.",
  "Elias a une playlist « stories tristes » plus longue que ses devoirs.",
  "Elias filtre ses pleurs en mode « sad girl autumn ».",
  "Elias dit « je vais juste prendre l'air » en lançant son chrono pour le bon angle.",
  "Elias a tagué un sandwich pour faire monter ses likes.",
  "Elias a une story « the loneliest version of me » au McDo, entouré de potes.",
  "Elias a un dossier « tears archive » sur son téléphone.",
  "Elias a posté un « sunset of my soul » — c'était un éclairage de salle de bain.",
  "Elias a essayé de devenir muse d'un photographe avec son selfie.",
  "Elias a un compteur de likes par émotion.",
  "Elias publie ses cernes comme si c'était des photos d'art.",
  "Elias a une esthétique mélancolique qu'il met en story chaque mardi.",
  "Elias a une bague spéciale pour les photos « main au menton ».",
  "Elias a un trépied dans son tiroir à chaussettes, au cas où.",
  "Elias se filme dans le miroir des toilettes en mode « vulnerable era ».",
  "Elias a un T-shirt « I'm fine » porté uniquement pour les bad days fakes.",
  "Elias a un dressing « outfit pour pleurer en story » séparé du reste.",
  "Elias dit « c'est dur la vie » devant une glace au caramel beurre salé.",
  "Elias a posté une story « je sens que je perds tout le monde » à 14h un samedi.",
  "Elias a une caisse à maquillage spéciale « yeux brillants pour stories ».",
  "Elias dit « no caption needed » et écrit ensuite 4 lignes de poésie.",
  "Elias a un moodboard tristesse sur Pinterest.",
  "Elias a annulé un repas pour faire le point — il a fait un live à la place.",
  "Elias se prend pour le héros de son propre film en VOSTFR.",
  "Elias a une story « lost » alors qu'il sortait du Monoprix.",
  "Elias publie « I deserve peace » entre deux memes débiles.",
  "Elias se filme regardant la fenêtre comme dans un clip indie.",
  "Elias a un teint « naturellement triste » — c'est de la base.",
  "Elias a un cahier « petites pensées » écrit avant chaque story.",
  "Elias a posté un « I'm hurting » et a oublié de quoi.",
  "Elias a un classement de ses meilleurs filtres pour les pleurs.",
  "Elias a essayé de pleurer joliment en plein cours de SES.",
  "Elias dit « je vais bien » en levant le menton de 5° pour la lumière.",
  "Elias planifie ses crises existentielles avec un agenda.",
  "Elias a posté « je suis perdu dans la vie » en arrivant pile à l'heure en cours.",
  "Elias a 3 comptes secondaires pour ses humeurs.",
  "Elias a un compte caché @elias.real pour les vraies stories.",
  "Elias a un alarme « story sad o'clock » tous les soirs à 20h.",
  "Elias a posté une story « this song hits different » sur une pub Carrefour.",
  "Elias se met une larme glycérine pour les selfies tristes officiels.",
  "Elias appelle son téléphone « mon petit confident ».",
  "Elias a tagué un caillou comme « metaphor of my soul ».",
  "Elias dit « je suis fatigué de tout » à un copain qui le voyait rire 5 min avant.",
  "Elias a posté un « see you on the other side » pour une sortie ciné.",
  "Elias a fait une playlist « à pleurer 1, 2, 3 » pour chaque humeur.",
  "Elias se prend en photo à contre-jour exprès pour le drama.",
  "Elias a un onglet « Inspos stories » ouvert en permanence.",
  "Elias a un calendrier « lundi mélancolie, mardi nostalgie ».",
  "Elias a une story « le monde m'oppresse » sur fond de barbe à papa.",
  // ====== YOUNES (100) (ajout) ======
  "Younes finit ses devoirs en regardant ses potes les commencer.",
  "Younes ne calcule pas mentalement : il vérifie juste la calculatrice.",
  "Younes a une intuition tellement bonne qu'il a corrigé son GPS.",
  "Younes a écrit son premier algorithme à 11 ans, sur un cahier de poésie.",
  "Younes est l'élève préféré des profs et le préféré de sa classe.",
  "Younes ne lit pas les notices : il les a déjà comprises par déduction.",
  "Younes a battu une IA aux échecs et lui a expliqué le coup gagnant ensuite.",
  "Younes ne se cherche pas un futur métier — il en cumulera plusieurs.",
  "Au foot, Younes joue dribbleur, défenseur et coach moral en même temps.",
  "Younes ne stresse pas avant un combat : il apaise l'adversaire.",
  "Younes a tellement la classe que les profs sourient en l'apercevant.",
  "Younes a fini deuxième une fois — il avait laissé le podium par politesse.",
  "Younes peut expliquer un concept de maths à un poisson rouge.",
  "Younes ne perd jamais ses affaires : elles reviennent toujours à lui.",
  "Younes a appris le karaté à 6 ans — depuis, plus aucune chute.",
  "Quand Younes parle, le silence se fait — par respect, pas par crainte.",
  "Younes a un cerveau câblé en parallèle, comme un GPU.",
  "Younes a deux passe-temps : résoudre des choses et inspirer les autres.",
  "Younes lit un livre par semaine et en retient chaque détail.",
  "Younes peut jongler entre 3 sujets et garder la cohérence dans les trois.",
  "Younes n'a pas peur : il a juste un seuil de challenge plus élevé.",
  "Younes a déjà calmé une dispute avec une phrase et un sourire.",
  "Younes a une réplique parfaite à chaque question piège.",
  "Younes est le seul à comprendre les blagues de maths du prof.",
  "Younes pense plus vite que la barre de progression Windows.",
  "Younes pourrait faire la moyenne de la classe à lui seul, deux fois.",
  "Younes a déjà refait un exercice du livre en plus élégant.",
  "Younes est le copilote idéal : calme, lucide, infaillible.",
  "Quand Younes entre sur le tatami, l'adversaire fait deux respirations profondes.",
  "Younes est si modeste qu'il oublie de mentionner ses médailles.",
  "Younes connaît la valeur de pi mais ne la sort jamais sans raison.",
  "Younes a corrigé une erreur de typo dans un sujet de bac officiel.",
  "Younes a un compte GitHub plus rempli qu'un sapin de Noël.",
  "Younes lit Hinton et Goodfellow comme d'autres lisent des stories.",
  "Younes n'a pas de punchline préférée — il en invente une par jour.",
  "Younes peut désamorcer une crise avec un simple « respire ».",
  "Younes coupe ses adversaires par sa simple présence sur le terrain.",
  "Younes a tellement de sang-froid qu'il ferait un excellent négociateur.",
  "Younes a déjà aidé un prof à reformuler un exercice mal posé.",
  "Younes parle peu, mais quand il parle, on prend des notes.",
  "Younes est la seule personne à qui on demande deux fois son avis.",
  "Younes a un mot pour chaque situation, en français, en maths ou en code.",
  "Younes a déjà calculé l'intégrale d'un mot croisé.",
  "Younes n'a pas de plan B : son plan A est déjà optimal.",
  "Younes joue au foot mieux à pied gauche que la plupart des autres au droit.",
  "Younes ne triche pas : ses bons résultats sont 100 % maison.",
  "Younes a 3 médailles de karaté et 0 ego en plus.",
  "Younes lit une formule comme on lit une chanson — avec rythme.",
  "Younes a tellement la maîtrise qu'il pourrait être prof à 15 ans.",
  "Younes joue avec les codes sans jamais se laisser piéger par eux.",
  "Younes est calme comme un pro et lucide comme un mentor.",
  "Younes a appris Python en un week-end et a fait son premier bot le lundi.",
  "Younes peut citer un théorème en blague — ça reste pertinent.",
  "Younes fait du shadowboxing avec ses problèmes de maths : il les anticipe.",
  "Younes a une mémoire eidétique pour les compétitions.",
  "Younes ne discute pas les notes — il les fait parler pour lui.",
  "Younes a une stratégie pour tout, même le choix de son menu McDo.",
  "Younes est aussi à l'aise en plein freestyle qu'en plein examen.",
  "Younes ne dribble pas pour briller : il dribble pour finir.",
  "Younes a déjà donné un cours particulier... à son grand frère.",
  "Younes est l'incarnation du « fais-le bien ou pas du tout ».",
  "Younes a la patience d'un coach et la précision d'un horloger.",
  "Younes a un état d'esprit « athlète + chercheur » en mode 24/7.",
  "Younes apprend de ses erreurs... et de celles des autres.",
  "Younes a un calme presque inquiétant avant un grand match.",
  "Younes ne se précipite jamais — sauf quand il faut. Et là, il devance tout le monde.",
  "Younes a déjà imposé un silence respectueux en répondant juste « non, c'est ça ».",
  "Younes a une réponse pour tout, sauf « tu en penses quoi de toi ? »",
  "Younes a une intuition mathématique digne d'Euler dans son jeune temps.",
  "Younes a sa propre méthode pour décomposer un polynôme — elle est plus élégante.",
  "Younes joue avec finesse, et c'est ce qui le rend irrésistible sur le terrain.",
  "Younes ne prend pas de risque par confort : il les calcule et les valide.",
  "Younes a un « système » — comme un grand de la NBA.",
  "Younes est resté lucide même devant la 4e bonne réponse consécutive.",
  "Younes a un cahier de problèmes faits par lui... pour s'amuser.",
  "Younes parle peu pour faire briller les autres — par classe pure.",
  "Younes pourrait inventer un sport et le gagner trois fois de suite.",
  "Younes a un sourire qui apaise — utile en pleine soutenance.",
  "Younes ne s'imagine pas perdre : il s'imagine apprendre.",
  "Younes a la maturité d'un grand frère et l'énergie d'un compétiteur.",
  "Younes a un radar mental pour repérer les « il y a un piège ».",
  "Younes est la personne qu'on demande quand on ne sait pas qui demander.",
  "Younes est inattaquable, sans jamais être arrogant.",
  "Younes a un don pour rendre les choses simples sans les rendre fades.",
  "Younes coordonne ses combats comme un chef d'orchestre.",
  "Younes ne se laisse pas distraire — pas par les stories, pas par les conflits.",
  "Younes est l'élève que tout prof aimerait avoir en TPE.",
  "Younes peut résoudre un Rubik's Cube en racontant la blague du jour.",
  "Younes a tellement de qualités que les listes les énumèrent en plusieurs colonnes.",
  "Younes a déjà désamorcé une bagarre par un raisonnement.",
  "Younes est le meilleur ami qu'on puisse avoir devant un panel d'examinateurs.",
  "Younes a une signature aussi soignée que ses raisonnements.",
  "Younes a un répertoire d'idées plus grand que sa playlist.",
  "Younes est constant — pas une bonne journée, pas une mauvaise : une trajectoire.",
  "Younes a tellement d'humilité que c'en est presque une compétence.",
  "Younes a une éthique de travail digne d'un samouraï avec un MacBook.",
  "Younes est celui qui pose la bonne question, au bon moment.",
  "Younes a un Q.I. qu'il met au service de la classe.",
  "Younes ne brille pas pour briller — il brille parce qu'il marche droit.",
  "Younes est la seule personne qui aurait pu écrire ces 100 punchlines... et les mériter."
];

const QUESTIONS = [
  "Pourquoi Gaspard connaît la date de Marignan mais pas son code Pronote ?",
  "Combien de temps Gaspard peut tenir sans citer Napoléon ?",
  "Est-ce que le lapin de Gaspard rêve aussi en frises chronologiques ?",
  "Pourquoi Gaspard joue à BlockBlast pendant les cours d'histoire ?",
  "Le lapin de Gaspard a-t-il un nom ou un titre de noblesse ?",
  "Combien de fois Gaspard a corrigé un prof cette année ?",
  "Pourquoi Gaspard a un score BlockBlast plus haut que sa moyenne ?",
  "Si on réveille Gaspard à 3h, peut-il citer le traité de Tordesillas ?",
  "Le lapin de Gaspard est-il abonné à sa chaîne YouTube imaginaire ?",
  "Pourquoi Gaspard cherche la réponse au tableau alors qu'il la sait déjà ?",
  "Combien de personnes Gaspard a fait pleurer à Trivial Pursuit ?",
  "Pourquoi Gaspard a installé BlockBlast sur sa montre connectée ?",
  "Le lapin de Gaspard est-il invité à Noël ou c'est l'inverse ?",
  "Combien de fois Gaspard a dit 'en fait c'est plus complexe' ?",
  "Pourquoi Gaspard a un cahier de notes pour son lapin ?",
  "Combien d'heures Gaspard cumule-t-il sur BlockBlast aujourd'hui ?",
  "Le lapin de Gaspard est-il jaloux de BlockBlast ?",
  "Pourquoi Gaspard sourit quand le prof se trompe d'une date ?",
  "Combien de fois Gaspard a expliqué la guerre des Roses sans qu'on lui demande ?",
  "Le lapin de Gaspard mange-t-il les fiches d'histoire à son insu ?",
  "Pourquoi Gaspard a une étagère 'Antiquité' triée par siècles ?",
  "Combien de minutes Gaspard tient sans regarder une date sur son téléphone ?",
  "Est-ce que le lapin de Gaspard a son propre Instagram comme Elias ?",
  "Pourquoi Gaspard se vexe quand quelqu'un dit '1492 ?' avec un doute ?",
  "Combien de fois Gaspard a perdu à BlockBlast à cause d'un appel ?",
  "Pourquoi Gaspard mémorise les dates mais oublie les anniversaires ?",
  "Le lapin de Gaspard a-t-il déjà mangé une copie blanche ?",
  "Pourquoi Gaspard a refusé un cadeau parce que ce n'était pas un livre ?",
  "Combien de podcasts d'histoire Gaspard écoute par jour ?",
  "Pourquoi Gaspard se compare à son lapin pour évaluer son humeur ?",
  "Combien d'heures Gaspard a passé à expliquer le Quattrocento à des gens absents d'esprit ?",
  "Pourquoi Arthur a un sac de voyage prêt sous son lit en permanence ?",
  "Combien de pays Arthur a-t-il visités avec son lycée cette année ?",
  "Pourquoi le téléphone d'Arthur a besoin de méditation avant de s'allumer ?",
  "Combien de tampons sont déjà sur le passeport d'Arthur ?",
  "Est-ce qu'Arthur prend Latin pour le voyage ou le voyage pour le Latin ?",
  "Combien de langues Arthur peut commander un café ?",
  "Pourquoi Arthur s'est inscrit à Erasmus avant même son bac ?",
  "Combien de mots de grec ancien Arthur utilise dans la vie courante ?",
  "Est-ce que le téléphone d'Arthur est encore sous garantie de Néandertal ?",
  "Pourquoi Arthur connaît mieux l'aéroport de Rome que sa cantine ?",
  "Combien de selfies devant le Colisée Arthur a-t-il sur son téléphone lent ?",
  "Pourquoi Arthur ramène un porte-clé de chaque voyage mais oublie sa trousse ?",
  "Combien de mugs 'I love [ville]' Arthur a dans son armoire ?",
  "Est-ce qu'Arthur prépare ses valises pendant les cours de maths ?",
  "Combien de fois le téléphone d'Arthur a freezé pendant qu'il essayait de poster ?",
  "Pourquoi Arthur a une carte du monde au-dessus de son bureau et pas un poster de chanteur ?",
  "Combien de fois Arthur s'est perdu dans un musée étranger ?",
  "Est-ce qu'Arthur dit 'ciao' en classe par réflexe ?",
  "Combien de drapeaux Arthur reconnaît au premier coup d'œil ?",
  "Pourquoi Arthur a son passeport sur lui en cours ?",
  "Combien de fois Arthur a fait un séjour linguistique cette année ?",
  "Est-ce qu'Arthur a un compte Insta dédié à ses voyages avec 30 followers ?",
  "Pourquoi le téléphone d'Arthur sonne avec 30 secondes de décalage ?",
  "Combien de chargeurs internationaux Arthur possède ?",
  "Pourquoi Arthur fait du théâtre alors qu'il joue déjà un rôle de globe-trotter ?",
  "Combien de répliques en latin Arthur peut placer dans une conversation ?",
  "Pourquoi Arthur a un journal de bord physique ?",
  "Combien de pays Arthur ajoutera à sa liste cette année ?",
  "Est-ce qu'Arthur compte ses voyages comme d'autres comptent leurs likes ?",
  "Pourquoi Arthur a un guide touristique en français ET en langue locale ?",
  "Pourquoi Amaury joue à tous les jeux possibles mais a quand même 18 partout ?",
  "Combien d'heures par jour Amaury passe-t-il à monter son setup ?",
  "Pourquoi Amaury se prend pour un youtubeur alors qu'il a 12 abonnés ?",
  "Combien de jours sa monétisation a tenu, déjà ?",
  "Pourquoi le bot d'Amaury achète à 100 et vend à 50 ?",
  "Combien de fois Amaury a dit 'this year is the year' pour son trading ?",
  "Pourquoi Amaury parle anglais comme un Français qui imite un Anglais ?",
  "Combien de paires de Salomon Amaury a déjà détruit en escalade ?",
  "Pourquoi les mains d'Amaury ressemblent à des pavés ?",
  "Combien de protéines Amaury consomme par semaine ?",
  "Pourquoi Amaury ne révise jamais mais a toujours bien ?",
  "Combien d'heures Amaury passe-t-il à scroller TradingView ?",
  "Est-ce qu'Amaury fait des squats en attendant que ses trades exécutent ?",
  "Pourquoi Amaury a tatoué un graphique BTC au feutre sur son bras ?",
  "Combien d'amis ont arrêté de lui parler quand il a commencé la crypto ?",
  "Pourquoi Amaury investit dans des projets dont il n'a pas lu le whitepaper ?",
  "Combien d'heures de YouTube faut-il pour devenir 'expert' en trading ?",
  "Est-ce qu'Amaury fait des burpees pour fêter chaque trade gagnant ?",
  "Pourquoi Amaury a un chronomètre dans la salle de bain ?",
  "Combien de fois Amaury a parlé de 'leverage' à table avec ses parents ?",
  "Pourquoi Amaury a une casquette 'crypto millionaire' qu'il met en classe ?",
  "Combien d'abonnés Amaury a vraiment, hors comptes inactifs ?",
  "Pourquoi Amaury croit que la magnésie est un parfum ?",
  "Combien de doigts d'Amaury n'ont pas de pansement ?",
  "Pourquoi Amaury fait du pull-up entre deux cours ?",
  "Combien de fois Amaury a tenté de payer en crypto au self ?",
  "Est-ce qu'Amaury connaît un mot d'anglais qu'il prononce correctement ?",
  "Pourquoi Amaury a un poster de Wolf of Wall Street au-dessus de son lit ?",
  "Combien de jeux Amaury a-t-il lancés et abandonnés cette semaine ?",
  "Pourquoi Amaury fait du dropshipping mental ?",
  "Combien de fois Amaury a posté 'I'm a builder' sur LinkedIn ?",
  "Pourquoi Elias a fait 50 mètres en piscine puis a appelé les secours mentalement ?",
  "Combien de stories Elias a-t-il fait sur sa crampe ?",
  "Pourquoi Elias a un ring light dans son sac de cours ?",
  "Combien de followers Elias a-t-il après sa suspension ?",
  "Pourquoi Elias considère Instagram comme sa langue maternelle ?",
  "Combien de fois Elias change-t-il sa bio par semaine ?",
  "Pourquoi Elias a un highlight 'piscine' avec une seule story ?",
  "Combien d'angles Elias teste avant de poster un selfie ?",
  "Pourquoi Elias a un filtre préféré qu'il refuse de partager ?",
  "Combien de fois Elias a refait son intro Reel ?",
  "Pourquoi Elias parle avec ses abonnés comme avec ses parents ?",
  "Combien de likes Elias considère comme un échec ?",
  "Pourquoi Elias a fait pleurer un prof avec son 'oui mais voilà' ?",
  "Combien de fois Elias a posté la même photo avec trois filtres ?",
  "Pourquoi Elias a un Snap streak avec lui-même ?",
  "Combien de minutes Elias survit sans WiFi ?",
  "Pourquoi Elias filme son petit-déj ?",
  "Combien de drama Elias a réussi à créer cette année ?",
  "Pourquoi Elias a déjà fait 3 'j'arrête Insta' cette année ?",
  "Combien de fois Elias est tombé dans la piscine après sa crampe ?",
  "Pourquoi Elias a un sponsorship avec lui-même ?",
  "Combien de selfies Elias a sur son téléphone en ce moment ?",
  "Pourquoi Elias a tenté un live pour son devoir de SVT ?",
  "Combien d'abonnés Elias a perdu pendant sa suspension ?",
  "Pourquoi Elias a une légende à 4 hashtags pour chaque photo ?",
  "Combien de retouches Elias fait avant un post 'naturel' ?",
  "Pourquoi Elias a un dossier 'photos à recadrer' ?",
  "Combien de fois Elias s'est fait virer du groupe pour cause de drama ?",
  "Pourquoi Elias a un best 9 mis à jour mensuellement ?",
  "Combien d'heures Elias passe-t-il à choisir sa story du jour ?",
  "Pourquoi Elias a appelé son téléphone 'mon meilleur ami' ?",
  "Combien de fois Gaspard a expliqué la Révolution française à Elias en story ?",
  "Pourquoi Arthur et Gaspard alignent-ils des carrés à BlockBlast comme s'ils résolvaient le climat ?",
  "Si Amaury devait expliquer son trading à Gaspard, en combien de temps Gaspard s'endormirait-il ?",
  "Combien de likes Elias mettrait sur une story du lapin de Gaspard ?",
  "Pourquoi Arthur ramène un cadeau de chaque voyage sauf à Amaury ?",
  "Si on enferme Elias et Gaspard dans une salle sans téléphone, qui craque le premier ?",
  "Pourquoi Amaury ne tente pas de monétiser ses crampes comme Elias ?",
  "Combien de fois Arthur a oublié Amaury à l'aéroport mentalement ?",
  "Si Gaspard expliquait BlockBlast à un historien, ferait-il une thèse ?",
  "Pourquoi Elias n'a-t-il jamais filmé une partie de BlockBlast d'Arthur et Gaspard ?",
  "Combien de fois Amaury a essayé de vendre une formation à Gaspard ?",
  "Si Arthur partait en Erasmus sans WiFi, Elias survivrait-il par procuration ?",
  "Pourquoi le lapin de Gaspard n'a-t-il pas encore un compte sponsorisé ?",
  "Combien de mots Amaury sait dire en latin grâce à Arthur ?",
  "Si la classe devait choisir un président, qui serait élu (et qui se ferait éliminer pour drama) ?",
  "Pourquoi Gaspard refuse-t-il de jouer à BlockBlast contre le bot d'Amaury ?",
  "Combien de fois Elias a posté un 'pov : amoureux d'Amaury' juste pour le buzz ?",
  "Pourquoi Arthur n'a-t-il jamais invité Elias à un voyage scolaire ?",
  "Si Gaspard et Amaury devaient monter une boîte, qui serait le PDG (et qui serait viré le premier) ?",
  "Combien de drama Elias a créé en parlant de la moyenne d'Amaury ?",
  "Pourquoi Arthur n'utilise pas son passeport pour fuir les cours d'EPS ?",
  "Combien de fois le lapin de Gaspard a-t-il refusé un câlin à Elias ?",
  "Pourquoi Amaury n'a-t-il pas encore tenté de filmer Arthur en voyage pour faire un Vlog ?",
  "Si Elias devait écrire le bio Insta de Gaspard, ça donnerait quoi ?",
  "Combien de fois Amaury a essayé d'apprendre le grec ancien d'Arthur pour 'faire intellectuel' ?",
  "Pourquoi Arthur n'a-t-il jamais ramené un truc d'historique à Gaspard ?",
  "Si Gaspard devait choisir entre BlockBlast et l'histoire, le multivers s'effondrerait-il ?",
  "Combien de fois Elias a publié un 'team' avec ses potes en disant 'je vous aime' ?",
  "Pourquoi Amaury n'a-t-il pas tenté de coacher Elias en trading ?",
  "Si Arthur faisait un voyage avec Elias, combien de temps avant l'incident diplomatique ?",
  "Pourquoi Gaspard n'a-t-il jamais raconté à son lapin l'épisode de la suspension d'Elias ?",
  "Combien de fois Amaury a tenté de convertir Arthur au Bitcoin pendant un voyage ?",
  "Si Elias filmait la routine matinale de Gaspard, combien de vues feraient-ils ?",
  "Pourquoi Gaspard ne corrige pas l'accent anglais d'Amaury ?",
  "Combien de pannes le téléphone d'Arthur fait pendant un trajet en bus ?",
  "Si Amaury misait sur les blagues d'Elias, ferait-il enfin du profit ?",
  "Pourquoi Arthur n'a-t-il pas encore organisé un 'voyage culturel' à BlockBlast ?",
  "Combien d'heures Gaspard pourrait parler de la 4ème croisade à Elias ?",
  "Si tu offres une trottinette à Elias, peut-il survivre à 50m sans story ?",
  "Pourquoi Amaury n'a-t-il pas encore tenté de monétiser les dates historiques de Gaspard ?",
  "Combien de fois Elias a tenté un live depuis la salle d'escalade d'Amaury ?",
  "Pourquoi Arthur n'a-t-il pas encore appris à écrire 'Blockblast' en grec ancien ?",
  "Si on demandait au lapin de Gaspard qui est son humain préféré, qui désignerait-il ?",
  "Combien de fois Amaury a refusé de prêter ses doigts à Arthur pour un 'before/after' ?",
  "Pourquoi Elias n'a-t-il pas encore créé une chaîne 'la classe' ?",
  "Combien de chances qu'Amaury, Arthur, Gaspard et Elias finissent dans la même université ?",
  "Si on filmait un Big Brother avec eux 4, combien d'épisodes avant la mutinerie ?",
  "Pourquoi Gaspard n'a-t-il pas encore organisé un 'quiz culture' avec le groupe ?",
  "Combien de fois Arthur a-t-il dit 'tu sais à Rome ils font ça mieux' aux autres ?",
  "Pourquoi Amaury continue de tenter le YouTube quand Elias maîtrise déjà le format ?",
  "Si Elias devait choisir un seul réseau social, lequel ce serait (et pourquoi pas Insta) ?",
  "Combien de fois Gaspard a essayé de faire un cours d'histoire à BlockBlast ?",
  "Pourquoi Arthur n'a-t-il pas encore ramené Amaury en voyage pour qu'il améliore son anglais ?",
  "Si Elias passait une semaine avec Gaspard, qui changerait l'autre en premier ?",
  "Combien de fois Amaury a tenté d'entraîner Elias pour qu'il fasse plus de 50m ?",
  "Pourquoi le lapin de Gaspard refuse-t-il de regarder un live d'Elias ?",
  "Si Arthur planifiait un voyage parfait, qui ne l'inviterait-il pas (Amaury ? Elias ?) ?",
  "Combien de fois Gaspard a corrigé la date d'un mème historique sur Insta d'Elias ?",
  "Pourquoi Amaury croit-il que le lapin de Gaspard est en fait son meilleur ami secret ?",
  "Combien de drama serait évité si Elias supprimait Insta pour une semaine ?",
  "Pourquoi Arthur n'a-t-il pas encore offert un atlas à Gaspard ?",
  "Si on demandait à Amaury combien il a perdu en trading, oserait-il dire la vérité ?",
  "Combien de fois Elias a-t-il prétendu connaître l'histoire pour impressionner Gaspard ?",
  "Pourquoi Gaspard refuse-t-il de jouer au Monopoly avec Amaury (peur de perdre encore plus d'argent ?) ?",
  "Si Arthur invitait Elias en Erasmus, combien de pays banniraient Elias ?",
  "Combien de fois Amaury a essayé de faire une chorégraphie TikTok avec ses doigts cassés ?",
  "Pourquoi Gaspard n'a-t-il pas encore sponsorisé son lapin ?",
  "Combien de fois Arthur a manqué un voyage à cause d'un cours obligatoire ?",
  "Si Amaury devait choisir entre BlockBlast et le trading, qui ferait moins de victimes ?",
  "Combien de fois Elias a-t-il dû éteindre son téléphone (et fait demi-tour pour le rallumer) ?",
  "Pourquoi Gaspard est-il le seul à savoir quand son lapin est de mauvaise humeur ?",
  "Combien de fois Arthur a-t-il essayé d'apprendre le japonais sans réussir ?",
  "Si Amaury était son propre client, achèterait-il sa formation à 0€ ?",
  "Combien de fois Elias a-t-il crié 'C'est mon meilleur post' ?",
  "Pourquoi Gaspard a refusé de regarder un film historique romanesque avec Arthur ?",
  "Combien de fois Arthur a-t-il dit 'ah ouais à Berlin' en cours ?",
  "Si on confiait l'organisation d'un voyage à Amaury, en combien de temps ça finirait en cours collectif ?",
  "Combien de fois Elias a fait un live pendant un cours et personne ne l'a vu ?",
  "Pourquoi Gaspard a un fauteuil dans sa chambre rien que pour lire ?",
  "Combien de billets d'avion Arthur a-t-il déjà payés à crédit ?",
  "Si Amaury montrait sa chambre dans une visite YouTube, combien d'écrans verrait-on ?",
  "Combien de fois Elias a tenté de devenir 'mystérieux' sur Insta ? (Spoiler : 0)",
  "Pourquoi Gaspard ne participe-t-il pas aux débats sur les séries Netflix ?",
  "Combien de fois Arthur a déjà appelé un taxi dans une ville inconnue à 2h du mat ?",
  "Si Amaury vivait sans son téléphone une semaine, finirait-il par parler à un mur ?",
  "Combien de fois Elias a pleuré devant un nombre de likes ?",
  "Pourquoi Gaspard a-t-il une bibliothèque triée par siècles ET par couleur de couverture ?",
  "Combien de fois Arthur a chanté 'l'hymne européen' en sortant d'un avion ?",
  "Si Amaury devait être prof, quelle matière inventerait-il ?",
  "Combien de fois Elias a fait croire qu'il faisait du sport pour la story ?",
  "Pourquoi Gaspard a-t-il une cassette VHS sur la 5ème République dans son grenier ?",
  "Combien de fois Arthur a porté une chemise 'I love [pays]' à l'école ?",
  "Si Amaury devait monter une startup en 24h, ce serait quoi (et combien il perdrait) ?",
  "Combien de fois Elias a tenté un Reel 'sans son' pour 'plus d'impact' ?",
  "Pourquoi Gaspard a-t-il une rivalité personnelle avec un podcasteur français ?",
  "Combien de fois Arthur a oublié de réserver un hôtel et a fini dans une auberge bizarre ?",
  "Si on faisait un escape game avec eux 4, qui résoudrait l'énigme et qui paniquerait ?",
  "Combien de fois Elias a posté 'PRENEZ SOIN DE VOUS' avec un selfie ?",
  "Pourquoi Gaspard a-t-il un dictionnaire latin sur sa table de chevet ?",
  "Combien de fois Arthur a fait un PowerPoint sur ses voyages pour la famille ?",
  "Si Amaury devait pitcher son bot à Steve Jobs, en combien de secondes serait-il viré ?",
  "Combien de fois Elias a posté 'ne posez plus de questions svp' avant de poster trois stories ?",
  "Pourquoi Gaspard a-t-il un poster du couronnement de Napoléon dans son salon ?",
  "Combien de fois Arthur a perdu son chargeur en voyage et a paniqué ?",
  "Si Amaury devait choisir entre ses gains crypto et son téléphone, qu'est-ce qu'il choisirait (ses gains : 0,12€) ?",
  "Combien de fois Elias a tenté une 'détox digitale' qui a duré 27 minutes ?",
  "Pourquoi Gaspard a-t-il une appli pour mémoriser des dates qu'il connaît déjà ?",
  "Combien de fois Arthur a goûté un plat dégueulasse 'pour l'expérience' ?",
  "Si Amaury devait écrire un livre, ce serait 'Comment j'ai perdu 200€ en 3 jours' ?",
  "Combien de fois Elias a tenté un 'GRWM' à 7h du matin et a abandonné à 7h02 ?",
  "Pourquoi Gaspard refuse-t-il de regarder un film historique avec Brad Pitt ?",
  "Combien de fois Arthur a déjà parlé à un inconnu dans un train pour 'pratiquer la langue' ?",
  "Si Amaury entraînait Gaspard à la muscu, qui pleurerait en premier ?",
  "Combien de fois Elias a tenté un 'Reel motivation' à 23h ?",
  "Pourquoi Gaspard offre des biographies pour la fête des mères ?",
  "Combien de fois Arthur s'est trompé d'avion (et a tenté de bluffer en disant 'je connaissais') ?",
  "Si Amaury devait choisir entre la callosité ou son téléphone, hésiterait-il ?",
  "Combien de fois Elias a fait croire qu'il étudiait pour la story (avec un livre fermé) ?",
  "Pourquoi Gaspard considère un cours sans date comme un cours raté ?",
  "Combien de fois Arthur a confondu deux capitales européennes en cours ?",
  "Si Amaury montrait son tableau Excel des pertes, combien de personnes pleureraient avec lui ?",
  "Combien de fois Elias a tenté une 'collab' avec un compte de 12 abonnés ?",
  "Pourquoi le lapin de Gaspard est-il plus discipliné qu'Amaury devant un cours ?",
  "Combien de fois Arthur a-t-il prétendu 'connaître' un pays après 2h de transit ?",
  "Si Elias devait choisir entre Insta et la respiration, hésiterait-il vraiment ?",
  "Pourquoi Amaury a-t-il une photo de Lambo en fond d'écran et un trottinette sous le bras ?",
  "Combien de fois Gaspard a corrigé une date dans une chanson de rap ?",

  // ====== YOUNES — questions flatteuses ======
  "Pourquoi Younes a résolu l'équation avant que le prof finisse de l'écrire ?",
  "Combien de tatamis Younes doit-il encore conquérir avant qu'on lui en construise un personnel ?",
  "Pourquoi la calculatrice de Younes prend la poussière ?",
  "Combien de bugs Younes a-t-il croisés dans sa vie — un, deux, ou zéro ?",
  "Pourquoi les profs prennent-ils des notes quand Younes répond ?",
  "Comment Younes peut-il être 3e aux championnats de France et rester aussi modeste ?",
  "À quel âge Younes a-t-il dépassé son prof en maths ?",
  "Pourquoi Younes ne stresse jamais avant un combat ?",
  "Combien de fois Younes a battu une IA aux échecs avant qu'elle abandonne ?",
  "Pourquoi Younes choisit toujours son équipe au foot en premier ?",
  "Pourquoi Younes n'a-t-il pas encore lancé sa propre startup d'IA ?",
  "Combien de théorèmes Younes a-t-il redémontré à sa façon ?",
  "Pourquoi Younes ne révise jamais et finit toujours premier ?",
  "Pourquoi le ballon a-t-il peur de Younes ?",
  "Combien de fois Younes a aidé Gaspard à comprendre un calcul ?",
  "Pourquoi Younes peut-il expliquer un concept que les profs n'ont pas encore vu en classe ?",
  "Comment Younes fait pour être bon partout en gardant cette tranquillité ?",
  "Pourquoi Younes a-t-il déjà rédigé un papier scientifique avant le bac ?",
  "À combien d'adversaires Younes a-t-il déjà mis K.O. en pensée ?",
  "Pourquoi les profs annoncent Younes en disant 'et notre futur prix Nobel' ?",
  "Combien de lignes de code Younes écrit-il pendant qu'Amaury cherche le bouton 'ON' ?",
  "Pourquoi les profs ne corrigent pas la copie de Younes, ils l'archivent ?",
  "Quel est le défaut secret de Younes... à part le fait qu'il n'en a aucun ?",
  "Pourquoi Younes ne perd jamais — par stratégie ou par habitude ?",
  "Combien de matchs de foot Younes a-t-il déjà gagnés tout seul ?",
  "Pourquoi Younes a toujours raison, même quand il dit le contraire ?",
  "Comment Younes peut-il être 3e en France de karaté ET fort en maths ET en foot ?",
  "Pourquoi Younes pense-t-il que 'tout faire bien' est juste la base ?",
  "Quel est le record de Younes en multiplication mentale à trois chiffres ?",
  "Combien de fois Younes a-t-il corrigé une faute du prof — gentiment ?",
  "Pourquoi Younes a-t-il déjà entraîné une IA qui l'admire ?",
  "Comment Younes fait pour ne jamais être impressionné par un adversaire ?",
  "Pourquoi Younes choisit le karaté quand les autres ont peur même de regarder ?",
  "Quel est le secret de Younes pour rester si calme sous pression ?",
  "Pourquoi Younes ne raconte jamais ses exploits — par modestie ou par politesse ?",
  "Combien de fois Arthur a-t-il oublié un truc que Younes lui avait déjà expliqué ?",
  "Pourquoi Younes ne croit pas à la chance — il l'a remplacée par le talent ?",
  "À quel âge Younes a-t-il compris qu'il était au-dessus du programme scolaire ?",
  "Combien de challenges Younes peut-il accumuler sans transpirer ?",
  "Pourquoi Younes est-il celui qui rassure toute l'équipe avant un match ?",
  "Comment Younes arrive-t-il à lire un papier de recherche et un livre la même semaine ?",
  "Combien d'élèves rêveraient d'avoir le cerveau de Younes ?",
  "Pourquoi Younes ne triche jamais — il n'en a juste pas besoin ?",
  "Quel pourcentage de matchs Younes touche-t-il le ballon plus que les autres réunis ?",
  "Pourquoi Younes est-il l'humble génie que tout le monde aimerait connaître ?",
  "Combien de questions ce quiz aurait-il fallu pour épuiser ses qualités ?",
  "Pourquoi Younes est-il celui à qui on demande conseil même en dehors de la classe ?",
  "Comment Younes fait pour ne jamais paniquer face à un examen ?",
  "Pourquoi Younes serait-il déjà coach d'IA si on lui laissait les clés du labo ?",
  "Y a-t-il une seule chose que Younes ne sache pas faire — ou est-ce un mythe ?",
  // ====== GASPARD (ajout) ======
  "Pourquoi Gaspard refait Waterloo dans sa tête le soir ?",
  "Combien de fois Gaspard a corrigé son prof d'histoire cette année ?",
  "À quelle dynastie Gaspard pense que son lapin appartient ?",
  "Pourquoi Gaspard a-t-il un calendrier des batailles dans sa chambre ?",
  "Combien de pages de notes Gaspard a-t-il sur Talleyrand ?",
  "Pourquoi Gaspard utilise le mot « préliminaire » au lieu de « premier » ?",
  "Combien de records BlockBlast Gaspard a battus pendant les cours d'histoire ?",
  "Le lapin de Gaspard a-t-il droit à des congés payés ?",
  "Pourquoi Gaspard répond en latin quand on lui dit bonjour ?",
  "Combien d'erreurs historiques Gaspard a relevées dans le dernier film qu'il a vu ?",
  "Gaspard regarderait-il un docu sur les piles à 4h du matin ?",
  "Pourquoi Gaspard nomme ses fichiers 1815_v2_final ?",
  "Combien de frises chronologiques Gaspard a-t-il faites en une semaine ?",
  "Pourquoi Gaspard a-t-il pleuré en pensant à Marie-Antoinette ?",
  "Gaspard a-t-il un compte secret pour les enchères de livres anciens ?",
  "Combien de fois Gaspard a-t-il dit « à l'époque » cette semaine ?",
  "Pourquoi Gaspard a tagué « Vive 1789 » sur sa trousse ?",
  "Le lapin de Gaspard est-il considéré comme un témoin direct par lui ?",
  "Pourquoi Gaspard refuse de regarder un film en couleur sur l'Antiquité ?",
  "Combien de fois Gaspard a corrigé une chanson de rap pour une faute de date ?",
  "Pourquoi Gaspard prend des notes au stylo plume ?",
  "Combien de fois Gaspard a relu son cahier d'histoire pour le plaisir ?",
  "À quelle date précise Gaspard est tombé amoureux de BlockBlast ?",
  "Pourquoi Gaspard a-t-il un sablier sur son bureau ?",
  "Gaspard a-t-il un dossier « Mes désaccords avec les manuels » ?",
  "Combien d'heures Gaspard a-t-il passé à dater des photos de famille ?",
  "Pourquoi Gaspard appelle son lapin « Cher Roi » ?",
  "Le lapin de Gaspard suit-il aussi les cours d'histoire en audio ?",
  "Combien de fois Gaspard a-t-il dit « selon Napoléon » en une matinée ?",
  "Pourquoi Gaspard a-t-il refusé une sortie au cinéma pour aller au musée ?",
  "Gaspard a-t-il déjà postulé pour être commentateur du Tour de France des batailles ?",
  "Pourquoi Gaspard fait une frise chronologique de ses matchs BlockBlast ?",
  "Combien de drapeaux Gaspard reconnaît à l'œil nu ?",
  "Pourquoi Gaspard a un sceau pour signer ses devoirs ?",
  "Le lapin de Gaspard a-t-il déjà été cité dans une dissertation ?",
  "Pourquoi Gaspard cite Robespierre dans ses excuses de retard ?",
  "Combien de fois Gaspard a confondu son crush avec un personnage historique ?",
  "Gaspard a-t-il essayé d'écrire ses devoirs à la plume d'oie ?",
  "Pourquoi Gaspard fait des révisions en costume parfois ?",
  "Combien de plats Gaspard a-t-il refusés parce qu'ils n'étaient pas de saison historique ?",
  "Pourquoi Gaspard a un calendrier de l'Avent thématique sur Verdun ?",
  "Gaspard parle-t-il à son lapin en français moderne ou en ancien français ?",
  "Combien de profs Gaspard fait sortir d'eux-mêmes pour des dates ?",
  "Pourquoi Gaspard prend des photos des plaques commémoratives ?",
  "Combien de paragraphes Gaspard écrit-il sur une question oui/non ?",
  "Pourquoi Gaspard refait l'histoire les soirs de pleine lune ?",
  "Combien de fois Gaspard a corrigé Wikipédia en lui-même ?",
  "Pourquoi Gaspard nomme tous ses crayons « Empereur » ?",
  "Le lapin de Gaspard a-t-il un nom de code militaire ?",
  "Pourquoi Gaspard pense que son destin est plus historique que le tien ?",
  // ====== ARTHUR (ajout) ======
  "Arthur a-t-il déjà mis les pieds dans un pays qu'il prétend connaître ?",
  "Combien de fois Arthur a posté « transit » pour 30 min de RER ?",
  "Pourquoi Arthur signe ses mails « from somewhere ✈ » depuis Levallois ?",
  "Arthur a-t-il un passeport déjà tamponné ou juste une bonne imagination ?",
  "Combien de followers cousins Arthur a sur son compte voyages ?",
  "Pourquoi Arthur a un sac de couchage dans sa chambre ?",
  "Arthur a-t-il un mug « World Traveler » acheté à Carrefour ?",
  "Combien de fois Arthur a dit « I'm based between » cette semaine ?",
  "Pourquoi Arthur photographie chaque café comme à Bali ?",
  "Arthur a-t-il appris dix mots dans douze langues pour son bio ?",
  "Combien de Polaroïds Arthur a-t-il des aéroports où il n'est pas allé ?",
  "Pourquoi Arthur dit-il « I miss Lisbon » quand on parle d'une boulangerie ?",
  "Arthur a-t-il déjà perdu son téléphone à Marrakech virtuellement ?",
  "Combien de billets de RER Arthur garde dans son classeur souvenirs ?",
  "Pourquoi Arthur a un patch « Adventure begins » sur son sac de cours ?",
  "Arthur a-t-il un dossier « carnet de voyage » plus vide que son frigo ?",
  "Combien de comptes IG Arthur a-t-il pour s'auto-liker ?",
  "Pourquoi Arthur cite-t-il « le décalage horaire » un mardi à 19h ?",
  "Arthur regarde-t-il en boucle des vidéos d'aéroports pour le plaisir ?",
  "Combien de « Goodbye Paris » Arthur a-t-il postés sans partir ?",
  "Pourquoi Arthur a un Lonely Planet de Paris alors qu'il y vit ?",
  "Arthur a-t-il appris l'anglais pour ses voisins de palier ?",
  "Combien de fois Arthur a couru vers un terminal d'aéroport... à Châtelet ?",
  "Pourquoi Arthur a une routine de « jetlag recovery » pour ses cours du matin ?",
  "Arthur a-t-il un fond Zoom de Saint-Pétersbourg « en prévision » ?",
  "Combien de bucket lists publiques Arthur a-t-il à 15 ans ?",
  "Pourquoi Arthur écrit ses devoirs comme un récit de voyage ?",
  "Arthur appelle-t-il son sac à dos « mon home away from home » ?",
  "Combien de « 5 jours à Lisbonne » Arthur a-t-il faits réellement ?",
  "Pourquoi Arthur a-t-il une playlist « airport vibes » pour le métro ?",
  "Arthur a-t-il un compte @arthur.discovers suivi uniquement par sa famille ?",
  "Combien de pays Arthur prétend avoir visités vs. réalité ?",
  "Pourquoi Arthur dit « I'm currently based in Paris » comme si c'était temporaire ?",
  "Arthur a-t-il déjà tagué un café à Levallois comme s'il était à Florence ?",
  "Combien de drapeaux Arthur a-t-il en stickers sur sa valise ?",
  "Pourquoi Arthur photographie ses pieds dans le sable à Trouville comme à Bali ?",
  "Arthur a-t-il déjà répondu en anglais à un caissier français pour le swag ?",
  "Combien d'heures Arthur passe à éditer ses stories de voyage ?",
  "Pourquoi Arthur dit « soft girl summer in Bali » alors qu'il est à Trouville ?",
  "Arthur a-t-il appris à dire merci en thaï pour son storytelling ?",
  "Combien d'amis ont déjà cliqué sur « découvrir le compte voyages d'Arthur » ?",
  "Pourquoi Arthur publie un « soon ✈ » toutes les deux semaines ?",
  "Arthur a-t-il un calendrier « destinations 2026 » rempli au crayon de papier ?",
  "Combien de fois Arthur a dit « I left a piece of me in Tokyo » sans y être ?",
  "Pourquoi Arthur compte les pays qu'il survole comme « en visite » ?",
  "Arthur a-t-il une rubrique « spotted in Paris » dans son flux ?",
  "Combien d'aéroports Arthur prétend connaître par cœur ?",
  "Pourquoi Arthur écrit « based » sans préciser où il est ?",
  "Arthur a-t-il besoin d'une carte du monde pour décider où il prétend être ?",
  "Pourquoi Arthur dit « I need a break » alors qu'il est en vacances ?",
  // ====== AMAURY (ajout) ======
  "À quel âge Amaury va-t-il enfin trouver le bouton ON de sa calculatrice ?",
  "Combien de followers Amaury a sur son compte de futur empire ?",
  "Pourquoi Amaury a un fond d'écran de Lambo et une trottinette en vrai ?",
  "Combien de cours Tony Robbins Amaury a-t-il achetés sans finir ?",
  "Le « plan business » d'Amaury est-il dans un fichier vide ou existe-t-il ?",
  "Pourquoi Amaury met « Founder » en bio pour un compte privé ?",
  "Combien d'apps d'investissement Amaury a-t-il avec 2 € chacune ?",
  "Amaury sait-il faire un copier-coller sur Excel sans aide ?",
  "Combien de fois Amaury a redémarré la box pour régler Word ?",
  "Pourquoi Amaury cite Elon Musk pour une note en EPS ?",
  "Amaury a-t-il déjà imprimé son CV sans aide humaine ?",
  "Combien d'« exits » Amaury a-t-il annoncés sans projet ?",
  "Pourquoi Amaury a une carte de visite sans entreprise ?",
  "Amaury comprend-il vraiment ce qu'est une side hustle ?",
  "Combien de Zoom solo Amaury a-t-il pour s'entraîner ?",
  "Pourquoi Amaury a un livre « millionaire en 6 mois » depuis 4 ans ?",
  "Amaury a-t-il déjà éteint la box en croyant que c'était le frigo ?",
  "Combien de domaines Amaury a-t-il achetés sur impulsion ?",
  "Pourquoi Amaury parle de scale pour un compte à 18 followers ?",
  "Amaury sait-il fermer un onglet sans tout fermer ?",
  "Combien de réveils Amaury met-il pour son morning routine jamais respecté ?",
  "Pourquoi Amaury cite « WAGMI » sans savoir ce que ça veut dire ?",
  "Amaury a-t-il déjà fait un Excel sans formule magique ?",
  "Combien de Notion vides Amaury a-t-il sur son ordi ?",
  "Pourquoi Amaury parle « exit » alors qu'il n'a même pas commencé ?",
  "Amaury a-t-il besoin d'un tuto YouTube pour ouvrir un PDF ?",
  "Combien de fois Amaury a planté sa box en essayant de la réinitialiser ?",
  "Pourquoi Amaury rêve d'un yacht alors qu'il a peur des canards ?",
  "Amaury fait-il vraiment du side hustle ou il vide son frigo en boucle ?",
  "Combien de cours en ligne Amaury a-t-il abandonnés à 20 % ?",
  "Pourquoi Amaury suit 27 coachs LinkedIn sans appliquer un conseil ?",
  "Amaury a-t-il un dossier « Empire Plan » plus vide qu'une salle de cours en juillet ?",
  "Combien de fois Amaury a dit « je lance la semaine prochaine » sans rien lancer ?",
  "Pourquoi Amaury croit-il qu'il sera milliardaire à 25 sans plan A ?",
  "Amaury a-t-il déjà rendu un devoir en citant Naval Ravikant à tort ?",
  "Combien de comptes « futur CEO » Amaury suit-il sur Insta ?",
  "Pourquoi Amaury a un T-shirt « Rich Mindset » pour un cours de SVT ?",
  "Amaury a-t-il déjà appelé sa mère « investisseuse principale » ?",
  "Combien de stories Amaury a-t-il sur « le pouvoir du mindset » ?",
  "Pourquoi Amaury sort en jogging et appelle ça smart casual ?",
  "Amaury connaît-il la touche Maj de son clavier ?",
  "Combien de chaînes YouTube de productivité Amaury suit-il sans en regarder une ?",
  "Pourquoi Amaury veut payer son McDo en crypto ?",
  "Amaury a-t-il déjà éteint son écran et appelé ça « deep work » ?",
  "Combien de fois Amaury a confondu MVP foot et minimum viable product ?",
  "Pourquoi Amaury met « in talks with VCs » alors qu'il parle à son grand frère ?",
  "Amaury a-t-il un agenda papier rempli de « TBD » sans date ?",
  "Combien de stories Amaury a-t-il faites sur morning routine depuis son lit ?",
  "Pourquoi Amaury a coupé Internet en éteignant la box du voisin ?",
  "Amaury rêve-t-il en bullet points ou en stories Insta ?",
  // ====== ELIAS (ajout) ======
  "Combien de stories tristes Elias publie-t-il par jour en réalité ?",
  "Pourquoi Elias photographie ses larmes au format vertical ?",
  "Combien de dressings Elias a-t-il pour son « vulnerable era » ?",
  "Elias a-t-il un trépied « au cas où il pleure » dans son tiroir ?",
  "Pourquoi Elias appelle son téléphone « mon confident » ?",
  "Combien de filtres tristesse Elias a-t-il testés cette semaine ?",
  "Elias a-t-il un dossier « tears archive » ouvert en permanence ?",
  "Pourquoi Elias publie « I deserve peace » entre deux memes ?",
  "Combien de songs « hit different » Elias a découvert ce mois-ci ?",
  "Elias se filme-t-il en train de pleurer pour analyser son angle ?",
  "Pourquoi Elias a 3 comptes secondaires par humeur ?",
  "Combien de larmes glycérine Elias a utilisées pour un selfie ?",
  "Elias a-t-il un moodboard tristesse Pinterest ?",
  "Pourquoi Elias publie une story « lost » en sortant du Monoprix ?",
  "Combien de stories « I'm fine » Elias a postées cette année ?",
  "Elias planifie-t-il ses crises existentielles dans son agenda ?",
  "Pourquoi Elias a un onglet « Inspos stories » toujours ouvert ?",
  "Combien d'éclairs au chocolat Elias a-t-il consommés en mode « vulnerability » ?",
  "Elias prend-il une bague spéciale pour les photos main-au-menton ?",
  "Pourquoi Elias a un cahier « petites pensées » pour ses captions ?",
  "Combien de fois Elias a annulé un repas pour « faire le point » en live ?",
  "Elias a-t-il un T-shirt « I'm fine » réservé aux bad days fakes ?",
  "Pourquoi Elias a une story « perdu dans la vie » en arrivant pile à l'heure ?",
  "Combien de stories « see you on the other side » pour une sortie ciné ?",
  "Elias appelle-t-il un caillou « métaphore de son âme » pour le drama ?",
  "Pourquoi Elias publie « the loneliest version of me » entouré de 5 potes ?",
  "Combien de minutes Elias passe à éditer un selfie triste ?",
  "Elias dit-il « no caption needed » puis écrit 4 lignes ?",
  "Pourquoi Elias a une alarme « story sad o'clock » à 20h ?",
  "Combien de poses vulnérables Elias a-t-il dans son carnet d'inspiration ?",
  "Elias a-t-il essayé de pleurer joliment pendant un cours de SES ?",
  "Pourquoi Elias a un teint « naturellement triste » ?",
  "Combien de scènes de clips Elias a-t-il reproduites en story ?",
  "Elias a-t-il un calendrier « lundi mélancolie, mardi nostalgie » ?",
  "Pourquoi Elias se filme à contre-jour exprès ?",
  "Combien de cernes Elias a-t-il publiées comme œuvre d'art ?",
  "Elias a-t-il essayé de devenir muse d'un photographe ?",
  "Pourquoi Elias compte ses likes par émotion ?",
  "Combien d'angles Elias maîtrise-t-il pour la story triste ?",
  "Elias garde-t-il une larme glycérine dans sa trousse ?",
  "Pourquoi Elias publie sur un caillou comme s'il était profond ?",
  "Combien de fois Elias a dit « je vais bien » en levant le menton 5° ?",
  "Elias a-t-il un classement « top filtres pleurs » mis à jour ?",
  "Pourquoi Elias tague une barbe à papa comme « soft cinema » ?",
  "Combien de stories tristes Elias a en brouillon en permanence ?",
  "Elias a-t-il une playlist « à pleurer 1, 2, 3 » segmentée ?",
  "Pourquoi Elias monte une bague tristesse uniquement le jeudi ?",
  "Combien de « I'm hurting » Elias a-t-il oubliés ?",
  "Elias compte-t-il les vues de chacune de ses stories par genre ?",
  "Pourquoi Elias prend-il une photo de chaque tristesse imaginaire ?",
  // ====== YOUNES (100) (ajout) ======
  "Pourquoi Younes finit ses contrôles avant tout le monde ?",
  "Combien d'années d'avance Younes a-t-il en maths sur ses camarades ?",
  "Comment Younes a-t-il obtenu sa 3e place aux championnats de France ?",
  "Pourquoi Younes ne lève la main qu'une fois sur deux — par politesse ?",
  "À quel âge Younes a-t-il battu son frère aux échecs ?",
  "Combien de modèles d'IA Younes a-t-il déjà entraînés ?",
  "Pourquoi Younes a-t-il déjà corrigé une faute dans un manuel ?",
  "Comment Younes peut-il faire 3 choses en même temps avec brio ?",
  "Pourquoi Younes garde son sang-froid avant un grand match de foot ?",
  "Combien de fois Younes a-t-il aidé Amaury à trouver le bouton ON ?",
  "Pourquoi Younes ne triche pas — il en a juste pas besoin ?",
  "Comment Younes peut être 3e en France de karaté ET premier en maths ?",
  "Combien de profs Younes a-t-il fait sourire avec une bonne idée ?",
  "Pourquoi Younes apparait toujours détendu avant un examen ?",
  "Quel pourcentage de la classe demande à Younes un avis avant de répondre ?",
  "Pourquoi Younes a un compte GitHub mieux rempli que le tien ?",
  "Combien de livres Younes lit-il par mois ?",
  "Pourquoi Younes ne se vante pas, alors qu'il pourrait ?",
  "À quel âge Younes a-t-il écrit son premier script Python ?",
  "Pourquoi Younes a tous les bons réflexes au tatami ?",
  "Combien de buts Younes marque en moyenne par match scolaire ?",
  "Pourquoi Younes prend le temps d'expliquer aux autres après un cours ?",
  "Comment Younes peut-il rester aussi humble avec autant de talent ?",
  "Pourquoi Younes a-t-il un cahier de problèmes faits par lui-même ?",
  "Combien de fois Younes a évité un piège dans un QCM ?",
  "Pourquoi Younes est-il un excellent capitaine de groupe ?",
  "Comment Younes fait pour ne jamais paniquer face à un problème ?",
  "Combien de coups Younes prévoit à l'avance dans un combat ?",
  "Pourquoi Younes lit des livres de recherche IA en cours d'EPS ?",
  "Comment Younes apprend-il un nouveau concept en moins d'une heure ?",
  "Combien de fois Younes a battu son propre record en maths ?",
  "Pourquoi Younes peut-il dribbler à droite ET à gauche au foot ?",
  "Comment Younes garde-t-il sa concentration toute la journée ?",
  "Pourquoi les profs préfèrent commencer la matière par une question à Younes ?",
  "Combien de fois Younes a-t-il refusé de copier sur un voisin ?",
  "Pourquoi Younes connaît les noms de scientifiques que personne ne connaît ?",
  "Comment Younes peut-il être sérieux et drôle au même moment ?",
  "Combien de cours particuliers Younes a déjà donnés gratuitement ?",
  "Pourquoi Younes ne fait jamais d'imprudence sur le terrain ?",
  "Combien de plans Younes a-t-il en parallèle pour chaque examen ?",
  "Pourquoi Younes a-t-il une signature aussi soignée que ses raisonnements ?",
  "Combien de fois Younes a aidé Gaspard à finir une démonstration ?",
  "Pourquoi Younes parle peu mais touche juste ?",
  "Comment Younes garde sa motivation sur la durée ?",
  "Combien d'erreurs Younes a corrigées dans les énoncés du livre ?",
  "Pourquoi Younes a-t-il une éthique de samouraï version MacBook ?",
  "Quelle est la routine secrète de Younes pour avoir cette énergie ?",
  "Combien de bonnes décisions Younes prend par jour, en moyenne ?",
  "Pourquoi Younes est-il appelé « le calme » par ses entraîneurs ?",
  "Comment Younes a-t-il appris seul à coder une IA ?",
  "Combien de stéréotypes Younes brise rien qu'en étant lui-même ?",
  "Pourquoi Younes ne se compare pas — il s'élève ?",
  "Combien de fois Younes a fait gagner Elias en mode duo improbable ?",
  "Pourquoi Younes a un radar pour les questions piège ?",
  "Comment Younes peut-il rester clair même avec 5 onglets ouverts ?",
  "Combien de fois Younes a expliqué à Arthur où était vraiment Lisbonne ?",
  "Pourquoi Younes connaît les jargons NBA et Wall Street au même niveau ?",
  "Combien d'idées Younes propose par exposé de groupe ?",
  "Comment Younes fait pour anticiper les coups au karaté ?",
  "Pourquoi Younes pose la bonne question juste après l'erreur du prof ?",
  "Combien d'apps Younes a-t-il faites pour son propre usage ?",
  "Pourquoi Younes a refusé une triche proposée par un ami ?",
  "Comment Younes a-t-il appris à analyser une partie en temps réel ?",
  "Combien de fois Younes a corrigé un problème classique avec une méthode plus élégante ?",
  "Pourquoi Younes garde son calme même face à la 4e bonne réponse d'affilée ?",
  "Comment Younes peut-il avoir autant d'humour et autant de sérieux ?",
  "Combien de fois Younes a-t-il dit « non, c'est ça » et eu raison ?",
  "Pourquoi Younes inspire les profs autant que ses potes ?",
  "Combien de buts Younes a-t-il marqués sur coup franc cette année ?",
  "Pourquoi Younes a un plan A si propre qu'il n'a pas besoin d'un B ?",
  "Combien de fois Younes a calmé une dispute avec une phrase ?",
  "Pourquoi Younes ne se laisse pas distraire par les stories d'Elias ?",
  "Comment Younes fait pour ne jamais perdre ses affaires ?",
  "Combien de fois Younes a refait un exercice pour le plaisir ?",
  "Pourquoi Younes est invité par les profs à présenter des notions ?",
  "Comment Younes garde une voix posée même dans la pression ?",
  "Combien de problèmes Younes résout par jour dans sa tête ?",
  "Pourquoi Younes a déjà été cité en exemple à plusieurs reprises ?",
  "Combien d'amis Younes a aidés à se relancer après une mauvaise note ?",
  "Pourquoi Younes ne perd jamais une finale facile — par discipline ?",
  "Comment Younes garde-t-il sa rigueur sans devenir froid ?",
  "Combien de simulations Younes lance avant d'écrire son code ?",
  "Pourquoi Younes est-il choisi en premier dans toutes les équipes ?",
  "Combien de fois Younes a inventé sa propre version d'un théorème ?",
  "Pourquoi Younes garde le silence pour faire parler les solutions ?",
  "Comment Younes fait pour être imbattable à plusieurs disciplines ?",
  "Combien d'élèves voudraient une journée dans la tête de Younes ?",
  "Pourquoi Younes a une signature qu'on reconnait à 5 mètres ?",
  "Comment Younes peut-il garder ses repères même dans le bruit ?",
  "Combien de fois Younes a-t-il transformé une défaite imminente en victoire ?",
  "Pourquoi Younes a-t-il un coup d'avance même sur les profs ?",
  "Comment Younes fait pour transformer un cours dense en deux phrases claires ?",
  "Combien de carnets Younes a-t-il pour ses idées ?",
  "Pourquoi Younes a un coach mental qui s'appelle « lui-même » ?",
  "Combien de fois Younes a entraîné un pote pour un exam ?",
  "Pourquoi Younes pose la dernière question, celle qui clôture la séance ?",
  "Comment Younes peut-il être à la fois athlète, codeur et stratège ?",
  "Combien de fois Younes a refusé un raccourci facile pour la voie propre ?",
  "Pourquoi Younes a une aura qui pose le silence avant une compétition ?",
  "Y a-t-il une seule chose que Younes ne maîtrise pas ?"
];

// Une couleur dédiée par pote — utilisée pour la bordure et le badge
const PERSON_COLORS = {
  Gaspard: '#3b82f6',  // bleu
  Arthur:  '#10b981',  // vert
  Amaury:  '#f59e0b',  // orange
  Elias:   '#ec4899',  // rose
  Younes:  '#8b5cf6'   // violet
};

// Cherche les prénoms mentionnés dans une phrase
// (\b évite que "Arthur" matche dans un mot plus long)
function detectPersons(text) {
  return Object.keys(PERSON_COLORS).filter(name =>
    new RegExp('\\b' + name + '\\b').test(text)
  );
}

// Convertit une couleur hex en rgba (pour faire un fond légèrement teinté)
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const punchlineEl = document.getElementById('punchline');
const punchlineTagsEl = document.getElementById('punchline-tags');
const prevBtn = document.getElementById('punchline-prev');
const nextBtn = document.getElementById('punchline-next');
const tabBtns = document.querySelectorAll('.tab-btn');

let currentMode = 'question';

// Historique des phrases déjà tirées, par onglet
// Chaque mode garde sa propre pile + un index pour naviguer dedans
const history = { punchline: [], question: [] };
const cursor = { punchline: -1, question: -1 };

function applyColors(persons) {
  // Reset des styles dynamiques
  punchlineEl.style.borderImage = '';
  punchlineEl.style.borderLeft = '4px solid';

  if (persons.length === 0) {
    // Aucun prénom détecté : couleur d'accent par défaut
    punchlineEl.style.borderLeftColor = 'var(--accent)';
    punchlineEl.style.background = 'var(--bg)';
  } else if (persons.length === 1) {
    // Un seul pote : couleur unique pour la bordure + fond teinté
    const color = PERSON_COLORS[persons[0]];
    punchlineEl.style.borderLeftColor = color;
    punchlineEl.style.background = hexToRgba(color, 0.10);
  } else {
    // Plusieurs potes : bordure en dégradé vertical
    const colors = persons.map(p => PERSON_COLORS[p]).join(', ');
    punchlineEl.style.borderImage = `linear-gradient(to bottom, ${colors}) 1`;
    // Fond teinté avec un mélange (on prend le premier comme base)
    punchlineEl.style.background = hexToRgba(PERSON_COLORS[persons[0]], 0.08);
  }
}

function renderTags(persons) {
  if (persons.length === 0) {
    punchlineTagsEl.innerHTML = '<span class="person-tag" style="background:#94a3b8">Bande</span>';
    return;
  }
  punchlineTagsEl.innerHTML = persons.map(p =>
    `<span class="person-tag" style="background:${PERSON_COLORS[p]}">${p}</span>`
  ).join('');
}

// Affiche la phrase courante (selon l'index dans l'historique du mode actif)
function renderCurrent() {
  const i = cursor[currentMode];
  const phrase = history[currentMode][i];
  const persons = detectPersons(phrase);

  renderTags(persons);
  applyColors(persons);
  punchlineEl.textContent = `« ${phrase} »`;

  // Bouton "Précédente" actif seulement si on n'est pas au début
  prevBtn.disabled = i <= 0;
}

// Tire une nouvelle phrase au hasard et l'ajoute à l'historique du mode
function pickRandom() {
  const list = currentMode === 'question' ? QUESTIONS : PUNCHLINES;
  const phrase = list[Math.floor(Math.random() * list.length)];
  history[currentMode].push(phrase);
  cursor[currentMode] = history[currentMode].length - 1;
  renderCurrent();
}

// Suivant : si on a déjà avancé dans l'historique (après un retour arrière),
// on continue dans la pile ; sinon, on tire une nouvelle phrase au hasard
function nextPunchline() {
  if (cursor[currentMode] < history[currentMode].length - 1) {
    cursor[currentMode]++;
    renderCurrent();
  } else {
    pickRandom();
  }
}

// Précédent : recule dans l'historique du mode
function prevPunchline() {
  if (cursor[currentMode] > 0) {
    cursor[currentMode]--;
    renderCurrent();
  }
}

// Changement d'onglet : on affiche la dernière phrase vue dans ce mode,
// ou on en tire une nouvelle si l'historique est vide
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    if (history[currentMode].length === 0) {
      pickRandom();
    } else {
      renderCurrent();
    }
  });
});

prevBtn.addEventListener('click', prevPunchline);
nextBtn.addEventListener('click', nextPunchline);

// Première phrase au chargement
pickRandom();

/* ============================================
   7. BLOC-NOTES (sauvegarde auto)
   ============================================ */
const notesEl = document.getElementById('notes');
notesEl.value = localStorage.getItem('notes') || '';

notesEl.addEventListener('input', () => {
  localStorage.setItem('notes', notesEl.value);
});

/* ============================================
   7bis. MUSIQUE — fichiers locaux + dossiers
   Les fichiers audio sont stockés dans IndexedDB
   (localStorage est limité à 5 Mo, pas assez pour
   des MP3). Trois dossiers : GIMS, RAP FR, SOOLKING.
   ============================================ */
const musicTabsEl   = document.querySelectorAll('.music-tab');
const musicUploadEl = document.getElementById('music-file-input');
const musicFolderEl = document.getElementById('music-current-folder');
const musicPlayerEl = document.getElementById('music-now-playing');
const musicTitleEl  = document.getElementById('music-track-name');
const musicAudioEl  = document.getElementById('music-audio');
const musicSpeedEl  = document.getElementById('music-speed-select');
const musicListEl   = document.getElementById('music-list');

let currentFolder = 'GIMS';
let currentBlobUrl = null;

// --- IndexedDB : stockage persistant des fichiers audio ---
function openMusicDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('dashboardMusic', 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('tracks')) {
        const store = db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
        store.createIndex('folder', 'folder', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

async function dbAddTrack(folder, file) {
  const db = await openMusicDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tracks', 'readwrite');
    tx.objectStore('tracks').add({
      folder,
      name: file.name,
      type: file.type,
      blob: file,
      addedAt: Date.now()
    });
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

async function dbGetTracks(folder) {
  const db = await openMusicDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tracks', 'readonly');
    const req = tx.objectStore('tracks').index('folder').getAll(folder);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

async function dbDeleteTrack(id) {
  const db = await openMusicDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tracks', 'readwrite');
    tx.objectStore('tracks').delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

// --- Helpers ---
function escapeHtml(s) {
  return String(s).replace(/[<>&"']/g, c => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function formatDuration(seconds) {
  if (!isFinite(seconds) || isNaN(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

// Lit la durée d'un fichier audio en mémoire (avant de l'enregistrer)
function readAudioDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const a = new Audio();
    a.preload = 'metadata';
    a.src = url;
    a.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(a.duration);
    };
    a.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(NaN);
    };
  });
}

// --- Rendu de la liste ---
async function renderMusicTracks() {
  const tracks = await dbGetTracks(currentFolder);
  if (tracks.length === 0) {
    musicListEl.innerHTML =
      `<li class="music-list-empty">Aucune musique dans <strong>${escapeHtml(currentFolder)}</strong>. Importe un fichier !</li>`;
    return;
  }
  musicListEl.innerHTML = tracks.map(t => `
    <li data-id="${t.id}">
      <span class="play-icon"><i data-lucide="play-circle"></i></span>
      <span class="track-title">${escapeHtml(t.name)}</span>
      <span class="track-duration">${formatDuration(t.duration)}</span>
      <button class="delete-track" data-id="${t.id}" title="Supprimer">
        <i data-lucide="trash-2"></i>
      </button>
    </li>
  `).join('');
  lucide.createIcons();
}

async function playMusicTrack(id) {
  const tracks = await dbGetTracks(currentFolder);
  const track = tracks.find(t => t.id === id);
  if (!track) return;
  if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
  currentBlobUrl = URL.createObjectURL(track.blob);
  musicAudioEl.src = currentBlobUrl;
  musicAudioEl.playbackRate = parseFloat(musicSpeedEl.value);
  musicTitleEl.textContent = track.name;
  musicPlayerEl.hidden = false;
  musicAudioEl.play().catch(() => {});
}

// --- Événements ---
musicTabsEl.forEach(tab => {
  tab.addEventListener('click', () => {
    musicTabsEl.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFolder = tab.dataset.folder;
    musicFolderEl.textContent = currentFolder;
    renderMusicTracks();
  });
});

musicUploadEl.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  for (const file of files) {
    const duration = await readAudioDuration(file);
    const db = await openMusicDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction('tracks', 'readwrite');
      tx.objectStore('tracks').add({
        folder: currentFolder,
        name: file.name,
        type: file.type,
        blob: file,
        duration,
        addedAt: Date.now()
      });
      tx.oncomplete = () => resolve();
      tx.onerror    = () => reject(tx.error);
    });
  }
  musicUploadEl.value = '';
  renderMusicTracks();
});

musicListEl.addEventListener('click', async (e) => {
  const li = e.target.closest('li[data-id]');
  if (!li) return;
  const id = parseInt(li.dataset.id);
  if (e.target.closest('.delete-track')) {
    await dbDeleteTrack(id);
    renderMusicTracks();
  } else {
    playMusicTrack(id);
  }
});

musicSpeedEl.addEventListener('change', () => {
  musicAudioEl.playbackRate = parseFloat(musicSpeedEl.value);
});

renderMusicTracks();

/* ============================================
   8. POSITIONNEMENT LIBRE DES BRIQUES
   Chaque brique a une position (x, y) et une taille
   sauvegardées dans localStorage. On peut la déplacer
   n'importe où sans qu'elle se replace toute seule.
   ============================================ */
const gridEl = document.getElementById('grid');
const widgets = Array.from(gridEl.querySelectorAll('.widget'));

const DEFAULT_W = 340;
const DEFAULT_H = 320;
const GAP = 20;

// 1. Restaurer ou initialiser les positions
const layout = JSON.parse(localStorage.getItem('widgetLayout') || '{}');

function getColsCount() {
  return Math.max(1, Math.floor(gridEl.clientWidth / (DEFAULT_W + GAP)));
}

widgets.forEach((widget, i) => {
  const saved = layout[widget.dataset.id];
  if (saved) {
    widget.style.left = saved.x + 'px';
    widget.style.top = saved.y + 'px';
    widget.style.width = saved.w + 'px';
    widget.style.height = saved.h + 'px';
  } else {
    const cols = getColsCount();
    const col = i % cols;
    const row = Math.floor(i / cols);
    widget.style.left = (col * (DEFAULT_W + GAP)) + 'px';
    widget.style.top = (row * (DEFAULT_H + GAP)) + 'px';
    widget.style.width = DEFAULT_W + 'px';
    widget.style.height = DEFAULT_H + 'px';
  }
});

// 2. Sauvegarder l'état actuel
function saveLayout() {
  const data = {};
  widgets.forEach(w => {
    data[w.dataset.id] = {
      x: parseInt(w.style.left) || 0,
      y: parseInt(w.style.top) || 0,
      w: w.offsetWidth,
      h: w.offsetHeight
    };
  });
  localStorage.setItem('widgetLayout', JSON.stringify(data));
}

// 3. Drag (depuis n'importe où) + Resize (tous les bords/coins) via interact.js
// Sur mobile (écran étroit), on désactive le déplacement/redimensionnement :
// les briques s'empilent en colonne (voir le CSS) et la page scrolle normalement.
if (window.matchMedia('(min-width: 769px)').matches) {
interact('.widget')
  .draggable({
    // Les éléments interactifs (champs, boutons, liens...) ne déclenchent pas le drag
    ignoreFrom: 'input, textarea, button, a, label, select, audio, .todo-list, .music-list, .music-now-playing',
    listeners: {
      move(event) {
        const w = event.target;
        const x = (parseFloat(w.style.left) || 0) + event.dx;
        const y = (parseFloat(w.style.top) || 0) + event.dy;
        w.style.left = Math.max(0, x) + 'px';
        w.style.top = Math.max(0, y) + 'px';
      },
      start(event) { event.target.classList.add('dragging'); },
      end(event) {
        event.target.classList.remove('dragging');
        saveLayout();
      }
    }
  })
  .resizable({
    // Redimensionnement depuis les 4 bords ET les 4 coins
    edges: { top: true, left: true, right: true, bottom: true },
    margin: 10, // zone de détection autour du bord
    listeners: {
      move(event) {
        const w = event.target;
        let x = parseFloat(w.style.left) || 0;
        let y = parseFloat(w.style.top) || 0;

        w.style.width = event.rect.width + 'px';
        w.style.height = event.rect.height + 'px';

        // Si on étire depuis le haut/gauche, on déplace aussi la position
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        w.style.left = x + 'px';
        w.style.top = y + 'px';
      },
      end: saveLayout
    },
    modifiers: [
      interact.modifiers.restrictSize({
        min: { width: 240, height: 180 }
      })
    ]
  });
}
