$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

//валидация формы заявки
$('form.form-valid').each(function () {
    $(this).validate({
        ignore: ':hidden:not(:checkbox)',
        errorPlacement: function (error, element) {
            if (element.is(":checkbox")) {
                element.closest('label').append(error);
            } else {
                error.insertAfter(element);
            }
        },
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true,
                regex: /^[^!@#$%^&*]+[^\.]+@[^\.]+\.[a-zA-Z]{2,6}$/
            },
            checkbox: {
                required: true,
            },
            checkbox1: {
                required: true,
            },
            email_active: {
                email: true,
                regex: /^[^!@#$%^&*]+[^\.]+@[^\.]+\.[a-zA-Z]{2,6}$/
            },
        },

        messages: {
            name: '',
            phone: '',
            email: '',
            checkbox: '',
            checkbox1: '',
            email_active: '',
        },

        submitHandler: function (e) {
            if (!$(e).find('input[name=phone]').hasClass('errorClass')) {
                if (e.id === 'form_active_modal') {
                    document.cookie = "modal-active=true";
                    formModalChoose()
                    let json = $(e).serializeArray();
                    requestCrmPersonData(json, e.id)
                    requestCrmUserDataPopUp(json)
                }

                if (e.id === 'sendMes') {
                    formSubmit();
                    let json = $(e).serializeArray();
                    requestCrmPersonData(json, e.id)
                    requestCrmUserData(json)
                }

                if (e.id === 'sendMesModal') {
                    formModal()
                    let json = $(e).serializeArray();
                    requestCrmPersonData(json, e.id)
                    requestCrmUserData(json)
                }

                $('.modal.modal__form').removeClass('active');
                $('.modal.modal_feedback').addClass('active');
                $('.js-overlay-modal').addClass('active');
                $('form').trigger('reset');
            }
        }
    })
})

// вывод сообщения на обязательное поле
jQuery.extend(jQuery.validator.messages, {
    required: '',
});


