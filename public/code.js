// Lipikaar - AI Malayalam Converter for Figma
// code.js - The main plugin logic

// 1. PLUGIN INITIALIZATION & UI
// =============================
figma.showUI(__html__, { width: 360, height: 600 });

// Send the saved API key to the UI when it starts up
figma.clientStorage.getAsync('geminiApiKey').then(apiKey => {
  figma.ui.postMessage({ type: 'retrieved-api-key', apiKey: apiKey || '' });
});


// 2. SELECTION HANDLING
// =====================
let selectedNodeId = null;

function handleSelectionChange() {
  const selection = figma.currentPage.selection;
  if (selection.length === 1 && selection[0].type === 'TEXT') {
    const node = selection[0];
    selectedNodeId = node.id;
    // Send text content and current typography settings to UI
    figma.ui.postMessage({
      type: 'selection-change',
      hasSelection: true,
      text: node.characters,
      fontSize: node.fontSize,
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      fontName: node.fontName,
    });
  } else {
    selectedNodeId = null;
    figma.ui.postMessage({
      type: 'selection-change',
      hasSelection: false,
      message: selection.length > 1 ? 'Please select only one text layer.' : 'Please select a text layer.'
    });
  }
}

// Listen for selection changes
figma.on('selectionchange', handleSelectionChange);
// Also run it on start, in case a layer is already selected
handleSelectionChange();


// 3. MESSAGE HANDLING FROM UI
// ===========================
figma.ui.onmessage = async (msg) => {
  // 3.1. SAVE API KEY
  // -----------------
  if (msg.type === 'save-api-key') {
    await figma.clientStorage.setAsync('geminiApiKey', msg.apiKey);
    figma.notify('API key saved successfully.');
  }

  // 3.2. APPLY TEXT & STYLES TO FIGMA
  // ---------------------------------
  if (msg.type === 'apply-to-figma') {
    const node = figma.getNodeById(selectedNodeId);
    if (node && node.type === 'TEXT') {
      try {
        // a. Load the selected font
        const fontToLoad = { family: msg.fontFamily, style: 'Regular' };
        await figma.loadFontAsync(fontToLoad);
        node.fontName = fontToLoad;

        // b. Apply new characters and typography
        node.characters = msg.text;
        if (msg.fontSize) node.fontSize = parseFloat(msg.fontSize);
        if (msg.lineHeight) node.lineHeight = { value: parseFloat(msg.lineHeight), unit: 'PERCENT' };
        if (msg.letterSpacing) node.letterSpacing = { value: parseFloat(msg.letterSpacing), unit: 'PIXELS' };

        figma.notify('Text and styles applied successfully!');
      } catch (error) {
        figma.notify('Error: Could not apply changes. Is the font installed?', { error: true });
        console.error('Figma plugin error:', error);
      }
    } else {
      figma.notify('Error: No text layer selected.', { error: true });
    }
  }

  // 3.3. NOTIFY UI
  // ----------------
  if (msg.type === 'notify') {
    figma.notify(msg.message, { error: msg.isError });
  }
};
