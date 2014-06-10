jquery.ajaxform
===============

Async form post with uploaded file support.

##Usage:
```
  form.ajaxform(success, failure [, formAttributes]) //may add .timeout(milliseconds) promise;

  e.g.

  form.ajaxform(function (d) {
    // success! 'd' is the parsed json object
  }, function (e) {
    // failed! e.success = false. e.message = [whatever the error was]
  }, { action: "/some/endpoint" }
  ).timeout(20000);
```

##Response Format:

The response must be consumable as text/html. Raw JSON is not supported as it can be messy with things like JSON-View extensions. **There must be 1 tag with the id 'response' and JSON content**. Best idea is a PRE tag. Example response:

```
  <pre id='response'>
    { "success": true, "id": 19 }
  </pre>
```

##Options

###success callback

accepts parsed JSON

###failure callback 

accepts an error object with 'success' always set to false and 'message' set as the error message.

###formAttributes 
optional object that can contain attributes to set on the form before posting. If attributes aren't set, it will use the attributes already on the form (e.g. target) and default to POST.
  
###.timeout(milliseconds)
Optional. If supplied, at the timeout time it will check for success just in case the event handler had an issue. If still not successful, will call failure function.
