
let currentVideos = [];
let isSorted = false;

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
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn category-btn">${category.category}</button>
    `
    categoryBtnContainer.appendChild(div);
  });
};

// load videos and display videos
const loadVideos = async (searchText = '') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await res.json();
  currentVideos = data.videos;
  displayVideos(currentVideos);
};
loadVideos();
const displayVideos = (videos) => {
  console.log(videos);
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = '';
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = ''
    card.innerHTML = `
  <figure>
    <img class="h-[200px] w-full"
      src=${video.thumbnail} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <p class="text-sm text-gray-600">${video.others?.views || "0"} views</p>

    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};
// load and display videos by category
const loadCategoryVideos = async (categoryId) => {
  const allButtons = document.querySelectorAll('.category-btn');
  allButtons.forEach((btn) => btn.classList.remove('active'));
  // add active class 
  const activeBtn = document.getElementById(`btn-${categoryId}`);
  activeBtn.classList.add('active')
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`);
  const data = await res.json()
  displayVideos(data.category);
}
// display category by seatch text
 document.getElementById('search-input').addEventListener('keyup', (e) => {
  loadVideos(e.target.value);
 })
 const sortVideosByviews = () => {
    if(!currentVideos || currentVideos.length === 0){
      return 'There is no videos to show';
    }
    const sortedVides = [...currentVideos].sort((a,b) => {
      const viewsA =  parseFloat(a.others?.views?.replace('k', '')) || 0;
      const viewsB =  parseFloat(b.others?.views?.replace('k', '')) || 0;
      return isSorted? viewsA - viewsB: viewsB - viewsA;
    });
    isSorted = !isSorted;
    displayVideos(sortedVides)
 }

 document.getElementById('sort-btn').addEventListener('click', sortVideosByviews);

