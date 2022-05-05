function getRecipes() {
	let recipes = [];
	
	fetch("./script/API/recipes.js")
		.then(reponse => reponse.json())
		.then((data) => (recipes = data.recipes))

	return { recipes }
}

// display data photographer
async function displayData(recipes) {
	const recipesSection = document.querySelector(".recipes_mainContainer");

	recipes.forEach((recipe) => {
		const recipeModel = recipeFactory(recipe);
		const recipeCardDOM = recipeModel.getRecipeCardDOM();
		recipesSection.appendChild(recipeCardDOM);
	});
};

async function init() {
	const { recipes } = getRecipes();
	displayData(recipes);
};

init();

