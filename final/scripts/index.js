const poems = [
  "In your eyes, I found my home; in your heart, I found my love.",
  "Every love story is beautiful, but ours is my favorite.",
  "I loved you yesterday, I love you still. I always have, I always will.",
  "You are my today and all of my tomorrows.",
  "If I had a flower for every time you made me smile, I'd have an endless garden.",
  "I carry your heart with me — I carry it in my heart.",
  "You don't love someone for their looks, but because they sing a song only you can hear.",
  "The best thing to hold onto in life is each other.",
  "Love is not about how many days you've been together; it's about how much you love each other every single day.",
  "Wherever you are is my home, my only home."
];

function initPoemsCarousel() {
  const poemText = document.getElementById('poemText');
  const prevBtn = document.getElementById('poemPrev');
  const nextBtn = document.getElementById('poemNext');

  if (!poemText || !prevBtn || !nextBtn) return;

  let currentPoem = 0;

  const displayPoem = (index) => {
    poemText.style.opacity = '0';
    setTimeout(() => {
      poemText.textContent = `"${poems[index]}"`;
      poemText.style.opacity = '1';
    }, 200);
  };

  // Show first poem
  displayPoem(currentPoem);

  prevBtn.addEventListener('click', () => {
    currentPoem = (currentPoem - 1 + poems.length) % poems.length;
    displayPoem(currentPoem);
  });

  nextBtn.addEventListener('click', () => {
    currentPoem = (currentPoem + 1) % poems.length;
    displayPoem(currentPoem);
  });
}

function initHeroSlideshow() {
  const heroImg = document.getElementById('heroImage');
  if (!heroImg) return;

  const heroImages = [
    'images/hero/hero-1.jpg',
    'images/hero/hero-2.jpg',
    'images/hero/hero-3.jpg',
    'images/hero/hero-4.jpg',
    'images/hero/hero-5.jpg'
  ];

  let currentImage = 0;

  setInterval(() => {
    currentImage = (currentImage + 1) % heroImages.length;
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = heroImages[currentImage];
      heroImg.style.opacity = '1';
    }, 400);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  initPoemsCarousel();
  initHeroSlideshow();
});
