// This is the main plugin code that runs in Figma's backend.

// Show the UI when the plugin is run.
// The UI is defined in ui.html.
figma.showUI(__html__, { width: 240, height: 120 });

// Listen for messages sent from the UI (ui.js).
figma.ui.onmessage = (msg) => {
  // Check if the message type is 'create-rectangle'.
  if (msg.type === 'create-rectangle') {
    // Create a new rectangle node.
    const rect = figma.createRectangle();

    // Move the rectangle to the center of the viewport.
    rect.x = figma.viewport.center.x - 75; // 75 is half the default width (150/2)
    rect.y = figma.viewport.center.y - 50; // 50 is half the default height (100/2)

    // Set its size.
    rect.resize(150, 100);

    // Add it to the current page.
    figma.currentPage.appendChild(rect);

    // Select the new rectangle so the user can see it.
    figma.currentPage.selection = [rect];

    // Show a success notification to the user.
    figma.notify('Rectangle created successfully!', { timeout: 3000 });
  }

  // After creating the rectangle, close the plugin.
  figma.closePlugin();
};

// Handle errors from the UI.
figma.ui.on('error', (error) => {
  console.error('Figma Plugin UI Error:', error);
  figma.notify('An error occurred in the plugin UI.', { error: true });
});
