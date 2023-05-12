var date = new Date();
track_user();

// проверка было ли отправлено письмо с всплывающего попапа
function track_user() {
    if(document.cookie === 'modal-active=true'){
        setInterval(function() {
            date.setTime(date.getTime()+(1 * 1000));
            document.cookie = "modal-active=true; expires="+ date.toGMTString() + "; path=/";
        }, 500);
    }
}


//Главная страница выбор тип билета
let tabNavs = document.querySelectorAll('.nav-tab');
let tabPanes = document.querySelectorAll(".tab-pane");

for(let i = 0; i < tabNavs.length; i++) {
    tabNavs[i].addEventListener('click', function (e){
        e.preventDefault();
        let activeTabAttr = tabNavs[i].getAttribute("data-tab");
        for(let j = 0; j < tabNavs.length; j++) {
            let contentAttr = tabPanes[j].getAttribute('data-tab-content');
            if(activeTabAttr === contentAttr) {
                tabNavs[j].classList.add("active");
                tabPanes[j].classList.add("active");
            }
            else {
                tabNavs[j].classList.remove("active");
                tabPanes[j].classList.remove("active");
            }
        }
    });
}


//тень для бургер-меню
$('.burger').click(function (){
    if($('.burger-menu-elem').hasClass('box-shadow')){
        $('.burger-menu-elem').removeClass('box-shadow')
        $(' #body ').removeClass('blocking-scroll')
        $('.menu-toggle input').removeClass('active')
    }
    else{
        $('.burger-menu-elem').addClass('box-shadow')
        $(' #body ').addClass('blocking-scroll')
        $('.menu-toggle input').addClass('active')
    }
})

//подсветка шапки
let url = window.location.href;
url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
url = url.substr(url.lastIndexOf("/") + 1);

$(document).ready(function() {
    url = '/' + url
    if(url == ''){
        url = 'index.html';
    }
    $('.items li').each(function(){
        var href = $(this).find('a').attr('href');
        if(url == href){
            $(this).addClass('active');
            $(this).find('a').removeAttr('href');
        }
    });
});


//главная страница, скрипт для изменения значений в input
$('body').on('click', '.switch', function(){
    let element1 =  $('.input-from-switch').val();
    let elementCityName1 = $('.cityAirport').val();
    let element2 =  $('.input-to-switch').val();
    let elementCityName2 = $('.cityAirportTo').val();
    $('.input-from-switch').val(element2);
    $('.cityAirport').val(elementCityName2);
    $('.input-to-switch').val(element1)
    $('.cityAirportTo').val(elementCityName1);
})

//главная страница, скрипт для изменения значений в input
$('body').on('click', '.switch_multi', function(){
    let element1 =  $(this).next().find('.input_fromMult').val();
    let elementCityName1 = $(this).next().find('.cityAirportMulti').val();
    let element2 = $(this).next().next().find('.input_toMulti').val();
    let elementCityName2 = $(this).next().next().find('.cityAirportToMulti').val();
    $(this).next().find('.input_fromMult').val(element2);
    $(this).next().find('.cityAirportMulti').val(elementCityName2);
    $(this).next().next().find('.input_toMulti').val(element1)
    $(this).next().next().find('.cityAirportToMulti').val(elementCityName1);
})


let sum;
function sumPassenger(){
    sum = 0;
    let elements = $('.block_with_arrow.active').parent().find('.quantity');
    for(i = 0; i < elements.length; i++){
        sum = sum + parseInt(elements[i].value);
    }
    $('.block_with_arrow .block_input h3 .active').html(sum)
}

// вывод типа билета на экран
function radioTypeTicket(){
    let flightSearchForm = document.forms.flightSearch;
    $('.active #type_ticket_passenger').text(flightSearchForm.elements.type_ticket.value)
}

function radioTypeTicketSearch(){
    let flightSearchForm = document.forms.inf_ticket1;
    $('.active .type_ticket_passenger').text(flightSearchForm.elements.type_ticket.value);
}

//input plus and minus
$('body').on('click', '.quantity_inner .bt_minus', function(){
    let $input = $(this).parent().find('.quantity');
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 0 : count;
    $input.val(count);
    sumPassenger();
});
$('body').on('click', '.quantity_inner .bt_plus', function(){
    let $input = $(this).parent().find('.quantity');
    let count = parseInt($input.val()) + 1;
    count = count > parseInt($input.data('max-count')) ? parseInt($input.data('max-count')) : count;
    $input.val(parseInt(count));
    sumPassenger();
});
$('.quantity_inner .quantity').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
    if (this.value == "") {
        this.value = 0;
    }
    if (this.value > parseInt($(this).data('max-count'))) {
        this.value = parseInt($(this).data('max-count'));
    }
});

