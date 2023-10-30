// Récupérer la référence de l'élément de filtre des ingrédients
const ingredientsFilter = document.getElementById(
    "filterIngrédients"
  );
  
  // Récupérer la liste de tous les ingrédients du fichier JSON
  const allIngredients = recipes.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });
    return ingredients;
  }, []);
  
  // Générer les éléments HTML pour la liste des ingrédients
  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("filterlist");
  let selectedIngredients = []; // Tableau pour stocker les éléments déjà sélectionnés
  
  // Générer les éléments HTML pour la liste des ingrédients initiale
  generateFilteredIngredientsList(allIngredients);
  // Ajouter la liste des ingrédients au filtre des ingrédients
  ingredientsFilter.appendChild(ingredientsList);
  
  // Générer les éléments HTML pour la liste des ingrédients filtrés
  function generateFilteredIngredientsList(ingredientsFilter) {
    ingredientsList.innerHTML = "";
    // Générer les nouveaux éléments HTML pour la liste des ingrédients filtrés
    ingredientsFilter.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient;
      addClickEventListenerIngredients(ingredientItem, ingredient, "selectedIngredientTag");
      // Vérifier si l'ingrédient est déjà sélectionné
      if (selectedIngredients.includes(ingredient)) {
        ingredientItem.classList.add("selectedIngredientTag");
      }
      ingredientsList.appendChild(ingredientItem);
    });
  }
  // Ajout d'un écouteur d'événement sur la liste d'ingredients
  ingredientsFilter.addEventListener("click", searchIngredient);
  // Ajout d'un écouteur d'événement sur ingredients
  ingredientsFilter.addEventListener("input", searchIngredient);
  
  // Fonction pour effectuer une recherche d'ingrédients
  function searchIngredient() {
    // Récupération du terme de recherche et nettoyage
    const searchIngredient = document.querySelector(
      "#filterIngrédients .searchFilter input")
      .value.trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
    // Filtrer les ingrédients en fonction du texte de recherche
    const filterIngredients = allIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchIngredient)
    );
  
   // Supprimer les anciens éléments de la liste des appareils
   ingredientsList.innerHTML = "";
  
   // Générer les nouveaux éléments HTML pour la liste des ingredients filtrés
   filterIngredients.forEach((ingredient) => {
     const ingredientItem = document.createElement("li");
     ingredientItem.textContent = ingredient;
     addClickEventListenerIngredients(ingredientItem, ingredient, "selectedIngredientTag");
     ingredientsList.appendChild(ingredientItem);
   });
  }
  
  let selectedTagIngredient = null;
  //Fonction pour créer un tag d'ingrédient
  function createIngredientTag(ingredient) {
    const ingredientTag = document.createElement('div');
    ingredientTag.textContent = ingredient;
    ingredientTag.classList.add('selectedTag');
  
    const closeIcon = document.createElement('span');
    closeIcon.innerHTML = '&times;';
    closeIcon.classList.add('closeIcon');
  
    closeIcon.addEventListener('click', () => {
      ingredientTag.remove();
      // Retirer l'élément de la liste des éléments sélectionnés
      const index = selectedIngredients.indexOf(ingredient);
      if (index > -1) {
        selectedIngredients.splice(index, 1);
      }
      searchRecipe();
    });
  
    ingredientTag.appendChild(closeIcon);
    const tag = document.querySelector('.tag');
    tag.appendChild(ingredientTag);
  }
  // Ajouter un écouteur d'événements click à chaque ingredients de la liste
  function addClickEventListenerIngredients(ingredientItem, ingredient) {
    ingredientItem.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!selectedIngredients.includes(ingredient)) {
        createIngredientTag(ingredient);
        selectedIngredients.push(ingredient);
        selectedTagIngredient = ingredient.toLowerCase();
        searchRecipe();
      }
    });
  }