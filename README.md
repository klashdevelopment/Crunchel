# Crunchel
Crunchel is a video-game development system for JS/HTML/CSS.

## CDN Links
**Currently, you need to self host Crunchel.**
The following links do NOT work yet!
```
https://cdn.klash.dev/crunchel/stable/crunchel.js
https://cdn.klash.dev/crunchel/stable/crunchel.css
https://cdn.klash.dev/crunchel/development/crunchel.js
https://cdn.klash.dev/crunchel/development/crunchel.css
```

## Example
Please see the example in the folder `example/index.html`

## QUICKSTART
1. Use our CDN links referenced at the top of the page to reference crunchel, or self host crunchel. (reference the .css and the .js file)
2. Add a crunchel game container: (the background color is removable)
```html
<body>
    <div class="crunchel-container" style="background-color: skyblue;">
        <!-- Your crunchel code goes here -->
    </div>
</body>
```
3. Add a player. Make sure you give it type=player and an ID! You can also use the utility classes `smooth-movement` and `example-player`.
```html
        <crunchel id="player" type="player" class="smooth-movement example-player"></crunchel>
```
4. Add a collectable. We give it `example-coin` to make it yellow and position it with `top` and `left`. We also give it a value (20) that will add to our `player.data.collectedPoints`. We will need to reference this, so give it an `id`.
```html
        <crunchel id="coin" value="20" type="collectable point" class="example-coin" style="top: 120px; left: 120px;"></crunchel>
```
5. Make it work with JavaScript! Add a script tag that gives us our point and player as HTML elements.
```js
var HTMLPlayer = document.querySelector('#player');
var HTMLCoin = document.querySelector('#coin');
```
6. Make a version of our player that is "crunched"!
```js
var player = crunch(HTMLPlayer);
```
7. Enable some basic movement with WASD. These values are HTML5 keycodes.
```js
player.enableBasicMovement({up: 'w', left: 'a', down: 's', right: 'd'}, {});
// Want more speed than 5 pixels? Set it to 10 like this:
player.enableBasicMovement({up: 'w', left: 'a', down: 's', right: 'd'}, {speed: 10});
```
8. Let's make our coin collectable!
```js
player.enableCoinCollect(HTMLCoin, true); // Destroy our coin when it is collected using the boolean of true.
```
9. Finally, lets add some special events when we collect a coin.
```js
player.addCollectPointListener((event) => {
    alert("You have collected " +
    event.pointElement.getAttribute('value')
    + " coins! Your new total is: "
    + event.player.data.collectedPoints);
});
```
10. Run your game!
