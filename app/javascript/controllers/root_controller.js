import { Controller } from "@hotwired/stimulus"

// TODO: Refactor this entire file
export default class extends Controller {
  static targets = [ "filter", "listItem", "commandPalette", "commandPaletteItem", "userModal", "userSettingsModal" ]
  connect() {
    this.commandPaletteOpen =
    this.userSettingsModalOpen = false

    // this.filterIndex =
    this.listItemIndex = 0
    this.paletteItemIndex = 0

    // this.highlightFilter()
    this.highlightListItem()
  }

  // Command Palette
  openCommandPalette() {
    this.commandPaletteTarget.classList.remove('hidden')
    this.highlightPaletteItem()
    this.commandPaletteOpen = true
  }

  closeCommandPalette() {
    this.commandPaletteTarget.classList.add('hidden')
    this.commandPaletteOpen = false
  }

  // TODO: We probably don't need to iterate over all the search items each time
  highlightPaletteItem() {
    this.commandPaletteItemTargets.forEach((element, idx) => {
      element.setAttribute('aria-selected', idx === this.paletteItemIndex)
    })
  }

  setUserModalOpen(state) {
    this.userModalOpen = state
  }

  setUserSettingsModalOpen(state) {
    this.userSettingsModalOpen = state
  }

  // highlightFilter() {
  //   this.filterTargets.forEach((filter, index) => {
  //     filter.classList.toggle("text-white", index === this.filterIndex)
  //     filter.classList.toggle("bg-neutral-700/50", index === this.filterIndex)
  //   })
  // }

  highlightListItem() {
    this.listItemTargets.forEach((element, idx) => {
      element.setAttribute('aria-selected', idx === this.listItemIndex)
    })
  }

  // nextFilter() {
  //   this.filterIndex++
  //   if (this.filterIndex >= this.filterTargets.length) {
  //     this.filterIndex = 0
  //   }
  //   this.highlightFilter()
  // }

  nextListItem() {
    this.listItemIndex++
    if (this.listItemIndex >= this.listItemTargets.length) {
      this.listItemIndex = 0
    }
    this.highlightListItem()
  }

  previousListItem() {
    this.listItemIndex--
    if (this.listItemIndex < 0) {
      this.listItemIndex = this.listItemTargets.length - 1
    }
    this.highlightListItem()
  }

  // TODO: Switch case for keydown events
  rootKeydown(event) {
    if(event.key === 'Tab') {
      if (this.commandPaletteOpen || this.userModalOpen || this.userSettingsModalOpen) {
        event.preventDefault()
      } else {
        event.preventDefault()
        this.nextFilter()
      }
    }

    if(event.key === 'ArrowDown') {
      if (this.commandPaletteOpen) {
        event.preventDefault()
        this.paletteItemIndex++
        if (this.paletteItemIndex >= this.commandPaletteItemTargets.length) {
          this.paletteItemIndex = 0
        }
        this.highlightPaletteItem()
      } else if (this.userModalOpen) {
          event.preventDefault()
      } else if (this.userSettingsModalOpen) {
          event.preventDefault()
      } else {
          event.preventDefault()
          this.nextListItem()
      }
    }

    if(event.key === 'ArrowUp') {
      if (this.commandPaletteOpen) {
        event.preventDefault()
        this.paletteItemIndex--
        if (this.paletteItemIndex < 0) {
          this.paletteItemIndex = this.commandPaletteItemTargets.length - 1
        }
        this.highlightPaletteItem()
      } else if (this.userModalOpen) {
          event.preventDefault()
      } else if (this.userSettingsModalOpen) {
          event.preventDefault()
      } else {
          event.preventDefault()
          this.previousListItem()
      }
    }

    if (event.key === 'Escape') {
      this.closeCommandPalette()
      this.closeUserModal()
    }

    // "/"
    if (event.keyCode === 191) {
      if (this.userModalOpen || this.commandPaletteOpen) {
        event.preventDefault()
      } else {
        this.openCommandPalette()
      }
    }
  }
}
