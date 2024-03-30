import { Controller } from "@hotwired/stimulus"

export default class UserController extends Controller {
  static targets = [ "dropdown" ]

  toggleDropdown(event) {
    event.preventDefault()
    this.dropdownTarget.classList.toggle('hidden')
  }

  outsideClick(event) {
    // Ignore event if clicked within element
    if(this.element === event.target || this.element.contains(event.target)) return;

    // prevent any default event when dropdown is open
    if(!this.dropdownTarget.classList.contains("hidden")) event.preventDefault();
    
    // close the menu on clicking outside
    this.closeMenu()
  }

  closeMenu(){
    this.dropdownTarget.classList.add("hidden")
  }
}
