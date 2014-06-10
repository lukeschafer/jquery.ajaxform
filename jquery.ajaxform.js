$.fn.ajaxform = function (success, failure, formAttributes) {
    $.fn.ajaxform.increment = ($.fn.ajaxform.increment || 0) + 1;
    
    var form = $(this);
    if (form.size() > 1) throw 'ajaxform: don\'t call ajaxform on a jquery object with more than one element';
    var iframeId = 'asyncForm' + $.fn.ajaxform.increment;
    var iframe = $("<iframe id='" + iframeId + "' name='" + iframeId + "' src='' style='display:none'>");
    var files = $("[type='file']", form);

    //save original values for later
    var old = {
        target: form.attr('target'),
        enctype: form.attr('enctype'),
        encoding: form.attr('encoding'),
        method: form.attr('method')
    };

    var done = false;

    iframe.bind("load", function () {
        setTimeout(function() {
            iframe.unbind("load").bind("load", function() {
                setTimeout(function() {
                    form.attr(old); //reset
                    done = true;
                    try {
                        var iframeElem = iframe[0];
                        var doc = iframeElem.contentWindow ? iframeElem.contentWindow.document : (iframeElem.contentDocument || iframeElem.document);

                        if (doc) {
                            var respElem = doc.getElementById("response");

                            if (respElem)
                                success($.parseJSON(respElem.innerHTML));
                            else
                                failure({ success: false, error: "No response tag" });
                        } else {
                            failure({ success: false, error: "There was an invalid response from the server. Were you uploading anything large?" });
                        }

                    } catch(e) {
                        failure({ success: false, error: e });
                    }
                    iframe.remove();
                }, 100);
            });

            // set target and form type and submit
            form.attr('target', iframeId);
            form.attr('method', 'POST');
            if (attr) form.attr(attr);
            if (files.size() > 0) {
                form.attr('enctype', 'multipart/form-data');
                form.attr('encoding', 'multipart/form-data');
            }
            form[0].submit();
        }, 100);
    });

    iframe.appendTo('body');

    return {
        timeout: function (time, onTimeout) {
            setTimeout(function () {
                if (done) return;

                try {
                    var iframeElem = iframe[0];
                    var doc = iframeElem.contentWindow ? iframeElem.contentWindow.document : (iframeElem.contentDocument || iframeElem.document);

                    if (doc) {
                        var respElem = doc.getElementById("response");
                        if (respElem) {
                            success($.parseJSON(respElem.innerHTML));
                            return;    
                        }
                        
                    }

                } catch (e) { }
				if (onTimeout) { onTimeout(); }
            }, time);
        }
    };
}