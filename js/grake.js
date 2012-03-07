///
// Codebit Grake  \_(°-°)_/[\/]
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GMail Javascript Handler
// 
// part of the  project "Opera Google Mail Extension"
// (see http://codebit.de/oex/google-mail for more info)
//
// @author  Tom Schreiber (tom.schreiber@codebit.de)
// @version SVN: $Id$
//
///

// ~~~ STRUCTURES ~~~
function Gmail_Account() {
    this.UniqueID = "";
    this.Name = "";
    this.UnreadCount = 0;
    this.HasNewMessages = false;
    this.IsOutdated = false;
    this.AccountLink = "";
    this.UnreadMessages = new Array(); // Message-Array
}
function Gmail_Message() {
    this.Id = "";
    this.Accountname = "";
    this.Sendername = "";
    this.Sendermail = "";
    this.Subject = "";
    this.Content = "";
    this.Modified = new Date();
    this.MessageLink = "";
    this.Timestring = "";
}

/*
 * Grake() - Class for interact with Gmail in Javascript
 */
function Grake()
{
    // Internal Vars
    var GmailURL = "https://mail.google.com/mail/";
    var GmailAccountsURL = "https://accounts.google.com/AddSession";
    var RequestTimeout = 10000; // Timeout (in ms) for Ajax-Requests
    var EmailPattern = /([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4})/ig;
    var Accounts = new Array();
    var AccountsCompleted = 0;
    var LastUpdate = "";   
    
    // Set global Jquery-AJAX-Error-Function
    $.ajaxSetup({
        error: function(xhr, status, error) {
            DebugMessage("AJAX-Error (" + status + "/" + error + ") : State " + xhr.readyState, "error");
        }
    });
    
    // Allow JQuery to make Cross-Domain-Requests (important!)
    jQuery.support.cors = true;
    
    // Return Accounts
    this.GetAccounts = function()
    {
        return Accounts;
    }  
    
    // Number of Accounts (because .length wont work)
    this.GetAccountsCount = function()
    {
        var n=0;
        for(var a in Accounts) if(Accounts[a]) n++;
        return n;
    } 
    
    // Returns total number of new messages
    this.GetTotalUnreadCount = function()
    {
        var unreadCount = 0;
        for(var mail in Accounts)
            if(Accounts[mail]) unreadCount += Number(Accounts[mail].UnreadCount);
        return unreadCount;
    }
    
    // Returns if there new Messages 
    this.GetRealNewMessageBool = function()
    {
        for(var mail in Accounts)
            if(Accounts[mail]) if(Accounts[mail].HasNewMessages) return true
        return false;
    }
    
    // Returns LastUpdate
    this.GetLastUpdateTimestring = function()
    {
        return LastUpdate;
    }
    
    // Return Request-Status
    this.GetRequestProgress = function()
    {
        return RequestProgress;
    }

    // Update Account-Infos
    this.UpdateAccounts = function(callback)
    {
        // At first check if we have multiple Accounts
        $.ajax({
            url: GmailAccountsURL, 
            timeout: this.RequestTimeout,
            success: function (data)
            {
                // Catch Accounts
                var accounts = data.match(EmailPattern);
                if(accounts)
                {
                    DebugMessage("Found active Accounts");
                    GetFeeds(accounts, callback);
                }
                // Delete Account-Object, if we found none Account and callback
                else
                {
                    Accounts = new Array();
                    // Call now
                    DebugMessage("No active Account found");
                    if(callback != null) callback();
                }
    
            },               
            error: AjaxErrorMessage 
        });   
    }
    
    // Feeds abrufen
    function GetFeeds(accounts, callback)
    {
        DebugMessage("Get " + accounts.length + " Message-Feeds now");
        
        // Mark all Accounts as outdated, so we can detect dead accounts 
        // and errors
        for(var mail in Accounts) 
            if(Accounts[mail]) Accounts[mail].IsOutdated = true;
        
        // Resets global var for watching the requests
        AccountsCompleted = 0;
                
        // Check feeds
        for (var i=0; i < accounts.length; i++)
        {
            // Get all unread or just inbox
            var unique = accounts[i].replace(/[^a-zA-Z 0-9]+/g,'')
            var feed = "/feed/atom/";
            if(widget.preferences[unique + 'Allunread'] && widget.preferences[unique+ 'Allunread'] === "on")
                feed = "/feed/atom/unread";
            
            // Get Feed now
            DebugMessage("Get Feed for " + accounts[i] + " : " + GmailURL + "u/" + i + feed );
            $.ajax({
                url: GmailURL + "u/" + i + feed, 
                timeout: RequestTimeout,
                success: function(xmlFeed) 
                {
                    // Get Mail-Adress of this Account (id)
                    var mail = xmlFeed.documentElement.getElementsByTagName("title")[0].childNodes[0].nodeValue.match(EmailPattern);
                    
                    // Get Message-Array from Feed
                    var messages = new Array()
                    var nodes = xmlFeed.documentElement.getElementsByTagName("entry");
                    for(var i=0; i < nodes.length; i++)
                    {
                        // Set new message-object
                        var msg = new Gmail_Message();
                        msg.Id = nodes[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
                        msg.Accountname = mail;
                        msg.Sendername = nodes[i].getElementsByTagName("author")[0].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                        msg.Sendermail = nodes[i].getElementsByTagName("author")[0].getElementsByTagName("email")[0].childNodes[0].nodeValue;
                        msg.Subject = nodes[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                        msg.Content = nodes[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
                        msg.MessageLink = nodes[i].getElementsByTagName("link")[0].getAttribute("href"); 
                        // TODO: Whats the difference beetween issued and modified
                        msg.Modified = new Date(nodes[i].getElementsByTagName("modified")[0].childNodes[0].nodeValue);
                        messages.push(msg);
                    }                    
                    
                    // Is this Account a new one?
                    if(Accounts[mail] == null)
                    {
                        // Create new Account-Object
                        Accounts[mail] = new Gmail_Account();
                        Accounts[mail].Name = "" + mail;
                        Accounts[mail].UniqueId = Accounts[mail].Name.replace(/[^a-zA-Z 0-9]+/g,'');
                        
                        // If there a more than zero messages for a new account
                        // they must be new
                        if(messages.length > 0) Accounts[mail].HasNewMessages = true;
                    }
                    // If we know this Accouns already, we will check for new Messages
                    else
                    {
                        // If the number of message is increased, there must be a new message,
                        // if the new number is zero there a no new messages,
                        // in all other situations we have to check every mail
                        if(messages.length > Accounts[mail].UnreadMessages.length)
                            Accounts[mail].HasNewMessages = true;
                        else if (messages.length == 0)
                            Accounts[mail].HasNewMessages = false;
                        else
                        {
                            // Every Message-Id of ne feed is compared to all 
                            // existing Messages-Ids in the Account, if we found a unique ID
                            // we found a new message and will be break here
                            Accounts[mail].HasNewMessages = false;
                            for(var i=0; i < messages.length; i++)
                            {
                                var isUnique = true;
                                for(var j=0; j < Accounts[mail].UnreadMessages.length; j++)
                                    if(Accounts[mail].UnreadMessages[j].Id.localeCompare(messages[i].Id) == 0)
                                    {
                                        isUnique = false;
                                        break;
                                    }
                                    
                                // This Message is unique, we can break here
                                if(isUnique)
                                {
                                    Accounts[mail].HasNewMessages = true;
                                    break;
                                }
                            }
                        }
                    }
                    
                    // Sort messages by date
                    messages.sort(function(a, b){
                        var t1 = new Date(a.modified);
                        var t2 = new Date(b.modified);
                        return t2.getTime()-t1.getTime();
                    });
                    
                    // Set Messages
                    Accounts[mail].UnreadMessages = messages;
                    
                    // Set Account-Link
                    Accounts[mail].AccountLink = xmlFeed.documentElement.getElementsByTagName("link")[0].getAttribute("href");
                                       
                    // Set Unread-Count
                    // Note: the fullcount field can be bigger than the number of
                    // the messages in the feed, because only up to 20 will be here
                    Accounts[mail].UnreadCount = xmlFeed.documentElement.getElementsByTagName("fullcount")[0].childNodes[0].nodeValue; 
                    
                    // This Account is now Up-to-Date
                    Accounts[mail].IsOutdated = false;
                    
                    DebugMessage("Get  " + Accounts[mail].UnreadCount + " unreads mails for " + mail);
                },
                error: AjaxErrorMessage,
                complete: function()
                { 
                    // Count the complete Accounts
                    // Note: This function is called every time (error or success),
                    // so there wont be a deadlock
                    AccountsCompleted++;
                    if(AccountsCompleted == accounts.length)
                    {
                        // Delete Outdated Accounts here, because their requests
                        // failed
                        for(var mail in Accounts)
                            if(Accounts[mail] && Accounts[mail].IsOutdated) Accounts[mail]= null;
                        
                        // Sets LastUpdate-Timestring
                        var now = new Date();
                        var h0 = "", m0 = "", s0 = "";
                        if(now.getHours() < 10) h0 = "0"
                        if(now.getMinutes() < 10) m0 = "0"
                        if(now.getSeconds() < 10) s0 = "0"
                        LastUpdate= lang.popup_lastupdate + h0 + now.getHours() + ":" +
                        m0 + now.getMinutes() + ":" + s0 +  now.getSeconds();
                        
                        // Call now
                        DebugMessage("Every Request is returned, now calling the Callback-Function");
                        if(callback != null) callback();
                    }
                }
            });   
        }
    }
    
    // AJAX-Error
    function AjaxErrorMessage(jqXHR, textStatus, errorThrown) 
    {  
        DebugMessage("Ajax-Error " + textStatus + "/" + errorThrown, "error"); 
    }

    // Write Debug-Message
    function DebugMessage(message, type)
    {
        if(!type) type = "info";
        if(widget.preferences['debugMode'] && widget.preferences['debugMode'] === "on") 
            opera.postError("Grake," + type + " : " + message);
    }
}