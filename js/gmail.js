 // Send a POST action to Gmail
function GmailInterface(id, action)
{
  // Get the AT-Value from HTMl-Version of Gmail
  var url = mailURL + "h/" + Math.ceil(1000000 * Math.random()) + "/?ui=html&zy=c";
  var request = new XMLHttpRequest();
  
  // GET-Request
  // $.get("test.php", function(data){alert("Data Loaded: " + data); });
  
  // look for ?at= when status=200
  
  // debug-output
  
  // NEW GET REQUEST
  // MAILURL + RANDOM + t=ID + at=AT + act=ACTION
  
  // when success update count
}
