# Carousel 🎇
Dead simple carousel.
[Demo](https://codepen.io/bastienrobert/pen/gzVGaG)

## Install
Clearly not ready for now, it will be a NPM module in few weeks, be patient.

## Usage
It's (really) dead simple, actually (it'll change when it'll be on NPM) :
```HTML
<script>
window.addEventListener('load', () => {
  new Carousel(document.querySelector('#demo'), {
    // Options
  })
})
</script>
```

<a name="Carousel"></a>

## Carousel
**Kind**: global class  

* [Carousel](#Carousel)
    * [new Carousel(el, options)](#new_Carousel_new)
    * [.itemsToScroll](#Carousel+itemsToScroll) ⇒ <code>number</code>
    * [.itemsToShow](#Carousel+itemsToShow) ⇒ <code>number</code>
    * [.wrapperWidth](#Carousel+wrapperWidth) ⇒ <code>number</code>
    * [.carouselWidth](#Carousel+carouselWidth) ⇒ <code>number</code>
    * [.DOMSetup()](#Carousel+DOMSetup)
    * [.setStyles()](#Carousel+setStyles)
    * [.animation(active)](#Carousel+animation)
    * [.translate(percent)](#Carousel+translate)
    * [.setNavigation()](#Carousel+setNavigation)
    * [.setPagination()](#Carousel+setPagination)
    * [.setDesktopPagination()](#Carousel+setDesktopPagination)
    * [.setMobilePagination()](#Carousel+setMobilePagination)
    * [.navigate(to)](#Carousel+navigate)
    * [.onResize()](#Carousel+onResize)
    * [.onKeyUp(e)](#Carousel+onKeyUp)
    * [.onMove(callback)](#Carousel+onMove)
    * [.goto(index, [animation])](#Carousel+goto)
    * [.wrapperTransitionEnd()](#Carousel+wrapperTransitionEnd)

<a name="new_Carousel_new"></a>

### new Carousel(el, options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| el | <code>HTMLElement</code> |  | Slider element |
| options | <code>object</code> |  | Options object |
| [options.itemsToShow] | <code>number</code> | <code>1</code> | How many element you want to show |
| [options.itemsToShowOnMobile] | <code>number</code> | <code>1</code> | How many element you want to show on mobile |
| [options.itemsToScroll] | <code>number</code> | <code>1</code> | How many items will be scrolling each time |
| [options.itemsToScrollOnMobile] | <code>number</code> | <code>1</code> | How many items will be scrolling each time on mobile |
| [options.loop] | <code>boolean</code> | <code>false</code> | Loop and end of the slice |
| [options.navigation] | <code>boolean</code> | <code>true</code> | Arrows to navigate in the slider |
| [options.pagination] | <code>boolean</code> | <code>false</code> | Add pagination menu |
| [options.mobilePagination] | <code>boolean</code> | <code>options.pagination</code> | Add pagination on mobile |
| [options.infinite] | <code>boolean</code> | <code>false</code> | Infinite slider, you'll can't stop it :o |

<a name="Carousel+itemsToScroll"></a>

### carousel.itemsToScroll ⇒ <code>number</code>
itemsToScroll getter

**Kind**: instance property of [<code>Carousel</code>](#Carousel)  
**Returns**: <code>number</code> - return itemsToScroll  
<a name="Carousel+itemsToShow"></a>

### carousel.itemsToShow ⇒ <code>number</code>
itemsToShow getter

**Kind**: instance property of [<code>Carousel</code>](#Carousel)  
**Returns**: <code>number</code> - return itemsToShow  
<a name="Carousel+wrapperWidth"></a>

### carousel.wrapperWidth ⇒ <code>number</code>
containerWidth getter

**Kind**: instance property of [<code>Carousel</code>](#Carousel)  
**Returns**: <code>number</code> - return the width of the container  
<a name="Carousel+carouselWidth"></a>

### carousel.carouselWidth ⇒ <code>number</code>
carouselWidth getter

**Kind**: instance property of [<code>Carousel</code>](#Carousel)  
**Returns**: <code>number</code> - return the width of the carousel root  
<a name="Carousel+DOMSetup"></a>

### carousel.DOMSetup()
DOMSetup - Setup the DOM to be ready

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+setStyles"></a>

### carousel.setStyles()
setStyles - Set style for carousel items and wrapper

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+animation"></a>

### carousel.animation(active)
animation - Enable or disable animation

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Description |
| --- | --- | --- |
| active | <code>boolean</code> | If you want to active the transition ability or not |

<a name="Carousel+translate"></a>

### carousel.translate(percent)
translate - Translate the wrapper to slide

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Description |
| --- | --- | --- |
| percent | <code>number</code> | How many percent you want to slide |

<a name="Carousel+setNavigation"></a>

### carousel.setNavigation()
setNavigation - Create navigation components to scroll in the carousel

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+setPagination"></a>

### carousel.setPagination()
setPagination - Init the pagination following the options

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+setDesktopPagination"></a>

### carousel.setDesktopPagination()
setDesktopPagination - Create pagination components (dots) on desktop

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+setMobilePagination"></a>

### carousel.setMobilePagination()
setMobilePagination - Create pagination components (dots) on mobile

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+navigate"></a>

### carousel.navigate(to)
navigate - Scroll in the slider to navigate

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | direction of navigation |

<a name="Carousel+onResize"></a>

### carousel.onResize()
onResize - Event window resize

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="Carousel+onKeyUp"></a>

### carousel.onKeyUp(e)
onKeyUp - Event on keyUp on root

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>type</code> | event |

<a name="Carousel+onMove"></a>

### carousel.onMove(callback)
onMove - store new callback

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>moveCallback</code>](#moveCallback) | index callback |

<a name="Carousel+goto"></a>

### carousel.goto(index, [animation])
goto - Scroll in the slider to navigate

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | Slide number |
| [animation] | <code>boolean</code> | <code>true</code> | Animate the translation |

<a name="Carousel+wrapperTransitionEnd"></a>

### carousel.wrapperTransitionEnd()
wrapperTransitionEnd - Toggled on transition end

**Kind**: instance method of [<code>Carousel</code>](#Carousel)  
<a name="CarouselTouch"></a>

## CarouselTouch
Add touchable

**Kind**: global class  

* [CarouselTouch](#CarouselTouch)
    * [new CarouselTouch(carousel)](#new_CarouselTouch_new)
    * [.startDrag(e)](#CarouselTouch+startDrag)
    * [.drag(e)](#CarouselTouch+drag)
    * [.endDrag(e)](#CarouselTouch+endDrag)

<a name="new_CarouselTouch_new"></a>

### new CarouselTouch(carousel)

| Param | Type |
| --- | --- |
| carousel | [<code>Carousel</code>](#Carousel) | 

<a name="CarouselTouch+startDrag"></a>

### carouselTouch.startDrag(e)
startDrag - Draggable start

**Kind**: instance method of [<code>CarouselTouch</code>](#CarouselTouch)  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> \| <code>TouchEvent</code> | 

<a name="CarouselTouch+drag"></a>

### carouselTouch.drag(e)
drag - Mouse or finger is moving

**Kind**: instance method of [<code>CarouselTouch</code>](#CarouselTouch)  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> \| <code>TouchEvent</code> | 

<a name="CarouselTouch+endDrag"></a>

### carouselTouch.endDrag(e)
endDrag - Draggable end

**Kind**: instance method of [<code>CarouselTouch</code>](#CarouselTouch)  

| Param | Type |
| --- | --- |
| e | <code>MouseEvent</code> \| <code>TouchEvent</code> | 

<a name="moveCallback"></a>

## moveCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

## Classes

<dl>
<dt><a href="#Carousel">Carousel</a></dt>
<dd></dd>
<dt><a href="#CarouselTouch">CarouselTouch</a></dt>
<dd><p>Add touchable</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#moveCallback">moveCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

