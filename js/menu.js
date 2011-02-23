window.addEventListener("load", function()
{
  // Listen for script messages from background-process
  opera.extension.onmessage = HandleMessages;
  
  // Refresh fee now
  opera.extension.postMessage({cmd:"Refresh"});

  // set strings
  $("#open").html(lang.popup_open);
  $("#compose").html(lang.popup_compose);
  $("#pref").html(lang.popup_pref);
}, false);

// Open Google-Mail-Tab
function OpenGoogleMailTab()
{
  // Send command to background-process
  opera.extension.postMessage({cmd:"LoadGmailTab"});
  
  // Close Popup-Menu
   window.close();
}

// Compose new mail
function ComposeMail()
{
  // Send command to background-process
  opera.extension.postMessage({cmd:"ComposeMail"});
}

// Show Preferences in new Tab
function ShowPreferences()
{
  opera.extension.postMessage({cmd:"Preferences"});
}

// Show Preferences in new Tab
function LoadLink(event)
{
  opera.extension.postMessage({cmd: "LoadLink", lnk: event.data.link});
}

// Handle messages from background-process
function HandleMessages(event)
{
  // whats the status
  switch(event.data.status)
  {
    // Show Error
    case "error" : 
      $('#status').html(event.data.info)
        .addClass('error_box').removeClass('status_box');
      $('#last_update').html("");
      $('#message_box .message').remove();
      break;
    
    // Show Status and Messages
    case "success": 
    
      // Show Status
      $('#status').html(event.data.info)
        .addClass('status_box').removeClass('error_box');
      $('#last_update').html(event.data.timestring);
      
      // Clear Box 
      $('#message_box .message').remove();
      
      // Check if there are Messages to display
      if(event.data.msg && event.data.msg.length > 0)
      {
        // Add every message
        for(var i=0; i < event.data.msg.length; i++)
        {
            var tooltip = "<div class='tooltip'><p><u>"+ lang.popup_to + " " + 
                event.data.msg[i].sendermail + "</u><br/>" +
                lang.popup_from + " " + event.data.msg[i].authormail + 
                "<br/><br/></p><p>" + event.data.msg[i].summary + "</p>"
            
            var msg = $('<div></div>').addClass('message').attr("title", tooltip).tooltip({left: -15})
              .html("<strong>" + event.data.msg[i].authorname + "</strong> : " + event.data.msg[i].title).click({link: event.data.msg[i].link}, LoadLink);
            $('#message_box').append(msg);
        }
      }
      break;   
  }
}
