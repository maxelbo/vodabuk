import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["template", "entry"]

  add(event) {
    event.preventDefault()
    const content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime())
    this.templateTarget.insertAdjacentHTML("beforebegin", content)
  }

  remove(event) {
    event.preventDefault()
    const entry = event.target.closest("[data-nested-form-target='entry']")
    const destroyField = entry.querySelector(".destroy-field")

    if (destroyField) {
      destroyField.value = "1"
      entry.style.display = "none"
    } else {
      entry.remove()
    }
  }
}
