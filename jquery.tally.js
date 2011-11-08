/**
 * jQuery Tally v0.1.2
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

    // Enable reading and writing by adding a property to $.cssHooks.
    $.cssHooks.tally = {
        get: function(elem) {
            var text = $(elem).text(),
                value = $.tally.parseNumber(text, $.tally.defaults);
            return isNaN(value) ? 0 : +value;
        },
        set: function(elem, value) {
            var text = $.tally.formatNumber(value, $.tally.defaults);
            $(elem).text(text);
        }
    };

    // Enable animation by adding to $.fx.step.
    $.fx.step.tally = function(fx) {
        // Match the number of decimal places of fx.end.
        var places = (('' + fx.end).split('.', 2)[1] || '').length,
            now = fx.now.toFixed(places);

        // Snap to fx.start and fx.end (in case rounding changes order).
        if ((fx.now > fx.start && now < fx.start) ||
            (fx.now < fx.start && now > fx.start))
            now = fx.start;
        else if ((fx.now < fx.end && now > fx.end) ||
                 (fx.now > fx.end && now < fx.end))
            now = fx.end;

        $.cssHooks.tally.set(fx.elem, now);
    };

    // Prevent jQuery from adding 'px' to the value.
    $.cssNumber.tally = true;

})(jQuery);
