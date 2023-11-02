// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.searchIcon');


searchButton.addEventListener("click", searchRecipe);
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = searchInput.value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  if (
    (searchTerm !== "" && searchTerm.length >= 3) ||
    (e.key === "Enter" && searchTerm !== "" && searchTerm.length >= 3)
  ) {
    searchRecipe();
  }
});

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
  const searchTerm = searchInput.value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  

  let filteredRecipes = recipes.filter((recipe) => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();
    return (
      recipeTitle.includes(searchTerm) ||
      recipeIngredients.includes(searchTerm) ||
      recipeDescription.includes(searchTerm)
    );
  });
  // Filtrer par ingrédients
  const selectedRecipeIngredients = selectedIngredients.map(ingredient => ingredient.toLowerCase());

  if (selectedRecipeIngredients.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeIngredients = getRecipeIngredients(recipe);
      return selectedRecipeIngredients.every(ingredient => recipeIngredients.includes(ingredient));
    });
  }
  // Filtrer par appareils
  const selectedRecipeAppliances = selectedAppliances.map(appliance => appliance.toLowerCase());

  if (selectedRecipeAppliances.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      const recipeAppliance = recipe.appliance.toLowerCase();
      return selectedRecipeAppliances.every(appliance => recipeAppliance === appliance);
    });
  }
  if (filteredRecipes.length === 0) {
    const recipesContainer = document.getElementById("containerRecipes");
    recipesContainer.textContent = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
 filterContainer.classList.add("hide");
 recipesContainer.classList.add("messageContainer")
 resetFilterLists();

  } else {
    const recipesContainer = document.getElementById("containerRecipes");
    recipesContainer.textContent =
    updateFilterLists(filteredRecipes);
    updateRecipeDisplay(filteredRecipes);
    filterContainer.classList.remove("hide");
    recipesContainer.classList.remove("messageContainer");
  }
}
// Fonction pour la mise a jour de  l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = "";
  createRecipeCards(filteredRecipes);
  totalRecipeCount.textContent = `${filteredRecipes.length} recettes`;
}

// Fonction pour réinitialiser les listes de filtres
function resetFilterLists() {
    // Tableau des listes de filtres à réinitialiser
    const filterLists = [
      { list: ingredientsList, items: allIngredients },
      { list: appliancesList, items: allAppliances },

    ];
    //reinitialisation
    filterLists.forEach((filter) => {
      filter.list.innerHTML = "";
      filter.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        filter.list.appendChild(listItem);
      });
    });
  }
  //Fonction pour l'affichage des listes de filtres en fonction des recettes filtrées
  function updateFilterLists(filteredRecipes) {
    const filteredIngredients = new Set();
    const filteredAppliances = new Set();
 
  
     // Parcours de chaque recette filtrée
    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        filteredIngredients.add(ingredient.ingredient);
      });
      filteredAppliances.add(recipe.appliance);
    });
  
    // Mettre à jour la liste des ingrédients sélectionnés
    selectedIngredients.forEach((ingredient) => {
      // Vérification si l'ingrédient sélectionné n'est pas présent
      if (!filteredIngredients.has(ingredient)) {
        selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
      }
    });
    generateFilteredIngredientsList([...filteredIngredients]);
    
    // Mettre à jour la liste des appareils sélectionnés
  selectedAppliances.forEach((appliance) => {
    if (!filteredAppliances.has(appliance)) {
      selectedAppliances.splice(selectedAppliances.indexOf(appliance), 1);
    }
  });
  generateFilteredAppliancesList([...filteredAppliances]);}


//Fonction pour récuperer les ingredients des recettes
function getRecipeIngredients(recipe) {
  return recipe.ingredients.map((ingredient) =>
    ingredient.ingredient.toLowerCase()
  );
}