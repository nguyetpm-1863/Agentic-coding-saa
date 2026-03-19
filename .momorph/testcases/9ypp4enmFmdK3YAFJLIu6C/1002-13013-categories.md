# Categories - Dropdown List Hashtag

This is a DROPDOWN component embedded within a page. It does NOT have its own URL.
Therefore, ACCESSING tests focus on the component's visibility and prerequisite conditions, not URL navigation.

---

## 1. ACCESSING
Testing how the dropdown component becomes accessible to the user.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Component Visibility | Trigger Display | Verify dropdown appears when trigger element (+ Hashtag button) is clicked |
| Component Visibility | Pre-condition State | Verify dropdown is hidden by default before user interaction |
| Component Visibility | Close Behavior | Verify dropdown closes when clicking outside the component |
| Authentication | Login Required | Verify dropdown is only available to authenticated users |

## 2. GUI
Testing the visual display and layout of the dropdown component.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Dropdown Header | Label Display | Verify "Hashtag" label and "Toi da 5" subtitle |
| Dropdown Header | Icon Display | Verify "+" icon display |
| Hashtag List | Item Display | Verify all 13 hashtags displayed with '#' prefix |
| Hashtag List | Item Order | Verify hashtags are in correct order |
| Hashtag List | Selected State | Verify golden checkmark icon (24x24px) on selected items |
| Hashtag List | Unselected State | Verify no checkmark on unselected items |
| Hashtag List | Hover State | Verify background color change on hover |
| Dropdown Container | Background | Verify dark/black background theme |
| Dropdown Container | Scroll | Verify scrollbar when list exceeds visible area |
| Responsive | Mobile | Verify dropdown displays correctly on mobile (320px) |
| Responsive | Tablet | Verify dropdown displays correctly on tablet (768px) |
| Responsive | Desktop | Verify dropdown displays correctly on desktop (1024px+) |

## 3. FUNCTION
Testing the interactive behavior and business logic.

| Sub_Category | Sub_Sub_Category | Description |
|---|---|---|
| Selection | Single Select | Verify clicking a hashtag toggles its selection |
| Selection | Multi Select | Verify multiple hashtags can be selected simultaneously |
| Selection | Max Limit | Verify maximum 5 selections enforced |
| Selection | Deselect | Verify clicking a selected hashtag deselects it |
| Selection | Re-select After Deselect | Verify deselected hashtag can be re-selected |
| Selection | Select at Max Then Deselect | Verify deselecting at max allows new selection |
| Toggle State | Check Icon Toggle | Verify checkmark appears on select, disappears on deselect |
| Toggle State | Visual Feedback | Verify immediate visual feedback on click |
| Boundary | Select All 5 | Verify selecting exactly 5 hashtags works |
| Boundary | Attempt 6th Selection | Verify 6th selection is blocked when 5 selected |
| Boundary | Zero Selected | Verify component works with no selections |
| Keyboard | Arrow Navigation | Verify Up/Down arrow key navigation |
| Keyboard | Enter Key | Verify Enter key selects/deselects highlighted item |
| Data Persistence | Save Selection | Verify selected hashtags are persisted correctly |
| Data Persistence | Load Existing | Verify previously saved selections are loaded on re-open |
