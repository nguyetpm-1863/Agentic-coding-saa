# Categories - Floating Action Button - phim noi chuc nang 2 (313:9139)

Note: This is the EXPANDED state of a FLOATING component. No URL access tests. Focus on expanded panel layout, button actions, collapse behavior.

## ACCESSING
Tests related to the visibility and display of the expanded FAB panel.
- Expanded State Visibility: Verify expanded FAB panel is displayed after clicking collapsed FAB
- Expanded State Availability: Verify all 3 buttons (The le, Viet KUDOS, Huy) are visible
- Expanded State After Scroll: Verify expanded panel remains fixed during scroll

## GUI
Tests related to visual appearance, layout, positioning of expanded FAB elements.
- Panel Layout: Vertical stack of buttons at bottom-right
- Button The le: Appearance (149x64px, yellow background, rounded corners, IC icon + label)
- Button Viet KUDOS: Appearance (yellow background, pen icon + label)
- Button Huy: Appearance (56x56px, red circle, white X icon, shadow)
- Button Order: The le on top, Viet KUDOS in middle, Huy at bottom
- Hover States: Shadow/brightness changes on hover for each button
- Responsive: Display across breakpoints
- Z-Index: Expanded panel floats above all content

## FUNCTION
Tests related to button click actions, collapse, keyboard interaction, navigation.
- Button The le Click: Opens The le UPDATE page/modal (3204:6051)
- Button Viet KUDOS Click: Opens Viet Kudo form/modal (520:11602)
- Button Huy Click: Closes/collapses the FAB panel back to collapsed state
- Keyboard Navigation: Tab order through buttons, Enter activation
- Click Outside: Behavior when clicking outside expanded panel
- ESC Key: Behavior when pressing Escape
- Background Interaction: Whether background is clickable while expanded
