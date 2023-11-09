

const recipesContainer = document.getElementById("containerRecipes");
let totalRecipes = 0; // Variable pour le nombre total de recettes

// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
 
 return`<article class="card">
            <figure>
              <img src="./image/${recipe.image}" alt="${recipe.name}">
              <span class="timer">${recipe.time} min</span>
              <figcaption class="recette">
                      <h3>${recipe.name}</h3>
                      <h4>RECETTE</h4>
                      <p class="recetteDescription">${recipe.description}</p>
                      <h5 class="listIngredients">INGRÉDIENTS</h5>
                      <dl class="ingredient">
                      ${recipe.ingredients.map(ingredient=> {
                        return `
                        <div>
                        <dd class="ingredientNom">${ingredient.ingredient}</dd>
                        <dt class="unite">${ingredient.quantity||`` } ${ingredient.unit ||``}</dt>
                        </div>`}).join("")}</dl>
              </figcaption>
            </figure>
          </article>
          `
}

// Fonction pour créer les cartes de recette à partir d'un tableau de recettes
function createRecipeCards(recipes) {
  recipes.forEach(recipe => {
    const recipesContainer = document.getElementById("containerRecipes");
    const card = createRecipeCard(recipe);
    const range = document.createRange();
    range.selectNodeContents(recipesContainer);
    const container = range.createContextualFragment(card);
    recipesContainer.appendChild(container);


  });
}
// Appel initial pour créer les cartes de recette au chargement de la page
createRecipeCards(recipes);


// Création d'un élément pour afficher le nombre total de recettes affichées
const totalRecipeCount = document.createElement("div");
totalRecipeCount.classList.add("totalRecettes");
totalRecipeCount.textContent = `${recipes.length} recettes`;

// Sélection de la div "filterContainer"
const filterContainer = document.getElementById("containerFilter");

// Ajout de l'élément totalRecipeCount à l'intérieur de filterContainer
filterContainer.appendChild(totalRecipeCount);

                      