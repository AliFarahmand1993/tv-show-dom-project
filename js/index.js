// Get Elements
const url = "https://api.tvmaze.com/shows/22036/episodes";
const cards = document.querySelector(".cards");
const searchInput = document.getElementById("searchInput");
const result = document.querySelector(".resoultCounter");
const dropdownItem = document.querySelector(".dropdown-menu");
let seriesResult= [];

// add event to input
searchInput.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const resoult = seriesResult.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.summary.toLowerCase().includes(searchString)
    );
  });
  displayData(resoult);
  resoult.length > 0
    ? (result.innerText = `${resoult.length} Cards Found`)
    : (result.innerText = `No card found!`);
});
// Fetch Data from url 
const fetchData = async () => {
  try {
    const res = await fetch(url);
    seriesResult = await res.json();
    displayData(seriesResult);
    dropDown(seriesResult);
  } catch (err) {
    console.error(err);
  }
};

// add item to  Dropdown menu
const dropDown = (element) => {
  let dropDownElement = "";
  element.map((e) => {
    dropDownElement += `<li><a class="dropdown-item" href="#${e.name}">S0${e.season}E0${e.number} - ${e.name}</a></li>`;
  });
  dropdownItem.innerHTML = dropDownElement;
};

// Display Data to body
const displayData = (characters) => {
  const htmlString = characters
    .map((element) => {
      return `<div class="col-12 col-sm-6 col-xl-3" id="${
        element.name
      }"><div class="card w-100 mb-4"><img class="card-img-top" src="${
        element.image.medium
      }"><div class="card-body"><h5 class="card-title">${
        element.name
      }</h5><p class="card-text">${
        element.summary.slice(3, 90) + " ..."
      }</p><a href="${element._links.self.href.replace(
        "api.",
        ""
      )}" class="btn btncolor">ReadMore</a></div><ul class="list-group list-group-flush"><li class="list-group-item">S0${
        element.season
      }E0${element.number}</li></ul></div></div>`;
    })
    .join("");
  cards.innerHTML = htmlString;
};
fetchData();