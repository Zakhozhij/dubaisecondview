"use strict";
window.addEventListener("DOMContentLoaded", () => {
	//getOffset();
});

//Footer margin from top
window.addEventListener(
	`resize`,
	() => {
		//getOffset();
	},
	false
);




document.querySelector('.modal_feedback_close').addEventListener("click", function (e) {
    location.reload();
});