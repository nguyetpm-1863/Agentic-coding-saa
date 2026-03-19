# Viewpoints: Dropdown-ngon-ngu (Language Dropdown)

## Source: Select_box reference viewpoints (adapted for language dropdown)

### Check Default Value
- [Default state] Check default display of language dropdown: displays correctly with position, flag icon, language code, default value VN
- Check value list: displays correct values (VN, EN) in correct order

### Event in Select Box
- Check operation when click to open dropdown: menu expands showing all language options
- Check operation when click to close dropdown: menu collapses
- Check operation when click outside dropdown: menu closes
- Check operation when press Up/Down key on keyboard: highlights next/previous language option
- Check operation when press Enter key on keyboard: closes list and sets selected (highlighted) value
- Check operation when press Escape key: closes dropdown without changing selection

### Select Value from List
- Check operation when select VN (first value): language switches to Vietnamese successfully
- Check operation when select EN (second/last value): language switches to English successfully
- Check operation when re-select current language: dropdown closes, no change occurs
- Check operation when switch language multiple times: each switch updates UI correctly

### Update Value List (Security/Integrity)
- Check operation when changing language value by inspect/dev tools: operation unaffected by edited value
- Check operation when changing display text by inspect/dev tools: operation unaffected by edited value

### Additional Viewpoints for Language Dropdown
- Check language persistence after page reload
- Check language persistence after navigating to different pages
- Check language persistence after browser restart (if cookie-based)
- Check dropdown behavior on mobile (touch interaction)
- Check dropdown behavior on tablet
- Check dropdown accessibility (screen reader, keyboard navigation)
