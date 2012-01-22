///
// Codebit "Opera Google Mail Extension"
// Menu-Handler
// 
// @author  Tom Schreiber (tom.schreiber@codebit.de)
// @version SVN: $Id$
//
///

var StandardHeight=120; // Standard-Height of Menu
var InfoHeight=130; // Info-Height of Menu
var SingleMessageHeight = 47; // Height of single Message-Entry
var Debug = false;
var Accounts;
var AccountsCount;

// Init Menu-Handler
// (this is called when the menu is displayed)
window.addEventListener("load", function()
{
    // Listen for script messages from background-process
    opera.extension.onmessage = HandleMessages;
  
    // Refresh feed now
    opera.extension.postMessage({
        cmd:"Refresh"
    });
    
    // Get Debug-Option
    opera.extension.postMessage({
        cmd:"DebugEnabled"
    });
        
    // Set Theme
    if(widget.preferences['theme'] != 'standard')
    {
        $('head').append('<link rel="stylesheet" href="css/' + widget.preferences['theme'] + '/theme.css" type="text/css" />');
    }

    // Set Language-Strings
    $("#open").html(lang.popup_open);
    $("#compose").html(lang.popup_compose);
    $("#pref").html(lang.popup_pref);
        
}, false);

// Open Google-Mail-Tab
function OpenGoogleMailTab(compose)
{
    // Check if we have more Accounts here
    if(AccountsCount > 1)
    {
        // At first clear AccountList
        $('#AccountList').html("");
        var choose = $('<p></p>').addClass('chooseAccount').html(lang.popup_choose_account);
        $('#AccountList').append(choose);
        
        // Fill AccountList
        for(var mail in Accounts)
        {
            // set link
            var linkURL = Accounts[mail].AccountLink;
            if(compose) linkURL += "?#compose";
            
            // set entry
            var entry = $("<div></div>").addClass("accountEntry").html("<strong>" + Accounts[mail].Name + "</strong>");
            entry.click({
                link: linkURL
            }, LoadLink);
            $('#AccountList').append(entry);            
        }

        // Show Layer
        $('#DarkLayer').fadeIn();
        $('#DarkLayer').click(function(){
            $('#DarkLayer').fadeOut()
        });
    }
    // Or just one
    else if (AccountsCount == 1)
    {
        for(var m in Accounts)
        {
             // set link
            var linkURL2 = Accounts[m].AccountLink;
            if(compose) linkURL2 += "?#compose";
            LoadLink(null, linkURL2);
            return;
        }
    }
    // Otherwise show default Gmail-Tab
    else
    {
        var linkURL = "http://mail.google.com/mail/";
        if(compose) linkURL  += "?#compose";
        LoadLink(null, linkURL);
    }
  
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
function LoadLink(event, directlink)
{
    // Set link and load
    var linkURL = "";
    if(directlink && directlink != "") 
        linkURL = directlink;
    else if(event && event.data && event.data.link)
        linkURL = event.data.link;
    else
        return;
   
    // URL is loaded by background.js
    opera.extension.postMessage({
        cmd: "LoadLink", 
        lnk: linkURL
    });
}

// Set new height (only background-process can do this)
function SetHeight(height)
{
    opera.extension.postMessage({
        cmd: "SetPopupSize", 
        height: height
    });
}

// Handle messages from background-process
function HandleMessages(event)
{   
    DebugMessage("Popup-menu received message: " + event.data.cmd);
    
    // Whats the status
    switch(event.data.cmd)
    {
        // Debug-Option
        case "DebugEnabled":
            Debug = event.data.value;
            break;
        
        // Show Error-Message
        case "info" :
            $('#wait').hide();
            SetHeight(InfoHeight)
            $('#status').html(event.data.msg);
            $('#status').addClass('info_box').removeClass('status_box');
            $('#last_update').html("");
            $('#message_box .message').remove();
            AccountsCount = 0;
            break;
    
        // Show Success-Message
        case "messages":
            $('#wait').hide();
            
            // Show Status
            $('#status').html(event.data.status);
            $('#status').addClass('status_box').removeClass('info_box');
            $('#last_update').html(event.data.timestring);
            $('#error_details').hide();
                        
            // Show Messages
            Accounts = event.data.accounts;
            AccountsCount = event.data.accounts_count;
            ShowMessages(event.data.accounts, event.data.showAccountSorted)
    }
}

// Shows the messages
function ShowMessages(accounts, showAccountSorted)
{
    DebugMessage("Show messages now");

    // Show per Account
    if(showAccountSorted)
    {
    //TODO: Cooming soon...
    }
    else
    {
        var msg = JoinMessages(accounts);
        SetHeight(StandardHeight + msg.length * SingleMessageHeight);
        var newMsgBox = $('<div></div>');
        for(var i=0; i < msg.length; i++)
            newMsgBox.append(CreateMessageBox(msg[i]));
        
        // Show now
        $('#message_box .message').remove();
        $('#message_box').append(newMsgBox);
    }
}

// Join all messages for no-account-sorting
function JoinMessages(accounts)
{
    // Put all messages from every account in one message
    var msg = new Array();    
    for(var mail in accounts)
    {
        msg = msg.concat(accounts[mail].UnreadMessages);
    }
    
    // Sort all messages
    msg.sort(function(a, b){
        var t1 = new Date(a.modified);
        var t2 = new Date(b.modified);
        return t2.getTime()-t1.getTime();
    });
    return msg;
}

// Create Single-Message-Box
function CreateMessageBox(message)
{
    // Autorname
    var author = "";
    if(message.Sendername != "")
        author = $('<strong></strong>').text(message.Sendername + " : ");
                      
    // Message-Title
    var title = $('<span></span>').text(message.Subject);

    // Message-Body
    var body = $('<p></p>').text(message.Content);
    
    // Tooltip
    var tt_to = "";
    var tooltip = $("<div></div>")
    .html("<p>" + tt_to + lang.popup_from + " " + message.Sendermail + 
        "<br/><br/></p>").append(body);                    
           
    // MessageBox
    var msg = $('<div></div>').addClass('message')
    .attr("title", tooltip.html()).tooltip({
        left: -15
    }).append(author).append(title).click({
        link: message.MessageLink
    }, LoadLink);
         
    // return JQuey-Object
    return msg;
}

// Write Debug-Message
function DebugMessage(message, type)
{
    if(!type) type = "info";
    if(Debug) opera.postError("GMNEx,mn," + type + " : " + message);
}
