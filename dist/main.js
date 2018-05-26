class Carousel {
	/**
	 * @callback moveCallback
	 * @param {number} index
	 */

	/**
	 * @param  {HTMLElement} el Slider element
	 * @param  {object} options Options object
	 * @param  {number} [options.itemsToShow=1] How many element you want to show
	 * @param  {number} [options.itemsToShowOnMobile=1] How many element you want to show on mobile
	 * @param  {number} [options.itemsToScroll=1] How many items will be scrolling each time
	 * @param  {number} [options.itemsToScrollOnMobile=1] How many items will be scrolling each time on mobile
	 * @param  {boolean} [options.loop=false] Loop and end of the slice
	 * @param  {boolean} [options.navigation=true] Arrows to navigate in the slider
	 * @param  {boolean} [options.infinite=false] Infinite slider, you'll can't stop it :o
	 */
	constructor(el, options = {}) {
		this.el = el
		this.options = Object.assign(
			{},
			{
				itemsToShow: 1,
				itemsToShowOnMobile: 1,
				itemsToScroll: 1,
				itemsToScrollOnMobile: 1,
				loop: false,
				navigation: true,
				infinite: false
			},
			options
		)
		this.isMobile = false
		this.animating = false
		this.currentItem = 0
		this.moveCallbacks = []
		this.init()
	}

	init() {
		this.DOMSetup()
		this.setStyles()
		this.options.navigation && this.setNavigation()
		this.moveCallbacks.forEach(callback => callback(this.currentItem))

		this.onResize()
		window.addEventListener('resize', this.onResize.bind(this))
		this.wrapper.addEventListener(
			'transitionend',
			this.wrapperTransitionEnd.bind(this)
		)
		new CarouselTouch(this)
	}

	/**
	 * DOMSetup - Setup the DOM to be ready
	 */
	DOMSetup() {
		const children = [].slice.call(this.el.children)

		this.root = document.createElement('div')
		this.root.setAttribute('class', 'carousel')
		this.root.setAttribute('tabindex', '0')
		this.el.appendChild(this.root)
		this.root.addEventListener('keyup', e => this.onKeyUp(e))

		let mask = document.createElement('div')
		mask.setAttribute('class', 'carousel__mask')
		this.root.appendChild(mask)

		this.wrapper = document.createElement('div')
		this.wrapper.setAttribute('class', 'carousel__wrapper')
		mask.appendChild(this.wrapper)

		this.items = children.map(child => {
			let item = document.createElement('div')
			item.setAttribute('class', 'carousel__item')
			item.appendChild(child)
			return item
		})

		if (this.options.infinite) {
			this.offset = this.itemsToShow * 2 - 1
			this.items = [
				...this.items
					.slice(this.items.length - this.offset)
					.map(item => item.cloneNode(true)),
				...this.items,
				...this.items.slice(0, this.offset).map(item => item.cloneNode(true))
			]
			this.goto(this.offset, false)
		}

		this.items.forEach(item => this.wrapper.appendChild(item))
	}

	/**
	 * setStyles - Set style for carousel items and wrapper
	 */
	setStyles() {
		this.wrapper.style.width = 100 * this.items.length / this.itemsToShow + '%'
		this.items.forEach(
			item => (item.style.width = 100 / this.items.length + '%')
		)
	}

	/**
	 * animation - Enable or disable animation
	 * @param  {boolean} active If you want to active the transition ability or not
	 */
	animation(active) {
		active
			? (this.wrapper.style.transition = '')
			: (this.wrapper.style.transition = 'none')
	}

	/**
	 * translate - Translate the wrapper to slide
	 * @param  {number} percent How many percent you want to slide
	 */
	translate(percent) {
		this.wrapper.style.transform = `translate3d(${percent}%, 0, 0)`
	}

	/**
	 * setNavigation - Create navigation components to scroll in the carousel
	 */
	setNavigation() {
		let buttons = {}
		;['previous', 'next'].map(className => {
			let button = document.createElement('span')
			button.setAttribute(
				'class',
				`carousel__navigation carousel__navigation-${className}`
			)
			button.addEventListener('click', this.navigate.bind(this, className))
			this.root.appendChild(button)
			buttons[className] = button
		})
		!this.options.loop &&
			this.onMove(index => {
				index === 0
					? buttons.previous.classList.add('carousel__navigation-hidden')
					: buttons.previous.classList.remove('carousel__navigation-hidden')

				!this.items[this.currentItem + this.itemsToShow]
					? buttons.next.classList.add('carousel__navigation-hidden')
					: buttons.next.classList.remove('carousel__navigation-hidden')
			})
	}

	/**
	 * navigate - Scroll in the slider to navigate
	 *
	 * @param  {string} to direction of navigation
	 */
	navigate(to) {
		const i =
			to === 'previous'
				? this.currentItem - this.itemsToScroll
				: this.currentItem + this.itemsToScroll
		this.goto(i)
	}

	/**
	 * onResize - Event window resize
	 */
	onResize() {
		const mobile = window.innerWidth < 800
		if (mobile !== this.isMobile) {
			this.isMobile = mobile
			this.setStyles()
			this.moveCallbacks.forEach(callback => callback(this.currentItem))
		}
	}

	/**
	 * onKeyUp - Event on keyUp on root
	 *
	 * @param  {type} e event
	 */
	onKeyUp(e) {
		e.key === 'ArrowRight' || e.key === 'Right' ? this.goto('next') : null
		e.key === 'ArrowLeft' || e.key === 'Left' ? this.goto('previous') : null
	}

	/**
	 * onMove - store new callback
	 *
	 * @param  {moveCallback} callback index callback
	 */
	onMove(callback) {
		this.moveCallbacks.push(callback)
	}

	/**
	 * goto - Scroll in the slider to navigate
	 *
	 * @param  {number} index Slide number
	 * @param  {boolean} [animation=true] Animate the translation
	 */
	goto(index, animation = true) {
		if (this.animating === false) {
			// animation === true && (this.animating = true)
			index < 0 && (index = this.items.length - 1)

			if (
				index >= this.items.length ||
				(!this.items[this.currentItem + this.itemsToShow] &&
					index > this.currentItem)
			) {
				this.options.loop && !this.options.infinite && (index = 0)
			}

			const translate = index * -100 / this.items.length
			animation === false && this.animation(false)
			this.translate(translate)
			animation === false && this.wrapper.offsetHeight // Force repaint
			animation === false && this.animation(true)

			this.currentItem = index
			this.moveCallbacks.forEach(callback => callback(index))
		}
	}

	/**
	 * wrapperTransitionEnd - Toggled on transition end
	 */
	wrapperTransitionEnd() {
		this.animating = false
		if (this.options.infinite) {
			this.currentItem <= this.itemsToScroll &&
				this.goto(
					this.currentItem + (this.items.length - 2 * this.offset),
					false
				)
			this.currentItem >= this.items.length - this.offset &&
				this.goto(
					this.currentItem - (this.items.length - 2 * this.offset),
					false
				)
		}
	}

	/**
	 * itemsToScroll getter
	 *
	 * @return {number}  return itemsToScroll
	 */
	get itemsToScroll() {
		return this.isMobile
			? this.options.itemsToScrollOnMobile
			: this.options.itemsToScroll
	}

	/**
	 * itemsToShow getter
	 *
	 * @return {number}  return itemsToShow
	 */
	get itemsToShow() {
		return this.isMobile
			? this.options.itemsToShowOnMobile
			: this.options.itemsToShow
	}

	/**
	 * containerWidth getter
	 *
	 * @return {number}  return the width of the container
	 */
	get wrapperWidth() {
		return this.wrapper.offsetWidth
	}

	/**
	 * carouselWidth getter
	 *
	 * @return {number}  return the width of the carousel root
	 */
	get carouselWidth() {
		return this.root.offsetWidth
	}
}

