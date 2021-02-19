// jsonp的必要运行条件

define([
    "../core",
    "../var/isFunction",
    "./var/nonce",
    "./var/rquery",
    "../ajax"
], function(jQuery, isFunction, nonce, rquery) {

    "use strict";

    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce.guid++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                (s.contentType || "")
                .indexOf("application/x-www-form-urlencoded") === 0 &&
                rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // Force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {

                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                } else {
                    window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });

});


function get_code() {
    $.ajax({
        url: 'https://m.10010.com/god/AirCheckMessage/sendCaptcha',
        type: 'post',
        dataType: 'json',
        data: {
            phoneVal: 18530188087,
            type: 21
        },
        success: function(datas) {
            console.log(datas);
            alert('已发送验证码，每次最好间隔60秒提交一次');
        },
        error: function(err) {
            console.log(err);
            alert('发送成功，每次最好间隔60秒提交一次');
        },
    })
};

function get_datetraffic() {
    var code = $('#codes').val();
    $.ajax({
        url: 'https://m.10010.com/god/qingPiCard/flowExchange',
        data: {
            number: 18530188087,
            type: 21,
            captcha: code
        },
        success: function(datas) {
            console.log(datas);
            alert('领取流量成功，具体请以手机短信为准！');
        },
        error: function(err) {
            console.log(err);
            alert('领取失败，再次尝试！');
        },
    });
};


for (let index = 0; index < 4; index++) {
    get_code()
    setInterval(() => {
        get_datetraffic()
    }, 60000);
}




//设置定时器的第二个参数单位是  ms  毫秒