//выпадающий список на главной
$('body').on('click', '.block_with_arrow', function(){
    $(this).parent().find('.block-drop-down').toggle();
    if($('.block_with_arrow').hasClass('active')){
        $('.block_with_arrow').removeClass('active')
    }
    else{
        $(this).addClass('active')
    }
});

$(document).on('click', function(e) {
    if (!$(e.target).closest(".block_arrow").length) {
        $('.block-drop-down').hide();

        if($('.block_with_arrow').hasClass('active')){
            $('.block_with_arrow').removeClass('active')
        }
    }

    if($('.search-input').hasClass('active')){
        $('.search-input.active input').val('')
        $('.search-input').removeClass('active')
        $(".autocom-box").removeClass('active');
    }

    e.stopPropagation();
});


//добавление поля в выборе рейса (multi city)
$('.tab-pane .btn_add').click(function (e){
    $('.add_field').addClass('active')
    let label = document.createElement("div");
    label.setAttribute('class', 'container-field')
    label.setAttribute('data-name', "multiCity")
    let idElement = '[]';

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
        `                                                        <input data-validate required name=${'fromMulti' + idElement} type="text" class="input_fromMult" placeholder="Enter City or Airport" autocomplete="off">\n` +
        `                                                        <input name="${'cityAirportMulti' + idElement}" type="text" class="cityAirportMulti" readonly>\n` +
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
        `                                                        <input data-validate required name=${"toMulti" + idElement} type="text" class="input_toMulti" placeholder="Enter City or Airport" autocomplete="off">\n` +
        `                                                        <input name="${'cityAirportToMulti' + idElement} " type="text" class="cityAirportToMulti" readonly>\n` +
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
        `                                                        <input data-validate required class="inputDate from" name=${"date_startMulti" + idElement} placeholder="Select date" type="text" readonly />\n` +
        '                                                        <span class="input-group-addon">\n' +
        '                                                        <i class="icon-calendar"></i>\n' +
        '                                                    </span>\n' +
        '                                                    </div>\n' +
        '                                                    <h5 class="dayName dayNameForm1_1 dayMulti"></h5>\n' +
        '                                                </div>\n' +
        '                                            </div>\n' +
        '\n' +
        '                                            <div class="field block_error field_return">\n' +
        '                                                <div class="block_input block_return disabled">\n' +
        '                                                    <p>Return</p>\n' +
        '                                                    <div class="date">\n' +
        `                                                        <input disabled required class="inputDate" name=${"date_end" + idElement} placeholder="Select date" type="text" readonly />\n` +
        '                                                        <span class="input-group-addon">\n' +
        '                                                            <i class="icon-calendar"></i>\n' +
        '                                                        </span>\n' +
        '                                                         <span class="icon">\n' +
        '                                                        <i class="icon-calendar"></i>\n' +
        '                                                    </span>\n' +
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

    $('.add_field').append(label);

    //функция на логику калькулятора
    addCalendar()

    $('.add_field.add_field_multi input.from').addClass('fromSearchResult')
    $('.add_field.add_field_multi input.to').addClass('toSearchResult')

    $('.add_field .container-field').validate();

    if($('.multi-city .add_field .container-field').length === 3){
        $('.btn_add').hide();
    }

    if($('.add_field_multi .container-field').length === 3){
        $('.add_multi').hide();
    }

    $(".inputDate").on("change",function(){
        const d = new Date($(this).val());
        let day = weekday[d.getUTCDay()];
        //для формы round-trip
        $(this).closest('.date').parent().find('.dayName').text(day)
        //удаление класса с ошибкой после выбора даты
        $(this).closest('.field').removeClass('error')
        $(this).closest('.field input.error').removeClass('error')
    });

    getAllInputSearch()
})


//удаление поля в выборе рейса (multi city)
$('body').on('click', '.btn_delete', function(){
    $(this).parent().remove();

    if($('.add_field .container-field').length === 0){
        $('.add_field').removeClass('active')
    }

    if($('.multi-city .add_field .container-field').length < 6){
        $('.btn_add').show();
    }

    if($('.add_field_multi .container-field').length < 4){
        $('.btn_add').show();
    }
});