/**
 * Add touchable
 */

class CarouselTouch {
	/**
	 * @param  {Carousel} carousel
	 */
	constructor(carousel) {
		this.carousel = carousel
		this.width = this.carousel.wrapperWidth
		this.events()
	}

	events() {
		this.carousel.el.addEventListener('dragstart', e => e.preventDefault())

		this.carousel.wrapper.addEventListener(
			'mousedown',
			this.startDrag.bind(this)
		)
		this.carousel.wrapper.addEventListener(
			'touchstart',
			this.startDrag.bind(this)
		)

		window.addEventListener('mousemove', this.drag.bind(this))
		window.addEventListener('touchmove', this.drag.bind(this))

		window.addEventListener('touchend', this.endDrag.bind(this))
		window.addEventListener('touchcancel', this.endDrag.bind(this))
		window.addEventListener('mouseup', this.endDrag.bind(this))
	}

	/**
	 * startDrag - Draggable start
	 *
	 * @param {MouseEvent|TouchEvent} e
	 */
	startDrag(e) {
		if (e.touches) {
			if (e.touches.length > 1) {
				return
			} else {
				e = e.touches[0]
			}
		}
		this.origin = {
			x: e.screenX,
			y: e.screenY
		}
		this.carousel.animation(false)
	}

	/**
	 * drag - Mouse or finger is moving
	 *
	 * @param {MouseEvent|TouchEvent} e
	 */
	drag(e) {
		if (this.origin) {
			let point = e.touches ? e.touches[0] : e
			let translate = {
				x: point.screenX - this.origin.x,
				y: point.screenY - this.origin.y
			}
			let baseTranslate =
				this.carousel.currentItem * -100 / this.carousel.items.length
			this.lastTranslate = translate
			this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
		}
	}

	/**
	 * endDrag - Draggable end
	 *
	 * @param {MouseEvent|TouchEvent} e
	 */

	endDrag(e) {
		if (this.origin && this.lastTranslate) {
			this.carousel.animation(true)
			if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
				if (this.lastTranslate.x < 0) {
					this.carousel.navigate('next')
				} else {
					this.carousel.navigate('previous')
				}
			} else {
				this.carousel.goto(this.carousel.currentItem)
			}
		}
		this.origin = null
	}
}
