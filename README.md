jquery.ajaxform
===============

Async form post with uploaded file support.

Usage:

  form.ajaxform(success, failure [, formAttributes]) //may add .timeout(milliseconds) promise;

  form.ajaxform(function (d) {
    // success! 'd' is the parsed json object
  }, function (e) {
    // failed! e.success = false. e.message = [whatever the error was]
  }, { action: "/some/endpoint" }
  ).timeout(20000);

  
success callback accepts parsed JSON

failure callback accepts an error object with 'success' always set to false and 'message' set as the error message.

formAttributes is an optional object that can contain attributes to set on the form before posting. If attributes aren't set, it will use the attributes already on the form (e.g. target) and default to POST.
  
.timeout(milliseconds) is optional. If supplied, at the timeout time it will check for success just in case the event handler had an issue. If still not successful, will call failure function.