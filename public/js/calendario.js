// Obtém o container
const calendarEl = document.getElementById("calendar");

// Data atual
let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1).getDay();

    // Último dia
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Meses por extenso
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    calendarEl.innerHTML = `
        <div class="calendar-header">
            <button id="prev" class="btn btn-sm btn-outline-primary">&lt;</button>
            <h4>${monthNames[month]} ${year}</h4>
            <button id="next" class="btn btn-sm btn-outline-primary">&gt;</button>
        </div>

        <div class="calendar-grid fw-semibold text-secondary">
            <div>Su</div> <div>Mo</div> <div>Tu</div> <div>We</div>
            <div>Th</div> <div>Fr</div> <div>Sa</div>
        </div>

        <div id="days" class="calendar-grid mt-2"></div>
    `;

    const daysEl = document.getElementById("days");

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
        daysEl.innerHTML += `<div></div>`;
    }

    // Dias do mês
    for (let day = 1; day <= lastDay; day++) {
        const div = document.createElement("div");
        div.textContent = day;
        div.classList.add("calendar-day");

        div.addEventListener("click", () => {
            document.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("selected-day"));
            div.classList.add("selected-day");
            selectedDate = `${day}/${month + 1}/${year}`;
        });

        daysEl.appendChild(div);
    }

    // Navegação
    document.getElementById("prev").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    };
    document.getElementById("next").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    };
}

renderCalendar();

// Confirmar agendamento
document.getElementById("confirmar").addEventListener("click", () => {
    const servico = document.getElementById("servico").value;
    const horario = document.getElementById("horario").value;

    if (!selectedDate) {
        alert("Selecione uma data no calendário!");
        return;
    }

    if (!horario) {
        alert("Selecione um horário!");
        return;
    }

    alert(`Serviço: ${servico}\nData: ${selectedDate}\nHorário: ${horario}`);
});
