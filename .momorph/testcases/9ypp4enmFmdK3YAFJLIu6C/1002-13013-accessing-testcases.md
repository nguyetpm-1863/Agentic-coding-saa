# ACCESSING Test Cases - Dropdown List Hashtag

## TC_HASH_ACC_001 - Verify dropdown is hidden by default
- **Category:** ACCESSING > Component Visibility > Default State
- **Objective:** Verify the hashtag dropdown is not visible before user interaction
- **Precondition:** User is logged in and on the Kudos writing page
- **Steps:**
  1. Navigate to the Kudos writing page
  2. Observe the Hashtag section
- **Expected:** The dropdown list is hidden. Only the trigger element ("+ Hashtag / Toi da 5") is visible.
- **Specs:** specs.md - Screen Overview
- **Priority:** High

## TC_HASH_ACC_002 - Verify dropdown opens on trigger click
- **Category:** ACCESSING > Component Visibility > Trigger Display
- **Objective:** Verify clicking the Hashtag trigger button opens the dropdown
- **Precondition:** User is logged in and on the Kudos writing page. Dropdown is closed.
- **Steps:**
  1. Navigate to the Kudos writing page
  2. Click on the "+ Hashtag" trigger button
- **Expected:** The dropdown list appears showing all 13 hashtags with dark background theme.
- **Specs:** specs.md - Functional Rules
- **Priority:** High

## TC_HASH_ACC_003 - Verify dropdown closes when clicking outside
- **Category:** ACCESSING > Component Visibility > Close Behavior
- **Objective:** Verify the dropdown closes when user clicks outside the component
- **Precondition:** User is logged in. Dropdown is open.
- **Steps:**
  1. Open the hashtag dropdown
  2. Click on any area outside the dropdown
- **Expected:** The dropdown closes. Any selections made are preserved.
- **Specs:** specs.md - Functional Rules
- **Priority:** High

## TC_HASH_ACC_004 - Verify dropdown requires authentication
- **Category:** ACCESSING > Authentication > Login Required
- **Objective:** Verify the hashtag dropdown is only accessible to authenticated users
- **Precondition:** User is not logged in
- **Steps:**
  1. Attempt to access the Kudos writing page without logging in
- **Expected:** User is redirected to the login page. The Hashtag dropdown component is not accessible.
- **Specs:** specs.md - Screen Overview
- **Priority:** High

## TC_HASH_ACC_005 - Verify dropdown re-opens after closing
- **Category:** ACCESSING > Component Visibility > Re-open
- **Objective:** Verify the dropdown can be reopened after being closed
- **Precondition:** User is logged in. Dropdown was previously opened and closed.
- **Steps:**
  1. Open the hashtag dropdown
  2. Close it by clicking outside
  3. Click the trigger button again
- **Expected:** The dropdown re-opens showing all hashtags. Previously selected hashtags remain selected with checkmark icons.
- **Specs:** specs.md - Functional Rules
- **Priority:** Medium
