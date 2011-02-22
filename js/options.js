//Debug
var Debug = 1;

// Intialize the option page
$(document).ready(function() 
{
    // Init
    $('#range_update_intervall').val(widget.preferences['update_intervall']);
  
    // Show Range-Secounds on change
    $('#range_update_intervall').change(function() {
        $('#box_update_intervall').val($('#range_update_intervall').val());
    });
    $('#box_update_intervall').keyup(function() {
        $('#range_update_intervall').val($('#box_update_intervall').val());
    });

    // Create Mail-Form
    BuildMailContainer();
   
    // set close function (refresh feed & close window)
    $("#close").click(function(){
        opera.extension.postMessage({
            cmd:"Refresh", 
            nocallback: true
        });
        window.close();
    });
});

// builds new mail-container
function BuildMailContainer()
{
    // first clear
    $('#mail-container').html = "";  
  
    // build new
    for(var i=1; i <= 5; i++)
    {
        var mail = "";
    
        // check if token exists
        if(!widget.preferences['oauth_token' + i] || widget.preferences['oauth_token' + i] == "")
        {
            // Create new form
            mail = '<div id="mail' + i + '">' + CreateForm('new', i) + '</div>';
        }
        else
        {
            // Create Info-Form with Delete-Button
            mail = '<div id="mail' + i + '">' + CreateForm('info', i) + '</div>';
        }
     
        // append to container now
        $('#mail-container').append(mail);
    }
}

// Creates a mail-form
function CreateForm(type, num)
{
    // new blank-form
    if(type == 'new')
    {
        return '<label for="verify' + num + '">' + lang.options_vcode + ' ' + num + ' </label>' +
        '<input id="verify' + num + '" type="text" onkeyup="CheckForSave(' + num + ');" oninput="CheckForSave(' + num + ');"></input> ' +
        '<button id="vbutton' + num + '" onclick="GetVerifyCode(' + num + ');">' + lang.options_getverifiy + ' </button>' +
        '<div id="error' + num + '" class="error"></div>';
    }
    // info-form
    else
    {
        return '<div class="access_granted"><strong>' +  
        widget.preferences['oauth_mail' + num] + '</strong> ' + lang.options_check + 
        '<button id="vbutton' + num + '" onclick="RemoveToken(' + num + ');">' + 
        lang.options_delete + '</button>';
    } 
}

// Get New VerifyCode
function GetVerifyCode(num)
{
    // clear error
    $('#error' + num).hide().html("");
    
    // send request to background-process
    opera.extension.postMessage({
        cmd: "GetVerifyCode"
    });
}

function CheckForSave(num)
{ 
    // change button action if neccessary
    if($('#verify' + num).val().length > 0 &&  $('#vbutton'+ num).html() != lang.options_saveverifiy)
    {
        $('#vbutton'+ num).html("<strong>" + lang.options_saveverifiy + "</strong>");
        $('#vbutton'+ num).removeAttr("onclick");
        $('#vbutton'+ num).attr("onclick","SaveVerifyCode(" + num + ");");   
    }
    else if($('#verify' + num).val().length == 0 && $('#vbutton'+ num).html() != lang.options_getverifiy)
    {
        opera.postError("REQUEST");
        $('#vbutton'+ num).html(lang.options_getverifiy);
        $('#vbutton'+ num).removeAttr("onclick");
        $('#vbutton'+ num).attr("onclick","GetVerifyCode(" + num + ");");
    }
}

// Save VerfiyCode
function SaveVerifyCode(num)
{
    // clear error
    $('#error' + num).hide().html("");
    
    // send request to background-process
    opera.extension.postMessage({
        cmd: "SaveVerifyCode", 
        num: num, 
        code: $('#verify' + num).val()
    });
    
    // put form into wait-state
    $('#vbutton' + num).attr("disabled", "disabled");
    $('#verify' + num).attr("disabled", "disabled");
    $('#vbutton' + num).html(lang.options_wait)
}

// Removes a token
function RemoveToken(num)
{
    // delete token
    widget.preferences['oauth_token' + num] = "";
    widget.preferences['oauth_secret' + num] = "";
    widget.preferences['oauth_mail' + num] = "";
        
    // update feed(s)
    opera.extension.postMessage({
        cmd:"Refresh"
    });
        
    // reset form to default   
    $('#mail' + num).html(CreateForm('new', num));   
}

// Handle messages from background-process
function HandleMessages(event)
{
    if(Debug) opera.postError("INFO: Option-Page get command '" + event.data.cmd + "'");
    switch(event.data.cmd)
    {
        // Verfify-Code was successfully checked
        case "successCheck" :
            $('#mail' + event.data.num).html(CreateForm('info', event.data.num));
            break;
    
        // Error while checking Verify-Code
        case "errorVerify":
        case "errorCheck":
            $('#vbutton' + event.data.num).removeAttr("disabled");
            $('#verify' + event.data.num).removeAttr("disabled");
            CheckForSave(event.data.num);
            $('#error' + event.data.num).show().html(lang.options_failverify);
            
            $('#verify' + event.data.num).select();
            break;   
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
