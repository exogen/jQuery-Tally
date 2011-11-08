/**
 * jQuery Tally v0.1.0
 *
 * Copyright 2011, Brian Beck
 * http://github.com/exogen/jquery-tally
 *
 */
(function($) {

    $.tally = {};

    // If jquery.numberformatter.js is present, use that.
    if ($.formatNumber && $.parseNumber) {
        $.tally.defaults = {};
        $.tally.parseNumber = $.parseNumber;
        $.tally.formatNumber = $.formatNumber;
    }
    else {
        $.tally.defaults = {
            decimalMark: '.',
            thousandsSeparator: ',',
            digitGroup: /(\d{1,3})(?=(?:\d{3})+$)/g,
            nonNumeric: /[^\d.-]/g
        };
        $.tally.parseNumber = function(string, options) {
            if (options !== $.tally.defaults)
                options = $.extend({}, $.tally.defaults, options);

            var _ = string.split(options.decimalMark, 2),
                string = _[0].replace(options.nonNumeric, ''),
                fraction = _[1];

            if (fraction)
                string += '.' + fraction;

            return parseFloat(string);
        };
        $.tally.formatNumber = function(number, options) {
            if (options !== $.tally.defaults)
                options = $.extend({}, $.tally.defaults, options);

            var _ = ('' + number).split('.', 2),
                replacement = '$1' + options.thousandsSeparator,
                string = _[0].replace(options.digitGroup, replacement),
                fraction = _[1];

            if (fraction)
                string += options.decimalMark + fraction;

            return string;
        };
    }

    $.fn.tally = function(number, duration, easing, complete) {
        return this.animate({tally: number}, duration, easing, complete);
    };

    // Add a fake CSS property to $.cssHooks to allow animation.
    $.cssHooks.tally = {
        get: function(elem) {
            var value = $.tally.parseNumber($(elem).text(), $.tally.defaults);
            return isNaN(value) ? 0 : +value;
        },
        set: function(elem, value) {
            $(elem).text($.tally.formatNumber(value, $.tally.defaults));
        }
    };

    // Enable animation by adding to $.fx.step.
    $.fx.step.tally = function(fx) {
        var now = fx.now;
        // Only show integers between fx.start and fx.end.
        if (fx.start < fx.end)
            now = Math.min(Math.ceil(now), fx.end);
        else if (fx.start > fx.end)
            now = Math.max(Math.floor(now), fx.end);
        $.cssHooks.tally.set(fx.elem, now);
    };

    // Prevent jQuery from adding 'px' to the value.
    $.cssNumber.tally = true;

})(jQuery);
