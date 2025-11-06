const DATA_URL = "data/members.json";

// DOM
const container = document.getElementById("memberContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Fetch + render
async function loadMembers() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:#b91c1c;text-align:center">Could not load members. ${err.message}</p>`;
  }
}

function renderMembers(members) {
  container.innerHTML = "";
  members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = m.name;

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.innerHTML = `
      <span><strong>Address:</strong> ${m.address}</span>
      <span><strong>Phone:</strong> ${m.phone}</span>
      <span><strong>Website:</strong> <a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></span>
      <span><strong>Level:</strong> ${["Member","Silver","Gold"][m.membershipLevel-1] || "Member"}</span>
    `;

    const img = document.createElement("img");
    img.src = `images/${m.image}`;
    img.alt = `${m.name} logo`;
    img.loading = "lazy";
    img.width = 320; img.height = 180;

    card.append(h2, meta, img);
    container.append(card);
  });
}

// View toggles
function setGrid() {
  container.classList.remove("list");
  container.classList.add("grid");
  gridBtn.classList.add("is-active"); gridBtn.setAttribute("aria-pressed","true");
  listBtn.classList.remove("is-active"); listBtn.setAttribute("aria-pressed","false");
}
function setList() {
  container.classList.remove("grid");
  container.classList.add("list");
  listBtn.classList.add("is-active"); listBtn.setAttribute("aria-pressed","true");
  gridBtn.classList.remove("is-active"); gridBtn.setAttribute("aria-pressed","false");
}

gridBtn?.addEventListener("click", setGrid);
listBtn?.addEventListener("click", setList);

// Start
setGrid();
loadMembers();
