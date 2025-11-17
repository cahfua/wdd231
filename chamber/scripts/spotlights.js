const MEMBERS_URL = "data/members.json";

function levelLabel(level) {
  return ["Member", "Silver", "Gold"][level - 1] || "Member";
}

async function loadSpotlights() {
  try {
    const res = await fetch(MEMBERS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    const eligible = members.filter((m) => m.membershipLevel === 2 || m.membershipLevel === 3);

    const shuffled = [...eligible].sort(() => Math.random() - 0.5);

    const count = Math.min(3, Math.max(2, shuffled.length));
    const selected = shuffled.slice(0, count);

    renderSpotlights(selected);
  } catch (err) {
    console.error("Error loading spotlights:", err);
  }
}

function renderSpotlights(members) {
  const container = document.getElementById("spotlightContainer");
  if (!container) return;

  container.innerHTML = "";

  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "spotlight";

    card.innerHTML = `
      <img
        src="images/${m.image}"
        alt="${m.name} logo"
        loading="lazy"
        width="160"
        height="160"
      />
      <div class="spotlight-body">
        <h3>${m.name}</h3>
        <p class="spotlight-level">${levelLabel(m.membershipLevel)} Member</p>
        <p class="spotlight-address">${m.address}</p>
        <p class="spotlight-phone">${m.phone}</p>
        <p class="spotlight-site">
          <a href="${m.website}" target="_blank" rel="noopener">
            Visit website
          </a>
        </p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadSpotlights);