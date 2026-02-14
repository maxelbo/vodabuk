import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  connect() {
    this.boundClose = this.close.bind(this)
    document.addEventListener("click", this.boundClose)
  }

  disconnect() {
    document.removeEventListener("click", this.boundClose)
  }

  toggle(event) {
    event.stopPropagation()
    this.menuTarget.hidden = !this.menuTarget.hidden
  }

  close(event) {
    if (!this.element.contains(event.target)) {
      this.menuTarget.hidden = true
    }
  }
}
