
let swiper, swiperPartners;

const slides_points = document.querySelectorAll(".slider_points_item");
const slides_text = document.querySelectorAll(".slider_text_item");
window.addEventListener("DOMContentLoaded", () => {
	//Manage sliders
	swiper = new Swiper(".mySwiper", {
		initialSlide: 0,
		slidesPerView: 1,
		spaceBetween: 0,
		navigation:false
	});
	swiper.on("slideChange", () => {
		setActiveSlideText();
		setActivePagination();
	});

	swiperPartners = new Swiper(".mySwiper2", {
		initialSlide: 0,
		slidesPerView: 11,
		breakpoints: {
			200: {
				slidesPerView: 2,
			},
			400: {
				slidesPerView: 4,
			},
			650: {
				slidesPerView: 7,
			},

			950: {
				slidesPerView: 9,
			},
			1200: {
				slidesPerView: 11,
			},
		},
	});
	setActiveSlideText();
	setActivePagination();
});
//Slides cintrols
document.querySelector(".swiper-button-next-benefit").addEventListener(`click`, () => {
	swiper.slideNext();
});

document.querySelector(".swiper-button-prev-benefit").addEventListener(`click`, () => {
	swiper.slidePrev();
});

//Pagination slides settings

slides_points.forEach((slide) => {
	slide.addEventListener("click", async (e) => {
		const slideTo = e.target.getAttribute("data-slide-to");
		swiper.slideTo(slideTo - 1);
	});
});

function setActiveSlideText() {
	slides_text.forEach((slide) => (slide.style.display = "none"));
	slides_text[swiper.activeIndex].style.display = "block";
}
function setActivePagination() {
	slides_points.forEach((slide) => (slide.style.background = "#006dd233"));
	slides_points[swiper.activeIndex].style.background = "#006dd2";
}
