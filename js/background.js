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

// ***** CONSTANT SETTINGS ***/

// Menu-Height
var StandardHeight=120; // Standard-Height of Menu
var Grake; // Grake-Interface
var AudioObject; // Object for playing notification-sound
var UpdateTimer; // Timer for intervall-update

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
        height: StandardHeight
    }
}
// ***************************/

// Create/Add ToolbarIcon on Extension-Start
window.addEventListener("load", function()
{
    // Set Debug-Mode
    this.Debug = widget.preferences['debug_mode'];
    DebugMessage("Background-Process is initializing, Debug Mode is ready");

    // Listen for script messages
    opera.extension.onmessage = HandleMessages;
    
    // Create and Add the Button
    this.MyButton = opera.contexts.toolbar.createItem(this.ToolbarUIItemProperties);
    opera.contexts.toolbar.addItem(this.MyButton);
  
    // listen to storage events
    addEventListener('storage', storageHandler, false );
    
    // Init Grake
    Grake = new Grake();
    Grake.Debug = this.Debug;
  
    // Update Mails now
    Update();
  
}, false);

// Some Options maybe have changed
function storageHandler(e)
{
    // Check if the storage effected is the widget.preferences
    if(e.storageArea != widget.preferences) return;

    // If the Update-Intervall was changed -> set the new intervall
    if(e.key == 'update_intervall')
    {
        // Reset the Update-Timer and set it with the new time
        window.clearTimeout(UpdateTimer);
        UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
    }
}

// Update Message-Count
function Update(source)
{
    DebugMessage("Update() is called");
    
    // Tells Grake to Update all Accounts
    Grake.UpdateAccounts(
        function()
        {
            Update_callback(source);
        });
}

// Update-Callback after Grake has completed
function Update_callback(source)
{
    // Get Accounts
    var accounts = Grake.GetAccounts();
    var num = Grake.GetAccountsCount();
    DebugMessage("Update_callback() is called");
    
    // Check if we have Accounts
    if(accounts == null || num == 0)
    {
        // set button / menu
        MyButton.badge.display="block";
        MyButton.badge.textContent = "x";
        DebugMessage("No active accounts are found");
    }
    else
    {
        // Check if we have new mails
        var unreadCount = 0;
        var newMail = false;
        for(var mail in accounts)
        {
            unreadCount += Number(accounts[mail].UnreadCount);
            if(accounts[mail].HasNewMessages) newMail= true;

        }
        DebugMessage(num + " Accounts with " + unreadCount + " Messages");
    
        // Show total number of unread messages in button
        MyButton.badge.textContent = unreadCount;
    
        // Play sound for new Mail
        if(newMail) PlaySoundNotification();    
    }
    
    // Should we send the messages to a source ?
    if(source) SendMessagesToSource(source)

    // Set new timeout
    UpdateTimer = window.setTimeout(Update, widget.preferences['update_intervall'] * 1000);
}

// Sends current messages to a event source (the menu)
function SendMessagesToSource(source)
{
    DebugMessage("Send messages to source");
    
    // Get Accounts-Count
    var eventMessage;
    var count = Grake.GetAccountsCount();
    if(count == 0)
    {
        eventMessage = {
            cmd: "info",
            msg: lang.error_noActiveAccount
        };
    }
    else
    {
        // Send Accounts to Popup-menu
        eventMessage = {
            cmd: "messages",
            accounts: Grake.GetAccounts(), 
            timestring: Grake.GetLastUpdateTimestring(),
            showAccountSorted: false
        };
    }   

    // Send to source
    SendMsg(source, eventMessage)
}

// Handle messages from popup-menu
function HandleMessages(event)
{
    DebugMessage("Background-Process get command '" + event.data.cmd + "'");
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
           
        // Refresh now
        case 'Refresh':
            // reset timer
            window.clearTimeout(UpdateTimer);
            
            // A message is send to source, if the source is the menu
            if(event.origin.indexOf("popup.html") > -1)
            {
                // At first send the current state to the source
                // (quicker)
                SendMessagesToSource(event.source);
                
                // then update the Accounts
                Update(event.source);
            }
            else
                Update();
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
            SendMsg(event.source, {
                cmd: 'MailtoEnabled', 
                value: widget.preferences['mailto_links']
            });
            break;
            
        // Return Debug-Option
        case 'DebugEnabled':
            SendMsg(event.source, {
                cmd: 'DebugEnabled', 
                value: this.Debug
            });
            break;
            
        // Sets new Popup-Height
        case 'SetPopupSize':
            // Only change size if it is different to avoid flicker
            if(Number(MyButton.popup.height) != Number(event.data.height))
                {
                    
                    DebugMessage("changed " + event.data.height + " -> " + MyButton.popup.height);
                    MyButton.popup.height = event.data.height;
                }
            break;

        // Do nothing
        default:
            DebugMessage("Unkown Command from Menu -> " + event.data.cmd, "error");
    }
}

// Sent to an event-source
function SendMsg(source, message)
{
    if(source && (typeof source != 'undefined'))
    {
        try
        {
            source.postMessage(message);
        }
        catch(err)
        {
            DebugMessage("Sending message to source fails (" + err.description + ")", "error");
        }
    }    
}

// Play Sound-Notification (if enabled)
function PlaySoundNotification()
{
    if(widget.preferences['enable_sound'] == 'on')
    {
        // Init Audio-Object if necessary
        if(!AudioObject) AudioObject = new Audio;
    
        // Set Source and play
        AudioObject.src = '/sound/notification1.ogg';
        AudioObject.play();
        
        DebugMessage("Notification is played");
    }
}

// Write Debug-Message
function DebugMessage(message, type)
{
    if(!type) type = "info";
    if(Debug) opera.postError("GMNEx," + type + " : " + message);
}
