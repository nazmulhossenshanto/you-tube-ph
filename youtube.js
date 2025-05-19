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
    btn.classList = "btn";
    btn.innerText = category.category;
    categoryBtnContainer.appendChild(btn);
  });
};

// load videos and display videos
const loadVideos = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await res.json();
  displayVideos(data.videos);
};
loadVideos();
const displayVideos = (videos) => {
  console.log(videos);
  const videoContainer = document.getElementById("videos-container");
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
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};
