import { getFavorites, toggleFavorite, isFavorite } from "./storage.mjs";

const DATA_URL = "data/dogs.json";

const dogListEl = document.getElementById("dog-list");
const sizeFilterEl = document.getElementById("size-filter");
const ageFilterEl = document.getElementById("age-filter");
const showFilterEl = document.getElementById("show-filter");
const clearFiltersBtn = document.getElementById("clear-filters");

const modal = document.getElementById("dog-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("dog-modal-title");
const modalTagline = document.getElementById("modal-tagline");
const modalAge = document.getElementById("modal-age");
const modalSize = document.getElementById("modal-size");
const modalGender = document.getElementById("modal-gender");
const modalLocation = document.getElementById("modal-location");
const modalTemperament = document.getElementById("modal-temperament");
const modalGoodWith = document.getElementById("modal-good-with");
const modalDescription = document.getElementById("modal-description");
const modalFavoriteBtn = document.getElementById("modal-favorite-btn");
const modalApplyLink = document.getElementById("modal-apply-link");

let dogs = [];
let currentDogId = null;

async function fetchDogs() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching dogs:", error);
    if (dogListEl) {
      dogListEl.innerHTML =
        '<p class="error">Sorry, we could not load adoptable dogs right now.</p>';
    }
    return [];
  }
}

function ageToGroup(ageYears) {
  if (ageYears <= 1) return "puppy";
  if (ageYears <= 7) return "adult";
  return "senior";
}

function applyFilters(list) {
  const size = sizeFilterEl?.value || "all";
  const age = ageFilterEl?.value || "all";
  const show = showFilterEl?.value || "all";

  let filtered = [...list];

  if (size !== "all") {
    filtered = filtered.filter((dog) => dog.size === size);
  }

  if (age !== "all") {
    filtered = filtered.filter((dog) => ageToGroup(dog.ageYears) === age);
  }

  if (show === "favorites") {
    const favIds = getFavorites();
    filtered = filtered.filter((dog) => favIds.includes(dog.id));
  }

  filtered.sort((a, b) => a.ageYears - b.ageYears || a.name.localeCompare(b.name));

  return filtered;
}

function renderDogs(list) {
  if (!dogListEl) return;

  const filtered = applyFilters(list);

  if (!filtered.length) {
    dogListEl.innerHTML =
      '<p class="empty-state">No dogs match those filters yet. Try changing your selections.</p>';
    return;
  }

  dogListEl.innerHTML = "";

  filtered.forEach((dog) => {
    const card = document.createElement("article");
    card.className = "dog-card";
    card.dataset.id = dog.id;

    const favClass = isFavorite(dog.id) ? "is-favorite" : "";
    const ageGroup = ageToGroup(dog.ageYears);

    card.innerHTML = `
      <figure class="dog-figure">
        <img
          src="${dog.image}"
          alt="${dog.name}, a ${dog.size} ${dog.gender.toLowerCase()} dog"
          loading="lazy"
          width="320"
          height="220"
        >
      </figure>

      <div class="dog-body">
        <header class="dog-header">
          <h3>${dog.name}</h3>
          <span class="dog-chip dog-chip--${ageGroup}">
            ${ageGroup === "puppy" ? "Puppy" : ageGroup === "adult" ? "Adult" : "Senior"}
          </span>
        </header>

        <p class="dog-tagline">${dog.tagline}</p>

        <dl class="dog-meta">
          <div>
            <dt>Age</dt>
            <dd>${dog.ageYears} year${dog.ageYears === 1 ? "" : "s"}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>${dog.size.charAt(0).toUpperCase() + dog.size.slice(1)}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>${dog.gender}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>${dog.location}</dd>
          </div>
        </dl>

        <p class="dog-temperament">
          <strong>Temperament:</strong> ${dog.temperament}
        </p>

        <p class="dog-good-with">
          <strong>Good with:</strong> ${dog.goodWith.join(", ")}
        </p>

        <div class="dog-actions">
          <button
            type="button"
            class="btn-secondary dog-fav-btn ${favClass}"
            data-action="favorite"
            data-id="${dog.id}"
          >
            ${isFavorite(dog.id) ? "Saved" : "Save Favorite"}
          </button>

          <button
            type="button"
            class="btn-primary"
            data-action="details"
            data-id="${dog.id}"
          >
            View Details
          </button>
        </div>
      </div>
    `;

    dogListEl.appendChild(card);
  });
}

