const NEWS_API_KEY = "6bc3410f630a447cb95998e6c1f6fcad";

function getDateRange() {
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    from: formatDate(threeDaysAgo),
    to: formatDate(today),
  };
}

const dateRange = getDateRange();
const NEWS_URL = `https://newsapi.org/v2/everything?q=México OR negocios OR empresas&language=es&from=${dateRange.from}&to=${dateRange.to}&sortBy=publishedAt&pageSize=3&apiKey=${NEWS_API_KEY}`;

async function displayEvents() {
  try {
    const response = await fetch(NEWS_URL);
    if (!response.ok) {
      throw new Error("News data not available");
    }

    const data = await response.json();

    const eventsContainer = document.getElementById("events-list");

    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    const articles = data.articles.slice(0, 3);

    articles.forEach((article, index) => {
      const eventItem = document.createElement("div");
      eventItem.classList.add("event-item");

      const date = new Date(article.publishedAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let dateLabel;
      if (date.toDateString() === today.toDateString()) {
        dateLabel = date.toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateLabel = "Ayer";
      } else {
        dateLabel = date.toLocaleDateString("es-MX", {
          month: "short",
          day: "numeric",
        });
      }

      const shortTitle =
        article.title.length > 60
          ? article.title.substring(0, 60) + "..."
          : article.title;

      eventItem.innerHTML = `
        <p class="event-date">${dateLabel}</p>
        <p class="event-title"><a href="${article.url}" target="_blank" rel="noopener noreferrer">${shortTitle}</a></p>
      `;

      eventsContainer.appendChild(eventItem);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    const eventsContainer = document.getElementById("events-list");
    if (eventsContainer) {
      eventsContainer.innerHTML = `
        <div class="event-item">
          <p>Feb 15 - Networking Event</p>
        </div>
        <div class="event-item">
          <p>Mar 3 - Business Workshop</p>
        </div>
        <div class="event-item">
          <p>Mar 20 - Trade Fair</p>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("events-list")) {
    displayEvents();
  }
});
