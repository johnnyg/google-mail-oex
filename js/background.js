/**
 * ~~~ Codebit ~~~
 * Opera Google Mail Extension - Background-Process
 * --------------------------------------------------
 * http://codebit.de/oex/google-mail
 * 
 * @author  Tom Schreiber (tom.schreiber@codebit.de)
 * @version SVN: $Id$
 */


// Global Vars
var MyButton;     // Toolbar-Button
var UpdateTimer;  // UpdateTimer
var Debug=0;      // DebugMode (writes to Error-Console)
var StdHeight= 120;
var ErrorHeight= 130;
var Infos;

// Create/Add ToolbarIcon on Extension-Start
window.addEventListener("load", function()
{
  // ToolbarButton-Properties
  var ToolbarUIItemProperties = 
  {
    title: "Google Mail Notifier",
    icon: "img/gmail-icon-18px.png",
    badge:
    {
        display: "block",
        textContent: "x",
        color: "white",
        backgroundColor: "rgba(211, 0, 4, 1)"
    },
    popup: 
    {
      href: "popup.html",
      width: 290,
      height: StdHeight
    } 
  }
  
  // Listen for injected script messages
  opera.extension.onmessage = HandleMenuMessages;

  // Create and Add the Button
  MyButton = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
  opera.contexts.toolbar.addItem(MyButton);
  
  // listen to storage events
  addEventListener( 'storage', storageHandler, false );
  
  // Update now
  Update(); 
  
  // Connect to Menu and give all the Infos
  opera.extension.onconnect = function (event)
  {
  	if(event.origin.indexOf("popup.html") > -1)
		{
       event.source.postMessage(Infos);
		}
	}
}, false);


// Some Options maybe have changed
function storageHandler(e)
{
    // Check if the storage effected is the widget.preferences
    if(e.storageArea != widget.preferences) return;

    // If the Update-Intervall was changed -> set the new intervall
    if( e.key=='update_intervall')
    {
        // Reset the Update-Timer and set it with the new time
        window.clearTimeout(UpdateTimer);
        UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
    }
    
    // If login or passsword was changed -> Update()
    if(e.key=='login' || e.key=='password')
    {
      window.clearTimeout(UpdateTimer);
      Update();
    }
}

// Update Message-Count
function Update(source)
{
  // At first we check if we have a login and password
  if( (!widget.preferences['login']) ||
      (!widget.preferences['password']) ||
      (widget.preferences['login'] == "") || 
      (widget.preferences['password'] == "") )
  {
    DisplayError("<strong>No Username/Password</strong>,<br/>please edit <a href='javascript:ShowPreferences();'>preferences</a>.");
    if(source) source.postMessage(Infos);
    return;
  }

  // Get Gmail-message-feed
  if(Debug) opera.postError("GMN : Get Message feed...");
  jQuery.getFeed(
  {
       url: 'https://' + widget.preferences['login'] + ':' + widget.preferences['password'] + '@mail.google.com/mail/feed/atom',
       success: function(feed) 
       {
           // YEAH, we got the feed -> now just count the elements and show the
           // number in the icon or nothing if there are no unread elements in
           // the inbox
          var text
          if(feed.items.length && (feed.items.length > 0))  
          {         
            MyButton.badge.textContent = feed.items.length;
            MyButton.badge.display="block";
            if(feed.items.length > 1)
              text = "There are <strong>" + feed.items.length + 
                " unread messages</strong> in your inbox";
            else
              text = "There are <strong> one unread message</strong> " +
                "in your inbox";     
                
            messages = feed.items;
          }
          else
          {
            MyButton.badge.display="none";
            text = "There are <strong>no unread messages</strong> in your inbox";
            messages = null;
          }
          
          // Current Time
          var now = new Date();
          var h0 = "", m0 = "", s0 = "";
          if(now.getHours() < 10) h0 = "0"
          if(now.getMinutes() < 10) m0 = "0"
          if(now.getSeconds() < 10) s0 = "0"
          var timestring = "Last Update : " + h0 + now.getHours() + ":" +
            m0 + now.getMinutes() + ":" + s0 +  now.getSeconds();
          
          // Update Infos
          if(Debug) opera.postError("GMN : Feed '" + feed.title +"' received");
          Infos = {status: "success", info: text, updated: timestring, msg: messages};
          
          // Set new Menu-Height
          if (feed.items.length > 0)
          {
            var elements= feed.items.length; 
            if(feed.items.length > 10) elements = 10;
            MyButton.popup.height = (StdHeight + 47 * elements) + "px";
          }
          else
            MyButton.popup.height = StdHeight + "px";
            
          // Tell new Infos to Popup
          if(source) source.postMessage(Infos);
       },
       error : function(XMLHttpRequest, textStatus, errorThrown)
       {
          if(Debug) opera.postError("GMN : Error while receiving Feed");
          DisplayError("<strong>An error occurred.</strong><br/>" +
            "Please <a href='javascript:ShowPreferences();'>check</a> " +
            "your username and password.")          
          if(source) source.postMessage(Infos);
       }
   });
   
   // Set new timeout
   UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
}

// Handle messages from popup-menu
function HandleMenuMessages(event)
{
  switch(event.data.cmd)
  {
    // Load Google Mail in new tab
    case 'LoadGmailTab':
      if( opera.extension.tabs.create )
          opera.extension.tabs.create({url:"http://mail.google.com/mail/",focused:true});
      break;
      
    // Load Preferences
    case 'Preferences':
      if( opera.extension.tabs.create )
          opera.extension.tabs.create({url:"./options.html", focused:true});
      break;
      
    // Load Message-Link in new Tab
    case 'LoadLink':
      if( opera.extension.tabs.create )
          opera.extension.tabs.create({url:event.data.lnk, focused:true});
      break;
      
    // Refresh
    case 'Refresh':
      window.clearTimeout(UpdateTimer);
      Update(event.source);
      break;
      
    // Do nothing
    default: 
      if(Debug) opera.postError("GMN : Unkown Command from Menu -> " + event.data);
  }
}

// Display a error
function DisplayError(text)
{
  MyButton.badge.display="block";
  MyButton.badge.textContent = "e";
  Infos = {status: "error", info: text};
  MyButton.popup.height = ErrorHeight + "px";
}



