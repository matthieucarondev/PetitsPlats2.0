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
    const recipeIngredients = matchIngredient(recipe,searchTerm);
    const recipeDescription = recipe.description.toLowerCase();
     // Vérifier d'abord la correspondance avec le titre
    if (recipeTitle.includes(searchTerm.toLowerCase())) {
        return true;
    }

    // Si aucune correspondance dans le titre, vérifier les ingrédients et la description
    if ( recipeIngredients.includes(searchTerm.toLowerCase())||recipeDescription.includes(searchTerm.toLowerCase())) {
        return true;
    }
    // Si aucune correspondance n'a été trouvée, retourner false
    return false;
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
   // Filtrer par ustensils
   const selectedRecipeUstensils = selectedUstensils.map(ustensil=>ustensil.toLowerCase());

   if (selectedRecipeUstensils.length > 0) {
     filteredRecipes = filteredRecipes.filter(recipe => {
       const recipeUstensil = recipe.ustensils.map(ustensil=>ustensil.toLowerCase());
       return selectedRecipeUstensils.every(ustensil => recipeUstensil.includes(ustensil));
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
      { list: ustensilsList, items: allUstensils },

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
    const filteredUstensils = new Set();
  
     // Parcours de chaque recette filtrée
    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        filteredIngredients.add(ingredient.ingredient);
      });
      filteredAppliances.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil)=>{
        filteredUstensils.add(ustensil);
      });
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
  generateFilteredAppliancesList([...filteredAppliances]);

// Mettre à jour la liste des ustensils sélectionnés
selectedUstensils.forEach((ustensil) => {
  if (!filteredUstensils.has(ustensil)) {
    selectedUstensils.splice(selectedUstensils.indexOf(ustensil), 1);
  }
});
generateFilterUstensilsList([...filteredUstensils]);}



//Fonction pour récuperer les ingredients des recettes
function getRecipeIngredients(recipe) {
  return recipe.ingredients.map((ingredient) =>
    ingredient.ingredient.toLowerCase()
  );
}
function matchIngredient(recipe,searchTerm) { 
  let matchIngred =false ; 
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.ingredient.toLowerCase().includes(searchTerm)){
      matchIngred = true ;
    }
  });
  return matchIngred;
}
  
