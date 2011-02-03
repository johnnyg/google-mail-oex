/**
 * ~~~ Codebit ~~~
 * Opera Google Mail Extension - Background-Process
 * --------------------------------------------------
 * http://codebit.de/oex/google-mail
 * 
 * @author  Tom Schreiber (tom.schreiber@codebit.de)
 * @version SVN: $Id$
 *  
 */

// Global Vars
var MyButton;           // Toolbar-Button
var UpdateTimer;        // UpdateTimer
var Debug=0;            // DebugMode (writes to Error-Console)
var StdHeight=120;      // Standard-Height of Menu
var ErrorHeight=130 ;   // Error-Height of Menu
var Infos;              // All Infos about last messages-feed
var AudioObject;        // Audio-Object for Sound-Notification

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
            width: 325,
            height: StdHeight
        }
    }
  
    // Listen for injected script messages
    opera.extension.onmessage = HandleMessages;

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
            if(Infos) event.source.postMessage(Infos);
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
    // TODO: Support more than one token (multi-account)
    var tokenNum = 1;

    // At first we check if we have a login and password
    if((!widget.preferences['oauth_token' + tokenNum]) ||
       (widget.preferences['oauth_token' + tokenNum] == ""))
    {
        DisplayError(lang.error_nocode);
        if(source) source.postMessage(Infos);
        return;
    }
  
    // TODO: Support alternative feed-url https://mail.google.com/mail/feed/atom/unread
    var feedURL = "https://mail.google.com/mail/feed/atom";
  
    // Get Feed now
    if(Debug) opera.postError("INFO: Get Message feed...");
    jQuery.getFeed(
    {
        url: feedURL,
        beforeSend: function(XMLHttpRequest, settings){
            PrepareRequest(XMLHttpRequest, settings, tokenNum, feedURL);
        },
        success: function(feed){
            ParseFeed(feed, source)
            },
        error : function(){
            if(Debug) opera.postError("GMN : Error while receiving Feed");
            DisplayError(lang.error_confails)
            if(source) source.postMessage(Infos);
        }
    });
   
    // Set new timeout
    UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
}

// Handle new Feed
function ParseFeed(feed, source)
{
    var text;
    messages = feed.items;
    if(messages.length && (messages.length > 0))
    {
        MyButton.badge.textContent = messages.length;
        MyButton.badge.display="block";
        if(messages.length > 1)
            text = lang.popup_msg_before + messages.length + lang.popup_msg_after;
        else
            text = lang.popup_onemsg;
    }
    else
    {
        MyButton.badge.display="none";
        text = lang.popup_nomsg;
    }
  
    // Check if there are new messages (if there is any new ID)
    var newMessages = false;
    if(Infos && Infos.status == "success")
        for(var i=0; i < messages.length; i++)
        {
            var foundMessage = false;
            for(var j=0; j < Infos.msg.length; j++)
            {
                if(messages[i].id == Infos.msg[j].id)
                    foundMessage = true;
            }
      
            // if one message is not found, we can stop to search
            if(!foundMessage)
            {
                newMessages = true;
                break;
            }
        }
    else if(messages.length > 0)
        newMessages = true;
  
    // Notification if there new Messages
    if(newMessages) PlaySoundNotification();
  
    // Current Time
    var now = new Date();
    var h0 = "", m0 = "", s0 = "";
    if(now.getHours() < 10) h0 = "0"
    if(now.getMinutes() < 10) m0 = "0"
    if(now.getSeconds() < 10) s0 = "0"
    var timestring = lang.popup_lastupdate + h0 + now.getHours() + ":" +
     m0 + now.getMinutes() + ":" + s0 +  now.getSeconds();
  
    // Update Infos
    if(Debug) opera.postError("SUCCESS: Feed '" + feed.title+"' with " + messages.length + " messages received");
    Infos = {
        status: "success",
        info: text,
        updated: timestring,
        msg: messages
    };
  
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
}

// Checks feed and gets mail-adsress from feed
function CheckFeed(tokenNum, source)
{
    // Get Feed now
    if(Debug) opera.postError("INFO: Check Message feed...");
    var feedURL = "https://mail.google.com/mail/feed/atom";
    jQuery.getFeed(
    {
        url: feedURL,
        beforeSend: function(XMLHttpRequest, settings){
            PrepareRequest(XMLHttpRequest, settings, tokenNum, feedURL);
        },
        success: function(feed)
        {
            var pattern = /[^ ]*@.*$/g;
            widget.preferences['oauth_mail' + tokenNum]  = pattern.exec(feed.title);
            if(source) source.postMessage({
                cmd: 'successCheck',
                num: tokenNum,
                mail: widget.preferences['oauth_mail' + tokenNum]
                });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown)
        {
            if(source) source.postMessage({
                cmd: 'errorCheck',
                num: tokenNum
            });
        }
    });
}

// Handle messages from popup-menu
function HandleMessages(event)
{
    if(Debug) opera.postError("INFO: Background-Process get command '" + event.data.cmd + "'");
    switch(event.data.cmd)
    {
        // Load Google Mail in new tab
        case 'LoadGmailTab':
            if( opera.extension.tabs.create )
                opera.extension.tabs.create({
                    url:"http://mail.google.com/mail/",
                    focused:true
                });
            break;
      
        // Load Preferences
        case 'Preferences':
            if( opera.extension.tabs.create )
                opera.extension.tabs.create({
                    url:"./options.html",
                    focused:true
                });
            break;
      
        // Load Message-Link in new Tab
        case 'LoadLink':
            if( opera.extension.tabs.create )
                opera.extension.tabs.create({
                    url:event.data.lnk,
                    focused:true
                });
            break;
      
        // GetVerfiyCode
        case 'GetVerifyCode':
            GetVerificationCode();
            break;
    
        // SaveVerfiyCode
        case 'SaveVerifyCode':
            if(GetAccessToken(event.data.num, event.data.code))
            {
                CheckFeed(event.data.num, event.source);
                Update();
            }
            else
                event.source.postMessage({cmd: 'errorVerify',num: event.data.num});
            break;

        // RevokeAccess
        case 'RevokeAccess':
            // Revoke Access manually
            if( opera.extension.tabs.create )
                opera.extension.tabs.create({
                    url:"https://www.google.com/accounts/IssuedAuthSubTokens",
                    focused:true
                });
            break;
      
        // Refresh
        case 'Refresh':
            window.clearTimeout(UpdateTimer);
            Update(event.source);
            break;
      
        // Compose Mail
        case 'ComposeMail':
            if( opera.extension.tabs.create )
                opera.extension.tabs.create({
                    url:"https://mail.google.com/mail/?#compose",
                    focused:true
                });
            break;
      
        // Do nothing
        default:
            if(Debug) opera.postError("ERROR: Unkown Command from Menu -> " + event.data.cmd);
    }
}

// Display a error
function DisplayError(text)
{
    MyButton.badge.display="block";
    MyButton.badge.textContent = "e";
    Infos = {
        status: "error",
        info: text
    };
    MyButton.popup.height = ErrorHeight + "px";
}

// Play Sound-Notification (if enabled)
function PlaySoundNotification()
{
    if(widget.preferences['enable_sound'] == 'on')
    {
        // Init Audio-Object if necessary
        if(!AudioObject) AudioObject = new Audio;
    
        // Set Source and play
        AudioObject.src = '/notification.ogg';
        AudioObject.play();
    }
}
