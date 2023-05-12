//show modal welcome

const no_active_delay = 15000; // seconds count
window.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => updateChat(), no_active_delay);
});
document.querySelector(".closeSignUpModal").onclick = closeModalActive;

//Manage modal behavior
let modalButtons = document.querySelectorAll(".js-open-modal"),
	overlay = document.querySelector(".js-overlay-modal"),
	closeButtons = document.querySelectorAll(".js-modal-close"),
	closeButtonsInModal = document.querySelectorAll(".js-modal-close-modal"),
	closeTwoModal = document.querySelectorAll(".close-modal-two");
modalButtons.forEach(function (item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
		let modalId = this.getAttribute("data-modal"),
			modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
		modalElem.classList.add("active");
		overlay.classList.add("active");
	});
});

closeButtons.forEach(function (item) {
	item.addEventListener("click", function (e) {
		let parentModal = this.closest(".modal");
		parentModal.classList.remove("active");
		overlay.classList.remove("active");
	});
});

closeButtonsInModal.forEach(function (item) {
	item.addEventListener("click", function (e) {
		let parentModal = this.closest(".modal");
		parentModal.classList.remove("active");
	});
});

closeTwoModal.forEach(function (item) {
	item.addEventListener("click", function (e) {
		let parentModal = this.closest(".modal");
		parentModal.classList.remove("active");
		overlay.classList.add("active");
	});
});

// show modal welcome
let numberAppearanceModal = 0;
function updateChat() {
	if (document.cookie !== "modal-active=true" && JSON.parse(sessionStorage.getItem("closeActiveModal") < 2)) {
		document.querySelector(".modal").classList.remove("active");
		document.querySelector(".modal__active").classList.add("active");
		document.querySelector(".js-overlay-modal").classList.add("active");
		return;
	}
}
function closeModalActive() {
	numberAppearanceModal = JSON.parse(sessionStorage.getItem("closeActiveModal"));
	numberAppearanceModal++;
	sessionStorage.setItem("closeActiveModal", numberAppearanceModal);
}

//modal_feedback close function
function closeModal() {
	$(".full_block .modal.modal_feedback").removeClass("active");
	$(".js-overlay-modal").removeClass("active");
}

document.querySelector('.modal_feedback_close').addEventListener("click", function (e) {
    location.reload();
});