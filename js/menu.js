window.addEventListener("load", function()
    {
        // Listen for script messages from background-process
        opera.extension.onmessage = HandleMessages;
  
        // Refresh feed now
        opera.extension.postMessage({
            cmd:"Refresh"
        });
        
        // Set Theme
        if(widget.preferences['theme'] != 'standard')
        {
           $('head').append('<link rel="stylesheet" href="css/' + widget.preferences['theme'] + '/theme.css" type="text/css" />');
        }

        // set strings
        $("#open").html(lang.popup_open);
        $("#compose").html(lang.popup_compose);
        $("#pref").html(lang.popup_pref);
    }, false);

// Open Google-Mail-Tab
function OpenGoogleMailTab()
{
    // Send command to background-process
    opera.extension.postMessage({
        cmd:"LoadGmailTab"
    });
  
    // Close Popup-Menu
    window.close();
}

// Compose new mail
function ComposeMail()
{
    // Send command to background-process
    opera.extension.postMessage({
        cmd:"ComposeMail"
    });
}

// Show Preferences in new Tab
function ShowPreferences()
{
    opera.extension.postMessage({
        cmd:"Preferences"
    });
}

// Loads links to message to new tab
function LoadLink(event)
{
    opera.extension.postMessage({
        cmd: "LoadLink", 
        lnk: event.data.link
    });
}

// Handle messages from background-process
function HandleMessages(event)
{
    // whats the status
    switch(event.data.status)
    {
        // Show Error
        case "error" :
            $('#wait').hide();
            $('#status').html(event.data.info)
            .addClass('error_box').removeClass('status_box');
            $('#last_update').html("");
            $('#message_box .message').remove();
            break;
    
        // Show Status and Messages
        case "success":
            $('#wait').hide();
      
            // Show Status
            $('#status').html(event.data.info)
            .addClass('status_box').removeClass('error_box');
            $('#last_update').html(event.data.timestring);
      
            // Are the are single error-messages?
            if(event.data.emsg && event.data.emsg.length > 0)
            {
                // set text
                var txt;
                if(event.data.emsg.length == 1)
                    txt = " (" + event.data.emsg.length + " " + lang.popup_error_occurred + ")";
                else
                    txt = " (" + event.data.emsg.length + " " + lang.popup_errors_occurred + ")";   
      
                // append text
                $('#last_update').append(
                    $('<span></span>').html(txt).css('color', '#CC0F15').css('cursor', 'pointer')
                    .click(function(){
                        $('#error_details').toggle()
                        })
                    );
               // add details
               $('#error_details').html("");
               for(var j=0; j < event.data.emsg.length; j++)
               {
                    $('#error_details')
                        .append("<div title='ERROR: " + event.data.emsg[j].detail + "'>" + event.data.emsg[j].text + "</div>");
               }
            }
            else
                $('#error_details').hide();
      
            // Clear Box 
            $('#message_box .message').remove();
      
            // Check if there are Messages to display
            if(event.data.msg && event.data.msg.length > 0)
            {
                // Add every message
                for(var i=0; i < event.data.msg.length; i++)
                {
                    // Autorname
                    var author = "";
                    if(event.data.msg[i].authorname != "")
                      author = $('<strong></strong>').text(event.data.msg[i].authorname + " : ");
                      
                   // Message-Title
                   var title = $('<span></span>').text(event.data.msg[i].title);
                   
                   // Message-Body
                   var body = $('<p></p>').text(event.data.msg[i].summary);
                   
                    // Tooltip
                    var tt_to = "";
                    if(event.data.msg[i].sendermail)
                      tt_to = "<u>"+ lang.popup_to + " " + event.data.msg[i].sendermail + "</u><br/>";
                    var tooltip = $("<div></div>")
                      .html("<p>" + tt_to + lang.popup_from + " " + event.data.msg[i].authormail + 
                        "<br/><br/></p>").append(body);                    
           
                    // MessageBox
                    var msg = $('<div></div>').addClass('message')
                    .attr("title", tooltip.html()).tooltip({
                        left: -15
                    }).append(author).append(title).click({
                        link: event.data.msg[i].link
                    }, LoadLink);
                    
                    $('#message_box').append(msg);
                }
            }
            break;   
    }
}
