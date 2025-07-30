# 📋 Copy Folder Content (VSCode Extension)

A Visual Studio Code extension that copies the content of **all files inside a selected folder (and its subfolders)** to your clipboard, prefixing each file with its **relative file path**.

---

## ✨ Features

- Select a folder via command palette or context menu
- Recursively reads all files inside the folder
- Copies content of each file to clipboard
- Prepends each file's content with its relative path
- Works with any text-based file (UTF-8)
- Integrated into the **right-click menu** of the VSCode Explorer
- Outputs a single text block with clear separators

---

## 💡 Example Output

```text
// src/utils/math.ts
export function sum(a: number, b: number) {
  return a + b;
}

// README.md
# My Project
```

---

## 🧠 How to Use

### 🔹 Option 1: Command Palette

1. Open the Command Palette (`Ctrl+Shift+P` or `F1`)
2. Search for: `Copy Folder Contents to Clipboard`
3. Select a folder from the dialog
4. Content is copied to clipboard automatically

### 🔹 Option 2: Right-Click on Folder (Explorer)

1. In the Explorer sidebar, right-click any folder
2. Click `Copy Folder Contents to Clipboard`
3. Done! Output is in your clipboard

---

## 📄 License

MIT License

Copyright (c) 2025 Eperson Mayrink

Permission is hereby granted, free of charge, to any person obtaining a copy...

(See full license in the `LICENSE` file.)

