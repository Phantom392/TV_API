let charactersArr = [];
let show;
let looping = true;
let filter = 'search';
let url;

function setup(){
    document.getElementById('searchPage').style.display = 'none';
    let gotButton = document.getElementById("gotButton");
    gotButton.addEventListener("click", got);
    let hPButton = document.getElementById("hPButton");
    hPButton.addEventListener("click", hP);
    let lotrButton = document.getElementById("lotrButton");
    lotrButton.addEventListener("click", lotr);
    let backButton = document.getElementById('back');
    backButton.addEventListener('click', back);

    let gotMusic = document.getElementById('gotMusic');
    let hpMusic = document.getElementById('hpMusic');
    let lotrMusic = document.getElementById('lotrMusic');
}


function got(){
    gotMusic.play()
    looping = false;
    initSearch();
    show = 'got';
    url = 'https://anapioficeandfire.com/api/characters/';
    
    getAPI(url);
}



function hP(){
    hpMusic.currentTime = 5;
    hpMusic.play();
    looping = false;
    initSearch();
    show = 'hP';
    url = 'https://hp-api.onrender.com/api/characters';
    
    getAPI(url);
}


function lotr(){
    lotrMusic.play();
    looping = false;
    initSearch();
    show = 'lotr';
    url = 'https://the-one-api.dev/v2/character';

    getAPI(url);
}

setup();


function initSearch(){
    document.getElementById('searchPage').style.display = 'block';
    document.getElementById('search').innerHTML = null;
    document.getElementById('frontPage').style.display = 'none';
    filter = 'search';
    
    let search = document.createElement("input");
    search.setAttribute('type', 'text');
    search.setAttribute('value', 'search');
    search.setAttribute('id', 'searchBar');
    
    document.getElementById('search').appendChild(search);

    document.getElementById('search').addEventListener('submit', (event) => {
        event.preventDefault();
        filter = search.value;
        loadAPI();
    });
}

async function getAPI(url){
    charactersArr = [];
    document.getElementById('charactersTable').innerHTML = null;
    if(show == 'got'){

        looping = true;
        let count = 1;
        while(looping){
            //if(breakLoop){
            //    console.log('broken');
            //    looping = false;
            //    document.getElementById('charactersTable').innerHTML = null;
            //    charactersArr.shift();
            //    break;
            //}
            if(looping){
                try{
                    let receive = await fetch(url + count);
                    let character = await receive.json();
                    let obj = {
                        name: (character.name == '') ? 'Unknown' : character.name,
                        mother: (character.mother == '') ? 'Unknown' : character.mother,
                        father: (character.father == '') ? 'Unknown' : character.father,
                        born: (character.born == '') ? 'Unknown' : character.born,
                        aliases: (character.aliases == '') ? 'Unknown' : arrToString(character.aliases),
                        
                    }
                    if(character.mother != '') {
                        
                        let motherReceived = await fetch(character.mother);
                        let mother = await motherReceived.json();
                        obj.mother = mother.name;
                        
                    }
                    if(character.father != '') {
                        let fatherReceived = await fetch(character.father);
                        let father = await fatherReceived.json();
                        obj.father = father.name;
                    }
                    
                    charactersArr.push(obj);
                    count++;
                    loadAPI();
                }catch{
                    looping = false;
                    break;
                }
            } else {
                console.log('broken');
                looping = false;
                document.getElementById('charactersTable').innerHTML = null;
                charactersArr.shift();
                break;
            }
            
            //looping = false
        }
        console.log('done');
        
    }else if(show == 'hP'){
        let hPArrReceived = await fetch(url);
        let hPArr = await hPArrReceived.json();
        charactersArr = [];
        for(let i = 0; i < hPArr.length; i++) {
            let character = hPArr[i];
            let obj = {
                name: (character.name == '') ? 'Unknown' : character.name,
                aliases: (character.alternate_names == '') ? 'Unknown' : arrToString(character.alternate_names),
                house: (character.house == '') ? 'Unknown' : character.house,
                wandcore: (character.wand.core == '') ? 'Unknown' : character.wand.core,
                patronus: (character.patronus == '') ? 'Unknown' : character.patronus,
                image: (character.image == '') ? 'No Image Avaliable' : character.image,
            }
            charactersArr.push(obj);
        }
        loadAPI();
    }else if(show == 'lotr'){
        let lotrArrReceived = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer UM93BOggVbfv7HQmI2qX`
            }
        });
        let lotrArrData = await lotrArrReceived.json();
        let lotrArr = lotrArrData.docs;
        charactersArr = [];
        for(let i = 0; i < lotrArr.length; i++) {
            let character = lotrArr[i];
            let obj = {
                name: (!character.name) ? 'Unknown' : character.name,
                gender: (!character.gender) ? 'Unknown' : character.gender,
                race: (!character.race) ? 'Unknown' : character.race,
                realm: (!character.realm) ? 'Unknown' : character.realm,
                spouse: (!character.spouse) ? 'Unknown' : character.spouse
            }
            charactersArr.push(obj);
        }
        console.log(charactersArr);
        loadAPI();
    }
};

function arrToString(arr) {
    let str = '';
    for(let i = 0; i < arr.length; i++){
        str += arr[i];
        if (i != arr.length - 1){
            str += ', ';
        };
    };
    return str;
}

function loadAPI(){
    console.log(filter);
    document.getElementById('charactersTable').innerHTML = null;
    let keys = Object.keys(charactersArr[0]);
    for(let i = 0; i < charactersArr.length; i++){
        if(filter == 'search' || charactersArr[i].name.toLowerCase().includes(filter.toLowerCase())){
            createTD(keys, i);
        };
        if(charactersArr[i].aliases){
            if(charactersArr[i].aliases.toLowerCase().includes(filter.toLowerCase())){
                createTD(keys, i);
            };
        };
        
    }
    
};

function createTD(keys, i) {
    let td = document.createElement('td');
    if(keys.length == 6 && charactersArr[i].image != 'No Image Avaliable') {
        console.log('images');
        let image = document.createElement('img');
        image.setAttribute('src', charactersArr[i][keys[5]]);
        td.appendChild(image);
    };
    let one = document.createElement('p');
    one.innerHTML = `${keys[0]}: ${charactersArr[i][keys[0]]}`;
    td.appendChild(one);
    let two = document.createElement('p');
    two.innerHTML = `${keys[1]}: ${charactersArr[i][keys[1]]}`;
    td.appendChild(two);
    let three = document.createElement('p');
    three.innerHTML = `${keys[2]}: ${charactersArr[i][keys[2]]}`;
    td.appendChild(three);
    let four = document.createElement('p');
    if(keys[3] == 'wandcore'){
        four.innerHTML = `Wand Core: ${charactersArr[i][keys[3]]}`
    } else {
        four.innerHTML = `${keys[3]}: ${charactersArr[i][keys[3]]}`;
    }
    td.appendChild(four);
    let five = document.createElement('p');
    five.innerHTML = `${keys[4]}: ${charactersArr[i][keys[4]]}`;
    td.appendChild(five);
    document.getElementById('charactersTable').appendChild(td);

};

function back() {
    gotMusic.pause();
    hpMusic.pause();
    lotrMusic.pause();

    gotMusic.currentTime = 0;
    lotrMusic.currentTime = 0;

    document.getElementById('searchPage').style.display = 'none';
    document.getElementById('frontPage').style.display = 'block';
}