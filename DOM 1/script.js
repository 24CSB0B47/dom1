// Theme Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.className = currentTheme;
}
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.className = 'dark-mode';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.className = 'light-mode';
        localStorage.setItem('theme', 'light-mode');
    }
});

// Countdown Timer
let countdown;
let timeLeft;
const timerDisplay = document.getElementById('timer');

document.getElementById('start').addEventListener('click', () => {
    timeLeft = parseInt(document.getElementById('seconds').value);
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid number greater than 0.");
        return;
    }
    startTimer();
});

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(countdown);
});

document.getElementById('resume').addEventListener('click', () => {
    startTimer();
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(countdown);
    timerDisplay.textContent = '0';
    timerDisplay.style.backgroundColor = 'white';
});

function startTimer() {
    clearInterval(countdown);
    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = 'Time is up!';
            return;
        }
        timerDisplay.textContent = timeLeft;
        changeColor(timeLeft);
        timeLeft--;
    }, 1000);
}

function changeColor(seconds) {
    if (seconds > 10) {
    timerDisplay.style.backgroundColor = 'red'; // Changed from green to red

    } else if (seconds > 5) {
        timerDisplay.style.backgroundColor = 'yellow';
    } else {
        timerDisplay.style.backgroundColor = 'green'; // Changed from red to green

    }
}

// Change Style of an HTML Element
document.getElementById('changeStyle').addEventListener('click', () => {
    const styledElement = document.getElementById('styledElement');
    styledElement.style.backgroundColor = styledElement.style.backgroundColor === 'lightblue' ? 'lightcoral' : 'lightblue';
});

// Sorting and Filtering
const itemList = document.getElementById('itemList');
document.getElementById('addItem').addEventListener('click', () => {
    const newItem = prompt("Enter item:");
    if (newItem) {
        const li = document.createElement('li');
        li.textContent = newItem;
        itemList.appendChild(li);
    }
});

document.getElementById('filterInput').addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    const items = itemList.getElementsByTagName('li');
    Array.from(items).forEach(item => {
        if (item.textContent.toLowerCase().includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

document.getElementById('sortItems').addEventListener('click', () => {
    const items = Array.from(itemList.getElementsByTagName('li'));
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    itemList.innerHTML = '';
    items.forEach(item => itemList.appendChild(item));
});

// Dynamic Table
document.getElementById('addRow').addEventListener('click', () => {
    const input = document.getElementById('tableInput').value;
    if (input) {
        const tableBody = document.querySelector('#dataTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${input}</td><td><button class="deleteRow">Delete</button></td>`;
        tableBody.appendChild(row);
        document.getElementById('tableInput').value = '';
    }
});

// Delete Row from Table
document.querySelector('#dataTable tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteRow')) {
        e.target.closest('tr').remove();
    }
});

// Interactive Image Gallery
const images = document.querySelectorAll('#imageGallery img');
const largeImage = document.getElementById('largeImage');
const displayedImage = document.getElementById('displayedImage');

images.forEach(image => {
    image.addEventListener('click', () => {
        displayedImage.src = image.src;
        largeImage.style.display = 'block';
        
        // Add zoom effect
        displayedImage.classList.add('zoomed');
        
        // Remove zoom effect after a short delay
        setTimeout(() => {
            displayedImage.classList.remove('zoomed');
        }, 300); // Match this duration with the CSS transition duration
    });
});

// Notification Function
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500); // Match this duration with the CSS transition duration
    }, 3000);
}
