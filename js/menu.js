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

    // Set Theme
    if(widget.preferences['theme'] && widget.preferences['theme'] != 'standard' && widget.preferences['theme'] != '' )
    {
        $('#menustyle').attr('href', 'css/' + widget.preferences['theme'] + '/theme.css');
    }

    // Set Language-Strings
    $("#openText").html(lang.popup_open);
    $("#composeText").html(lang.popup_compose);
    $("#prefText").html(lang.popup_pref);
    
    // Close Popup-Box on "Mouse-Leave"
    $('body').mouseleave(function() {window.close;});          
}, false);

// Open Google-Mail-Tab
function OpenGoogleMailTab(compose)
{
    // Check if we have more Accounts here
    if(AccountsCount > 1)
    {
        // At first clear AccountList
        $('#AccountList').html("");
        var choose = $('<p>').addClass('chooseAccount').html(lang.popup_choose_account);
        $('#AccountList').append(choose);
        
        // Fill AccountList
        for (var i = 0; i < Accounts.length; i++)
        {
                // set link
                var linkURL = Accounts[i].AccountLink;
                if(compose) linkURL += "?#compose";
            
                // set entry
                var entry = $("<div>").addClass("accountEntry").html("<strong>" + Accounts[i].Name + "</strong>");
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
        // Set link
        var linkURL2 = Accounts[0].AccountLink;
        if(compose) linkURL2 += "?#compose";
        LoadLink(null, linkURL2);
        return;
    }
    // Otherwise show default Gmail-Tab
    else
    {
        var linkURL = "https://mail.google.com/mail/";
        if(compose) linkURL  += "?#compose";
        LoadLink(null, linkURL);
    }
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
      
    // Close Popup-Menu
    window.close();
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
    // Whats the status
    switch(event.data.cmd)
    {
        // Info-Message
        case "info" :
            $('#wait').hide();
            SetHeight(InfoHeight)
            $('#status').html(event.data.msg);
            $('#status').addClass('infoBox').removeClass('statusBox');
            $('#lastUpdate').html("");
            $('#messageBox .message').remove();
            AccountsCount = 0;
            break;
    
        // Messages
        case "messages":
            $('#wait').hide();
            
            // Show Status
            $('#status').html(event.data.status);
            $('#status').addClass('statusBox').removeClass('infoBox');
            $('#lastUpdate').html(event.data.timestring);
            $('#errorDetails').hide();
                        
            // Show Messages
            Accounts = event.data.accounts;
            AccountsCount = event.data.accounts_count;
            ShowMessages(event.data.accounts, event.data.showAccountSorted);
    }
}

// Shows the messages
function ShowMessages(accounts, showAccountSorted)
{
    // Show per Account
    if(showAccountSorted)
    {
    //TODO: Cooming soon...
    }
    else
    {
        var msg = JoinMessages(accounts);
        SetHeight(StandardHeight + msg.length * SingleMessageHeight);
        var newMsgBox = $('<div>');
        for(var i=0; i < msg.length; i++)
            newMsgBox.append(CreateMessageBox(msg[i]));
        
        // Show now
        $('#messageBox .message').remove();
        $('#messageBox').append(newMsgBox);
    }
}

// Join all messages for no-account-sorting
function JoinMessages(accounts)
{
    // Put all messages from every account in one message
    var msg = new Array();    
    for (var i = 0; i < Accounts.length; i++)
            msg = msg.concat(accounts[i].UnreadMessages);
    
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
        author = $('<strong>').text(message.Sendername + " : ");
                      
    // Message-Title
    var subject = message.Subject;
    if(subject == "") subject = lang.mail_empty_subject;
    var title = $('<span>').text(subject);

    // Message-Body
    var content = message.Content;
    if(content == "") content = lang.mail_empty_body;
    var body = $('<p>').text(content);
    
    // Hidden Message UrlID an AccountNumber
    var hidden1 = $('<input>').attr("type", "hidden")
      .attr("name", "uid").attr("value", message.UrlId);
    var hidden2 = $('<input>').attr("type", "hidden")
      .attr("name", "num").attr("value", message.AccountNumber);
    
    // Tooltip
    var tt_to = "<u>" + lang.popup_to + " " + message.Accountname + "</u><br/>";
    var tooltip = $("<div>")
    .html("<p>" + tt_to + lang.popup_from + " " + message.Sendermail + 
        "<br/><br/></p>").append(body);   
        
    // Text for Messagebox
    var txt = $('<div>').addClass('text').append(author).append(title);   
       
    // MessageBox
    var msg = $('<div>').addClass('message')
    .click()
    .attr("title", tooltip.html())
    .tooltip({left: -15})
    .append(txt)
    .append(hidden1)
    .append(hidden2)
    .click({
        link: message.MessageLink
    }, LoadLink);     
    DebugMessage(msg.html());

    // Add Context-Menü
    msg.mousedown(function(e){
      if( e.button == 2 ) { ShowMessageOptions(this) };
    });
         
    // return JQuery-Object
    return msg;
}

// Context-Menu for single message
function ShowMessageOptions(box)
{
  // Only append once
  if($('#message_options').length > 0) return false;

  // Create a new layer
  var layer = $("<div>").attr("id", "message_options").addClass('message_options');
  
  // Set buttons
  var id = $(box).find('[name=uid]').val();     
  var num = $(box).find('[name=num]').val();   
  layer.append($("<div>").click({action: "mark", uid: id, num: num}, MessageAction)
    .addClass("button").append("<div class='image mark'></div>"));
  layer.append($("<div>").click({action: "archive", uid: id, num: num}, MessageAction)
    .addClass("button").append("<div class='image archive'></div>"));
  layer.append($("<div>").click({action: "spam", uid: id, num: num}, MessageAction)
    .addClass("button").append("<div class='image spam'></div>"));
  layer.append($("<div>").click({action: "delete", uid: id, num: num}, MessageAction)
    .addClass("button").append("<div class='image delete'></div>"));
  
  // Set layer-position
  layer.css("top", box.offsetTop + "px");
  layer.css("left", box.offsetLeft + "px");
  layer.css("height", $(box).css("height"));
  layer.css("width", $(box).css("width"));
  
  // Removes layer on mouse-leave
  layer.mouseleave(function(){$(this).remove();});

  // Show Layer now
  $(box).append(layer); 
  
  return false; 
}

// Message-Action: Mark as Read, Archive, Mark as Spam, Delete
function MessageAction(event)
{
      DebugMessage("MessageAction '" + event.data.action + "' for ID:" + event.data.uid);

      // Action is performed by background-process
      opera.extension.postMessage({
          cmd: "MessageAction", 
          uid: event.data.uid,
          action: event.data.action,
          anum: event.data.num
      });   
      
      // TODO: Remove element now (hope fur success)
      
      // TODO: Refresh          
      
      return false;
}

// Write Debug-Message
function DebugMessage(message, type)
{
    if(!type) type = "info";
    message = "GMNEx,mn," + type + " : " + message;
    
    // Send message to background-process
    opera.extension.postMessage({
          cmd: "DebugMessage", 
          msg: message,
    });   
}
