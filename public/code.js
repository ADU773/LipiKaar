// Set up the plugin UI
figma.showUI(__html__, { width: 400, height: 600 });

// --- SELECTION HANDLING ---
function handleSelectionChange() {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && selection[0].type === 'TEXT') {
        const textNode = selection[0];
        // Send a message to the UI with the selected text content
        figma.ui.postMessage({
            type: 'selection-change',
            payload: {
                hasTextNode: true,
                legacyText: textNode.characters,
                nodeId: textNode.id,
            }
        });
    } else {
        // Send a message indicating no valid text node is selected
        figma.ui.postMessage({
            type: 'selection-change',
            payload: {
                hasTextNode: false,
                legacyText: '',
                nodeId: null,
            }
        });
    }
}

// Initial check when the plugin is opened
handleSelectionChange();

// Listen for future selection changes
figma.on('selectionchange', handleSelectionChange);


// --- MESSAGE HANDLING FROM UI ---
figma.ui.onmessage = async (msg) => {
    // Find the text node from the ID sent by the UI
    const node = figma.getNodeById(msg.payload.nodeId);
    if (!node || node.type !== 'TEXT') {
        figma.notify("Selected layer not found or is not a text layer.", { error: true });
        return;
    }

    if (msg.type === 'apply-text-and-typography') {
        const { unicodeText, fontFamily, fontSize, lineHeight, letterSpacing } = msg.payload;

        try {
            // 1. Load the selected font
            await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
            
            // 2. Apply the new font family
            node.fontName = { family: fontFamily, style: "Regular" };
            
            // 3. Apply the converted unicode text
            node.characters = unicodeText;
            
            // 4. Apply other typography settings
            node.fontSize = fontSize;
            node.lineHeight = { value: lineHeight, unit: 'PIXELS' };
            node.letterSpacing = { value: letterSpacing, unit: 'PIXELS' };
            
            figma.notify("Text and typography applied successfully!");

        } catch (e) {
            figma.notify(`Error applying changes: ${e.message}`, { error: true });
        }
    }
};
