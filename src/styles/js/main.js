document.addEventListener('DOMContentLoaded', function () {
    
    const grid = document.querySelector(".grid");
    const title = document.querySelector(".title");
    const date = new Date();
    const annee = date.getFullYear();
    const mois = date.getMonth();
    const jour = date.getDate();
    const tstp01jan = new Date(annee, 0, 0).getTime();
    const tstpNow = date.getTime();
    const msInDay = 86400000;
    const msInHour = 3600000;
    const DaysInWeek = 7;
    const HoursInDay = 24;
    const desc = document.querySelector('.desc');


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

    function getHoursBetween(timestampDateFin, timestampDateDebut) {
        return(Math.floor((timestampDateFin - timestampDateDebut) / msInHour))
    }

    function clear(element) {
        element.innerHTML = '';
        marked = false;
        desc.textContent = "Click on a case to mark it !";
    }

    function loadYear() {

        clear(grid);
        let varDate = new Date(annee, 0, 1);
        for(let i=1; i<=getNbJoursInYear(annee); i++) {
            grid.innerHTML += `<div title="${varDate.toLocaleString('en-US', { dateStyle: 'short' })}" class="item" id="u"></div>`;
            varDate.setDate(varDate.getDate()+1);
        }
        
        title.textContent = annee;
        
        for (let i = 1; i <= getJoursPasses(tstpNow, tstp01jan); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
        }
        
        document.querySelector(`.grid :nth-child(${getJoursPasses(tstpNow, tstp01jan)})`).style.backgroundColor = '#00aa00';

    }

    function loadMonth() {

        clear(grid);
        let varDate = new Date(annee, mois, 1);
        for(let i=1; i<=getNbJoursInMonth(mois); i++) {
            grid.innerHTML += `<div title="${varDate.toLocaleString('en-US', { dateStyle: 'medium' })}" class="item"></div>`;
            varDate.setDate(varDate.getDate()+1);
        }
        title.textContent = date.toLocaleString('en-US', { month: 'long'});
        const tstp01mois = new Date(annee, mois, 0).getTime();

        for (let i = 1; i <= getJoursPasses(tstpNow, tstp01mois); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
            document.querySelector(`.grid :nth-child(${getJoursPasses(tstpNow, tstp01mois)})`).style.backgroundColor = '#00aa00';
        }
    }

    function loadWeek() {

        clear(grid);
        let varDate = new Date(annee, mois, jour);
        while(varDate.getDay()!=1) varDate.setDate(varDate.getDate()-1);
        console.log(varDate.getDate())
        for(let i=1; i<=DaysInWeek; i++) {
            grid.innerHTML += `<div title="${varDate.toLocaleString('en-US', { dateStyle: 'long' })}" class="item"></div>`;
            varDate.setDate(varDate.getDate()+1);
        }
        title.textContent = `Week`;

        for (let i = 1; i <= date.getDay(); i++) {
            document.querySelector(`.grid :nth-child(${i})`).style.backgroundColor = '#cfcfcf';
            document.querySelector(`.grid :nth-child(${date.getDay()})`).style.backgroundColor = '#00aa00';
        }

    }

    function loadDay() {

        clear(grid);
        let varDate = new Date();
        varDate.setHours(1);
        for(let i=1; i<=HoursInDay; i++) {
            grid.innerHTML += `<div title="${varDate.toLocaleString('en-US', { hour: '2-digit' })}" class="item"></div>`;
            varDate.setHours(varDate.getHours()+1);
        }
        title.textContent = date.toLocaleString('en-US', { dateStyle: 'full' });

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
    
    
    let preced;
    let marked = false;

    grid.addEventListener('click', function (event) {
        if (event.target.classList.contains('item') && event.target.style.backgroundColor != 'rgb(207, 207, 207)' && event.target.style.backgroundColor != 'rgb(0, 170, 0)') {
            if(event.target.style.backgroundColor == 'red') {
                event.target.style.backgroundColor = preced;
                marked = false;
                desc.textContent = "Click on a case to mark it !"
            }
            else if(!marked) {
                preced = event.target.style.backgroundColor;
                if(!preced) preced = '#414141'
                event.target.style.backgroundColor = 'red';
                marked = true;
                let markedDate = new Date(event.target.title)
                let diff = getJoursPasses(markedDate, date);
                let unit = 'days';
                if(diff < 1) {
                    console.log(markedDate, diff, unit);
                    diff = getHoursBetween(markedDate, date);
                    unit = 'hours';
                }
                desc.textContent = `Marked case is in ${diff} ${unit} !`
            }
        }
    });

    
    
    
    
    loadYear();
});
