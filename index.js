import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "!!! Insert database URL here !!!",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const instructionsEl = document.getElementById("instructions");

addButtonEl.addEventListener("click", async () => {
  let inputValue = inputFieldEl.value;

  await push(shoppingListInDB, { value: inputValue, crossed: false });

  clearInputFieldEl();
});

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    instructionsEl.style.display = "block";

    itemsArray.forEach((item) => {
      appendItemToShoppingListEl(item);
    });
  } else {
    shoppingListEl.innerHTML =
      "<p class='placeholder-text'>Your cart is empty. Start adding items!</p>";
    instructionsEl.style.display = "none";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let [itemID, { value: itemValue, crossed: itemCrossed }] = item;

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;
  if (itemCrossed) {
    newEl.classList.add("crossed");
  }

  newEl.addEventListener("dblclick", async () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    await remove(exactLocationOfItemInDB);
  });

  newEl.addEventListener("click", async () => {
    newEl.classList.toggle("crossed");
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    await set(exactLocationOfItemInDB, {
      value: itemValue,
      crossed: !itemCrossed,
    });
  });

  shoppingListEl.append(newEl);
}