$('form.form-valid-tab').each(function () {
    $(this).validate({
        ignore: ':hidden:not(:checkbox)',
        errorPlacement: function (error, element) {
            if (element.is(":checkbox")) {
                element.closest('label').append(error);
            } else {
                error.insertAfter(element);
            }
        },

        rules: {
            from: {
                required: true,
            },
            to: {
                required: true,
            },
            date_start: {
                required: true,
            },
            date_end: {
                required: true,
            },
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
                regex: /^[^!@#$%^&*]+[^\.]+@[^\.]+\.[a-zA-Z]{2,6}$/
            },
            checkbox: {
                required: true,
            },
            fromMulti: {
                required: true,
            },
            toMulti: {
                required: true,
            },
            date_startMulti: {
                required: true,
            },
            date_endMulti: {
                required: true,
            },
            phone: {
                required: true,
                minlength: 3
            },
            'fromMulti[]': {
                required: true,
            },
            fromTest: {
                required: true,
            },
            toTest: {
                required: true,
            },
        },

        messages: {
            from: '',
            to: '',
            date_start: '',
            date_end: '',
            name: '',
            email: '',
            checkbox: '',
            fromMulti: '',
            toMulti: '',
            date_startMulti: '',
            date_endMulti: '',
            phone: '',
            'fromMulti[]': ''
        },

        checkForm: function () {
            this.prepareForm();
            for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                if (this.findByName(elements[i].name).length != undefined && this.findByName(elements[i].name).length > 1) {
                    for (var cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
                        this.check(this.findByName(elements[i].name)[cnt]);
                    }
                } else {
                    this.check(elements[i]);
                }
            }
            return this.valid()
        },

        submitHandler: function (e) {

            const passengerValue = $('.number_passengers-all').text()

            let obj = {}
            let arrMultiValue = [];

            const cityMultiLength = $('.multi-city .container-field').length;

            for (let i = 0; i < cityMultiLength; i++) {
                obj[i] = {
                    cityNameMultiAddFrom: $('.input_fromMult')[i].value || '',
                    airportNameMultiAddFrom: $('.cityAirportMulti')[i].value || ' ',

                    cityNameMultiAddTo: $('.input_toMulti')[i].value || '',
                    airportNameMultiAddTo: $('.cityAirportToMulti')[i].value || ' ',

                    dateAddDeparture: $('.multi-city .from')[i].value || '',
                    dayWeekAddDeparture: document.querySelectorAll('.dayName.dayMulti')[i].textContent || '',
                }

                arrMultiValue.push(obj[i])
            }

            // функция на загрузку поиска билета
            if (e.id === '1' || e.id === '2' || e.id === '3') {
                const formElements = this.currentForm.elements;

                // формируем объект с данными формы
                const formData = {
                    from: {
                        cityName: formElements.from === undefined ? '' : formElements.from.value,
                        airportName: formElements.cityAirport === undefined ? '' : formElements.cityAirport.value,
                        cityNameMulti: formElements.fromMulti === undefined ? '' : formElements.fromMulti.value,
                        airportNameMulti: formElements.cityAirportMulti === undefined ? '' : formElements.cityAirportMulti.value,
                    },
                    to: {
                        cityName: formElements.to === undefined ? '' : formElements.to.value,
                        airportName: formElements.cityAirportTo === undefined ? '' : formElements.cityAirportTo.value,
                        cityNameMulti: formElements.toMulti === undefined ? '' : formElements.toMulti.value,
                        airportNameMulti: formElements.cityAirportToMulti === undefined ? '' : formElements.cityAirportToMulti.value,
                    },
                    departureDate: {
                        date: formElements.date_start.value,
                        dayWeek: $('.dayName.dayNameForm1_1')[0].textContent || document.querySelectorAll('.dayName.dayMulti')[0].textContent || ''
                    },
                    returnDate: {
                        date: formElements.date_end.value || '',
                        dayWeek: $('.dayName.dayNameForm1_2')[0].textContent || document.querySelectorAll('.dayName.dayMulti')[0].textContent || ''
                    },
                    passenger: {
                        type: formElements.type_ticket.value,
                        allPassenger: passengerValue[0],
                        adults: formElements.adults.value,
                        children: formElements.children.value,
                        infants: formElements.infants.value
                    },
                    multiAdd: arrMultiValue || ''
                }

                // записываем данные в локальное хранилище
                localStorage.setItem('flightSearch', JSON.stringify(formData))

                funSearchFlight()

                settingFormValues();

                // запуск анимации на процент
                let counter = 0, percent = 0;
                let i = setInterval(function () {
                    $(".loading_percentage").html(percent + "%");
                    counter++;
                    percent++;
                    if (counter == 101) {
                        clearInterval(i);
                    }
                }, 50);
            }

            let typeTicket = this.currentForm.elements.type_ticket.value

            if (e.id === 'inf_ticket_1') {
                let json = $('#inf_ticket_1').jqDynaForm('get');

                generatingRequestCrm(json, typeTicket)
                generatingRequestCrmPerson(json, typeTicket)

                formSubmitTicket()

                $('.modal.modal__form').removeClass('active');
                $('.modal.modal_feedback').addClass('active');
                $('.js-overlay-modal').addClass('active');
                $('.dayName').text('');
                $('form').trigger('reset');
            }

            if (e.id === 'inf_ticket_2') {
                let json = $('#inf_ticket_2').jqDynaForm('get');
                generatingRequestCrm(json, typeTicket)
                generatingRequestCrmPerson(json, typeTicket)

                formSubmitTicketTwo()

                $('.modal.modal__form').removeClass('active');
                $('.modal.modal_feedback').addClass('active');
                $('.js-overlay-modal').addClass('active');
                $('.dayName').text('');
                $('form').trigger('reset');
            }

            if (e.id === 'inf_ticket_3') {
                let json = $('#inf_ticket_3').jqDynaForm('get');
                let arrFromMulti = [], arrToMulti = [], arrDeparture = []

                if (json.multiCity !== undefined) {
                    json.multiCity.map(item => {
                        arrFromMulti.push(item["fromMulti[]"])
                        arrToMulti.push(item["toMulti[]"])
                        arrDeparture.push(item["date_startMulti[]"])
                    })
                }

                if (arrDeparture.length == 0) {
                    generatingRequestCrm(json, typeTicket)
                    generatingRequestCrmPerson(json, typeTicket)
                } else {
                    generatingRequestCrm(json, typeTicket, arrFromMulti, arrToMulti, arrDeparture)
                    generatingRequestCrmPerson(json, typeTicket, arrFromMulti, arrToMulti, arrDeparture)
                }

                formSubmitTicketThree()

                $('.modal.modal__form').removeClass('active');
                $('.modal.modal_feedback').addClass('active');
                $('.js-overlay-modal').addClass('active');
                $('.dayName').text('');
                $('form').trigger('reset');
            }
        }
    })
})

