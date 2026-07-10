/**
 * 🍬 Kolkata Sweet Shop - createElement & appendChild
 *
 * Kolkata ke famous sweet shop ka digital menu board banana hai.
 * Rasgulla, sandesh, mishti doi - sab kuch DOM elements se render
 * karenge. createElement se items banao, appendChild se menu board
 * pe lagao. Jaise sweet shop mein ek ek mithai counter pe sajati hai,
 * waise hi tum ek ek element DOM mein add karoge.
 *
 * Functions:
 *
 *   1. createSweetItem(name, price, category)
 *      - Creates a div element with class "sweet-item"
 *      - Inside div: h3 (name), p with class "price" (text: "₹{price}"),
 *        span with class "category" (text: category)
 *      - Returns the div element
 *      - Validation: name must be string, price must be number, category must be string
 *      - Agar koi bhi param missing ya invalid type, return null
 *
 *   2. buildMenuBoard(sweets)
 *      - Takes array of {name, price, category} objects
 *      - Creates a div with id "menu-board"
 *      - Loop through sweets, call createSweetItem for each
 *      - Append each sweet item to menu-board
 *      - Returns the menu-board div
 *      - Empty array returns div with no children (bas empty menu-board)
 *      - Agar sweets not array, return null
 *
 *   3. addSpecialBadge(sweetElement, badgeText)
 *      - Takes a sweet-item element and badge text string
 *      - Creates a span with class "special-badge" and textContent = badgeText
 *      - Appends the span to sweetElement
 *      - Returns the modified sweetElement
 *      - Agar sweetElement null/undefined, return null
 *      - Agar badgeText not string or empty, return null
 *
 * Hint: document.createElement() se naya element banao,
 *   element.classList.add() se class lagao, element.appendChild() se
 *   child add karo, element.textContent se text dalo.
 *
 * @param {string} name - Sweet ka naam (e.g., "Rasgulla")
 * @param {number} price - Sweet ki price in rupees (e.g., 30)
 * @param {string} category - Sweet ki category (e.g., "Bengali")
 * @returns {HTMLDivElement|null} - Sweet item element ya null agar invalid
 *
 * @example
 *   const item = createSweetItem("Rasgulla", 30, "Bengali");
 *   // => <div class="sweet-item">
 *   //      <h3>Rasgulla</h3>
 *   //      <p class="price">₹30</p>
 *   //      <span class="category">Bengali</span>
 *   //    </div>
 *
 *   const board = buildMenuBoard([
 *     { name: "Rasgulla", price: 30, category: "Bengali" },
 *     { name: "Sandesh", price: 40, category: "Bengali" }
 *   ]);
 *   // => <div id="menu-board">...2 sweet items...</div>
 *
 *   addSpecialBadge(item, "Bestseller");
 *   // => item now has <span class="special-badge">Bestseller</span>
 */

export function createSweetItem(name, price, category) {
  // Your code here
  if (
    typeof name !== "string" || name.trim() === ""
    || typeof price !== "number" || isNaN(price) ||
    typeof category !== "string" || category.trim() === ""
  ) {
    return null;
  }
  const sweetItem = document.createElement("div")
  sweetItem.classList.add("sweet-item")

  const nameElement = document.createElement("h3")
  nameElement.textContent = name

  const priceElement = document.createElement("p")
  priceElement.classList.add("price")
  priceElement.textContent = `₹${price}`

  const categoryElement = document.createElement("span")
  categoryElement.classList.add('category')
  categoryElement.textContent = category

  sweetItem.appendChild(nameElement)
  sweetItem.appendChild(priceElement)
  sweetItem.appendChild(categoryElement)

  return sweetItem
}

export function buildMenuBoard(sweets) {
  // Your code here
  if (!Array.isArray(sweets)) return null
  // if (sweets.length === 0) 
  const menuBoard = document.createElement("div")
  menuBoard.id = "menu-board"

  for (const sweet of sweets){
    const itemElement = createSweetItem(sweet.name, sweet.price, sweet.category)
    if (itemElement) {
      menuBoard.appendChild(itemElement)
    }
  }
  return menuBoard
}

export function addSpecialBadge(sweetElement, badgeText) {
  // Your code here
  if (!sweetElement || !(sweetElement instanceof Element)) return null
  if (typeof badgeText !== "string" || badgeText.trim() === "") return null

  const specialBadge = document.createElement("span")
  specialBadge.classList.add("special-badge")
  specialBadge.textContent = badgeText

  sweetElement.appendChild(specialBadge)
  return sweetElement;
}
