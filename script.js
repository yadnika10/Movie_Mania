
const container = document.getElementById("container");
const MovieName = document.getElementById('SearchMovie')
let page = 1;

// ---------Debounce Effect--------<!-- YSS -->
let debounceEffect = debounce(movieFetch,1000)

function debounce(movieFetch,delay){
    let timeOutId;
    return ()=>{
        if(timeOutId){
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(movieFetch,delay)
    }
}
MovieName.addEventListener("keyup",()=>{
    page = 1;
    container.textContent = '';
    debounceEffect()
})

//-----------------Movie Fetch-------------<!-- YSS -->
async function movieFetch(){
    let value = MovieName.value
    try{
        if(value == ''){
            const h1 = document.createElement('div')
            h1.classList = 'Explore'

            h1.innerHTML = `Whats your favourite Movie
            <i class="fa-solid fa-question"></i>`
            
            container.appendChild(h1)
        }
        let data = await fetch(`https://www.omdbapi.com/?&apikey=15562d17&s=${value}&page=${page}`);
        let JsonData = await data.json();

        page++;
        CreateMovieCards(JsonData)

    }
    catch(error){
        console.log("Unable to Fetch")
    }
    
}
// -----Create Movie Cards--------<!-- YSS -->

function CreateMovieCards(Movie_Data){
    console.log(Movie_Data)
    simulateLoading();
    let SearchMoviedata = Movie_Data.Search

    try{
        SearchMoviedata.forEach(element => {
            if(element.Poster === 'N/A'){
                console.log("Image is unavailable....")
            }else{
                const poster = document.createElement('img');
                poster.src = element.Poster;

                const MCard = document.createElement('div');
                MCard.classList = `Mcard`

                const Title = document.createElement('h4')
                Title.classList = `title`

                const HoldDiv = document.createElement('div');
                HoldDiv.classList = `hold_div`

                Title.innerText = element.Title

                const year = document.createElement('p')
                year.classList = `Year`

                year.textContent = element.Year
                
                poster.addEventListener('click',function(){
                    FetchdataDetails(element);
                })

                MCard.appendChild(HoldDiv)
                HoldDiv.appendChild(poster)
                HoldDiv.appendChild(Title)
                HoldDiv.appendChild(year)
                container.appendChild(MCard)
            }
        });
    }
    catch(error){
        console.log("error")
    }
    
}
movieFetch();

//Show More::-----Pagination-----<!-- YSS -->

ShowMore.addEventListener('click',function(){
    movieFetch();
})

//Show Movie Details::-------Modal View---------YSS

async function FetchdataDetails(Mydata){
    console.log(Mydata)
    newfetch(Mydata.imdbID)
}

const forms = document.getElementById('forms')
const main = document.getElementById('Main')

async function newfetch(ID){
        if(ID === 'N/A'){
            console.log("ID is unavailable")
        }
        const data = await fetch(`https://www.omdbapi.com/?i=${ID}&plot=full&apikey=15562d17`)
        const Jdata = await data.json();

        main.textContent = ''
        console.log(Jdata)
        createModal(Jdata)

}
// <!-- YSS -->
function createModal(data){
    my_modal.showModal();
    //Two sections in Main Div::----YSS-----

    //Poster Section::

        const div = document.createElement('div')
        div.classList = `Cont-cards`

        const Poster_sec = document.createElement('div');
        Poster_sec.classList = `Poster`

        const poster_img = document.createElement('img');
        poster_img.src = data.Poster

        //Text Section::
        const Text_sec  = document.createElement('div');
        Text_sec.classList = `TextArea`

        Text_sec.innerHTML = `
            <h1>${data.Title}</h1>
            <p class="Ita">${data.Year} -- ${data.Country} -- Rating: ${data.imdbRating}</p>
            <p><span>Actors: </span>${data.Actors}</p>
            <p><span>Director: </span>${data.Director}</p>
            <p><span>Writers: </span>${data.Writer}</p>
            <p><span>Genre: </span>${data.Genre}</p>
            <p><span>Release Date: </span>${data.Released}</p>
            <p><span>Box Office: </span>${data.BoxOffice}</p>
            <p><span>Movie Runtime: </span>${data.Runtime}</p>
            <p><span>Language: </span>${data.Language}</p>
            <p><span>Awards: </span>${data.Awards}</p>
            <p class="lineClamp">${data.Plot}</p>
        `

        //AppendChild::
        Poster_sec.appendChild(poster_img)
        div.appendChild(Poster_sec)
        div.appendChild(Text_sec);
        main.appendChild(div)
}

const Reset = document.getElementById('reset');
Reset.addEventListener('click',()=>{
    window.location.reload()
})


// Loader::

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}
  
function hideLoader() {
    document.getElementById("loader").style.display = "none";
    container.style.display = "flex"
}
  
function simulateLoading() {
    showLoader();
    setTimeout(function() {
      hideLoader();
    }, 800);
}
  
  