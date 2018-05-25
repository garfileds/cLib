const events = {
	on: function (event, fn) {
    const el = this

		;(el._events[event] || (el._events[event] = [])).push(fn)
	},

	once: function (event, fn) {
		const el = this

		function on() {
			el.off(event, on)
			fn.apply(el, arguments)
		}

		on.fn = fn

		el.on(event, on)
	},

	off: function (event, fn) {
		const el = this

		if (!arguments.length) {
			el._events = Object.create(null)
			return
		}

		if (arguments.length === 1) {
			el._events[event] = null
			return
		}

		let cbs = el._events[event]
		let cb
		let i = cbs.length

		while (i--) {
			cb = cbs[i]

			if (cb === fn || cb.fn === fn) {
				cbs.splice(i, 1)
				break
			}
		}
	},

	emit: function (event) {
		const el = this

		let cbs = el._events[event]

		if (cbs) {
			const args = Array.prototype.slice.call(arguments, 1)

			for (let i = 0, l = cbs.length; i < cbs.length; i++) {
				cbs[i].apply(el, args)
			}
		}
	}
}

function mixin(target, src, methods) {
	if (methods) {
		methods.forEach(method => {
			target[method] = src[method] || undefined
		})
	} else {
		Object.keys(src).forEach(method => {
			target[method] = src[method]
		})
	}

	return target
}

function eventMixin(obj) {
	obj._events = Object.create(null)

	mixin(obj, events)
}

function Event() {
	this._events = Object.create(null)
}

mixin(Event.prototype, events)
