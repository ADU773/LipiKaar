// This script runs in the plugin UI's context (the iframe).

// Get the button element from the DOM.
const createButton = document.getElementById('create-button');

// Add a click event listener to the button.
createButton.onclick = () => {
  // When the button is clicked, send a message to the main plugin code (code.js).
  // The message is an object with a 'type' property.
  parent.postMessage({ pluginMessage: { type: 'create-rectangle' } }, '*');
};
