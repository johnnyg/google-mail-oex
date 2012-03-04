///
// Codebit "Opera Google Mail Extension"
// Option-Page-Handler
// 
// @author  Tom Schreiber (tom.schreiber@codebit.de)
// @version SVN: $Id$
//
///

var Accounts;
var AccountsCount = 0;
var UniqueAccountString = "";

// Themes-Array (internal name : display name)
var Themes = {
    "standard":"Standard",
    "gmail":"Google Mail"
};

// Intialize the option page
$(document).ready(function() 
{
    // Init
    $('#range_update_intervall').val(widget.preferences['updateIntervall']);
    
    // Set language-strings
    $('#range_update_intervall_label').html(lang.options_update);
    $('#update_intervall_unit').html(lang.options_update_unit);
    $('#enable_sound_label').html(lang.options_sound);
    $('#mailto_links_label').html(lang.options_mailto);
    $('#debug_mode_label').html(lang.options_debugmode);
    $('#theme_label').html(lang.options_choose_theme);
    $('#close').html(lang.options_close);  
    $('#refresh').html(lang.options_refresh);  
    $('#description').html(lang.options_description);  
    $('#account_descripton').html("<p>" + lang.options_description_accounts + "</p>"
            + "<p><strong>" + lang.options_dectected_accounts + "</strong></p>");
    $('#accounts_header').html(lang.options_accounts_header);
    $('#appearance_header').html(lang.options_appearance_header);
    $('#other_header').html(lang.options_other_header);    
    $('#link_operapage').html(lang.options_link_operapage);
    $('#link_feedback').html(lang.options_link_feedback);
    $('#link_projectpage').html(lang.options_link_projectpage);
    
    // Set localized links
    $('#ma_link').attr("href", lang.link_multisession_help);
    $('#ma_link').addClass("strong_link");    
    
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
    });
    $('#box_update_intervall').keyup(function() {
        $('#range_update_intervall').val($('#box_update_intervall').val());
    });
    
    // Listen for script messages from background-process
    opera.extension.onmessage = HandleMessages;    
      
    // Refresh feed now
    opera.extension.postMessage({
        cmd:"Refresh"
    });
   
    // Set close function (refresh feed & close window)
    $("#close").click(function(){
        opera.extension.postMessage({
            cmd:"Refresh_NoCallback"            
        });
        window.close();
    });
    
    // Fresh Accounts
    $('#refresh').click(function() {
        $('#account_list').html("");
        $('#wait').show();
        opera.extension.postMessage({
            cmd:"Refresh"
        });
    })
});

// Handle messages from background-process
function HandleMessages(event)
{
    DebugMessage("Option-Page get command '" + event.data.cmd + "'");
    switch(event.data.cmd)
    {            
        // Get Info-Message, thats means there are no active connection :(
        case "info" :
            AccountsCount = 0;
            ShowAccounts();
            break;
    
        // Messages
        case "messages":
            Accounts = event.data.accounts;
            AccountsCount = event.data.accounts_count;
            
            // Create unique string so we see if there are changes
            var newUniqueAccountString = "";            
            for(var mail in Accounts) 
                if(Accounts[mail]) newUniqueAccountString  += Accounts[mail].UniqueId;      
            
            //Refresh Account_list if there are changes
            if(newUniqueAccountString != UniqueAccountString) 
                ShowAccounts();
            UniqueAccountString = newUniqueAccountString;

            break;            
    }
}

// Show Accounts
function ShowAccounts()
{
    // Hide Wait-Animation and clear Account-List
    $('#wait').hide();
    $('#account_list').html("");
    
    // Show Message, if there are no accounts
    if(AccountsCount == 0)
    {
      var msg = $("<div class='noAccount'></div>").html(lang.error_noActiveAccount);
      $('#account_list').append(msg);
    }
    // Fill AccountList
    else
    {         
        for(var mail in Accounts)
        {
            // Is the option "All Unread" enabled for this account?
            var checked = "";
            var uid = Accounts[mail].UniqueId;
            if(widget.preferences[uid + 'Allunread'] && widget.preferences[uid + 'Allunread'] === "on")
                checked = " checked='checked'";
            else
               widget.preferences[uid + 'Allunread'] = "off";
            
            // Create Checkbox
            var checkbox =  '<input name="' + uid + '_allunread" type="checkbox" title="' + 
                lang.options_unread_tooltip + '"' + checked + '></input>' + '<label for="' + uid + '_allunread" \n\
                title="' + lang.options_unread_tooltip + '">' + lang.options_unread + 
                '</label>';
            
            // Set Entry
            var entry = $("<div></div>").addClass("account_entry")
             .append($("<div></div>").addClass('text').html("" + Accounts[mail].Name))
             .append($("<div></div>").addClass('options').html(checkbox));
            $('#account_list').append(entry); 
            
            // Set Function for Check/Uncheck
            $( '.account_entry :checkbox' ).live( 'change', 
                function() {
                    if($(this).is( ':checked' ))
                         widget.preferences[$(this).attr('name')] = "on";
                     else
                         widget.preferences[$(this).attr('name')] = "off";
                });
        }
    }
}

// Write Debug-Message
function DebugMessage(message, type)
{
    if(!type) type = "info";
    if(widget.preferences['debugMode'] && widget.preferences['debugMode'] === "on") 
        opera.postError("GMNEx,opt," + type + " : " + message);
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
