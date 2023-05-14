# BasketBuddy

This is a simple Shopping List application developed in JavaScript, using **Firebase** as a Real-Time Database. The application lets users add, remove, and cross off items in their shopping list.

## Getting Started

Firstly, you need to have Firebase set up and linked to your project. You can do this by following the [**Firebase Setup Guide**](https://firebase.google.com/docs/web/setup).

Then, you need to replace the **`databaseURL`** in the **`appSettings`** with your Firebase Real-Time Database URL. You can find the URL in the Firebase console, under the "Realtime Database" section.

`const appSettings = {
    databaseURL: "Insert database URL here"
}`

## Key Features

- Add Items: Users can add new items to the shopping list by typing the item name into the input field and clicking the "Add" button.

- Remove Items: Users can remove items from the shopping list by double-clicking on an item in the list.

- Cross Off Items: Users can cross off items on the shopping list by clicking on the item. Clicking again will uncross the item.

## Security Notice

Remember to remove your Firebase Database URL before pushing your code to a public repository to avoid exposing your database to unwanted access. Make sure to follow Firebase's security best practices to secure your data.
