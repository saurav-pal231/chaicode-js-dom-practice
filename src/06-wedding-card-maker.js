/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */

export function setupGuestList(containerElement) {
  // Your code here
  if(!containerElement) return null;
  
  containerElement.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-btn");

    if(removeBtn){
      const guestItem = removeBtn.closest(".guest-item")
      if(guestItem){
        guestItem.remove();
      }
    }
  });

  return {
    addGuest(name, side) {
      const guestItem = document.createElement("div")
      guestItem.classList.add("guest-item")
      guestItem.dataset.name = name
      guestItem.dataset.side =  side

      const nameSpan = document.createElement("span")
      nameSpan.textContent = name

      const removeBtn = document.createElement("button")
      removeBtn.classList.add("remove-btn")
      removeBtn.textContent = "Remove"

      guestItem.appendChild(nameSpan)
      guestItem.appendChild(removeBtn)
      containerElement.appendChild(guestItem)

      return guestItem;
    },

    removeGuest(name){
      const guests = Array.from(containerElement.querySelectorAll(".guest-item"))
      const targetGuest = guests.find(guest => guest.dataset.name === name)
      if (targetGuest){
        targetGuest.remove();
        return true;
      }
      return false;
    },

    getGuests(){
      const guests = Array.from(containerElement.querySelectorAll(".guest-item"))
      return guests.map(guest => ({
        name: guest.dataset.name,
        side: guest.dataset.side
      }));
    }
  }
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null;
  const themes = ["traditional", "modern", "royal"]

  themes.forEach(theme => {
    const btn = document.createElement("button");
    btn.classList.add("theme-btn");
    btn.dataset.theme = theme
    btn.textContent = theme
    containerElement.appendChild(btn)
  });

  containerElement.addEventListener("click", (event) => {
    const themeBtn = event.target.closest(".theme-btn")
    if(themeBtn){
      const selectedTheme = themeBtn.dataset.theme
      previewElement.className = selectedTheme
      previewElement.dataset.theme = selectedTheme
    }
  })
  return {
    getTheme(){
      return previewElement.dataset.theme || null;
    }
  }
}

// *   3. setupCardEditor(cardElement)
// *      - Event delegation on cardElement for click events
// *      - Clicking any element with [data-editable] attribute:
// *        - Removes "editing" class and contentEditable from any currently
// *          editing element inside cardElement
// *        - Sets clicked element's contentEditable = "true"
// *        - Adds class "editing" to clicked element
// *      - Clicking on cardElement itself (not on a [data-editable] child):
// *        - Removes "editing" class and contentEditable from any editing element
// *      - Returns object with:
// *        getContent(field): finds element with data-editable=field,
// *          returns its textContent. Returns null if not found.
// *      - Agar cardElement null/undefined, return null

export function setupCardEditor(cardElement) { // REVISE IT 
  // Your code here
  if (!cardElement) return null;

  cardElement.addEventListener("click", (event) => {
    const editableTarget = event.target.closest("[data-editable]");

    // 1. Grab EVERY editable field on the card to ensure a clean slate
    const allEditables = cardElement.querySelectorAll("[data-editable]");
    
    // 2. Loop through and aggressively deactivate all of them (except the one we just clicked)
    allEditables.forEach(el => {
      if (el !== editableTarget) {
        el.classList.remove("editing");
        // Remove the HTML attribute
        el.removeAttribute("contenteditable");
        // Explicitly reset the DOM property for Jest's internal checks
        el.contentEditable = "inherit"; 
      }
    });

    // 3. Activate the target (if we clicked on one)
    if (editableTarget) {
      editableTarget.classList.add("editing");
      editableTarget.contentEditable = "true";
      // Ensure the attribute is also set for the DOM parser
      editableTarget.setAttribute("contenteditable", "true"); 
    }
  });

  return {
    getContent(field) {
      const targetElement = cardElement.querySelector(`[data-editable="${field}"]`);
      return targetElement ? targetElement.textContent : null;
    }
  };
}
