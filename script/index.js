let recipesArray = [];
let allIngredients = [];
let allDevices = [];
let allUstensils = [];

// Fetch api Json
fetch("./script/api/recipes.json")
  .then(reponse => {
    if(reponse.ok) return reponse.json();
  })
  .then((value) => {
    //display all recipes
    recipeCardDom(value.recipes);
    recipesArray = value.recipes;
})

function recipeCardDom(recipes) {
  console.log("recipeCardDom", recipes);//OK

  //get container recipes
  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  for(const recipe of recipes) {
    recipeCard.innerHTML = `
    <article class="recipe__container">
      <div class="recipe__picture">
        <img class="recipe__img" src="./public/assets/imagePlat.jpg" alt="image d'un plat">
      </div>
      <div class="recipe__infoContent">
        <div class="recipe__legend">
          <h2 class="recipe__name">Limonade de coco</h2>
          <span class ="recipe__time">
            <svg width="20" height="20"class="recipe__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
            </svg>
            <span id="time">80 min</span>
          </span>
        </div>
        <div class="recipe__info">
          <div class="recipe__ingredients">
            <ul class="recipe__ingredientList">
              <li class="recipe__ingredient">lait de coco:
                <span class="recipe__quantity">400ml</span>
              </li>

              <li class="recipe__ingredient">Jus de citron:
                <span class="recipe__quantity">2</span>
              </li>

              <li class="recipe__ingredient"> Creme de coco:
                <span class="recipe__quantity">2 c</span>
              </li>

              <li class="recipe__ingredient">Sucre:
                <span class="recipe__quantity">30 g</span>
              </li>

              <li class="recipe__ingredient">Glaçons:
                <span class="recipe__quantity">2</span>
              </li>
            </ul>
          </div>
          <div class="recipe__instruContent">
            <p class="recipe__instructions">Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée</p>
          </div>
        </div>
      </div>
    </article>      
    `
  }

}

