
// Sélectionnez tous les chevrons des filtres
const opens = document.querySelectorAll(".btnFilter .titleFilter");

// Parcourez chaque chevron et ajoutez un événement de clic
opens.forEach((open) => {
  open.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = open.parentNode;
    // Ajoutez ou supprimez la classe 'open' pour ouvrir ou fermer le filtre
    parent.classList.toggle("open");
  });
});
const recipesContainer = document.getElementById("containerRecipes");
let totalRecipes = 0; // Variable pour le nombre total de recettes

// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("card");

  // Création des éléments HTML pour la recette
  const recipeTime = document.createElement("p");
  recipeTime.classList.add("timer");
  recipeTime.textContent = `${recipe.time} min`;

  const recipeImage = document.createElement("img");
  recipeImage.src = `./image/${recipe.image}`;
  recipeImage.alt = `${recipe.name}`;

  const recipeName = document.createElement("h3");
  recipeName.textContent = `${recipe.name}`;

  const recipeRecettes= document.createElement("div");
  recipeRecettes.classList.add("recette");

  const recipeDescription = document.createElement("h4");
  recipeDescription.textContent = `RECETTE`;

  const recipeText = document.createElement("p");
  recipeText.classList.add("recetteDescription");
  recipeText.textContent = `${recipe.description}`;

  const recipeIngredients = document.createElement("div");
  recipeIngredients.classList.add("listIngredients");

  const recipeIngredientTitle = document.createElement("h5");
  recipeIngredientTitle.textContent = `INGRÉDIENTS`;
  recipeIngredients.appendChild(recipeIngredientTitle);
  

  let currentColumn;

  recipe.ingredients.forEach((ingredient, index) => {
    if (index  === 0) {
      currentColumn = document.createElement("div");
      currentColumn.classList.add("ingredient");
      recipeIngredients.appendChild(currentColumn);
    }

    const ingredientContainer = document.createElement("div");
    const nameElement = document.createElement("p");
    nameElement.classList.add("ingredientNom");
    nameElement.innerHTML = `${ingredient.ingredient}`;
    ingredientContainer.appendChild(nameElement);

    const quantityElement = document.createElement("p");
    quantityElement.classList.add("unite");
    quantityElement.textContent = `${ingredient.quantity} ${ingredient.unit || ""}`;
    ingredientContainer.appendChild(quantityElement);

    currentColumn.appendChild(ingredientContainer);
  });

  // Ajout des éléments à la carte de recette
  recipeCard.appendChild(recipeTime);
  recipeCard.appendChild(recipeImage);
  recipeCard.appendChild(recipeName);
  recipeCard.appendChild(recipeRecettes);
  recipeRecettes.appendChild(recipeDescription);
  recipeRecettes.appendChild(recipeText);
  recipeCard.appendChild(recipeIngredients);
  
  

  // Ajout de la carte de recette au conteneur des recettes
  recipesContainer.appendChild(recipeCard);
  totalRecipes++; // Incrémentation du nombre total de recettes
}

// Fonction pour créer les cartes de recette à partir d'un tableau de recettes
function createRecipeCards(recipes) {
  recipes.forEach(recipe => {
    createRecipeCard(recipe);
  });
}
// Appel initial pour créer les cartes de recette au chargement de la page
createRecipeCards(recipes);

// Création d'un élément pour afficher le nombre total de recettes affichées
const totalRecipeCount = document.createElement("div");
totalRecipeCount.classList.add("totalRecettes");
totalRecipeCount.textContent = `${totalRecipes} recettes`;

// Sélection de la div "filterContainer"
const filterContainer = document.getElementById("containerFilter");

// Ajout de l'élément totalRecipeCount à l'intérieur de filterContainer
filterContainer.appendChild(totalRecipeCount);
/*createRecipeCard()`card"
                          <div class="
                            <img src="./image/${recipe.image}" alt="${recipe.name}">
                            <div class="timer">${recipe.time} min</div>
                            <h3>${recipe.name}</h3>
                            <div class="recette">
                                <h4>recette</h4>
                                <p class="recetteDescription">${recipe.description}</p>
                            <div class="listIngredients">
                                    <h5>ingredient</h5>
                                    <div class="ingredient">
                                    ${recipe.ingredients.forEach((ingredient) => {
                                        const listItem = document.createElement("li");
                                
                                        // Créez un élément <strong> pour le nom de l'ingrédient
                                        const ingredientName = document.createElement("strong");
                                        ingredientName.textContent = ingredient.ingredient;
                                        listItem.appendChild(ingredientName);
                                
                                        // Ajoutez la quantité et l'unité après le nom de l'ingrédient
                                        listItem.append(` : ${ingredient.quantity || ""} ${ingredient.unit || ""}`.trim());
                                
                                        ingredientsList.appendChild(listItem);
                                    })}
                                    </div>
                                </div>
                            </div>
                            </div>`*/