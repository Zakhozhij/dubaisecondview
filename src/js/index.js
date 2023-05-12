"use strict";
window.addEventListener("DOMContentLoaded", () => {
	document.querySelector('#elipse').addEventListener('click',()=>{
		location.href="https://wa.me/message/PH4VH5HYRZXAP1";
	})
	getOffset();
});

//Footer margin from top
window.addEventListener(
	`resize`,
	() => {
		getOffset();
	},
	false
);


function getOffset() {
	const form_position = document.querySelector(".form_free_quote").getBoundingClientRect().bottom;
	const promo_position = document.querySelector(".promo").getBoundingClientRect().bottom;
	document.querySelector(".info_block").style.top = form_position - promo_position + 35 + "px";
	document.querySelector("footer").style.marginTop = form_position - promo_position + 35 + 200 + "px";
}

document.querySelector('.modal_feedback_close').addEventListener("click", function (e) {
    location.reload();
});