const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6b7f6bd894mshf502ffe416d7d4dp1417abjsn4c048326df8e',
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    }
};


//получение данных аэропортов
let inputSearch = document.querySelectorAll(".search-input");
let inputBox, listBox, valueCityRequest;

getAllInputSearch()

function getAllInputSearch(){
    inputSearch = document.querySelectorAll(".search-input");
    inputSearch.forEach(function (item) {

        $('.search-input input').on('focus', function (){
            item = this.closest('.search-input');
            inputBox = item.querySelector("input");
            listBox = item.querySelector(".autocom-box");

            inputBox.onkeyup = (e)=>{
                //значение пользователя
                let userValue = e.target.value;
                let emptyArray = [];

                if(userValue.length < 3 && $('.search-input').hasClass('active')){
                    inputBox.closest('.search-input.active').classList.remove("active");
                    listBox.classList.remove('active');
                }

                if(userValue.length > 2){

                    // get value api
                    fetch(`https://aerodatabox.p.rapidapi.com/airports/search/term?q=${userValue.toLowerCase()}&limit=250&withSearchByCode=true`, options)
                        .then(res => res.json())
                        .then(response =>{

                            valueCityRequest = response.items;

                            emptyArray = valueCityRequest.filter((data)=>{
                                let city = data.shortName;
                                return city;
                            });

                            emptyArray = emptyArray.map((data)=>{
                                // вывод аэропортов
                                if(String(data.municipalityName).toUpperCase().startsWith(String(userValue).toUpperCase()) ||
                                   String(data.iata).toUpperCase().startsWith(String(userValue).toUpperCase())){
                                    return `<li><h4>${data.shortName + ' airport'}</h4><h5>${data.municipalityName}</h5></li>`
                                }
                            });

                            item.classList.add("active");
                            listBox.classList.add('active');
                            showSuggestions(emptyArray);
                            let allList = listBox.querySelectorAll("li");
                            for (let i = 0; i < allList.length; i++) {
                                allList[i].setAttribute("onclick", "valueInputAirport(this)");
                            }
                        })
                        .catch(err => console.error(err));
                }
                else{
                    item.classList.remove("active"); //hide autocomplete box
                }
            }
        })
    })
}


function showSuggestions(list){
    let listData = list.join('');
    listBox.innerHTML = listData;
}

// выбор значения табом
$(document).on('mouseenter', '.autocom-box.active li', function () {
    let el = this;
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 9) {
            valueInputAirport(el)
            getAllInputSearch()
        }
    });
});

// если курсор находится не на элементе
document.addEventListener('keydown', function(event) {
    let el = null
    if (event.keyCode === 9) {
        el = $('.autocom-box.active li')[0]
        valueInputAirport(el)
        getAllInputSearch()
    }
});

// вывод в инпуты результат поиска аэропорта
function valueInputAirport(value){
    inputBox.value = value.querySelector('h5').textContent;
    inputBox.nextSibling.nextSibling.value = value.querySelector('h4').textContent;

    if(inputBox.classList.contains('input_from')){
        $('.input_from').val(value.querySelector('h5').textContent);
        $('.cityAirport').val(value.querySelector('h4').textContent)
    }
    else if(inputBox.classList.contains('input_to')){
        $('.input_to').val(value.querySelector('h5').textContent);
        $('.cityAirportTo').val(value.querySelector('h4').textContent)
    }

    let el = inputBox.closest('.search-input');
    if(el.classList.contains('active')){
        inputBox.closest('.search-input.active').classList.remove("active");
    }
    listBox.classList.remove('active');
}

