import discoverItems from '../data/discover.mjs';

function displayVisitMessage() {
  const messageElement = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    messageElement.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const lastVisitTime = parseInt(lastVisit);
    const timeDifference = now - lastVisitTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (timeDifference < 86400000) {
      messageElement.textContent = 'Back so soon! Awesome!';
    } else {
      if (daysDifference === 1) {
        messageElement.textContent = 'You last visited 1 day ago.';
      } else {
        messageElement.textContent = `You last visited ${daysDifference} days ago.`;
      }
    }
  }

  localStorage.setItem('lastVisit', now.toString());
}

function createDiscoverCards() {
  const container = document.getElementById('discover-cards');
  
  discoverItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'discover-card';

    const title = document.createElement('h2');
    title.textContent = item.name;

    const figure = document.createElement('figure');
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.loading = 'lazy';
    img.decoding = 'async';

    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = item.address;

    const description = document.createElement('p');
    description.textContent = item.description;

    const button = document.createElement('button');
    button.textContent = 'Learn More';
    button.className = 'learn-more-btn';

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayVisitMessage();
  createDiscoverCards();
});
