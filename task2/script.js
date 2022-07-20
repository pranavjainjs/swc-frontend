const API_KEY = 'api_key=5cc7921c644b888a978c2598e2a84c71';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
var list;

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
    let i=0
    for(; i<list.length; i++){
        const card = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h2');
        const rating = document.createElement('p');        

        card.classList.add("text-center", 'rounded-lg', 'bg-gray-200', 'shadow-lg', 'w-80', 'p-2');
        img.classList.add('opacity-100', 'hover:opacity-80', "w-64", 'm-auto', 'p-2', 'pb-2');
        title.classList.add('pt-2', 'text-xl', 'font-serif')

        // card.style.backgroundImage = 'url(${IMG_URL} + ${list[0].poster_path})'

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);
        document.getElementById("bunch").appendChild(card);

        img.src = IMG_URL + list[i].poster_path;
        title.innerText = list[i].title;
        rating.innerText = list[i].vote_average + '\n (' + list[i].vote_count + ' votes)';

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
        return;
    }

    document.getElementById('bunch').innerHTML = '';
    let query = document.getElementById('quick_search').value.trim().toLowerCase();
    const searchQueryURL = searchURL+'&query='+query;
    let mysearchresult = await fetch(searchQueryURL);
    mysearchresult = await mysearchresult.json();
    // console.log(mysearchresult);
    assignData(mysearchresult.results);
    return;
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