//открытие модального окна
document.addEventListener('DOMContentLoaded', function() {
    let modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');
        closeButtonsInModal = document.querySelectorAll('.js-modal-close-modal');
        closeTwoModal = document.querySelectorAll('.close-modal-two');

    modalButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            if(modalId == 5){
                let contentForm3 = $('.tab-pane-3.multi-city .container-field').clone();
                $('.modal-multi .copy .container-field').remove();
                $('.tab-pane-3 .copy').append(contentForm3);
                $('.tab-pane-3 .copy .container-field.clone.default').remove();
            }
            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });

    });

    closeButtonsInModal.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
        });

    });

    closeTwoModal.forEach(function (item) {
        item.addEventListener('click', function (e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.add('active')
        });
    });
});


//хлебные крошки
$('.items a').on('click', function(e) {
    localStorage.setItem('item',  e.target.textContent);
})
//вывод хлебных крошек
window.onload = function() {
    $('.breadcrumb #page').html( localStorage.getItem('item'));
};

//открытие блока с отзывами
$('body').on('click', '.slide', function(){
    var content = $(this).find('.reviews').html();
    $('.full_block').append('<div class="modal modal_feedback" data-modal="4">\n' +
        '    <div class="modal__cross js-modal-close" onclick="closeModal()">\n' +
        '        <div class="icon">\n' +
        '            <i class="icon-cross"></i>\n' +
        '        </div>\n' +
        '    </div>\n' +
        `    <div class="reviews">` + content +`</div>\n` +
        '</div>')

    $('.full_block .modal.modal_feedback').addClass('active');
    $('.js-overlay-modal').addClass('active');
})


//заполнение полей на главной странице
$('.input_from').bind('input', function (){
     $('.input_from').val($(this).val());
})
$('.input_to').bind('input', function (){
    $('.input_to').val($(this).val())
})

$('.input_departure').change('input', function (){
    $('.input_departure2').val($(this).val())
    $('.dayNameForm2_1').text($('.dayNameForm1_1')[0].innerText)
})

$('.input_departure2').change('input', function (){
    $('.input_departure').val($(this).val())
    $('.dayNameForm1_1').text($('.dayNameForm2_1').text())
})

//preloader
$(document).ready(function($) {
    let $preloader = $('#preloader'), $loader = $preloader.find('#loader');
    $loader.fadeOut();
    $preloader.delay(400).fadeOut(200);
});


// появление модального окна после n число секунд
var no_active_delay = 15; // Количество секунд
var now_no_active = 0;
let numberAppearanceModal = 0;
setInterval("now_no_active++;", 1000);
setInterval("updateChat()", 1000);
document.onmousemove = activeUser; // Ставим обработчик на движение курсора мыши

function activeUser() {
    now_no_active = 0; // Обнуляем счётчик
}

function updateChat() {

    if (now_no_active >= no_active_delay && document.cookie !== 'modal-active=true' && JSON.parse(sessionStorage.getItem('closeActiveModal') < 2)) {
        $('.modal.active').removeClass('active')
        $('.modal.modal__active').addClass('active')
        $('.js-overlay-modal').addClass('active')
        return;
    }
}

function closeModalActive(){
    numberAppearanceModal = JSON.parse(sessionStorage.getItem('closeActiveModal'))
    numberAppearanceModal++;
    no_active_delay = 40;
    sessionStorage.setItem('closeActiveModal', numberAppearanceModal);
}

function validation_modal_from_phone(){
    if($("#phoneModalFormActive").hasClass('errorClass') == false){
        $('#form_active_modal .email').removeAttr('required')
        $('#form_active_modal .email').removeAttr('name')
        $('#form_active_modal .field').removeClass('error')
        $('#form_active_modal .field').removeClass('errorClass')
    }
    else{
        $('#form_active_modal .email').attr('required', 'true')
        $('#form_active_modal .email').attr('name', 'email_active')
        $('.phoneModalFormActive').closest('.field').addClass('errorClass')
        $('#form_active_modal .field').addClass('error')
    }
}

// в мобильной версии на главной странице меняем блоки местами
// window.screen.width < 576 ? $('.section-home').after($('.section-about-company')) : $('.section-benefits').after($('.section-about-company'))
// $(window).resize(function() {
//     window.screen.width < 576 ? $('.section-home').after($('.section-about-company')) : $('.section-benefits').after($('.section-about-company'))
// });


// Weglot.initialize({
//     api_key: 'wg_6af67339657273953598341da7ac34b38',
// });

let storeValue = '';
const storageListner = setInterval(() => {
    let newValue = localStorage.getItem('wglang');
    if (localStorage.getItem('wglang') && storeValue !== newValue) {
        storeValue = newValue;
        $('body').removeAttr('class')
        $('body').addClass(storeValue)
    }
}, 1000);


function pageRestart(){
    location.reload();
}
