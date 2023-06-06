import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function initializeCode() {
  const container = document.getElementById("app");

  const breeds = [
    { APIname: "bulldog", name: "Bulldog" },
    { APIname: "labrador", name: "Labrador" },
    { APIname: "poodle", name: "Poodle" },
    { APIname: "germanshepherd", name: "German Shepherd" },
    { APIname: "retriever/golden", name: "Golden Retriever" }
  ];

  // Generate wiki items for each breed
  for (let i = 0; i < breeds.length; i++) {
    const breed = breeds[i];
    const imageUrl = await getRandomImageByBreed(breed.APIname);
    const summary = await getBreedSummary(breed.name);
    generateWikiItem(container, breed.name, imageUrl, summary);
  }
}

async function getRandomImageByBreed(breed) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const data = await response.json();
  return data.message;
}

async function getBreedSummary(title) {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
  );
  const data = await response.json();
  return data.extract;
}

function generateWikiItem(container, headerText, imageUrl, summary) {
  // Create wiki item container
  const wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  // Create wiki header
  const wikiHeader = document.createElement("h1");
  wikiHeader.classList.add("wiki-header");
  wikiHeader.textContent = headerText;

  // Create wiki content
  const wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");

  // Create image container
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  // Create image element
  const wikiImg = document.createElement("img");
  wikiImg.classList.add("wiki-img");
  wikiImg.src = imageUrl;

  // Create wiki text
  const wikiText = document.createElement("p");
  wikiText.classList.add("wiki-text");
  wikiText.textContent = summary;

  // Append elements
  wikiContent.appendChild(imgContainer);
  imgContainer.appendChild(wikiImg);
  wikiContent.appendChild(wikiText);
  wikiItem.appendChild(wikiHeader);
  wikiItem.appendChild(wikiContent);
  container.appendChild(wikiItem);
}
