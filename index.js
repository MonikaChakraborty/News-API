const handleCategory = async() => {

    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    // .then((res) => res.json())
    // .then((data) => console.log(data));

    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");

    const trimmedData = data.data.news_category.slice(0, 3);

    trimmedData.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;

        tabContainer.appendChild(div);
    });

    // data.data.news_category.slice(0, 3).forEach((category) => {
    //     console.log(category);
    //      const div = document.createElement("div");
    //      div.innerHTML = `
    //      <a class="tab">${category.category_name}</a>
    //      `;

    //      tabContainer.appendChild(div);
    // })
    // console.log(data.data.news_category);

};

const handleLoadNews = async (categoryId) => {

    console.log(categoryId);

    const response = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${categoryId}`
        );

        const data = await response.json();

        const cardContainer = document.getElementById("card-container");

        cardContainer.innerHTML = "";

        data.data.forEach((news) => {
            const div = document.createElement('div');
            
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
            <figure>
            <img src=${news?.image_url} />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
              ${news.title.slice(0,40)}

              <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>

              </h2>
              <p>
              ${news.details.slice(0,50)}
              </p>

              <h3>Total Views: ${news.total_view ? news.total_view : "no views"}</h3>

              <div class="card-footer flex justify-between mt-8">
              <div class="flex">
                <div>
                    <div class="avatar online">
                        <div class="w-14 rounded-full">
                            <img src=${news.author?.img} alt="">

                        </div>

                    </div>
                </div>

                <div>
                    <h6>${news.author?.name}</h6>
                    <small>${news.author?.published_date}</small>
                </div>
            </div>
            <div class="card-detailed-btn">
            
            <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition-duration-200 ease-in-out hover:bg-gray-900">
            Details
            </button>
            </div>

            </div>
        </div>
    </div> 
            
            `;

            cardContainer.appendChild(div);
        });
};



handleCategory();
handleLoadNews("01");