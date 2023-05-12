import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

const phones = document.querySelectorAll(".phone");
let phones_items = [];

phones.forEach((item) => {
	phones_items[item.getAttribute('data-phone-id')] = intlTelInput(item, {
		hiddenInput: "full_phone",
		utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js",
	});
	item.value = "+" + phones_items[item.getAttribute('data-phone-id')].getSelectedCountryData().dialCode;
});

let countryName;

export const reset = (val) => {
	val.closest(".block-input").classList.remove("errorField");
};
export const addErrorClassPhoneValidate = (item) => {
	item.closest(".block-input").classList.add("errorField");
};

phones.forEach(function (item) {
	item.addEventListener("blur", function () {
		reset(item);
		if (item.value.trim()) {
			!phones_items[item.getAttribute('data-phone-id')].isValidNumber() ? addErrorClassPhoneValidate(item) : "";
			countryName = phones_items[item.getAttribute('data-phone-id')].getSelectedCountryData().iso2;
		}
	});
});

// phones.forEach(function (item) {
// 	item.addEventListener("change", reset(item));
// 	item.addEventListener("keyup", reset(item));
// });

export const checkIsValidNumber = (item) => {
    reset(item);
	if( phones_items[item.getAttribute('data-phone-id')].isValidNumber()){
        return true;
    }else{
        addErrorClassPhoneValidate(item);
        return false;
    };
};