$('form .btn').click(function () {
    let element = $(this).closest('form')
    let valSettings = element.data('validator').settings;
    valSettings.highlight = wrap($.validator.defaults.highlight, highlightDecorator)
    valSettings.unhighlight = wrap($.validator.defaults.unhighlight, unhighlightDecorator)
});

let leadId;

function generatingRequestCrmPerson(json) {
    let name = json.name;

    let reqAddPerson = JSON.stringify({
        "name": name,
        "owner_id": leadDefinition(name)['id'],
        "org_id": null,
        "email": [
            {
                "value": json.email,
            }
        ],
        "phone": [
            {
                "value": json.phone,
            },
        ],
    });

    addPersonCRM(reqAddPerson)
}

function generatingRequestCrm(json, typeTicket, arrFromMulti = [], arrToMulti = [], arrDeparture) {
    let newArrDeparture = [];
    let name = json.name;

    if (arrDeparture !== undefined) {
        arrDeparture.map(function (item) {
            const [month, day, year] = item.split('-');
            const dateString = `${year}-${month}-${day}`;
            newArrDeparture.push(dateString);
        })
    }

    reqForm = JSON.stringify({
        // static
        "title": name + ' (website)',
        "owner_id": leadDefinition(name)['id'],

        // from
        "15cf2d212b53bbe08904b6454d0dda11d2955183": json.from !== undefined ? json.from : json.fromTest,
        // to
        "ed51689ac8d57fde6c8259726d65d78130fd22cf": json.to !== undefined ? json.to : json.toTest,
        // from-0
        "975a4ff98eaadac198b6c3f5ece7966ccdd2ea0c": arrFromMulti[0],
        // to-0
        "1c985fab6c8d72c5a49a89d53c25fea361186950": arrToMulti[0],
        // from-1
        "3987d4c219b326f88286096a10b36eabe1759de2": arrFromMulti[1],
        // to-1
        "bb38a5969dcd07168ce004447d5314def1f9a27d": arrToMulti[1],
        // from-2
        "3a708aefb21fce5a4b501c13650355485bc8ccdb": arrFromMulti[2],
        // to-2
        "5fb05fbb36a9c2a9b90889eb31f9cea7c5b70c70": arrToMulti[2],

        // departure
        "e3afa5d082288104b0c11463c988c30094cda1f5": json.date_start,
        // departure-0
        "8d25bea94361caaa064335f0b3100d612efeeb61": newArrDeparture[0],
        // departure-1
        "ebc6f8c082eb244de4dbbf09594abd183786b28e": newArrDeparture[1],
        // departure-2
        "ba7d9080f2a404d3f4b81fabe35de4ed94784867": newArrDeparture[2],

        // deal owner
        "fb1190db67d076973fe27eaa06537d8a75ed6366": leadDefinition(name)['name'],
        //return
        "409517a78292ede97512f0b6aca35115df587897": json.date_end ?? '',
        //type ticket
        "4bd321ba92c84eab3dceda35bee2225409220c32": typeTicket,
        //adults
        "7fa98115a09dc377c681fe93fd2b46cf40392220": json.adults,
        //children
        "c623bc32d442aa2660609ba15092a1bab9d08ea8": json.children,
        //infants
        "eabbe7480419c088467df220fbc8a09032cf55ea": json.infants,
        //phone
        "31559b4d1b62a55c3cd3d31fdd4749946019ebbd": json.phone,
        //email
        "957b07223a08444eea7d2b54052850d3d3d81522": json.email,
        //name
        "4bb2da9192ebd999d3fa40d96158960a10225267": json.name,
        //promo
        "db670b24252ed34785793ed4818c5a1ee7f99392": json.promoCode
    })

    return reqForm;
}

