// ==UserScript==
// @name	Google Mail Notfier - Mailto-Links
// @description	Open mailto-links with gmail
// @include	*
// @copyright	codebit
// @version	1.0.0
// ==/UserScript==

(function () 
{
    var EnableLink = false;

    // set listener for option change
    opera.extension.addEventListener("message", function(e) {
        if(e.data.cmd == "MailtoEnabled")
        {
            if(e.data.value == "on")
                EnableLink = true;
            else
                EnableLink = false;
        }
    }, false);

    // get current option
    opera.extension.postMessage({cmd: "MailtoEnabled"});

    // Look at mailto-links
    window.addEventListener("load",function(){
        if(EnableLink)
        {
            var links = document.body.getElementsByTagName("a");
            for(var i in links)
            {
                if(links[i].href && links[i].href.substr(0,7) == "mailto:")
                {
                    links[i].href = links[i].href.replace("mailto:","https://mail.google.com/mail/?extsrc=mailto&url=mailto:");
                    links[i].setAttribute("target", "_blank");
                }
            }
        }
    },false);

})();
