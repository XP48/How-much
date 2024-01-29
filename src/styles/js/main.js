const grid = document.querySelector(".grid");
const title = document.querySelector(".year");
const date = new Date();
const annee = date.getFullYear();
const nbjours = getNbJours(annee);
const mois = date.getMonth();
const tstp01jan = new Date(annee, 0, 1).getTime();
const tstpNow = date.getTime();
const msInDay = 86400000;


function getNbJours(annee) {
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return 366;
    }
    else {
        return 365;
    }
}

function getJoursPasses(timestampDateFin) {
    return(Math.floor((timestampDateFin - tstp01jan) / msInDay))
}


for(let i=0; i<=nbjours; i++) {
    grid.innerHTML += '<div class="item"></div>';
}

title.textContent = annee;

for (let i = 1; i <= getJoursPasses(tstpNow); i++) {
    document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#dbdbdb';
}

document.querySelector(`.grid :nth-child(${getJoursPasses(tstpNow)})`).style.backgroundColor = 'green';

document.addEventListener('DOMContentLoaded', function () {
    const pickadate = document.getElementById('pickadate');

    pickadate.addEventListener('change', function () {
      const dateValue = pickadate.value;
      const markedDate = new Date(dateValue);
      const tstpMarkedDate = markedDate.getTime();
      document.querySelector(`.grid :nth-child(${getJoursPasses(tstpMarkedDate)})`).style.backgroundColor = 'red';      
    });
  });