# muid.js

A JavaScript library for converting between UUIDs and Process Street micro UUIDs ("muids").

Muids are URL-safe and take up 31.25% less characters than UUIDs while encoding the same amount of information.bower.json

## Installation

In a browser:

```html
<script src="muid.js"></script>
```

Via [bower](http://bower.io/):

```bash
bower install muid.js
```

## Notes

This method will provides a global `Muid` object. That means that once you include it, you can use it like this:

```javascript
var uuid = '19ab5c32-038b-4ba3-841f-b427f65e1943';
var muid = Muid.fromUuid(uuid);
// = 'hB-0J_ZeGUMZq1wyA4tLow'
```

The `fromUuid` is case-insensitive (i.e. you can pass `19ab5c32-038b-4ba3-841f-b427f65e1943` or `19AB5C32-038B-4BA3-841F-B427F65E1943` 
and dash-insensitive (i.e. `19ab5c32-038b-4ba3-841f-b427f65e1943` or `19ab5c32038b4ba3841fb427f65e1943` are treated the same). 

A `toUuid` function is also provided for converting a muid to a UUID:

```javascript
var muid = 'hB-0J_ZeGUMZq1wyA4tLow';
var uuid = Muid.toUuid(muid);
// = '19ab5c32-038b-4ba3-841f-b427f65e1943'
```

## Why not just use UUIDs?

The motivation behind muids is that they take up 22 characters instead of 32. This can lead to significant reductions the length
of URLs that embed UUIDs.

## Author

| [![twitter/cdmckay](https://gravatar.com/avatar/b181c028e6b51d408450e12ab68bf25c?s=70)](https://twitter.com/cdmckay "Follow @cdmckay on Twitter") |
|---|
| [Cameron McKay](https://cdmckay.org/) |

## License

This library is available under the [MIT](http://opensource.org/licenses/mit-license.php) license.
