const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

const darkModeBtn = document.getElementById("darkMode");
if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

async function displayMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Error loading JSON file");
    }
    const businesses = await response.json();
    const ul = document.getElementById("business-list");

    if (!ul) return;

    ul.innerHTML = "";

    businesses.forEach((business) => {
      const li = document.createElement("li");
      li.classList.add("members_box");
      li.innerHTML = `
                <div>
                    <img class="members-img" src="${business.image}" alt="${business.name}" loading="lazy">
                </div>
                <strong>${business.name}</strong>
                <p class="membership-level">Membership Level: ${business.membershipLevel}</p>
                <p class="description"><em>${business.description}</em></p>
                <p>Address: ${business.address}</p>
                <p>Phone: ${business.phone}</p>
                <p class="website-text">Website: <a class="cards-url" href="${business.website}" target="_blank" rel="noopener noreferrer">Visit</a></p>
            `;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
    const ul = document.getElementById("business-list");
    if (ul) {
      ul.innerHTML = "<li>Error loading data.</li>";
    }
  }
}

async function displaySpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Error loading JSON file");
    }
    const businesses = await response.json();
    const container = document.getElementById("spotlights-container");

    if (!container) return;

    const qualifiedMembers = businesses.filter(
      (business) =>
        business.membershipLevel === 2 || business.membershipLevel === 3,
    );

    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffled = shuffleArray(qualifiedMembers);
    const selected = shuffled.slice(0, 3);

    container.innerHTML = "";

    selected.forEach((business) => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      const membershipType = business.membershipLevel === 3 ? "Gold" : "Silver";

      card.innerHTML = `
        <div class="spotlight-header">
          <img src="${business.image}" alt="${business.name}" class="spotlight-img" width="80" height="80" loading="lazy">
          <div class="spotlight-info">
            <h3>${business.name}</h3>
            <p class="spotlight-membership">${membershipType} Member</p>
          </div>
        </div>
        <p class="spotlight-description">${business.description}</p>
        <div class="spotlight-contact">
          <p>${business.phone}</p>
          <p>${business.address}</p>
          <p><a href="${business.website}" target="_blank" rel="noopener noreferrer">Visit Website →</a></p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
    const container = document.getElementById("spotlights-container");
    if (container) {
      container.innerHTML = "<p>Error loading spotlights.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const businessList = document.getElementById("business-list");
  const spotlightsContainer = document.getElementById("spotlights-container");

  if (businessList) {
    displayMembers();

    const btn = document.querySelector(".list-layout-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        businessList.classList.toggle("list-layout");
        businessList.classList.toggle("no-margin");
      });
    }
  }

  if (spotlightsContainer) {
    displaySpotlights();
  }
});
