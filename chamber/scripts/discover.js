import { places } from "../data/places.mjs";

// ---- build the 8 cards for discover.html ----
const grid = document.querySelector(".discover-grid");

function createPlaceCard(place, index) {
  const card = document.createElement("article");
  card.classList.add("discover-card", `card${index + 1}`);

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.alt;
  img.loading = "lazy";
  figure.appendChild(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const desc = document.createElement("p");
  desc.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn More";

  card.append(title, figure, address, desc, button);
  return card;
}

if (grid) {
  places.forEach((place, index) => {
    const card = createPlaceCard(place, index);
    grid.appendChild(card);
  });
}

// ---- localStorage last-visit message ----
const visitMessage = document.querySelector("#visit-message");
const STORAGE_KEY = "discover-last-visit";
const now = Date.now();
const lastVisit = Number(localStorage.getItem(STORAGE_KEY));

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const diffMs = now - lastVisit;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    message = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${diffDays} days ago.`;
  }
}

if (visitMessage) {
  visitMessage.textContent = message;
}

localStorage.setItem(STORAGE_KEY, String(now));
