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