function recipeFactory(data) {
  const { id, name, ingredients,servings, time ,description,appliance,ustensils } = data;
  const picture = `asset/imagePlat.jpg`;

  
	function getRecipeCardDOM() {
		const article = document.createElement('article');
    
		//add image
		const img = document.createElement('img');
		img.setAttribute("src", picture);

		//add title
		const h2 = document.querySelector(".recipe__name");
		h2.textContent = name;

		//add time
		const time = document.getElementById("time");
    time.innerHTML = `<span id="time">${time}min</span>`;

		//add description

		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(time);

		return (article);
	}
	return { name, picture, getRecipeCardDOM }
}