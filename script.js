// Calendar State
let currentDate = new Date();
let selectedDate = null;
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

// DOM Elements
const calendarDays = document.getElementById('calendarDays');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const todayBtn = document.getElementById('todayBtn');
const eventModal = document.getElementById('eventModal');
const modalDate = document.getElementById('modalDate');
const eventInput = document.getElementById('eventInput');
const addEventBtn = document.getElementById('addEventBtn');
const eventList = document.getElementById('eventList');
const closeModalBtn = document.getElementById('closeModal');

// Month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Initialize Calendar
function init() {
    renderCalendar();
    attachEventListeners();
}

// Attach Event Listeners
function attachEventListeners() {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    closeModalBtn.addEventListener('click', closeModal);
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    addEventBtn.addEventListener('click', addEvent);
    eventInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addEvent();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    calendarDays.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    calendarDays.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next month
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                // Swipe right - previous month
                currentDate.setMonth(currentDate.getMonth() - 1);
            }
            renderCalendar();
        }
    }
}

// Render Calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update header
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Clear previous days
    calendarDays.innerHTML = '';

    // Today's date for comparison
    const today = new Date();
    const todayString = formatDateKey(today);

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayEl = createDayElement(day, 'other-month');
        calendarDays.appendChild(dayEl);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = formatDateKey(new Date(year, month, day));
        const classes = [];

        if (dateKey === todayString) {
            classes.push('today');
        }

        if (selectedDate && dateKey === formatDateKey(selectedDate)) {
            classes.push('selected');
        }

        if (events[dateKey] && events[dateKey].length > 0) {
            classes.push('has-event');
        }

        const dayEl = createDayElement(day, classes.join(' '), true, new Date(year, month, day));
        calendarDays.appendChild(dayEl);
    }

    // Next month days
    const totalCells = 42; // 6 rows x 7 days
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const dayEl = createDayElement(day, 'other-month');
        calendarDays.appendChild(dayEl);
    }
}

// Create Day Element
function createDayElement(day, className = '', isCurrentMonth = false, date = null) {
    const dayEl = document.createElement('div');
    dayEl.className = `day ${className}`.trim();
    dayEl.textContent = day;

    if (isCurrentMonth && date) {
        dayEl.addEventListener('click', () => {
            selectedDate = date;
            openModal(date);
            renderCalendar();
        });
    }

    return dayEl;
}

// Format date as key for events storage
function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date for display
function formatDateDisplay(date) {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Open Modal
function openModal(date) {
    modalDate.textContent = formatDateDisplay(date);
    eventModal.classList.add('active');
    renderEvents(date);
    eventInput.focus();
}

// Close Modal
function closeModal() {
    eventModal.classList.remove('active');
    eventInput.value = '';
}

// Add Event
function addEvent() {
    const eventText = eventInput.value.trim();
    if (!eventText || !selectedDate) return;

    const dateKey = formatDateKey(selectedDate);

    if (!events[dateKey]) {
        events[dateKey] = [];
    }

    events[dateKey].push({
        id: Date.now(),
        text: eventText
    });

    saveEvents();
    renderEvents(selectedDate);
    renderCalendar();
    eventInput.value = '';
}

// Delete Event
function deleteEvent(dateKey, eventId) {
    events[dateKey] = events[dateKey].filter(event => event.id !== eventId);

    if (events[dateKey].length === 0) {
        delete events[dateKey];
    }

    saveEvents();
    renderEvents(selectedDate);
    renderCalendar();
}

// Render Events List
function renderEvents(date) {
    const dateKey = formatDateKey(date);
    const dateEvents = events[dateKey] || [];

    if (dateEvents.length === 0) {
        eventList.innerHTML = '<li class="no-events">No events for this day</li>';
        return;
    }

    eventList.innerHTML = dateEvents.map(event => `
        <li class="event-item">
            <span>${escapeHtml(event.text)}</span>
            <button class="delete-event-btn" onclick="deleteEvent('${dateKey}', ${event.id})" aria-label="Delete event">
                &times;
            </button>
        </li>
    `).join('');
}

// Save Events to LocalStorage
function saveEvents() {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
init();
