document.addEventListener('DOMContentLoaded', function () {
    
    const grid = document.querySelector(".grid");
    const title = document.querySelector(".title");
    const date = new Date();
    const annee = date.getFullYear();
    const mois = date.getMonth();
    const tstp01jan = new Date(annee, 0, 0).getTime();
    const tstpNow = date.getTime();
    const msInDay = 86400000;
    const DaysInWeek = 7;
    const HoursInDay = 24;


    function getNbJoursInYear(annee) {
        if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
            return 366;
        }
        else {
            return 365;
        }
    }

    function getNbJoursInMonth(mois) {
        let varDate = new Date();
        varDate.setDate(1);
        varDate.setMonth(mois + 1);
        varDate.setDate(varDate.getDate() - 1);
        return varDate.getDate();
    }

    function getJoursPasses(timestampDateFin, timestampDateDebut) {
        return(Math.floor((timestampDateFin - timestampDateDebut) / msInDay))
    }

    function clear(element) {
        element.innerHTML = '';
    }

    function loadYear() {

        clear(grid);
        for(let i=1; i<=getNbJoursInYear(annee); i++) {
            grid.innerHTML += '<div class="item"></div>';
        }
        
        title.textContent = annee;
        
        for (let i = 1; i <= getJoursPasses(tstpNow, tstp01jan); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
        }
        
        document.querySelector(`.grid :nth-child(${getJoursPasses(tstpNow, tstp01jan)})`).style.backgroundColor = '#00aa00';

    }

    function loadMonth() {

        clear(grid);
        for(let i=1; i<=getNbJoursInMonth(mois); i++) {
            grid.innerHTML += '<div class="item"></div>';
        }
        title.textContent = date.toLocaleString('en-EN', { month: 'long'});
        const tstp01mois = new Date(annee, mois, 0).getTime();

        for (let i = 1; i <= getJoursPasses(tstpNow, tstp01mois); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
            document.querySelector(`.grid :nth-child(${getJoursPasses(tstpNow, tstp01mois)})`).style.backgroundColor = '#00aa00';
        }
    }

    function loadWeek() {

        clear(grid);
        for(let i=1; i<=DaysInWeek; i++) {
            grid.innerHTML += '<div class="item"></div>';
        }
        title.textContent = `Week`;

        for (let i = 1; i <= date.getDay(); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
            document.querySelector(`.grid :nth-child(${date.getDay()})`).style.backgroundColor = '#00aa00';
        }

    }

    function loadDay() {

        clear(grid);
        for(let i=1; i<=HoursInDay; i++) {
            grid.innerHTML += '<div class="item"></div>';
        }
        title.textContent = `${date.getDate()}/${date.getDay()}/${date.getFullYear()}`;

        for (let i = 1; i <= date.getHours(); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
            document.querySelector(`.grid :nth-child(${date.getHours()})`).style.backgroundColor = '#00aa00';
        }

    }


    const year = document.getElementById('year');
    const month = document.getElementById('month');
    const week = document.getElementById('week');
    const day = document.getElementById('day');
    
    year.addEventListener('change', function () {
        if(year.checked) loadYear();
    });

    month.addEventListener('change', function () {
        if(month.checked) loadMonth();
    });

    week.addEventListener('change', function () {
        if(week.checked) loadWeek();
    })

    day.addEventListener('change', function () {
        if(day.checked) loadDay();
    })
    loadYear();

});
