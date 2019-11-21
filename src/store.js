import {writable} from 'svelte/store'

function createTabs() {
	const {subscribe, set, update} = writable([])

	return {
		subscribe,
		add: (name, reload) => update(arr => {
			return [
				...arr,
				{
					name,
					interval: 0,
					active: false,
					original: undefined,
					reload,
					handler: function(r) {
						if (r.request.url === e) {
							if (typeof this.original === 'undefined') {
								this.original = r.response.bodySize
							} else if (this.original !== r.response.bodySize) {
								this.original = undefined
								return
							}
							this.reload()
						}
					}
				}
			]
		}),
		remove: i => update(arr => arr.splice(i, 1)),
		set
	}
}

export const tabs = createTabs()
