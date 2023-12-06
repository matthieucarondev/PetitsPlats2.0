// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector(".searchIcon");

searchButton.addEventListener("click", searchRecipe);
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = searchInput.value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
  if (
    (searchTerm !== "" && searchTerm.length >= 3 ) ||
    (e.key === "Enter" && searchTerm !== "" && searchTerm.length >= 3) || 
    (searchTerm == "")
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

    
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();

    if (
      recipeTitle.includes(searchTerm) ||
      matchIngredient(recipe, searchTerm) ||
      recipeDescription.includes(searchTerm)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  // Filtrer par ingrédients
  const selectedRecipeIngredients = [];
  for (let i = 0; i < selectedIngredients.length; i++) {
    selectedRecipeIngredients.push(selectedIngredients[i].toLowerCase());
  }

  if (selectedRecipeIngredients.length > 0) {
    const recapFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeIngredients = getRecipeIngredients(recipe);
      let hasAllingerdient = true;
      for (let j = 0; j < selectedRecipeIngredients.length; j++) {
        if (!recipeIngredients.includes(selectedRecipeIngredients[j])) {
          hasAllingerdient = false;
          break;
        }
      }
      if (hasAllingerdient) {
        recapFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = recapFilteredRecipes;
  }
  // Filtrer par appareils
  const selectedRecipeAppliances = [];
  for (let i = 0; i < selectedAppliances.length; i++) {
    selectedRecipeAppliances.push(selectedAppliances[i].toLowerCase());
  }
  if (selectedRecipeAppliances.length > 0) {
    const recapFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeAppliance = recipe.appliance.toLowerCase();
      let hasAppliance = false;
      for (let j = 0; j < selectedRecipeAppliances.length; j++) {
        if (recipeAppliance === selectedRecipeAppliances[j]) {
          hasAppliance = true;
          break;
        }
      }
      if (hasAppliance) {
        recapFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = recapFilteredRecipes;
  }
  // Filtrer par ustensils
  const selectedRecipeUstensils = [];
  for (let i = 0; i < selectedUstensils.length; i++) {
    selectedRecipeUstensils.push(selectedUstensils[i].toLowerCase());
  }
  if (selectedRecipeUstensils.length > 0) {
    const recapFilteredRecipes = [];
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const recipeUstensils = [];
      for (let j = 0; j < recipe.ustensils.length; j++) {
        recipeUstensils.push(recipe.ustensils[j].toLowerCase());
      }
      let hasAllUstensils = true;
      for (let j = 0; j < selectedRecipeUstensils.length; j++) {
        if (!recipeUstensils.includes(selectedRecipeUstensils[j])) {
          hasAllUstensils = false;
          break;
        }
      }
      if (hasAllUstensils) {
        recapFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = recapFilteredRecipes;
  }

  if (filteredRecipes.length === 0) {
    const recipesContainer = document.getElementById("containerRecipes");
    recipesContainer.textContent = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    filterContainer.classList.add("hide");
    recipesContainer.classList.add("messageContainer");
    resetFilterLists();
  } else {
    const recipesContainer = document.getElementById("containerRecipes");
    recipesContainer.textContent = updateFilterLists(filteredRecipes);
    updateRecipeDisplay(filteredRecipes);
    filterContainer.classList.remove("hide");
    recipesContainer.classList.remove("messageContainer");
  }
}
// Fonction pour la mise a jour de  l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = "";
  createRecipeCards(filteredRecipes);
  totalRecipeCount.textContent = `${ filteredRecipes.length > 1 ? filteredRecipes.length + " recettes" : filteredRecipes.length + " recette"  } `;
}

// Fonction pour réinitialiser les listes de filtres
function resetFilterLists() {
  // Tableau des listes de filtres à réinitialiser
  const filterLists = [
    { list: ingredientsList, items: allIngredients },
    { list: appliancesList, items: allAppliances },
    { list: ustensilsList, items: allUstensils },
  ];
  for (let i = 0; i < filterLists.length; i++) {
    const filter = filterLists[i];

    //reinitialisation
    filter.list.innerHTML = "";
    //parcourir les elements de la liste et création de la liste
    let j = 0;
    while (j < filter.items.length) {
      const item = filter.items[j];
      const listItem = document.createElement("li");
      listItem.textContent = item;
      filter.list.appendChild(listItem);
      j++;
    }
  }
}

//Fonction pour l'affichage des listes de filtres en fonction des recettes filtrées
function updateFilterLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

  // Parcours de chaque recette filtrée

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      filteredIngredients.add(ingredient);
    }
    filteredAppliances.add(recipe.appliance);
    for (let k = 0; k < recipe.ustensils.length; k++) {
      const ustensil = recipe.ustensils[k];
      filteredUstensils.add(ustensil);
    }
  }

  // Mettre à jour la liste des ingrédients sélectionnés
 
    let i =  selectedIngredients.length - 1;
    while (i>=0) {
      const ingredient = selectedIngredients[i];
   // Vérification si l'ingrédient sélectionné n'est pas présent    
      if (!filteredIngredients.has(ingredient)) {
         selectedIngredients.splice(i, 1)
      }
      i--;
    }
  generateFilteredIngredientsList([...filteredIngredients]);

  // Mettre à jour la liste des appareils sélectionnés
  let j =selectedAppliances.length - 1;
  while (j >= 0) {
      const appliance = selectedAppliances[j];
    if (!filteredAppliances.has(appliance)) {
      selectedAppliances.splice(j, 1);
    }
    j--;
  }
  generateFilteredAppliancesList([...filteredAppliances]);

  // Mettre à jour la liste des ustensils sélectionnés
  let k = selectedUstensils.length - 1;
  while (k > 0) {
    const ustensil = selectedUstensils[k];
    if (!filteredUstensils.has(ustensil)) {
      selectedUstensils.splice(k, 1);
    }
    k--;
  }
  generateFilterUstensilsList([...filteredUstensils]);
}
function getRecipeIngredients(recipe) {
  const ingredientsList = [];
  const ingredients = recipe.ingredients;

  for (let i = 0; i < ingredients.length; i++) {
    ingredientsList.push(ingredients[i].ingredient.toLowerCase());
  }

  return ingredientsList;
}
function matchIngredient(recipe, searchterm) {
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchterm)) {
      return true;
    }
  }
  return false;
}