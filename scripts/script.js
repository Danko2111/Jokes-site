let category = "Programming";

async function createQuote() {
  const result = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
  );
  const myApiData = await result.json();
  const quoteSetup = document.querySelector(".quote-setup");
  const quoteDelivery = document.querySelector(".quote-delivery");

  if (myApiData.type === "single") {
    quoteDelivery.innerText = myApiData.joke;
  } else {
    quoteSetup.innerText = myApiData.setup;
    quoteDelivery.innerText = myApiData.delivery;
  }
}

createQuote();
