# Categories: Dropdown-ngon-ngu (Language Dropdown)

> Note: This is a DROPDOWN component embedded within page headers. It has NO dedicated URL.
> Therefore, ACCESSING tests focus on component visibility/availability rather than URL access.

## 1. ACCESSING
Tests related to the availability and accessibility of the language dropdown component.

### Sub-categories:
- **Component Visibility**: Verify dropdown appears on relevant pages
- **Authentication State**: Verify dropdown behavior for logged-in vs logged-out users
- **Page Context**: Verify dropdown availability across different pages

## 2. GUI
Tests related to the visual appearance and layout of the language dropdown.

### Sub-categories:
- **Default State**: Collapsed dropdown display (flag + code)
- **Expanded State**: Open dropdown with all language options
- **Selected Item**: Visual distinction for currently selected language
- **Option Item**: Visual display of non-selected language option
- **Hover State**: Visual feedback on mouse hover
- **Responsive Design**: Display on mobile, tablet, desktop
- **Accessibility**: Keyboard focus indicators, ARIA attributes

## 3. FUNCTION
Tests related to the functional behavior of language selection.

### Sub-categories:
- **Open/Close**: Dropdown toggle behavior
- **Language Selection**: Selecting VN or EN
- **UI Language Update**: Interface language changes after selection
- **Persistence**: Language preference saved and restored
- **Keyboard Interaction**: Arrow keys, Enter, Escape
- **Edge Cases**: Rapid clicks, concurrent actions
- **Security**: Client-side manipulation resistance
