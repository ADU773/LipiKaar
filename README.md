# Malayalam Legacy → Unicode Converter (Figma Plugin)

A fully functional **Figma plugin** that converts **legacy (non-Unicode) Malayalam text** into **Unicode Malayalam** and applies correct Malayalam fonts directly inside Figma.

This plugin is built using **JavaScript and HTML only**, following the official Figma Plugin API.

---

## ✨ Features

### 🔤 Malayalam Legacy to Unicode Conversion
- Converts legacy Malayalam fonts such as:
  - AnjaliOldLipi
  - ML-TTKarthika
- Outputs valid **Unicode Malayalam**
- Handles common conjuncts and chillu characters

---

### 👀 Live Unicode Preview
- Preview converted Malayalam text before applying
- Ensures correct rendering inside Figma

---

### 🖊️ Apply Text Directly in Figma
- Replaces selected text layer content
- Preserves:
  - Text alignment
  - Font size
  - Layout

---

### 🔠 Unicode Malayalam Font Support
Apply professional Malayalam fonts:
- Noto Sans Malayalam
- Noto Serif Malayalam
- Chilanka
- Uroob

Fonts are loaded using `figma.loadFontAsync()`.

---

### 🎛 Typography Controls
- Font size
- Line height (default: 1.5)
- Letter spacing

All controls apply instantly to the selected text layer.

---

### ⚠️ Error Handling
User-friendly warnings for:
- No text layer selected
- Text already in Unicode
- Font loading failure
- Conversion issues

---

### 🧼 Clean & Minimal UI
- Responsive HTML-based UI
- Malayalam-friendly preview
- Simple buttons:
  - Convert
  - Apply
  - Reset

---

## 🧠 How It Works

1. Select a **Text Layer** in Figma
2. Open the plugin
3. Paste **legacy Malayalam text**
4. Click **Convert**
5. Preview Unicode Malayalam
6. Choose a Malayalam font
7. Click **Apply**

---

## 📁 Project Structure

