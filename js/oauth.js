// MyToken
var MyConsumerKey       = "www.codebit.de";
var MyConsumerSecret    = "mC7L0SPVt/0mQcQRkfmPsf3O";

//Debug
var Debug = 0;

// Show Page for grant access/verfication code
function GetVerificationCode() 
{  
    // Get MyToken
    if(GetMyToken())
    {    
      // Show Page
      var url = "https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=" + widget.preferences['oauth_mytoken'];
      if( opera.extension.tabs.create )
          opera.extension.tabs.create({url: url, focused:true});
    }
}

// Receive MyToken and optional callback given function
function GetMyToken()
{
  var accessor = {consumerKey     : MyConsumerKey,
                    consumerSecret  : MyConsumerSecret};
                    
  var message = {method: "post",
                 action: "https://www.google.com/accounts/OAuthGetRequestToken",
                 parameters: [
                     ["oauth_callback",  "oob"],
                     ["scope",  "https://mail.google.com/mail/feed/atom"],
                     ["xoauth_displayname", "Google Mail Notifier"]
                 ]};     
                                    
  OAuth.completeRequest(message, accessor);    
  var requestBody = OAuth.formEncode(message.parameters);
  var requestTokenRequest = new XMLHttpRequest();
  requestTokenRequest.open(message.method, message.action, false);
  requestTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  requestTokenRequest.setRequestHeader("Authorization", "OAuth");
  requestTokenRequest.send(requestBody);
  
  // wait for response
  while(requestTokenRequest.readyState != 4);
  
  // evaluate response
  if(requestTokenRequest.status == 200)
  {
    var results = OAuth.decodeForm(requestTokenRequest.responseText);
    widget.preferences['oauth_mytoken'] = OAuth.getParameter(results, "oauth_token");
    widget.preferences['oauth_mytoken_secret'] = OAuth.getParameter(results, "oauth_token_secret");
    if(Debug) opera.postError("SUCCESS : RequestToken received : " + widget.preferences['oauth_mytoken']);
    return true;
  }
  // Show Error if there was an status != 200 (OK)
  else
  {
    if(Debug) opera.postError("ERROR : RequestToken-Status " + requestTokenRequest.status + 
      " / " + requestTokenRequest.responseText);
    return false;
  }        
}

// GetAccessToken
function GetAccessToken(tNum, Code)
{    
  // Cleanup existing-code
  widget.preferences['oauth_token' + tNum] = "";
  widget.preferences['oauth_secret' + tNum] = "";

  // Prepare request
  var accessor = {consumerKey     : MyConsumerKey,
                  consumerSecret  : MyConsumerSecret,
                  token           : widget.preferences['oauth_mytoken'],
                  tokenSecret     : widget.preferences['oauth_mytoken_secret']} ;
                  
  var message = {method: "post",
                 action: "https://www.google.com/accounts/OAuthGetAccessToken",
                 parameters: [
                     ["oauth_verifier", Code]                      
                 ]};     
                                    
  OAuth.completeRequest(message, accessor);    
  var requestBody = OAuth.formEncode(message.parameters);
  var requestTokenRequest = new XMLHttpRequest();
  requestTokenRequest.open(message.method, message.action, false);
  requestTokenRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  requestTokenRequest.setRequestHeader("Authorization", "OAuth");
  requestTokenRequest.send(requestBody);
  
  // wait for response
  while(requestTokenRequest.readyState != 4);
  
  // evaluate response
  if(requestTokenRequest.status == 200)
  {
    var results = OAuth.decodeForm(requestTokenRequest.responseText);
    widget.preferences['oauth_token' + tNum] = OAuth.getParameter(results, "oauth_token");
    widget.preferences['oauth_secret' + tNum] = OAuth.getParameter(results, "oauth_token_secret");
    if(Debug) opera.postError("SUCCESS : AccessToken received : " + widget.preferences['oauth_token' + tNum] 
      + " (Secret: " + widget.preferences['oauth_secret' + tNum] + ")");
    return true;
  }
  // Show Error if there was an status != 200 (OK)
  else
  {
      if(Debug) opera.postError("ERROR : AccessToken-Status " + requestTokenRequest.status + " (" +
      requestTokenRequest.statusText + ")\nResponse: " + requestTokenRequest.responseText);
      return false;
  }
}

// Set the oauth-infos to the request
function PrepareRequest(XMLHttpRequest, settings, tNum, url)
{
  // Only request token if we have no one
  if(widget.preferences['oauth_token' + tNum] && widget.preferences['oauth_token' + tNum] !== "")
  {
    var accessor = {consumerKey     : MyConsumerKey,
                    consumerSecret  : MyConsumerSecret,
                    token           : widget.preferences['oauth_token' + tNum],
                    tokenSecret     : widget.preferences['oauth_secret' + tNum]} ;                    
    var message = {method: "get", action: url};
    OAuth.completeRequest(message, accessor);
    XMLHttpRequest.setRequestHeader("Authorization", OAuth.getAuthorizationHeader("", message.parameters));
    return true;
  }
  else
  {
    if(Debug) opera.postError("ERROR: Cannot prepare feed-request for token" + tNum);
    return false;
  }
}
