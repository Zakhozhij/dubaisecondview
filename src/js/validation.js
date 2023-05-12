import {addErrorClassPhoneValidate,reset,checkIsValidNumber} from "./phoneNumber.js";

//validation

//set form validation listeners
document.querySelectorAll(".form_submit_button").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const validationResult = validation(item.closest("form"));
        console.log(validationResult);
        if (!validationResult) {
            document.querySelectorAll('.modal__form').forEach(item =>{
                item.classList.remove('active');
            });
            
            document.querySelector('.modal_feedback').classList.add('active');
            document.querySelector('.js-overlay-modal').classList.add('active');
        }
    });
});

function validateEmail(input) {
	const email = input.value;
	input.closest(".block-input").classList.remove("errorField");
	if (
		String(email)
			.toLowerCase()
			.match(
                /^[^!@#$%^&*]+[^\.]+@[^\.]+\.[a-zA-Z]{2,6}$/
			)
	) {
		return true;
	}
	input.closest(".block-input").classList.add("errorField");
	return false;
}
function validateName(input) {
	const name = input.value;
	input.closest(".block-input").classList.remove("errorField");
	if (String(name).length >= 1) {
		return true;
	}
	input.closest(".block-input").classList.add("errorField");
	return false;
}

function validateCheckbox(input) {
	const checkbox = input.checked;
	input.closest(".block-input").classList.remove("errorCheckBox");
	if (checkbox) {
		return true;
	}
	input.closest(".block-input").classList.add("errorCheckBox");
	return false;
}

function validatePhone(input) {
	reset(input);
	const phone = String(input.value);
	if (phone.length === 0) {
		addErrorClassPhoneValidate(input);
		return false;
	}
	return checkIsValidNumber(input);
}

function validateCity(input) {
	const city = input.value;
	input.closest(".block-input").classList.remove("errorField");
	if (String(city).length >= 3) {
		return true;
	}
	input.closest(".block-input").classList.add("errorField");
	return false;
}

function validation(form) {
	const inputs = form.elements;
	let isValid = false;
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		if (checkValidation(input) === true)
        {
            isValid = true;
        } 
	}
	return isValid;
}
document.querySelectorAll("input").forEach(function (item) {
	item.addEventListener("change", () => checkValidation(item));
	item.addEventListener("keyup", () => checkValidation(item));
});
function checkValidation(item) {
	let isValid = false;
	if (item.nodeName === "INPUT") {
		if (item.getAttribute("data-input-type") === "email" && !validateEmail(item)) {
			isValid = true;
		} else if (item.getAttribute("data-input-type") === "name" && !validateName(item)) {
			isValid = true;
		} else if (item.getAttribute("data-input-type") === "checkbox" && !validateCheckbox(item)) {
			isValid = true;
		} else if (item.getAttribute("data-input-type") === "phone" && !validatePhone(item)) {
			isValid = true;
		} else if (item.getAttribute("data-input-type") === "city" && !validateCity(item)) {
			isValid = true;
		}
	}
	return isValid;
}