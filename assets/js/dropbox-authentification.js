var client      = new Dropbox.Client({ key: '5lvfcz22of40eft' }),
    TodosApp    = TodosApp || {
 
        todosList: null,
 
        init: function() {
        	client.authenticate(
	        	{
			        interactive: false
				}, function( error, response ) {
			    if ( error ) {
			        console.log( 'OAuth error: ' + error );
			    }
			});
		 
			TodosApp.checkClient();
        },
 
        checkClient: function() {
		    if ( client.isAuthenticated() ) {
		        $( '#link-button' ).fadeOut();
		        $( '#main' ).fadeIn();
		    } else {
		    	$( '#link-button' ).click( function() {
				    client.authenticate();
				});
		        $( '#main' ).fadeOut();
		    }
		},
 
        createTodo: function( e ) {},
 
        updateTodos: function() {}
    };
$( 'document' ).ready( TodosApp.init );