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

const autocomplete = document.querySelectorAll(".autocomplete");
autocomplete.forEach(el => {

  el.oninput = function () {
    let results = [];
    const userInput = this.value;
    const type = this.dataset.search;
    document.getElementById(`results__${type}`).innerHTML = '';
    const allResults = document.querySelectorAll('.results');

    allResults.forEach(result => {
      result.style.display = 'none';
    })

    if (userInput.length > 2) {
      results = getResults(userInput, type);

      if(results.length > 0) {
        document.getElementById(`results__${type}`).style.display = 'grid';

        for (i = 0; i < results.length; i++) {
          document.getElementById(`results__${type}`).innerHTML += `<li data-type="${type}" data-title="${results[i]}" onclick="addFilter(this)">${results[i]}</li>`;
        }
      } else {
        document.getElementById(`results__${type}`).style.display = 'none';
      }
    } else {
      document.getElementById(`results__${type}`).style.display = 'none';
    }
  };

})

function getResults(input, type) {
  const results = [];
  let datas;
  if (type == 'ingredients') {
    datas = allIngredients;
  }

  if (type == 'ustensils') {
    datas = allUstensils;
  }

  if (type == 'devices') {
    datas = allDevices;
  }

  datas.forEach(data => {
    console.log(input.toLowerCase());
    console.log(data.toLowerCase())
    if (data.toLowerCase().includes(input.toLowerCase())) {
      results.push(data);
    }
  })

  return results;
}

