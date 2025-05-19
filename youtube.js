// load categories and display category buttons
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};
loadCategories();
const displayCategories = (categories) => {
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  categories.forEach((category) => {
    //console.log(category);
    const btn = document.createElement("button");
    btn.classList = 'btn'
    btn.innerText = category.category;
    categoryBtnContainer.appendChild(btn);
});
};
