const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    // console.table(
        // data.prophets.map((p) => ({
        // name: `${p.name} ${p.lastname}`,
        // birthplace: p.birthplace,
        // birthdate: p.birthdate,
        // order: p.order
        // }))
    // );

    displayProphets(data.prophets);
  } catch (err) {
    console.error('Fetch failed:', err);
    cards.innerHTML = `<p style="color:#b91c1c;text-align:center">Couldn’t load prophet data. ${err.message}</p>`;
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const details = document.createElement('p');
    const portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    details.innerHTML = `
      Date of Birth: ${prophet.birthdate}<br>
      Place of Birth: ${prophet.birthplace}
    `;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} — Latter-day Prophet #${prophet.order}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(details);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

getProphetData();