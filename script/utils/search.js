// Ajout d'un écouteur d'événement sur le champ de recherche
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('.searchIcon');

//searchInput.addEventListener("input", searchRecipe);
searchButton.addEventListener("click", searchRecipe);
document.addEventListener("keyup", (e) => {
    if(e.key=== "Enter"){
    searchRecipe();
      
    }});

// Fonction pour effectuer une recherche de recettes
function searchRecipe() {
 
  const searchTerm = document.querySelector('input[type="text"]').value.trim().replace(/\s+/g, ' ').toLowerCase();
  const hasSearchTerm = searchTerm !== '' && searchTerm.length >=3;
  const isSearchTermValid = validateEntry(searchTerm);

  if (!hasSearchTerm &&  isSearchTermValid) {
    resetRecipeDisplay();
    return;
  }

  let filteredRecipes = recipes.filter(recipe => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeIngredients = getRecipeIngredients(recipe);
    const recipeDescription = recipe.description.toLowerCase();
    return recipeTitle.includes(searchTerm) || recipeIngredients.includes(searchTerm) || recipeDescription.includes(searchTerm);
  });
    if (filteredRecipes.length === 0) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    resetRecipeDisplay();
    
  } else {
    updateRecipeDisplay(filteredRecipes);
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = '';
   
  }
 
  
}
// Fonction pour réinitialiser l'affichage des recettes
function resetRecipeDisplay() {
  recipesContainer.innerHTML = "";
  createRecipeCards(recipes); // Utilisation de la fonction createRecipeCards pour générer les cartes de recette
  totalRecipeCount.textContent = `${recipes.length} recettes`;
}
// Fonction pour la mise a jour de  l'affichage des recettes filtrées
function updateRecipeDisplay(filteredRecipes) {
  recipesContainer.innerHTML = "";
  createRecipeCards(filteredRecipes);
  totalRecipeCount.textContent = `${filteredRecipes.length} recettes`;
}
//Fonction pour récuperer les ingredients des recettes
function getRecipeIngredients(recipe) {
return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
}
//Fonction pour verifier les caractères non autorisés
function validateEntry(str) {
  var regex =
    /[^a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]+/;
  if (str.match(regex)) {
    return false;
  }
  return true;
}