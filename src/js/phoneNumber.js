let input = document.querySelectorAll('input[name=phone]')

let phoneFormHome, phoneModalForm, phoneModalFormActive, phoneResultSearch1, phoneResultSearch2, phoneResultSearch3;
// форма на главной странице
$("#phoneFormHome").length > 0 ?  phoneFormHome = initializationintlTelInput($("#phoneFormHome")[0]) : ''
//телефон в модалке
$("#phoneModalForm").length > 0 ?  phoneModalForm = initializationintlTelInput($("#phoneModalForm")[0]) : ''
//телефон в модалке при бездействии
$("#phoneModalFormActive").length > 0 ?  phoneModalFormActive = initializationintlTelInput($("#phoneModalFormActive")[0]) : ''
//форма один с выбором типа билета
$("#phoneResultSearch1").length > 0 ?  phoneResultSearch1 = initializationintlTelInput($("#phoneResultSearch1")[0]) : ''
//форма два с выбором типа билета
$("#phoneResultSearch2").length > 0 ?  phoneResultSearch2 = initializationintlTelInput($("#phoneResultSearch2")[0]) : ''
//форма три с выбором типа билета
$("#phoneResultSearch3").length > 0 ?  phoneResultSearch3 = initializationintlTelInput($("#phoneResultSearch3")[0]) : ''

let countryName;

// initialise plugin
function initializationintlTelInput(item){
    item.value = '+1';
    return window.intlTelInput(item, {
        hiddenInput: "full_phone",
        preferredCountries: ['us','ca','gb'],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js"
    });
}


function reset(val){
    val.closest('.block_error').classList.remove("errorClass");
    val.classList.remove("errorClass");
}

input.forEach(function (item) {
    item.addEventListener('blur', function() {
        reset(item);
        if (item.value.trim()) {
            if($(item).attr('id') == 'phoneFormHome'){
                !phoneFormHome.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneFormHome.getSelectedCountryData().iso2;
            }

            if($(item).attr('id') == 'phoneModalForm'){
                !phoneModalForm.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneModalForm.getSelectedCountryData().iso2;
            }

            if($(item).attr('id') == 'phoneResultSearch1'){
                !phoneResultSearch1.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneResultSearch1.getSelectedCountryData().iso2;
            }

            if($(item).attr('id') == 'phoneResultSearch2'){
                !phoneResultSearch2.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneResultSearch2.getSelectedCountryData().iso2;
            }

            if($(item).attr('id') == 'phoneResultSearch3'){
                !phoneResultSearch3.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneResultSearch3.getSelectedCountryData().iso2;
            }

            if($(item).attr('id') == 'phoneModalFormActive'){
                !phoneModalFormActive.isValidNumber() ? addErrorClassPhoneValidate(item) : '';
                countryName = phoneModalFormActive.getSelectedCountryData().iso2;
            }
        }
    });
})

function addErrorClassPhoneValidate(item){
    item.closest('.block_error').classList.add("errorClass");
    item.classList.add("errorClass");
}

input.forEach(function (item) {
    item.addEventListener('change', reset(item));
    item.addEventListener('keyup', reset(item));
})
