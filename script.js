const userCardsContainer = document.getElementById("userCards");
const searchInput = document.getElementById("search");
const darkModeToggle = document.getElementById("darkModeToggle");

let users = [];

// Foydalanuvchilarni API orqali yuklash
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    users = data;
    displayUsers(users);
  })
  .catch(error => console.error("Ma'lumot yuklashda xatolik:", error));

// Foydalanuvchilarni ekranga chiqarish
function displayUsers(users) {
  userCardsContainer.innerHTML = ""; // Tozalash
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p>✉️: ${user.email}</p>
      <p>📞: ${user.phone}</p>
      <p>🏠: ${user.address.city}, ${user.address.street}</p>
    `;
    userCardsContainer.appendChild(card);
  });
}

// Qidiruv funksiyasi
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );
  displayUsers(filteredUsers);
});

// Dark mode funksiyasi
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // Oldindan saqlangan dark mode-ni tekshirish
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  }

  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
