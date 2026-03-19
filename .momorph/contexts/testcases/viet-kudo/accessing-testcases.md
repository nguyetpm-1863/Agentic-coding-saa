# Viet Kudo - ACCESSING Test Cases

> Note: This is a modal, so tests focus on how it is opened, not URL navigation.

## ACC - Open Modal

### ACC_001 - Open modal by clicking trigger button
- **Category:** ACCESSING > Open Modal
- **Objective:** Verify modal opens when user clicks the "Viet Kudo" button on the parent screen
- **Precondition:** User is authenticated and on the Kudos page
- **Steps:**
  1. Navigate to the Kudos page
  2. Click the "Viet Kudo" button
- **Expected:** Modal "Gui loi cam on va ghi nhan den dong doi" displays correctly with overlay background
- **Priority:** High

### ACC_002 - Open modal by double-clicking trigger button
- **Category:** ACCESSING > Open Modal
- **Objective:** Verify modal opens correctly when user double-clicks the trigger button
- **Precondition:** User is authenticated and on the Kudos page
- **Steps:**
  1. Navigate to the Kudos page
  2. Double-click the "Viet Kudo" button
- **Expected:** Modal opens once (not duplicated); displays correctly without error
- **Priority:** Medium

### ACC_003 - Open modal via keyboard (Tab + Enter)
- **Category:** ACCESSING > Open Modal
- **Objective:** Verify modal opens when user navigates to trigger button via Tab and presses Enter
- **Precondition:** User is authenticated and on the Kudos page
- **Steps:**
  1. Navigate to the Kudos page
  2. Press Tab to focus on the "Viet Kudo" button
  3. Press Enter
- **Expected:** Modal opens correctly with focus trapped inside the modal
- **Priority:** Medium

## ACC - Authentication

### ACC_004 - Authenticated user can open modal
- **Category:** ACCESSING > Authentication
- **Objective:** Verify that an authenticated user can access the Viet Kudo modal
- **Precondition:** User is logged in with valid credentials
- **Steps:**
  1. Navigate to the Kudos page
  2. Click the "Viet Kudo" button
- **Expected:** Modal opens successfully
- **Priority:** High

### ACC_005 - Unauthenticated user cannot open modal
- **Category:** ACCESSING > Authentication
- **Objective:** Verify that an unauthenticated user cannot access the Viet Kudo modal
- **Precondition:** User is not logged in
- **Steps:**
  1. Navigate to the Kudos page (or attempt to)
  2. Attempt to click the "Viet Kudo" button
- **Expected:** User is redirected to login page or the button is not visible/accessible
- **Priority:** High

## ACC - Modal Display on Open

### ACC_006 - Modal overlay displays correctly
- **Category:** ACCESSING > Modal Display on Open
- **Objective:** Verify modal overlay covers the background content
- **Precondition:** User is authenticated and on the Kudos page
- **Steps:**
  1. Click the "Viet Kudo" button
  2. Observe the background
- **Expected:** Semi-transparent overlay covers the entire background; background content is not clickable
- **Priority:** Medium

### ACC_007 - Modal is centered on screen
- **Category:** ACCESSING > Modal Display on Open
- **Objective:** Verify modal appears centered on the viewport
- **Precondition:** User is authenticated
- **Steps:**
  1. Click the "Viet Kudo" button
  2. Observe modal position
- **Expected:** Modal is centered horizontally and vertically on the screen
- **Priority:** Medium

### ACC_008 - Modal default state on open
- **Category:** ACCESSING > Modal Display on Open
- **Objective:** Verify all fields are in default state when modal first opens
- **Precondition:** User is authenticated
- **Steps:**
  1. Click the "Viet Kudo" button
  2. Observe all form fields
- **Expected:** All fields are empty/default; recipient field is blank; textarea shows placeholder; no hashtags selected; no images uploaded; anonymous toggle is off; "Gui" button is disabled
- **Priority:** High
