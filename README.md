# jQuery Tally

### [Demo][]

### What is it?

A jQuery plugin that animates (and formats) numbers, drawing attention and making your page feel alive. [See?][Demo]

### Why is it cool?

Tally uses jQuery's [`cssHooks`][cssHooks] and `fx.step` features to behave just like every other animation!
That means there's less code, and you get custom duration, easing, callback, and queue control for free.

Here's the simplest usage:

```javascript
$('.points').tally(75);
```

But check this out:

```javascript
$('.points').animate({tally: 250, fontSize: '48px', top: '-10px'},
                     {duration: 5000, easing: 'swing', queue: false});
```

### Oh yeah, what else?

Tally will use the [Number Formatter][] plugin if it's available, which offers greater formatting control
and includes locale-specific defaults.

### Why did you make it?

At [BigDoor][], we award points. [Lots of 'em.][info] But we wanted point balances to feel more "active" and
"tactile" — like coins spilling out of a slot machine. So we created this animation (along with a few other
spiffy effects).

By the way, [we're hiring][hiring].

### Does it suck?

No. However, Tally was created with integers in mind. Support for animating fractional values could (and will)
be improved.

If you want to animate fractional values, I recommend including the [Number Formatter][] plugin alongside
Tally; Tally will use this when available.

## Documentation

### .tally(number [, duration] [, easing] [, complete])
### .tally(number, options)

Calling `tally(x, ...)` on a jQuery object is equivalent to calling `animate({tally: x}, ...)`.
That means the second argument can be a duration (followed by easing, callback, etc.) or an object
with options.

### $.tally.defaults

Default options for number formatting. These are passed to `$.tally.parseNumber` and `$.tally.formatNumber`.

* **decimalMark**: Which decimal mark character to use. Default: `'.'`
* **thousandsSeparator**: Which character separates groups of digits. Default: `','`

### $.tally.parseNumber(string[, options])

Parse a number string formatted with the given options (or use the defaults). If the [Number Formatter][]
plugin is installed, this is a reference to `$.parseNumber`.

### $.tally.formatNumber(number[, options])

Format a number with the given options (or use the defaults). If the [Number Formatter][]
plugin is installed, this is a reference to `$.formatNumber`.

[BigDoor]: http://www.bigdoor.com/
[hiring]: http://www.bigdoor.com/about-us/careers/
[Demo]: http://exogen.github.com/jquery-tally/
[Number Formatter]: http://code.google.com/p/jquery-numberformatter/
[cssHooks]: http://api.jquery.com/jQuery.cssHooks/
[info]: http://www.bigdoor.com/blog/bigdoors-infowidget-celebrates-success/