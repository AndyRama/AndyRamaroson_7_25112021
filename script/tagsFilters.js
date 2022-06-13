// create a new tag, order by alpahbetique
function showTags(items, tagId, type) {
  const tag = document.getElementById(tagId);
  let templateTaglist = ``;
  items.sort();
  // display tag with template 
  items.map(item => {
    let contentItem = item[0].toUpperCase() + item.toLowerCase().slice(1);
    if (filteredIngredients.indexOf(item) != -1 || filteredDevices.indexOf(item) != -1 || filteredUstensils.indexOf(item) != -1) {
      templateTaglist += `
        <li><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag is-selected" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    } else {
      templateTaglist += `
        <li ><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    }
  })
  tag.innerHTML = templateTaglist;
}

//Create function add tags
function addFilter(e) {
  const type = e.dataset.type;
  const title = e.dataset.title;
  var htmlClass;
  
  const tagList = document.getElementById("tagsBtn");
  const allTags = tagList.getElementsByTagName('button');
  const tagsStringList = [];

  for (i = 0; i < allTags.length; i++) {
    tagsStringList.push({ title: allTags[i].dataset.controls, type: allTags[i].dataset.type });
  }

  switch(type) {
    case 'ingredients':
      htmlClass = 'filters__btn--ingredients';
    break;

    case 'device':
      htmlClass = 'filters__btn--device';
    break;

    case 'ustensils':
      htmlClass = 'filters__btn--ustensils';
    break;
  } 
  
  //if tags isn't already present in this list => add  new tag element 
  if (!tagsStringList.some(tag => tag.title.toLowerCase() == title.toLowerCase())) {
    document.getElementById('tagsBtn').innerHTML = document.getElementById('tagsBtn').innerHTML + `
      <button onclick="removeFilter(this)" data-type="${type}" data-controls="${title}" class="filters__tag filters__Btn ${htmlClass}">
        ${title}
        <svg id="close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"></path>
        </svg>
      </button>
    `;
    launchSearch();
  }
}

// remove tag with close
function removeFilter(e) {
  e.remove();
  launchSearch();
}

