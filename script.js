let page = 1;


const fetchAndDisplayImage = async () => {
    const searchString = document.getElementsByClassName("search-bar")[0].value;

    const encodedSearchString = encodeURIComponent(searchString)

    const result = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchString}&fields=id,title,image_id,artist_title,date_display,place_of_origin,artwork_type_title&page=${page}&limit=16`)
    const parsedResponse = await result.json();
    //console.log(parsedResponse)
    const htmlArray = [];
    for (let i = 0; i < parsedResponse.data.length; i++) {
        const imgSrc = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`
        const titleSrc=`${parsedResponse.data[i].title}`
        const artistSrc=`${parsedResponse.data[i].artist_title}`
        const originSrc=`${parsedResponse.data[i].place_of_origin}`
        const dateSrc=`${parsedResponse.data[i].date_display}`
        const mediumSrc=`${parsedResponse.data[i].artwork_type_title}`
        const imgHtml = `<div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${imgSrc}" alt= Avatar style ="width:600px;height:600px;">
          </div>
          <div class="flip-card-back">
            <h1>Title: ${titleSrc}</h1>
            <h2>Artist: ${artistSrc}</h2>
            <h3>Year: ${dateSrc}</h3>
            <h3>Place of Origin: ${originSrc}</h3>
            <h4>Medium: ${mediumSrc}</h4>
          </div>
        </div>
      </div>`
        htmlArray.push(imgHtml)
    }

    const htmlString = htmlArray.join('');
    document.getElementById("imageContainer").innerHTML = htmlString;
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    paginationContainer.className = "pagination"

    removeActiveClass();
    page = 1
    addActiveClass(1)

    fetchAndDisplayImage();
})

const paginationContainer = document.getElementsByClassName("pagination")[0];

const removeActiveClass = () => {
    const currentActiveButton = document.getElementById(page);
    currentActiveButton.className = "pageNumber";
}

const addActiveClass = (pageNumber) => {
    const newActiveButton = document.getElementById(pageNumber);
    newActiveButton.className = "active pageNumber"
}

paginationContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("pageNumber") && event.target.id != page) {
        removeActiveClass();
        page = event.target.id;
        addActiveClass(page)
        fetchAndDisplayImage();
    }
})

const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");

decrementButton.addEventListener("click", () => {
    if (page > 1) {
        removeActiveClass();
        page--
        addActiveClass(page);
        fetchAndDisplayImage();
    }
})

incrementButton.addEventListener("click", () => {
    if (page < 6) {
        removeActiveClass();
        page++
        addActiveClass(page);
        fetchAndDisplayImage();
    }
})

