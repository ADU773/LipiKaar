// figma.showUI(__html__);
figma.showUI(__html__, { width: 340, height: 420, title: "Lipikaar | Malayalam Font Helper" });

let selectedNodeId = null;

// Listen for selection changes and send info to the UI
figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && selection[0].type === 'TEXT') {
        const node = selection[0];
        selectedNodeId = node.id;
        figma.ui.postMessage({
            type: 'selection-change',
            nodeId: node.id,
            text: node.characters
        });
    } else {
        selectedNodeId = null;
        figma.ui.postMessage({
            type: 'selection-change',
            nodeId: null,
            text: ''
        });
    }
});


// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'apply-font-and-text') {
        if (!selectedNodeId) {
            figma.notify("Please select a single text layer.", { error: true });
            return;
        }

        const node = figma.getNodeById(selectedNodeId);

        if (node && node.type === 'TEXT') {
            const { font, convertedText } = msg;

            try {
                // Load the selected font
                await figma.loadFontAsync(font);

                // Apply the font to the text node
                node.fontName = font;

                // IMPORTANT: Replace the characters with the converted text
                node.characters = convertedText;

                figma.notify(`Applied font '${font.style}' and converted text.`);

            } catch (error) {
                figma.notify(`Error loading font: ${error.message}`, { error: true });
            }
        }
    } else if (msg.type === 'notify') {
        figma.notify(msg.message, { error: msg.isError });
    } else if (msg.type === 'close') {
        figma.closePlugin();
    }
};