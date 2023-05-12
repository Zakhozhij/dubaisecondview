function funSearchFlight(){
    // показываем процесс закгрузки
    $('.section-boot-screen').toggleClass('active');

    const dataFlight = JSON.parse(localStorage.getItem('flightSearch'));

    // данные для экрана загрузки
    $('#loading_from .city').text(dataFlight.from.cityName === '' ? dataFlight.multiAdd[0].cityNameMultiAddFrom : dataFlight.from.cityName)
    $('#loading_from .arpt').text(dataFlight.from.airportName === '' ? dataFlight.multiAdd[0].airportNameMultiAddFrom : dataFlight.from.airportName)
    $('#loading_to .city').text(dataFlight.to.cityName === '' ? dataFlight.multiAdd[0].cityNameMultiAddTo : dataFlight.to.cityName)
    $('#loading_to .arpt').text(dataFlight.to.airportName === '' ? dataFlight.multiAdd[0].airportNameMultiAddTo : dataFlight.to.airportName)


    setTimeout(function() {
        // скрываем процесс загрузки
        $('.section-boot-screen').toggleClass('active');
        // добавляем изменение на главной стр
        $('.section-home').toggleClass('disabled');
        $('.breadcrumb_search').toggleClass('active')
        $('.section-special-offer').toggleClass('disabled');
        $('.section-selling').toggleClass('disabled');
        $('.section-benefits').toggleClass('disabled');
        $('.section-form').toggleClass('disabled');
        $('.section-search-results').toggleClass('active');
    }, 5000)
}

settingFormValues()