function requestCrmPersonData(json) {
    let name = json.find(name => name.name === 'name'),
        phone = json.find(phone => phone.name === 'phone'),
        email = json.find(email => email.name === 'email'),
        email__active = json.find(email => email.name === 'email_active');

    let reqAddPerson = JSON.stringify({
        "name": name === undefined ? '' : name.value,
        "owner_id": leadDefinition(name.value)['id'],
        "org_id": null,
        "email": [
            {
                "value": email === undefined ? (email__active === undefined ? '' : email__active.value) : email.value,
            }
        ],
        "phone": [
            {
                "value": phone === undefined ? '' : phone.value,
            },
        ],
    });

    addPersonCRM(reqAddPerson)
}

var date = new Date();
let reqForm;

// modal form with fields -> name, email, phone
function requestCrmUserData(json) {
   let name = json.find(name => name.name === 'name'),
       phone = json.find(phone => phone.name === 'phone'),
       email = json.find(email => email.name === 'email');

   // data for adding a lead
    reqForm = JSON.stringify({
       //статичные
       "title": name.value + ' (website)',
       "owner_id": leadDefinition(name.value)['id'],
       //name
       "4bb2da9192ebd999d3fa40d96158960a10225267": name === undefined ? '' : name.value,
       //phone
       "31559b4d1b62a55c3cd3d31fdd4749946019ebbd": phone === undefined ? '' : phone.value,
       //email
       "957b07223a08444eea7d2b54052850d3d3d81522": email === undefined ? '' : email.value
   })

    return reqForm;
}

// modal form with fields -> city, email
function requestCrmUserDataPopUp(json) {
    let name = json.find(name => name.name === 'name'),
        emailActive = json.find(email => email.name === 'email_active'),
        city = name.value,
        newIdLead = 13673406;

    $('.modal_feedback .form_mes .mes__title').text('Thanks for the subscription!')
    $('.modal_feedback .form_mes .mes__body').text('Please find confirmation email in your inbox.')

    // data for adding a lead
    reqForm = JSON.stringify({
        "title": name.value + ' (website pop up)',
        "owner_id": newIdLead,
        //city
        "b8dbcac6831d274b9a99e75395ae6f6f66892531": city,
        //email
        "957b07223a08444eea7d2b54052850d3d3d81522": emailActive.value
    })

    return reqForm;
}

function sendReqSetForm(id) {
    let obj = JSON.parse(reqForm)
    obj.person_id = id;
    setFormTicket(JSON.stringify(obj))
}

// связь пользователя с агентом с crm
function leadDefinition(name) {
    const ruLetters = /^[а-яёА-ЯЁ\s]*$/;
    let user = [];
    let currentDay = date.getDay();

    if (countryName === 'by' || countryName === 'ru' || ruLetters.test(name)) {
        user['id'] = 13808057;
        user['name'] = 'Pete';
    } else {
        if (currentDay === 1 || currentDay === 3 || currentDay === 4 || currentDay === 7) {
            // Derek info
            user['id'] = 14033645;
            user['name'] = 'Derek';
        } else {
            // Mark info
            user['id'] = 13671393;
            user['name'] = 'Mark';
        }
        // Alister info
        // user['id'] = 13729231;
        // user['name'] = 'Alister';
    }

    return user;
}

//поднятие класса с ошибкой при пустом input
function wrap(functionToWrap, beforeFunction) {
   return function () {
       var args = Array.prototype.slice.call(arguments);
       beforeFunction.apply(this, args);
       return functionToWrap.apply(this, args);
   };
}

function highlightDecorator(element, errorClass, validClass) {
   $(element).closest("div .block_error").addClass(errorClass).removeClass(validClass);
}

function unhighlightDecorator(element, errorClass, validClass) {
   $(element).closest("div .block_error").addClass(validClass).removeClass(errorClass);
}

//функция для закрытия модального окна
function closeModal() {
   $('.full_block .modal.modal_feedback').removeClass('active');
   $('.js-overlay-modal').removeClass('active');
}

$('.form-valid-tab').submit(function () {
   var form = $(this);
   var field = [];
   form.find('input[data-validate]').each(function () {
       field.push('input[data-validate]');
       var value = $(this).val(),
           line = $(this).closest('.field.block_error');

       for (var i = 0; i < field.length; i++) {
           if (!value) {
               line.addClass('error');
               event.preventDefault();
           }
       }
   });
});
