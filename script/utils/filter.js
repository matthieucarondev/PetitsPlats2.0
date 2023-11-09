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

// Récupérer la référence de l'élément de filtre des ingrédients
const ingredientsFilter = document.querySelector(
  ".btnFilter:nth-child(1) .searchFilter"
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
    addClickEventListenerIngredients(
      ingredientItem,
      ingredient,
      "selecteFilterTag"
    );
    // Vérifier si l'ingrédient est déjà sélectionné
    if (selectedIngredients.includes(ingredient)) {
      ingredientItem.classList.add("selecteFilterTag");
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
  const searchIngredient = document
    .querySelector("#filterIngrédients .searchFilter input")
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
    addClickEventListenerIngredients(
      ingredientItem,
      ingredient,
      "selecteFilterTag"
    );
    ingredientsList.appendChild(ingredientItem);
  });
}

let selectedTagIngredient = null;
//Fonction pour créer un tag d'ingrédient
function createIngredientTag(ingredient) {
  const ingredientTag = ` <button class="selectedTag" id="${ingredient}">
                               <span class="tagName" >${ingredient}</span>
                                <span class="closeIcon">
                                &times;
                              </span>
                            </button>`;

  const tag = document.querySelector(".tag");
  const range = document.createRange();
  range.selectNodeContents(tag);
  const cardIngredientTag = range.createContextualFragment(ingredientTag);
  tag.appendChild(cardIngredientTag);
  const closeIcon = document.getElementById(`${ingredient}`);
  closeIcon.addEventListener("click", () => {
    closeIcon.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      selectedIngredients.splice(index, 1);
    }
    searchRecipe();
  });
}
// Ajouter un écouteur d'événements click à chaque ingredients de la liste
function addClickEventListenerIngredients(ingredientItem, ingredient) {
  ingredientItem.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!selectedIngredients.includes(ingredient)) {
      createIngredientTag(ingredient);
      selectedIngredients.push(ingredient);
      selectedTagIngredient = ingredient.toLowerCase();
      searchRecipe();
    }
  });
}

////////////////////////////////////////////APPLIANCES////////////////////////////////////////
// Récupérer la référence de l'élément de filtre des appariel
const appliancesFilter =  document.querySelector(
  ".btnFilter:nth-child(2) .searchFilter"
);
// Récupérer la liste de tous les appareils du fichier JSON
const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance)) {
    appliances.push(recipe.appliance);
  }
  return appliances;
}, []);

// Générer les éléments HTML pour la liste des appareils
const appliancesList = document.createElement("div");
appliancesList.classList.add("filterlist");
let selectedAppliances = []; // Tableau pour stocker les éléments déjà sélectionnés

// Générer les éléments HTML pour la liste des ingrédients initiale
generateFilteredAppliancesList(allAppliances);
// Ajouter la liste des appareils au filtre des appareils
appliancesFilter.appendChild(appliancesList);

// Générer les éléments HTML pour la liste des appareils filtrés
function generateFilteredAppliancesList(appliances) {
  appliancesList.innerHTML = "";
  appliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.textContent = appliance;
    addClickEventListenerAppliances(applianceItem, appliance);
    if (selectedAppliances.includes(appliance)) {
      applianceItem.classList.add("selecteFilterTag");
    }
    appliancesList.appendChild(applianceItem);
  });
}

// Ajout d'un écouteur d'événement sur la liste d'ingredients
appliancesFilter.addEventListener("click", searchAppliances);
// Ajout d'un écouteur d'événement sur ingredients
appliancesFilter.addEventListener("input", searchAppliances);

// Fonction pour effectuer une recherche d'appareils
function searchAppliances() {
  // Récupération du terme de recherche et nettoyage
  const searchAppliances = document
    .querySelector("#filterAppareils .searchFilter input")
    .value.trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  // Filtrer les appareils en fonction du texte de recherche
  const filterAppliances = allAppliances.filter((appliance) =>
    appliance.toLowerCase().includes(searchAppliances)
  );

  // Supprimer les anciens éléments de la liste des appareils
  appliancesList.innerHTML = "";

  // Générer les nouveaux éléments HTML pour la liste des appareils filtrés
  filterAppliances.forEach((appliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.textContent = appliance;
    addClickEventListenerAppliances(
      applianceItem,
      appliance,
      "selecteFilterTag"
    );
    appliancesList.appendChild(applianceItem);
  });
}

let selectedTagAppliance = null;
//Fonction pour créer un tag d'ingrédient
function createApplianceTag(appliance) {
  const applianceTag = ` <button class="selectedTag" id="${appliance}">
                               <span class="tagName" >${appliance}</span>
                                <span class="closeIcon">
                                &times;
                              </span>
                            </button>`;

  const tag = document.querySelector(".tag");
  const range = document.createRange();
  range.selectNodeContents(tag);
  const cardApplianceTag = range.createContextualFragment(applianceTag);
  tag.appendChild(cardApplianceTag);
  const closeIcon = document.getElementById(`${appliance}`);
  closeIcon.addEventListener("click", () => {
    closeIcon.remove();
    // Retirer l'élément de la liste des éléments sélectionnés
    const index = selectedAppliances.indexOf(appliance);
    if (index > -1) {
      selectedAppliances.splice(index, 1);
    }
    searchRecipe();
  });
}

// Ajouter un écouteur d'événements click à chaque apareils de la liste
function addClickEventListenerAppliances(applianceItem, appliance) {
  applianceItem.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!selectedAppliances.includes(appliance)) {
      createApplianceTag(appliance);
      selectedAppliances.push(appliance);
      selectedTagAppliance = appliance.toLowerCase();
      searchRecipe();
    }
  });
}
