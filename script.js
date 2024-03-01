// first generate button from categories

const newsCategories = async () => {
  const URL = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(URL);
  const data = await res.json();
  const mainData = data.data.news_category;

  // navbar button generate
  mainData.forEach((element) => {
    const navbarBtns = document.querySelector("#main-navbar");
    const li = document.createElement("li");
    li.innerHTML = `
                               
                                        <a href="#"
                                             class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                             aria-current="page" onclick="generateAllNews('${element.category_id}')">${element.category_name}</a>

`;
    navbarBtns.appendChild(li);
  });
};
newsCategories();

//generate all news in category wise
const generateAllNews = async (category_id) => {
  const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(URL);
  const data = await res.json();
  const mainNewsData = data.data;
  //   console.log(mainNewsData);
  // blank old data
  const newsContainer = document.querySelector(".news-container");
  newsContainer.innerHTML = "";

  //generate all news by all category
  mainNewsData.forEach((element) => {
    // console.log(element)
    const div = document.createElement("div");
    div.classList = "news m-5";
    div.innerHTML = `
     <a href="#"
                         class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                         <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                              src="${element.thumbnail_url}"
                              alt="">
                              
                         <div class="flex flex-col justify-between p-4 leading-normal">
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  ${element.title}</h5>
                              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.details.slice(
                                0,
                                150
                              )}</p>
                              <div class="flex justify-between items-center">
                                   <div class="author">
                                        <figcaption class="flex items-center justify-center ">
                                             <img class="rounded-full w-9 h-9"
                                                  src="${element.author.img}"
                                                  alt="profile picture">
                                             <div
                                                  class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                                                  <div>${
                                                    element.author.name
                                                  }</div>
                                                  <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at
                                                       Open AI</div>
                                             </div>
                                        </figcaption>
                                   </div>

                                   <button
                                        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                        <span
                                             class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                             Read More
                                        </span>
                                   </button>

                              </div>

                         </div>
                    </a>

`;
    newsContainer.appendChild(div);
  });
};
generateAllNews("01");

const searchBar = () => {};
const searchValue = document.querySelector("#search-navbar");

//
// search Button
searchValue.addEventListener("keypress", (e) => {
  const alert = document.querySelector("#alert");
  if (e.key === "Enter") {
    if (isNaN(searchValue.value)) {
      alert.classList.remove("hidden");
      setTimeout(() => {
        alert.classList.add("hidden");
      }, 3000);
    } else {
      generateAllNews(searchValue.value);
    }
    searchValue.value = "";
  }
});
