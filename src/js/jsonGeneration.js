(function($) {
    $.fn.jqDynaForm = function(method ) {

        // Methods
        var methods = {
            init: function(options) {
                this.addClass('jqDynaForm');
            },
            get: function() {
                function getFieldValue(field) {
                    if(field.attr('type') == 'checkbox') {
                        return (field.attr('checked') == undefined) ? null : field.attr('value');
                    }
                    else if(field.get(0).tagName == 'select') {
                        return field.val();
                    }
                    else {
                        return field.val();
                    }
                }
                                
                function getItem(context) {
                    var json = {};
                    // Scan all inputs
                    $(':input', context).each(function(){
                        // Skip other levels
                        if(context.parents('[data-holder-for]').length != $(this).parents('[data-holder-for]').length) {
                            return;
                        }
                        
                        var name = $(this).attr('name');
                        if(name) {
                            json[name] = getFieldValue($(this));
                        }
                    });
                    
                    // Scan nested blocks
                    $('[data-holder-for]', context).each(function(){
                        var listName = $(this).attr('data-holder-for');
                        // Scan items within block
                        $('[data-name]', this).each(function(){
                            // Skip other levels
                            if(context.parents('[data-holder-for]').length+1 !== $(this).parents('[data-holder-for]').length) {
                                return;
                            }
                            if(!json[listName]) {
                                json[listName] = [];
                            }
                            json[listName].push( getItem($(this)) );
                        });
                    });
                    return json;
                }
                return getItem($(this));
            },
        };
        
        
        // Method calling logic
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === 'object' || !method) {
            return methods.init.apply( this, arguments );
        }
        else {
            $.error('Method '+method+' does not exist');
        }
    };
})(jQuery);