function openDogModal(id) {
  if (!modal) return;
  const dog = dogs.find((d) => d.id === id);
  if (!dog) return;

  currentDogId = dog.id;

  modalImg.src = dog.image;
  modalImg.alt = `${dog.name}, a dog available for adoption`;
  modalTitle.textContent = dog.name;
  modalTagline.textContent = dog.tagline;
  modalAge.textContent = `${dog.ageYears} year${dog.ageYears === 1 ? "" : "s"}`;
  modalSize.textContent = dog.size;
  modalGender.textContent = dog.gender;
  modalLocation.textContent = dog.location;
  modalTemperament.textContent = dog.temperament;
  modalGoodWith.textContent = dog.goodWith.join(", ");
  modalDescription.textContent = dog.description;

  // Favorite button
  const fav = isFavorite(dog.id);
  updateModalFavoriteButton(fav);

  // Apply link
  if (modalApplyLink) {
    modalApplyLink.href = `form.html?dog=${encodeURIComponent(dog.name)}`;
  }

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "true");
  }
}

function closeDogModal() {
  if (!modal) return;
  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
  currentDogId = null;
}

function updateModalFavoriteButton(isFav) {
  if (!modalFavoriteBtn || !currentDogId) return;
  modalFavoriteBtn.textContent = isFav ? "Saved to favorites" : "Save to favorites";
  modalFavoriteBtn.classList.toggle("is-favorite", isFav);
}

// --- Event wiring ---

document.addEventListener("DOMContentLoaded", async () => {
  dogs = await fetchDogs();
  renderDogs(dogs);

  if (sizeFilterEl) sizeFilterEl.addEventListener("change", () => renderDogs(dogs));
  if (ageFilterEl) ageFilterEl.addEventListener("change", () => renderDogs(dogs));
  if (showFilterEl) showFilterEl.addEventListener("change", () => renderDogs(dogs));

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      if (sizeFilterEl) sizeFilterEl.value = "all";
      if (ageFilterEl) ageFilterEl.value = "all";
      if (showFilterEl) showFilterEl.value = "all";
      renderDogs(dogs);
    });
  }

  if (dogListEl) {
    dogListEl.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const action = target.dataset.action;
      const id = target.dataset.id;
      if (!id || !action) return;

      if (action === "details") {
        openDogModal(id);
      }

      if (action === "favorite") {
        const nowFav = toggleFavorite(id);
        const cardBtn = dogListEl.querySelector(`button[data-action="favorite"][data-id="${id}"]`);
        if (cardBtn) {
          cardBtn.classList.toggle("is-favorite", nowFav);
          cardBtn.textContent = nowFav ? "Saved" : "Save Favorite";
        }
        if (currentDogId === id) {
          updateModalFavoriteButton(nowFav);
        }
      }
    });
  }

  modal?.querySelector("[data-close-modal]")?.addEventListener("click", closeDogModal);

  if (modal) {
    modal.addEventListener("click", (event) => {
      const rect = modal.getBoundingClientRect();
      const withinDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!withinDialog) {
        closeDogModal();
      }
    });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDogModal();
      }
    });
  }

  if (modalFavoriteBtn) {
    modalFavoriteBtn.addEventListener("click", () => {
      if (!currentDogId) return;
      const nowFav = toggleFavorite(currentDogId);
      updateModalFavoriteButton(nowFav);
      const cardBtn = dogListEl?.querySelector(
        `button[data-action="favorite"][data-id="${currentDogId}"]`
      );
      if (cardBtn) {
        cardBtn.classList.toggle("is-favorite", nowFav);
        cardBtn.textContent = nowFav ? "Saved" : "Save Favorite";
      }
    });
  }
});
