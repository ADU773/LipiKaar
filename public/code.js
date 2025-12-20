// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Set the size of the plugin window.
figma.ui.resize(500, 650);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property.
  if (msg.type === 'apply-text') {
    const { unicodeText, styles } = msg.payload;

    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
      figma.notify('Please select at least one text layer.', { error: true });
      return;
    }

    let textLayersModified = 0;
    const loadFonts = async () => {
      for (const node of selectedNodes) {
        if (node.type === 'TEXT') {
          await figma.loadFontAsync(node.fontName as FontName);
          node.characters = unicodeText;
          textLayersModified++;
        }
      }

      if (textLayersModified > 0) {
        figma.notify(`Updated ${textLayersModified} text layer(s).`);
      } else {
        figma.notify('No text layers were selected.', { error: true });
      }
    };

    loadFonts().then(() => {
        // Close the plugin after applying the text.
        // figma.closePlugin();
    });
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
