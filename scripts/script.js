// creating a card expander function that takes in an card id as a param and then render that specific categories html with DOM manipulation.
const cardExpander = (categoryID) => {
  let category = "";

  switch (categoryID) {
    case "1":
      category = "Programming";
      break;
    case "2":
      category = "Misc";
      break;
    case "3":
      category = "Dark";
      break;
    case "4":
      category = "Pun";
      break;
    case "5":
      category = "Spooky";
      break;
    case "6":
      category = "Christmas";
      break;
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("large-card__wrapper");

  const title = document.createElement("h2");
  title.classList.add("large-card__title");
  title.innerText = `${category} Jokes`;

  const jokeSetup = document.createElement("p");
  jokeSetup.classList.add("large-card__setup");

  const jokeDelivery = document.createElement("p");
  jokeDelivery.classList.add("large-card__delivery");

  const nextJokeButton = document.createElement("button");
  nextJokeButton.classList.add("large-card__next-button");
  nextJokeButton.innerText = "new joke";

  const backButton = document.createElement("button");
  backButton.classList.add("large-card__back-button");
  backButton.innerText = "back";

  const parent = document.querySelector(".category-container");

  createQuote(category);

  wrapper.append(title, jokeSetup, jokeDelivery, nextJokeButton, backButton);

  const categoriesWrapper = document.querySelector(".categories__wrapper");
  categoriesWrapper.classList.add("categories__wrapper--hidden");

  parent.append(wrapper);

  nextJokeButton.addEventListener("click", () => {
    createQuote(category);
  });
  backButton.addEventListener("click", () => {
    parent.innerHTML = "";
    categoriesWrapper.classList.remove("categories__wrapper--hidden");
  });
};

async function createQuote(category) {
  const result = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
  );
  const myApiData = await result.json();
  const quoteSetup = document.querySelector(".large-card__setup");
  const quoteDelivery = document.querySelector(".large-card__delivery");

  if (myApiData.type === "single") {
    quoteSetup.classList.add("large-card__setup--hidden");
    quoteDelivery.innerText = myApiData.joke;
  } else {
    quoteSetup.classList.remove("large-card__setup--hidden");
    quoteSetup.innerText = myApiData.setup;
    quoteDelivery.innerText = myApiData.delivery;
  }
}

// adding an event listner to each category card.
const categoryCard = document.querySelectorAll(".category__card");

categoryCard.forEach((card) => {
  card.addEventListener("click", () => {
    cardExpander(card.id);
  });
});