//filter tags elements with keyword input
const filtersInput = document.querySelectorAll(".filters__input");
filtersInput.forEach((input) => {
  input.addEventListener("keyup", (event) => {    
    if (event.target.value.length > 0) {
    //   event.target.parentElement.nextElementSibling.classList.add(
    //     "is-expanded"
    //   );
    // } else {
    //   event.target.parentElement.nextElementSibling.classList.remove(
    //     "is-expanded"
    //   );
    }
    switch (event.target.dataset.search) {
      case "ingredients":
        showTags(
          allIngredients.filter((ing) => ing.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1),
          "ingredientsTaglist",
          "ingredients"
        );
      break;
      case "devices":
        showTags(
          allDevices.filter((device) => device.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1),
          "devicesTaglist",
          "device"
        );
      break;
      case "ustensils":
        showTags(allUstensils.filter((ustensil) => ustensil.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1),
          "ustensilsTaglist",
          "ustensils"
        );
      break;
    }
  });
});
const dataIng = [
  "Ail",
  "Ananas",
  "Banane",
  "Basilic",
  "Beurre",
  "Beurre fondu",
  "Beurre salé",
  "Bicarbonate",
  "Blanc de dinde",
  "Boudoirs",
  "Carotte",
  "Champignons de paris",
  "Chocolat",
  "Chocolat au lait",
  "Chocolat noir",
  "Chocolat noir en pepites",
  "Citron",
  "Citron Vert",
  "Concombre",
  "Coulis de tomates",
  "Courgette",
  "Crème de coco",
  "Crème faiche",
  "Crème liquide",
  "Crême fraîche",
  "Cumin",
  "Eau",
  "Emmental",
  "Farine",
  "Farine de blé noir",
  "Feuilles de laitue",
  "Fraise",
  "Fromage blanc",
  "Fromage de chèvre",
  "Fromage à raclette",
  "Glace à la vanille",
  "Glaçons",
  "Gruyère",
  "Haricots verts",
  "Huile d'olive",
  "Huile d'olives",
  "Jambon de parme",
  "Jambon fumé",
  "Jus de citron",
  "Kiwi",
  "Kiwis",
  "Lait",
  "Lardons",
  "Lasagnes",
  "Macaronis",
  "Mangue",
  "Mascarpone",
  "Mayonnaise",
  "Maïs",
  "Maïzena",
  "Menthe",
  "Miel",
  "Moutarde de Dijon",
  "Mozzarella",
  "Mâche",
  "Noix",
  "Noix de muscade",
  "Oeuf",
  "Oeuf dur",
  "Oignon",
  "Olives",
  "Orange",
  "Oseille",
  "Pain",
  "Pain de mie",
  "Paprika",
  "Parmesan",
  "Pastèque",
  "Patate douce",
  "Pennes",
  "Petits poids",
  "Poireau",
  "Poires au jus",
  "Pois Cassé",
  "Pois chiches",
  "Poivron rouge",
  "Pomme",
  "Pommes",
  "Pommes de terre",
  "Poudre d'amandes",
  "Poulet",
  "Pruneaux",
  "Pâte brisée",
  "Pâte feuilletée",
  "Pâte sablée",
  "Pâte à pizza",
  "Rhubarbe",
  "Riz blanc",
  "Salade Verte",
  "Saucisse bretonne ou de toulouse",
  "Saumon Fumé",
  "Spaghettis",
  "Sucre",
  "Sucre en Poudre",
  "Sucre en poudre",
  "Sucre glace",
  "Sucre roux",
  "Sucre vanillé",
  "Tagliatelles",
  "Thon Rouge (ou blanc)",
  "Thon en miettes",
  "Tomate",
  "Tomates cerises",
  "Tomates pelées",
  "Vermicelles",
  "Viande hachée",
  "Vin blanc sec",
  "Vin rouge",
  "Vinaigre Balsamique",
  "Vinaigre de cidre",
  "Vinaigrette",
  "farine",
  "gruyère râpé",
  "huile d'olive",
  "huile d'olives",
  "lait de coco",
  "reblochon",
  "Échalote"
];

const data = dataIng;

const autocomplete = document.getElementById("inputIng");
const resultsHTML = document.getElementById("results");
const results2 =  document.getElementById("results2");

autocomplete.oninput = function () {
  let results = [];
  const userInput = this.value;
  resultsHTML.innerHTML = "";

  if (userInput.length > 0) {
    results = getResults(userInput);
    resultsHTML.style.display = "grid";
    
    for (i = 0; i < results.length; i++) {
      resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
    }
  } else { (userInput.length >= 1 )
    results = getResults(userInput);
    resultsHTML.style.display = "none"; 
  } 
};

function getResults(input) {
  const results = [];
  const results2 = [];

  for (i = 0; i < data.length; i++) {
    if (input === data[i].slice(0, input.length)) {
      results.push(data[i]);
    }
    console.log(results)
  }
  
  results2 = new Array(results)
  console.log(results2)
  // if(input.length > 0 ){  
  //   sugestionContainer.style.display = "flex";
  //   sugestionContainer.innerHTML = `${results}`
  // } 
  return results;
  }
  resultsHTML.onclick = function (event) {
    const setValue = event.target.innerText;
    autocomplete.value = setValue;
    this.innerHTML = "";
};

// ---------------
// Deleting items
// ---------------

// arr = [1, 2, 3, 4];
// arr.every( (elem, index, arr) => {
//   arr.pop()
//   console.log(`[${arr}][${index}] -> ${elem}`)
//   return elem < 4
// })

// Loop runs for 2 iterations only, as the remaining
// items are `pop()`ed off
//
// 1st iteration: [1,2,3][0] -> 1
// 2nd iteration: [1,2][1] -> 2

