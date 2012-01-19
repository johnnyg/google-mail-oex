var Debug       = 1;    //Debug
var MaxAccounts = 5;    // Number of max supported accounts

var Themes = {
    "standard":"Standard",
    "spring":"Spring"
};

// Intialize the option page
$(document).ready(function() 
{
    // Init
    $('#range_update_intervall').val(widget.preferences['update_intervall']);
    
    // Set language-strings
    $('#range_update_intervall_label').html(lang.options_update);
    $('#update_intervall_unit').html(lang.options_update_unit);
    $('#enable_sound_label').html(lang.options_sound);
    $('#mailto_links_label').html(lang.options_mailto);
    $('#theme_label').html(lang.options_choose_theme);
    $('#close').html(lang.options_close);  
    $('#description').html(lang.options_description);  
    $('#accounts_header').html(lang.options_accounts_header);
    $('#appearance_header').html(lang.options_appearance_header);
    $('#other_header').html(lang.options_other_header);
    $('#link_feedback').html(lang.options_link_feedback);
    $('#link_projectpage').html(lang.options_link_projectpage);
    
    // Set Themes
    $.each(Themes, function(key, value)
    {   
        $('#theme').
        append($("<option></option>").
            attr("value",key).
            text(value)); 
    });
    
    // Show Range-Secounds on change
    $('#range_update_intervall').change(function() {
        $('#box_update_intervall').val($('#range_update_intervall').val());
        // WORKAROUND: Update Intervall-Value manually (auto-save don't work in 11.50b1040)
        widget.preferences['update_intervall'] = $('#range_update_intervall').val();
    });
    $('#box_update_intervall').keyup(function() {
        $('#range_update_intervall').val($('#box_update_intervall').val());
    });
   
    // set close function (refresh feed & close window)
    $("#close").click(function(){
        opera.extension.postMessage({
            cmd:"Refresh"
        });
        window.close();
    });
});

// Handle messages from background-process
function HandleMessages(event)
{
    if(Debug) opera.postError("INFO: Option-Page get command '" + event.data.cmd + "'");
    switch(event.data.cmd)
    {
         
    }
}

// general options behavior (from dev.opera.com)
addEventListener
    (
        'DOMContentLoaded',
        function()
        {

            // storage
            var storage = widget.preferences;

            // glue for multiple values ( checkbox, select-multiple )
            var glue    = '\n';

            // get the FORM elements
            var formElements = document.querySelectorAll( 'input,select' );

            // list of FORM elements
            var skip            = hash( 'hidden,submit,image,reset,button' );
            var multipleValues  = hash( 'checkbox,select-multiple' );
            var checkable       = hash( 'checkbox,radio' );

            // string to hash
            function hash( str, glue )
            {
                var obj = {};
                var tmp = str.split(glue||',');

                while( tmp.length )
                    obj[ tmp.pop() ] = true;

                return obj;
            }

            // walk the elements and apply a callback method to them
            function walkElements( callback )
            {
                var obj = [];
                for( var i=0,element=null; element=formElements[i++]; )
                {
                    // skip the element if it has no name or is of a type with no useful value
                    var type = element.type.toLowerCase();
                    var name = element.name||'';
                    if( skip[type]===true || name=='') continue;

                    var tmp = callback( element, name, type );
                    if( tmp!=null )
                        obj.push( tmp );
                }
                return obj;
            }


            // listener for element changes
            function changedElement( e )
            {
                var element = e.currentTarget||e;
                var type    = element.type.toLowerCase();
                var name    = element.name||'';

                var value   = multipleValues[type]!==true?element.value:walkElements
                (
                    function( e, n, t )
                    {
                        if( n==name && e.options )
                        {
                            var tmp = [];
                            for( var j=0,option=null; option=e.options[j++]; )
                            {
                                if( option.selected )
                                {
                                    tmp.push( option.value );
                                }
                            }
                            return tmp.join( glue );
                        }
                        else if( n==name && checkable[t]===true && e.checked )
                        {
                            return e.value;
                        }
                    }
                    ).join( glue );

                // set value
                storage.setItem( name, value );
            }



            // set the textContent of an element
            function setText( id, txt )
            {
                var e = document.getElementById(id);
                if( e )
                {
                    e.textContent = txt;
                }
            }




            // populate the title, name, author, ...
            setText( 'widget-title', widget.name );
            setText( 'widget-name', widget.name );
            setText( 'widget-author', widget.author );


            // walk and set the elements accordingly to the storage
            walkElements
            (
                function( element, name, type )
                {
                    var value       = storage[name]!==undefined?storage.getItem( name ):element.value;
                    var valueHash   = hash( value, glue );

                    if( element.selectedOptions )
                    {
                        // 'select' element
                        for( var j=0,option=null; option=element.options[j++]; )
                        {
                            option.selected = valueHash[option.value]===true;
                        }
                    }
                    else if( checkable[type]===true )
                    {
                        // 'checkable' element
                        element.checked = valueHash[element.value]===true;
                    }
                    else
                    {
                        // any other kind of element
                        element.value = value;
                    }


                    // set the widget.preferences to the value of the element if it was undefined
                    // YOU MAY NOT WANT TO DO THIS
                    if( storage[name]==undefined )
                    {
                        changedElement( element );
                    }

                    // listen to changes
                    element.addEventListener( 'change', changedElement, true );
                }
                );
        
            // Listen for script messages from background-process
            opera.extension.onmessage = HandleMessages;
        },
        false
        );
