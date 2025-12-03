const DATA_URL = "data/dogs.json";

// Basic age group helper for the chip
function getAgeGroup(ageYears) {
  if (ageYears == null) return "adult";
  if (ageYears < 1) return "puppy";
  if (ageYears <= 7) return "adult";
  return "senior";
}

function createFeaturedDogCard(dog) {
  const name =
    dog.name || dog.dogName || "Adoptable Dog";

  const imageSrc =
    dog.image || dog.photo || dog.img || "images/hero.jpg";

  const ageYears =
    dog.ageYears ?? dog.age_years ?? dog.age ?? null;

  const ageLabel =
    dog.ageLabel ||
    dog.age_text ||
    (ageYears != null
      ? `${ageYears} year${ageYears === 1 ? "" : "s"} old`
      : "Age unknown");

  const size =
    dog.size || dog.weightRange || "Mixed size";

  const location =
    dog.location || dog.city || "Samoa";

  const temperament =
    Array.isArray(dog.temperament)
      ? dog.temperament.join(", ")
      : dog.temperament ||
        dog.personality ||
        "Friendly & loyal";

  const ageGroup = getAgeGroup(ageYears);

  const id =
    dog.id ||
    dog.slug ||
    name.toLowerCase().replace(/\s+/g, "-");

  const article = document.createElement("article");
  article.className = "dog-card";

  article.innerHTML = `
    <figure class="dog-figure">
      <img src="${imageSrc}"
           alt="${name}"
           loading="lazy">
    </figure>
    <div class="dog-body">
      <div class="dog-header">
        <h3>${name}</h3>
        <span class="dog-chip dog-chip--${ageGroup}">
          ${ageGroup[0].toUpperCase() + ageGroup.slice(1)}
        </span>
      </div>
      <p class="dog-tagline">
        ${location} • ${size}
      </p>
      <dl class="dog-meta">
        <div>
          <dt>Age</dt>
          <dd>${ageLabel}</dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>${size}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>${location}</dd>
        </div>
        <div>
          <dt>Temperament</dt>
          <dd>${temperament}</dd>
        </div>
      </dl>
      <div class="dog-actions">
        <a href="adopt.html#${encodeURIComponent(id)}"
           class="btn-secondary">
          View details
        </a>
      </div>
    </div>
  `;

  return article;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function initFeaturedDogs() {
  const grid = document.querySelector("#featured-dog-grid");
  if (!grid) return;

  grid.classList.add("dog-grid--compact");

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

    const data = await response.json();
    const allDogs = Array.isArray(data) ? data : data.dogs || [];

    if (!allDogs.length) {
      grid.innerHTML = `
        <p class="empty-state">
          No dogs are available right now. Please check back soon.
        </p>
      `;
      return;
    }

    const randomized = shuffle(allDogs);
    const count = Math.min(3, randomized.length);
    const featured = randomized.slice(0, count);

    grid.innerHTML = "";
    featured.forEach((dog) => {
      const card = createFeaturedDogCard(dog);
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading featured dogs:", err);
    grid.innerHTML = `
      <p class="error">
        We couldn't load featured dogs right now. Please try again later.
      </p>
    `;
  }
}

initFeaturedDogs();
