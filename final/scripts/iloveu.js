function getFavorites() {
  const stored = localStorage.getItem('kaiyaFavorites');
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem('kaiyaFavorites', JSON.stringify(favorites));
}

async function displayFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const emptyMsg = document.getElementById('emptyMessage');
  if (!grid) return;

  const favoriteIds = getFavorites();

  if (favoriteIds.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  // Fetch all gifts to get full data
  try {
    const response = await fetch('data/gifts.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const allGifts = await response.json();

    // Use filter to get only favorites, then forEach to display
    const favorites = allGifts.filter(gift => favoriteIds.includes(gift.id));

    if (favorites.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    // Use template literals and map to build HTML
    grid.innerHTML = favorites.map(gift => `
      <article class="fav-card" data-id="${gift.id}">
        <img src="${gift.image}" alt="${gift.name}" loading="lazy" decoding="async" />
        <div class="fav-card-info">
          <h3>${gift.name}</h3>
          <p class="fav-price">$${gift.price.toFixed(2)}</p>
        </div>
        <button class="remove-fav" data-id="${gift.id}" aria-label="Remove ${gift.name} from favorites">&times;</button>
      </article>
    `).join('');

    // Attach remove event listeners
    grid.querySelectorAll('.remove-fav').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        removeFavorite(id);
      });
    });

  } catch (error) {
    console.error('Error loading favorites:', error);
  }
}

function removeFavorite(giftId) {
  let favorites = getFavorites();
  favorites = favorites.filter(id => id !== giftId);
  saveFavorites(favorites);

  // Re-render with animation
  const card = document.querySelector(`.fav-card[data-id="${giftId}"]`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    setTimeout(() => displayFavorites(), 300);
  }
}

function initForm() {
  const form = document.getElementById('wishlistForm');
  if (!form) return;

  // Save form submission timestamp in localStorage
  form.addEventListener('submit', () => {
    localStorage.setItem('kaiyaFormTimestamp', Date.now().toString());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayFavorites();
  initForm();
});
