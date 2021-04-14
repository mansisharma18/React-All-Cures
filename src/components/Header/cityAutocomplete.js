$(function() {
    function log( message ) {
        $( "<div>" ).text( message ).prependTo( "#log" );
        $( "#log" ).scrollTop( 0 );
    }

    $( "#city" ).autocomplete({
   
        source: function( request, response ) {
            
            $.ajax(
                {                    
                    url: "/cures/CityActionController",
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function( data ) {
                        var json = JSON.parse(JSON.stringify(data));
                        console.log("success", json);
                        var city=(json.map.Cityname+','+json.map.Pincode);
                        var cityStr=city.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:.<>\{\}\[\]\\\/]/gi, '');
                        var arrcity= cityStr.split(',');
                        var results = $.ui.autocomplete.filter(arrcity, request.term);                      
                        response(results.slice(0, 10));
                    }
                }
                );
            },
            minLength: 1,
            autoFocus:true,
            select: function( event, ui ) {
                log( ui.item ?
                    "Selected: " + ui.item.label :
                    "Nothing selected, input was " + this.value);
                },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
    });
});