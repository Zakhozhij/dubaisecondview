let screenWidth = window.screen.width;

addCalendar()

function addCalendar(){
    $('.from').datepicker({
        dateFormat: 'mm-dd-yy',
        numberOfMonths: 1,
        minDate: 0,
        onClose: function( selectedDate ) {
            var from = {};
            from[new Date(selectedDate)] = new Date(selectedDate);
            let test = $(this).closest('.field');
            test.next().find('.to').datepicker( "option", "minDate", selectedDate );
            test.next().find('.to').datepicker( "option", "beforeShowDay", function(date) {
                var highlight = from[date];
                if (highlight) {
                    return [true, $(this)]
                } else {
                    return [true, "", ""]
                }
            });

            if($(this).val() !== ''){
                let test = $(this).closest('.field');
                test.next().find('.to').datepicker( "show" );
            }
        },

        beforeShow: function(input, inst) {
            $('.ui-datepicker').removeClass('ui-datepicker-search')

            inst.dpDiv.css({
                marginLeft: -20 + 'px'
            });

             if(screenWidth <= 1199){
                inst.dpDiv.css({
                    marginLeft: -15 + 'px'
                });
            }

            if(screenWidth <= 768){
                inst.dpDiv.css({
                    marginLeft: -10 + 'px'
                });
            }

            if(screenWidth <= 576){
                inst.dpDiv.css({
                    marginLeft: 0 + 'px'
                });
            }

            if(input.classList.contains('fromSearchResult')){
                $('.ui-datepicker').addClass('ui-datepicker-search')
                inst.dpDiv.css({
                    marginLeft: -20 + 'px'
                });
            }
        }
    });

    $('.to').datepicker({
        numberOfMonths: 1,
        dateFormat: 'mm-dd-yy',
        minDate: 0,
        onClose: function( selectedDate ) {
            let test = $(this).closest('.field');
            test.prev().find('.from').datepicker( "option", "maxDate", selectedDate );
        },
        beforeShow: function(input, inst) {
            $('.ui-datepicker').removeClass('ui-datepicker-search')
            inst.dpDiv.css({
                marginLeft: -175 + 'px'
            });

            if(screenWidth <= 1199){
                inst.dpDiv.css({
                    marginLeft: -143 + 'px'
                });
            }

            if(screenWidth < 992){
                inst.dpDiv.css({
                    marginLeft: -178 + 'px'
                });
            }

            if(screenWidth < 768){
                inst.dpDiv.css({
                    marginLeft: -128 + 'px'
                });
            }

            if(screenWidth < 576){
                inst.dpDiv.css({
                    marginLeft: 0 + 'px'
                });
            }


            if(input.classList.contains('toSearchResult')){

                $('.ui-datepicker').addClass('ui-datepicker-search')
                inst.dpDiv.css({
                    marginLeft: -20 + 'px'
                });
            }
        }
    });
}

//получение даты после установки в input
const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];
$(".inputDate").on("change",function(){
    const d = new Date($(this).val());
    let day = weekday[d.getUTCDay()];
    $(this).closest('.datepicker').parent().find('.dayName').text(day);

    //для формы round-trip
    $(this).closest('.date').parent().find('.dayName').text(day)

    //удаление класса с ошибкой после выбора даты
    $(this).closest('.field').removeClass('error')
    $(this).closest('.field input.error').removeClass('error')
});


$(window).resize(function() {
    screenWidth = window.screen.width;
    $('.slide').removeClass('locked')
    currentSlide = nextSlide = prevSlide = null;
});
