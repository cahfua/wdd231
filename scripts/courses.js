const courses = [
{ code: 'WDD130', title: 'Web Fundamentals', credits: 2, subject: 'WDD', completed: true },
{ code: 'WDD131', title: 'Dynamic Web Fundamentals', credits: 2, subject: 'WDD', completed: true },
{ code: 'CSE110', title: 'Intro to Programming', credits: 2, subject: 'CSE', completed: true },
{ code: 'CSE111', title: 'Programming with Functions', credits: 2, subject: 'CSE', completed: true },
{ code: 'CSE210', title: 'Programming with Classes', credits: 3, subject: 'CSE', completed: true },
{ code: 'WDD231', title: 'Web Frontend Development I', credits: 3, subject: 'WDD', completed: false },
];


const grid = document.getElementById('courseGrid');
const totalOut = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filters .chip');


function render(list){
grid.innerHTML = '';
list.forEach(c => {
const card = document.createElement('article');
card.className = 'course' + (c.completed ? ' completed' : '');


const h3 = document.createElement('h3');
h3.textContent = `${c.code} — ${c.title}`;


const badge = document.createElement('span');
badge.className = 'badge';
badge.textContent = `${c.credits} cr`;
h3.appendChild(badge);


const meta = document.createElement('p');
meta.className = 'muted';
meta.textContent = `${c.subject}${c.completed ? ' • Completed' : ''}`;


card.append(h3, meta);
grid.appendChild(card);
});


const total = list.reduce((sum,c) => sum + c.credits, 0);
totalOut.textContent = total;
}


function applyFilter(kind){
let list = courses;
if (kind === 'WDD' || kind === 'CSE') list = courses.filter(c => c.subject === kind);
render(list);
}


// Init
render(courses);


// Filter UI
filterButtons.forEach(btn => {
btn.addEventListener('click', () => {
filterButtons.forEach(b => b.classList.remove('is-active'));
btn.classList.add('is-active');
applyFilter(btn.dataset.filter);
});
});