window.addEventListener("load", function()
{
  // Listen for script messages from background-process
  opera.extension.onmessage = HandleMessages;
}, false);

// Open Google-Mail-Tab
function OpenGoogleMailTab()
{
  // Send command to background-process
  opera.extension.postMessage({cmd:"LoadGmailTab"});
  
  // Close Popup-Menu
   window.close();
}

// Refresh now
function Refresh()
{
  // Send command to background-process
  opera.extension.postMessage({cmd:"Refresh"});
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
      $('#last_update').html(event.data.updated);
      
      // Clear Box 
      $('#message_box .message').remove();
      
      // Check if there are Messages to display
      if(event.data.msg && event.data.msg.length > 0)
      {
        
        // Add every message
        for(var i=0; i < event.data.msg.length; i++)
        {
            var msg = $('<div></div>').addClass('message')
              .html("<strong>" + event.data.msg[i].authorname + "</strong> : " + event.data.msg[i].title).click({link: event.data.msg[i].link}, LoadLink);
            $('#message_box').append(msg);
        }
      }
      break;   
  }
}