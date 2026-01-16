    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

const darkModeBtn = document.getElementById('darkMode');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

fetch('data/members.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
  })
  .then(businesses => {
    const ul = document.getElementById('business-list');
    ul.innerHTML = '';

    businesses.forEach(business => {
      const li = document.createElement('li');
      li.classList.add('members_box')
      li.innerHTML = `
        <div>
            <img class="members-img" src="images/${business.image}" alt="${business.name}" style="width:100px; height:100px; margin-right:10px; vertical-align:middle;">
        </div>
        <strong>${business.name}</strong> Member Ship Level: ${business.membershipLevel}<br>
        <em>${business.description}</em><br>
        Adress: ${business.address}<br>
        Phone Number: ${business.phone}<br>
        <p class="website-text" >Website: <a class="cards-url" href="${business.website}" target="_blank" rel="noopener noreferrer">Visite</a></p>
      `;
      li.style.marginBottom = "1.5rem";
      ul.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    const ul = document.getElementById('business-list');
    ul.innerHTML = '<li>Errer loadind data.</li>';
  });


  document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.list-layout-btn');
  const businessList = document.getElementById('business-list');

  btn.addEventListener('click', () => {
    businessList.classList.toggle('list-layout');
  });

  document.querySelector('.list-layout-btn').addEventListener('click', () => {
  const businessList = document.getElementById('business-list');
  businessList.classList.toggle('no-margin');
});
});