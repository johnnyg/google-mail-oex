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
var Debug=1;            // DebugMode (writes to Error-Console)
var StdHeight=120;      // Standard-Height of Menu
var ErrorHeight=130 ;   // Error-Height of Menu
var MaxAccounts;        // Number of max supported accounts
var Feeds;              // Feeds-Array
var AudioObject;        // Audio-Object for Sound-Notification
var LockUpdate;         // Lock SendInfo()-Function

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
    
    // Set vars
    MaxAccounts = parseInt(widget.preferences['num_max_accounts']);
    Feeds = new Array(MaxAccounts);
    LockUpdate = false;
  
    // Listen for injected script messages
    opera.extension.onmessage = HandleMessages;

    // Create and Add the Button
    MyButton = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
    opera.contexts.toolbar.addItem(MyButton);
  
    // listen to storage events
    addEventListener( 'storage', storageHandler, false );
  
    // Update now
    Update();
  
    // Connect to Menu and give all the Feeds
    opera.extension.onconnect = function (event)
    {
        if(event.origin.indexOf("popup.html") > -1)
            if(Feeds) event.source.postMessage(Feeds);
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
    for(var i=0; i < MaxAccounts; i++)
    {
        // check if we have an token here
        if((!widget.preferences['oauth_token' + i]) || (widget.preferences['oauth_token' + i] == ""))
        {
            Feeds[i] = {
                status: "empty"
            };
            continue;
        }
        
        // set status to "request"
        if(Feeds[i] && Feeds[i].status)
            Feeds[i].status = "request"
        else
            Feeds[i]= {
                status: "request"
            };
  
        // use default or "all unread"-feed
        var feedURL = "https://mail.google.com/mail/feed/atom";
        if(widget.preferences['unread_feed' + i] == "on")
            feedURL = "https://mail.google.com/mail/feed/atom/unread";       
  
        // Get Feed now
        GetFeed(feedURL, i, source)
    }

    // Set new timeout
    UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
}

function GetFeed(feedURL, tokenNum, source)
{
    if(Debug) opera.postError("INFO: Get Message feed " + tokenNum + "...");
    jQuery.getFeed(
    {
        url: feedURL,
        beforeSend: function(XMLHttpRequest, settings) {
            PrepareRequest(XMLHttpRequest, settings, tokenNum, feedURL);
        },
        success: function(feed) {
            ParseFeed(feed, source, tokenNum)
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            if(Debug) opera.postError("ERROR : Error while receiving Feed " + 
                tokenNum + ", " + errorThrown + "(" + XMLHttpRequest.status + ")") ;
            Feeds[i] = {
                status: "error", 
                info: lang.error_confails
            };
            SendFeeds(source);
        }
    });
}

// Handle new Feed
function ParseFeed(feed, source, tokenNum)
{
    // get feed
    messages = feed.items;
  
    // Check if there are new messages (if there is any new ID)
    var newMessages = false;
    if(Feeds[tokenNum] && Feeds[tokenNum].msg && Feeds[tokenNum].msg.length > 0)
        for(var i=0; i < messages.length; i++)
        {
            var foundMessage = false;
            for(var j=0; j < Feeds[tokenNum].msg.length; j++)
            {
                if(messages[i].id == Feeds[tokenNum].msg[j].id)
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

    // Update Feeds
    if(Debug) opera.postError("SUCCESS: Feed " + tokenNum + " '" + feed.title + "' with " + messages.length + " messages received");
    Feeds[tokenNum] = {
        status: "success",
        msg: messages,
        newMsg: newMessages
    };

    // Tell new Feeds to Popup / Update Icon
    SendFeeds(source);
}

// Checks feed and gets mail-adress from feed
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
            widget.preferences['unread_feed' + tokenNum] = "";
            if(typeof source != 'undefined') source.postMessage({
                cmd: 'successCheck',
                num: tokenNum,
                mail: widget.preferences['oauth_mail' + tokenNum]
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown)
        {
            if(typeof source != 'undefined') source.postMessage({
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
                event.source.postMessage({
                    cmd: 'errorVerify',
                    num: event.data.num
                });
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
            if(event.data.nocallback)
                Update();
            else
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

        // Return Mailto-Option
        case 'MailtoEnabled':
            event.source.postMessage({
                cmd: 'MailtoEnabled', 
                value: widget.preferences['mailto_links']
            });
            break;
      
        // Do nothing
        default:
            if(Debug) opera.postError("ERROR: Unkown Command from Menu -> " + event.data.cmd);
    }
}

// Display a error
function SendFeeds(source)
{
    // Should we wait?
    // TODO: Timeout
    for(var i=0; i < MaxAccounts; i++)
    {
        if(Feeds[i] && Feeds[i].status=="request") return;   
    }
    if(Debug) opera.postError("INFO: All Feeds received.");
    
    // Check if there are new messages and get messages
    // TODO: Sort
    var newMessages = false;
    var msg = new Array();
    for(var i=0; i < MaxAccounts; i++)
    {
        if(Feeds[i] && Feeds[i].status=="success")
        {
            // msg
            for (var x=0; x < Feeds[i].msg.length; x++) 
            {
                Feeds[i].msg[x].feednum = i;
                Feeds[i].msg[x].sendermail = widget.preferences['oauth_mail' + i];
                msg.push(Feeds[i].msg[x]);
            }

            // new?
            if(Feeds[i].newMsg) newMessages = true; 
        }       
    }    
    
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
 
    // Show message-count and set text
    var text;
    if(msg.length && (msg.length > 0))
    {
        MyButton.badge.textContent = msg.length;
        MyButton.badge.display="block";
        if(msg.length > 1)
            text = lang.popup_msg_before + msg.length + lang.popup_msg_after;
        else
            text = lang.popup_onemsg;
    }
    else
    {
        MyButton.badge.display="none";
        text = lang.popup_nomsg;
    }
    
    // Set new Menu-Height
    if (msg.length > 0)
    {
        var elements= msg.length;
        if(msg.length > 10) elements = 10;
        MyButton.popup.height = (StdHeight + 47 * elements) + "px";
    }
    else
        MyButton.popup.height = StdHeight + "px";
    
    // Send to source if defined
    if(typeof source != 'undefined')
        source.postMessage({
            status: "success", 
            info: text, 
            timestring: timestring, 
            msg: msg
        });
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