// утсановка значений после поиска
function settingFormValues() {
    let flightSearchForm = $('.tab-pane.active form')[1];

    if(flightSearchForm !== undefined){
        const dataFlight = JSON.parse(localStorage.getItem('flightSearch'));
        let random, arrTest = [];

        //проверка типа билета и получение рандомного числа
        dataFlight.passenger.type === 'Business' ?  random = Math.random() * (7 - 2) + 2 :  random = Math.random() * (37 - 32) + 32;

        //изменение стоимости
        for(let i = 0; i < $('.price .initial_cost span').length; i++){
            arrTest.push($('.price .initial_cost span')[i])
        }

        $('.price h2 span').text((Number($('.price h2 span').text()) + Number($('.price h2 span').text()) * Number(random.toFixed(2)) / 100).toFixed(3))

        arrTest.map(item => {
            item.innerHTML = (Number(item.innerHTML) + Number(item.innerHTML) * Number(random.toFixed(2)) / 100).toFixed(3);
        })

        $('.add_field .container-field input').val('')
        $('.add_field .container-field:nth-child(2)').remove();

        // from
        flightSearchForm.elements.from === undefined ? '' : flightSearchForm.elements.from.value =  dataFlight.from.cityName;
        flightSearchForm.elements.cityAirport === undefined ? '' : flightSearchForm.elements.cityAirport.value =  dataFlight.from.airportName;
        flightSearchForm.elements.fromTest === undefined ? '' : flightSearchForm.elements.fromTest.value = dataFlight.from.cityNameMulti;
        flightSearchForm.elements.cityAirportTest === undefined ? '' : flightSearchForm.elements.cityAirportTest.value = dataFlight.from.airportNameMulti;

        // to
        flightSearchForm.elements.to === undefined ? '' : flightSearchForm.elements.to.value =  dataFlight.to.cityName;
        flightSearchForm.elements.cityAirportTo === undefined ? '' : flightSearchForm.elements.cityAirportTo.value =  dataFlight.to.airportName;
        flightSearchForm.elements.toTest === undefined ? '' : flightSearchForm.elements.toTest.value = dataFlight.to.cityNameMulti;
        flightSearchForm.elements.cityAirportToTest === undefined ? '' : flightSearchForm.elements.cityAirportToTest.value =  dataFlight.to.airportNameMulti;

        // departure
        $('.modal_start').val(dataFlight.departureDate.date);
        $('.dayModal1').text(dataFlight.departureDate.dayWeek);

        // return
        $('.modal_end').val(dataFlight.returnDate.date);
        $('.oneWayReturn').val('')
        $('.dayModal2').text(dataFlight.returnDate.dayWeek);

        // passenger
        $('.modal_passengers').text(dataFlight.passenger.allPassenger);

        // inf pers
        flightSearchForm.elements.adults.value = dataFlight.passenger.adults;
        flightSearchForm.elements.children.value = dataFlight.passenger.children;
        flightSearchForm.elements.infants.value = dataFlight.passenger.infants;
        $('.type_ticket_passenger').text(dataFlight.passenger.type);

        // блок с информацией о билете, вывод заголовка
        $('.section-search-results .inf_price .title h2').text((dataFlight.from.cityName === '' ? dataFlight.multiAdd[0].cityNameMultiAddFrom : dataFlight.from.cityName) + ' - ' + (dataFlight.to.cityName === '' ? dataFlight.multiAdd[0].cityNameMultiAddTo : dataFlight.to.cityName))

        if(dataFlight.multiAdd.length > 1){
            $('.multiAddValue .btn_switch').remove();
            $('.multiAddValue .multiData').css('display','none');
            $('.add_field .container-field').remove();

            dataFlight.multiAdd.filter(function (item) {

                let label = document.createElement("div");
                label.setAttribute('class', 'container-field')

                label.innerHTML = ' <div class="btn_switch">\n' +
                    '\n' +
                    '                                        <div class="switch_multi">\n' +
                    '                                            <div class="icon">\n' +
                    '                                                <i class="icon-double-arrow"></i>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <div class="field block_error city">\n' +
                    '                                            <div class="flex">\n' +
                    '                                                <div class="block_input">\n' +
                    '                                                    <p class="name_block">From</p>\n' +
                    '                                                    <div class="search-input">\n' +
                    '                                                        <a href="" target="_blank" hidden></a>\n' +
                    `                                                        <input required value='${item.cityNameMultiAddFrom}' name="fromMulti[]"  type="text" class="input_fromMult" placeholder="Enter City or Airport" autocomplete="off">\n` +
                    `                                                        <input value='${item.airportNameMultiAddFrom}' name="cityAirportMulti[]" type="text" class="cityAirportMulti" readonly>\n` +
                    '                                                        <div class="autocom-box"></div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '\n' +
                    '                                                <div class="block_photo">\n' +
                    '                                                    <div class="icon">\n' +
                    '                                                        <img src="../img/icons/airplane-1.svg" alt="">\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '\n' +
                    '                                        <div class="field block_error city">\n' +
                    '                                            <div class="flex">\n' +
                    '                                                <div class="block_input">\n' +
                    '                                                    <p class="name_block">To</p>\n' +
                    '                                                    <div class="search-input">\n' +
                    '                                                        <a href="" target="_blank" hidden></a>\n' +
                    `                                                        <input required value='${item.cityNameMultiAddTo}' name="toMulti[]" type="text" class=" input_toMulti" placeholder="Enter City or Airport" autocomplete="off">\n` +
                    `                                                        <input value='${item.airportNameMultiAddTo}' name="cityAirportToMulti[]" type="text" class="cityAirportToMulti" readonly>\n` +
                    '                                                        <div class="autocom-box"></div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '\n' +
                    '                                                <div class="block_photo">\n' +
                    '                                                    <div class="icon icon_to">\n' +
                    '                                                        <img src="../img/icons/airplane-1.svg" alt="">\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="field_calendar">\n' +
                    '\n' +
                    '                                        <div class="flex flex_decoration input-group input-daterange jDaterange">\n' +
                    '                                            <div class="field block_error ">\n' +
                    '                                                <div class="block_input">\n' +
                    '                                                    <p>Departure </p>\n' +
                    '                                                    <div class="date">\n' +
                    `                                                        <input required class="input_departure inputDate from fromSearchResult" value='${item.dateAddDeparture}' name="date_startMulti[]" placeholder="Select date" type="text" readonly />\n` +
                    '                                                        <span class="input-group-addon">\n' +
                    '                                                        <i class="icon-calendar"></i>\n' +
                    '                                                    </span>\n' +
                    '                                                    </div>\n' +
                    `                                                    <h5 class="dayName dayNameForm1_1 dayMulti">${item.dayWeekAddDeparture}</h5>\n` +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '\n' +
                    '                                            <div class="field block_error field_return">\n' +
                    '                                                <div class="block_input block_return disabled">\n' +
                    '                                                    <p>Return</p>\n' +
                    '                                                    <div class="date">\n' +
                    `                                                        <input disabled placeholder="Select date" type="text" readonly />\n` +
                    '                                                        <span class="input-group-addon">\n' +
                    '                                                            <i class="icon-calendar"></i>\n' +
                    '                                                        </span>\n' +
                    '                                                    <span class="icon">\n' +
                    '                                                                <i class="icon-calendar"></i>\n' +
                    '                                                            </span>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="btn_delete">\n' +
                    '                                        <div class="icon">\n' +
                    '                                            <i class="icon-delete"></i>\n' +
                    '                                        </div>\n' +
                    '                                        <h3>Delete flight</h3>\n' +
                    '                                    </div>'

                $('.add_field_multi').append(label);

                addCalendar()

                $(".inputDate").on("change",function(){
                    const d = new Date($(this).val());
                    let day = weekday[d.getUTCDay()];
                    //для формы round-trip
                    $(this).closest('.date').parent().find('.dayName').text(day)
                    //удаление класса с ошибкой после выбора даты
                    $(this).closest('.field').removeClass('error')
                    $(this).closest('.field input.error').removeClass('error')
                });

                $('.add_field_multi .container-field:first-child').find('.btn_delete').remove();

            })
        }
    }
}

function radioTypeTicketSearch(){
    let flightSearchForm = document.forms.setValueForm;
    $('.type_ticket_passenger').text(flightSearchForm.elements.type_ticket.value);
}

