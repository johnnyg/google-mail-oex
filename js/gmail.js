function GMailHandler 
{
   var mailURL = "https://mail.google.com/mail/";
  
   /* Public methods */

   // Starts the scheduler
   this.CheckMailStart = function () 
   {
      getInboxCount();
      scheduleRequest();
   }

   // Stops the scheduler
   this.CheckMailStop = function () 
   {
      isStopped = true;
      if (requestTimer != null) 
      {
         window.clearTimeout(requestTimer);
      }
   }
}