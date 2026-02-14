let allGifts = [];

async function fetchGifts() {
  try {
    const response = await fetch('data/gifts.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    allGifts = await response.json();
    displayGifts(allGifts);
    initFilters();
  } catch (error) {
    console.error('Error fetching gifts:', error);
    const grid = document.getElementById('giftsGrid');
    if (grid) {
      grid.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1; padding: 3rem;">Unable to load gifts. Please try again later.</p>`;
    }
  }
}

function getFavorites() {
  const stored = localStorage.getItem('kaiyaFavorites');
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem('kaiyaFavorites', JSON.stringify(favorites));
}

function toggleFavorite(giftId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(giftId);

  if (index === -1) {
    favorites.push(giftId);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  return favorites.includes(giftId);
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function displayGifts(gifts) {
  const grid = document.getElementById('giftsGrid');
  if (!grid) return;

  const favorites = getFavorites();

  // Use map to create card HTML, then join with template literals
  grid.innerHTML = gifts.map(gift => {
    const isFav = favorites.includes(gift.id);
    return `
      <article class="gift-card" data-id="${gift.id}">
        <figure>
          <img src="${gift.image}" alt="${gift.name}" loading="lazy" decoding="async" />
          ${gift.featured ? '<span class="card-badge">Featured</span>' : ''}
        </figure>
        <div class="gift-card-info">
          <p class="card-category">${gift.category}</p>
          <h3>${gift.name}</h3>
          <p class="card-rating">${generateStars(gift.rating)} ${gift.rating}</p>
          <p class="card-price">$${gift.price.toFixed(2)}</p>
        </div>
        <div class="card-actions">
          <button class="view-btn" data-id="${gift.id}">View Details</button>
          <button class="fav-toggle ${isFav ? 'saved' : ''}" data-id="${gift.id}" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
            ${isFav ? '&#10084;' : '&#9825;'}
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach event listeners
  grid.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      openModal(id);
    });
  });

  grid.querySelectorAll('.gift-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openModal(id);
    });
  });

  grid.querySelectorAll('.fav-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const isSaved = toggleFavorite(id);
      btn.classList.toggle('saved', isSaved);
      btn.innerHTML = isSaved ? '&#10084;' : '&#9825;';
      btn.setAttribute('aria-label', isSaved ? 'Remove from favorites' : 'Add to favorites');
    });
  });
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      // Use filter array method
      const filtered = category === 'all'
        ? allGifts
        : allGifts.filter(gift => gift.category === category);

      displayGifts(filtered);
    });
  });
}

function openModal(giftId) {
  const gift = allGifts.find(g => g.id === giftId);
  if (!gift) return;

  const modal = document.getElementById('giftModal');
  const favorites = getFavorites();
  const isFav = favorites.includes(gift.id);

  document.getElementById('modalImg').src = gift.image;
  document.getElementById('modalImg').alt = gift.name;
  document.getElementById('modalTitle').textContent = gift.name;
  document.getElementById('modalCategory').textContent = gift.category;
  document.getElementById('modalStars').textContent = generateStars(gift.rating);
  document.getElementById('modalRating').textContent = `(${gift.rating}/5)`;
  document.getElementById('modalDesc').textContent = gift.description;
  document.getElementById('modalPrice').textContent = `$${gift.price.toFixed(2)}`;

  const favBtn = document.getElementById('modalFavBtn');
  favBtn.className = `fav-btn ${isFav ? 'saved' : ''}`;
  favBtn.innerHTML = isFav
    ? '<span class="heart-icon">&#10084;</span> Saved to Favorites'
    : '<span class="heart-icon">&#9825;</span> Add to Favorites';

  // Remove old listener and add new
  const newFavBtn = favBtn.cloneNode(true);
  favBtn.parentNode.replaceChild(newFavBtn, favBtn);
  newFavBtn.id = 'modalFavBtn';

  newFavBtn.addEventListener('click', () => {
    const saved = toggleFavorite(gift.id);
    newFavBtn.className = `fav-btn ${saved ? 'saved' : ''}`;
    newFavBtn.innerHTML = saved
      ? '<span class="heart-icon">&#10084;</span> Saved to Favorites'
      : '<span class="heart-icon">&#9825;</span> Add to Favorites';

    // Update the card grid button too
    const cardBtn = document.querySelector(`.fav-toggle[data-id="${gift.id}"]`);
    if (cardBtn) {
      cardBtn.classList.toggle('saved', saved);
      cardBtn.innerHTML = saved ? '&#10084;' : '&#9825;';
    }
  });

  modal.showModal();
}

function initModalClose() {
  const modal = document.getElementById('giftModal');
  const closeBtn = document.getElementById('modalClose');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGifts();
  initModalClose();
});
