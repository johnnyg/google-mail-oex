//Debug
var Debug = 1;

// JQuery - Functions
$(document).ready(function() 
{
  // Init
  $('#range_update_intervall').val(widget.preferences['update_intervall']);
  
  // Show Range-Secounds on start
  $('#range_update_intervall_label').html(
      lang.options_update + " "  + $('#range_update_intervall').val() + 's');

  // Show Range-Secounds on change
  $('#range_update_intervall').change(function() {
    $('#range_update_intervall_label').html(
      lang.options_update + " " + $('#range_update_intervall').val() + 's');
  });

  // Make the VerfiyCode-Button work
  $('#verify1').keyup(VerifyCodeAction);  
  
  // set close function (refresh feed & close window)
  $("#close").click(function(){
    opera.extension.postMessage({cmd:"Refresh"});
    window.close();});
});

// Update VerfiyCodeAction
function VerifyCodeAction()
{
  // Unbind all existing handlers
  $('#VerifyCodeAction').unbind();
  $('#VerifyCodeAction').removeAttr("disabled");
  $('#verify1').removeAttr("disabled");
  
  // Show "get verification code"
  if($('#verify1').val() == "")
  {
    $('#VerifyCodeAction').html(lang.options_getverifiy);
    $('#VerifyCodeAction').click(function(){
      opera.extension.postMessage({cmd: "GetVerifyCode"});});  
  }
  // Show "save verification code"
  else if(!widget.preferences['oauth_token1'] || widget.preferences['oauth_token1'] == "")
  {
    $('#VerifyCodeAction').html("<strong>" + lang.options_saveverifiy + "</strong>");
    $('#VerifyCodeAction').click(function(){
      opera.extension.postMessage({cmd: "SaveVerifyCode", num: 1});
    $('#VerifyCodeAction').attr("disabled", "disabled");
    $('#verify1').attr("disabled", "disabled");
    $('#VerifyCodeAction').html(lang.options_wait)});
  }
  // Show mail-adress and "revoke"-button
  else
  {
    $('#mail1').html("<div class='access_granted'>" + lang.options_check + 
        " '" + widget.preferences['oauth_mail1'] + "' " +
        "<button id='VerifyCodeAction'>" + lang.options_revoke +"</button></div>");
     $('#VerifyCodeAction').click(function(){
        opera.extension.postMessage({cmd: "RevokeAccess", num: 1});
        window.close();});
  }
}

// Reset all OAuth-Parameter
function ResetOAuth()
{
  $("input[name=oauth_verify1]").val("");
  widget.preferences['oauth_mytoken'] = "";
  widget.preferences['oauth_verify1'] = "";
  widget.preferences['oauth_token1'] = "";
  VerifyCodeAction();
}

// Handle messages from background-process
function HandleMessages(event)
{
  if(Debug) opera.postError("INFO: Option-Page get command '" + event.data.cmd + "'");
  // whats the status
  switch(event.data.cmd)
  {
    // Verfify-Code was successfully checked
    case "successCheck" : 
      $('#mail' + event.data.num).html("<div class='access_granted'>" + lang.options_check + 
        " '" + widget.preferences['oauth_mail1'] + "' " +
        "<button id='VerifyCodeAction'>" + lang.options_revoke +"</button></div>");
      $('#VerifyCodeAction').click(function(){
        opera.extension.postMessage({cmd: "RevokeAccess", num: 1});}); 
      opera.extension.postMessage({cmd:"Refresh"});
    break;
    
    // Error while checking Verify-Code
    case "errorVerify":
    case "errorCheck":
      VerifyCodeAction();
      //TODO: $('#error' + event.data.num).html("<div>ERROR</div>");
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
        
        // update verfify button
        VerifyCodeAction();
        
        // Listen for script messages from background-process
        opera.extension.onmessage = HandleMessages;
    },
    false
);
