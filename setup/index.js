// HTML FOR POSTS

function instaPost(post) {
  return `
      <div class="card">
        <img class="profile-img" src="${post.profile_image}">
        <div class="profile-name">
          <h5>${post.name}</h5>
          <p class="date">${formatDate(post.date)}</p>
        </div>
        <div class="logo">
          <img class="instagram-logo" src="/icons/instagram-logo.svg">
        </div>
        <img src="${post.image}" alt="pic">
        <div class="card-content">
          <p>${post.caption}</p>
        </div>
        <div class="card-footer">
          <div class="line"></div>
          <i class="fas fa-heart"></i><p class="likes">${post.likes}</p>  
        </div>
      </div>
    `;
}

// FORMAT DATE

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// GET REQUEST

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(".cards-container");
    data.slice(0, 4).forEach((post) => {
      const card = instaPost(post);
      cardContainer.innerHTML += card;
    });
  });

//  LOAD MORE BUTTON

const loadMoreBtn = document.querySelector(".load-more-btn");
let cardsLoaded = 0;
loadMoreBtn.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const cardContainer = document.querySelector(".cards-container");
      data.slice(cardsLoaded, cardsLoaded + 4).forEach((post) => {
        const card = instaPost(post);
        cardContainer.innerHTML += card;
        cardsLoaded++;
      });
      if (cardsLoaded === data.length) {
        loadMoreBtn.style.display = "none";
      }
    });
});

// LIKES

const cardContainer = document.querySelector(".cards-container");
cardContainer.addEventListener("click", (event) => {
  const heartIcon = event.target.closest(".fa-heart");
  if (heartIcon) {
    const card = heartIcon.closest(".card");
    const likesCounter = card.querySelector(".likes");
    let likesCount = Number(likesCounter.textContent);
    if (heartIcon.classList.contains("active")) {
      likesCount--;
      heartIcon.classList.remove("active");
    } else {
      likesCount++;
      heartIcon.classList.add("active");
    }
    likesCounter.textContent = likesCount;
  }
});

// SETTINGS

//1.NUMBER OF COLUMNS

const select = document.querySelector("#numberOfColumns");

select.addEventListener("change", () => {
  const numColumns = parseInt(select.value);
  const newWidth = `${70 / numColumns}%`;
  const columns = document.querySelectorAll(".card");

  columns.forEach((column) => {
    column.style.width = newWidth;
  });
});

//2.CARD BACKGROUND COLOR

const colorInput = document.querySelector("#cardBackgroundColor");

colorInput.addEventListener("input", () => {
  const newColor = colorInput.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.backgroundColor = newColor));
});

//3.CARDS SPACE BETWEEN

const input = document.querySelector("#cardSpaceBetween");

input.addEventListener("input", () => {
  const cardSpace = input.value;
  const container = document.querySelector(".cards-container");
  container.style.setProperty("gap", `${cardSpace}`);
});

//4.CHOOSE THEME
const lightTheme = document.querySelector("#lightTheme");
const darkTheme = document.querySelector("#darkTheme");

lightTheme.addEventListener("change", () => {
  if (lightTheme.checked) {
    const container = document.querySelector(".cards-container");
    container.classList.remove("dark");
  }
});

darkTheme.addEventListener("change", () => {
  if (darkTheme.checked) {
    const container = document.querySelector(".cards-container");
    container.classList.add("dark");
  }
});
