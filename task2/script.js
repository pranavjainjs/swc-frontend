const API_KEY = 'api_key=5cc7921c644b888a978c2598e2a84c71';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
var list;
var flag = 0;

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        list = data.results;
        assignData(list);
    })

async function defaultList(){
    document.getElementById('bunch').innerHTML = '';
    let response = await fetch(API_URL);
    let data = await response.json();
    assignData(list);
}

// window.body.addEventListener('load', defaultList);
// document.getElementById('quick_search').addEventListener('keydown', search);

function assignData(list) {
    let i=0;
    for(; i<list.length; i++){
        const card = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h2');
        const rating = document.createElement('p'); 
        const link = 'https://www.imdb.com/find?q=' + list[i].title.replace(/ /g, '+') + '&ref_=nv_sr_sm';
        const texttt = document.createElement('p');
        texttt.innerText = link;
        // const desc = document.createElement('div');
        // const overview = document.createElement('p');

        card.classList.add("text-center", 'rounded-lg', 'bg-gray-200', 'shadow-lg', 'w-80', 'p-2', 'relative', 'hover:scale-100', 'ease-in', 'duration-300', 'hover:drop-shadow-xl', 'scale-95');
        img.classList.add('opacity-100', 'hover:opacity-80', "w-64", 'm-auto', 'p-2', 'pb-2', 'hover:scale-105', 'ease-in', 'duration-300');
        title.classList.add('pt-2', 'text-xl', 'font-serif');
        // desc.classList.add('w-64', 'absolute', 'bg-black', 'text-white');

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);
        document.getElementById("bunch").appendChild(card);
        // desc.appendChild(overview);
        
        // card.addEventListener('hover', displayDesc);
        title.onclick = () => window.open(link);
        title.onmouseover = () => title.classList.add('cursor-pointer')
        // title.onclick = () => console.log(link);

        img.src = IMG_URL + list[i].poster_path;
        title.innerText = list[i].title;
        rating.innerText = list[i].vote_average + '\n (' + list[i].vote_count + ' votes)';
        // overview.innerText = list[i].overview;
    }
    if(i < 3){
            document.getElementById('container').classList.remove('h-auto');
            document.getElementById('container').classList.add('h-screen');
            document.body.classList.add('overflow-hidden')
        }
        else{
            document.body.classList.add('overflow-y-scroll');
            document.getElementById('container').classList.add('h-auto');
            document.getElementById('container').classList.remove('h-screen');
        }   
}

async function search2(){

    if(document.getElementById('quick_search').value === "") {
        document.getElementById('quick_search').placeholder = "enter a query";
        defaultList();
        flag = 0;
        return;
    }

    document.getElementById('bunch').innerHTML = '';
    let query = document.getElementById('quick_search').value.trim().toLowerCase();
    const searchQueryURL = searchURL+'&query='+query;
    let mysearchresult = await fetch(searchQueryURL);
    mysearchresult = await mysearchresult.json();
    // console.log(mysearchresult);
    assignData(mysearchresult.results);
    flag = 1;
    return;
}

const addbtn = document.getElementById('add');
var page = 2;

addbtn.onclick = () => {
    if(flag === 0){
        const API_URL_PAGE = API_URL + "&&page=" + page;
        addMovies(API_URL_PAGE, page);
        page++;
    } else{
        let query = document.getElementById('quick_search').value.trim().toLowerCase();
        const searchQueryURL = searchURL+'&query='+query;
        const searchNextPage = searchQueryURL + "&&page=" + page;
        addMovies(searchNextPage, page);
        page++;
    }
}

function addMovies(link, page){
    fetch(link)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        list = data.results;
        assignData(list);
    })
}

/*

function search(){

    const searchResult = [];

    document.getElementById('bunch').innerHTML = '';
    let query = document.getElementById('quick_search').value.trim().toLowerCase();
    for(let i = 0; i < list.length; i++){
        if(list[i].title.toLowerCase().includes(query) /*  || list[i].overview.toLowerCase().includes(query)){
            const card = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h2');
            const rating = document.createElement('p');
            searchResult[index++] = list[i];

            card.classList.add("text-center", 'rounded-lg', 'bg-gray-100', 'shadow-md', 'w-80', "h-auto", 'p-2');
            img.classList.add('opacity-100', 'hover:opacity-80', "w-64", 'm-auto', 'p-2', 'pb-2');
            title.classList.add('pt-2', 'text-xl', 'font-serif')

            // card.style.backgroundImage = 'url(${IMG_URL} + ${list[0].poster_path})'

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(rating);
            document.getElementById("bunch").appendChild(card);

            img.src = IMG_URL + list[i].poster_path;
            title.innerText = list[i].title;
            rating.innerText = list[i].vote_average + '\n (' + list[0].vote_count + ' votes)';
            if(index < 3){
                document.getElementById('container').classList.remove('h-auto');
                document.getElementById('container').classList.add('h-screen');
                document.body.classList.add('overflow-hidden')
            }
            else{
                document.body.classList.add('overflow-y-scroll');
                document.getElementById('container').classList.add('h-auto');
                document.getElementById('container').classList.remove('h-screen');
            }        
        }
    }
    
    
}*/