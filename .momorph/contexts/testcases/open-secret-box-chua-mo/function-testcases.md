# Function Test Cases: Open Secret Box - Chua Mo (Modal)

---

## FUNC-001: Open one secret box successfully
- **Category:** FUNCTION > Open Box > Normal
- **Objective:** Verify user can open a secret box and receive a badge
- **Precondition:** User is logged in; unopened secret box count >= 1
- **Steps:**
  1. Open the secret box modal
  2. Click on the box image
- **Expected:** Box opens with animation, a random badge is revealed, modal transitions to success state "MO SECRET BOX THANH CONG"
- **Priority:** High

## FUNC-002: Counter decreases after opening a box
- **Category:** FUNCTION > Counter > Decrement
- **Objective:** Verify the unopened box counter decreases by 1 after opening
- **Precondition:** User is logged in; unopened secret box count = 5
- **Steps:**
  1. Open the secret box modal, verify counter shows "05"
  2. Click on the box image to open a box
  3. Return to the modal (or observe counter update)
- **Expected:** Counter updates from "05" to "04" after successful box opening
- **Priority:** High

## FUNC-003: Receive exactly one badge per box open
- **Category:** FUNCTION > Open Box > Single badge
- **Objective:** Verify each box opening awards exactly 1 badge
- **Precondition:** User is logged in; unopened secret box count >= 1
- **Steps:**
  1. Open the secret box modal
  2. Click on the box image
  3. Verify the badge received in the success modal
  4. Check the user's badge collection in the database
- **Expected:** Exactly 1 badge is added to the user's collection per box opening
- **Priority:** High

## FUNC-004: Badge probability - Stay Gold (30%)
- **Category:** FUNCTION > Badge Distribution > Stay Gold
- **Objective:** Verify Stay Gold badge is awarded approximately 30% of the time
- **Precondition:** Test with statistically significant sample (e.g., 100 box openings)
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Stay Gold badges
- **Expected:** Stay Gold badge is awarded approximately 30% of the time (within acceptable statistical variance)
- **Priority:** Medium

## FUNC-005: Badge probability - Flow to Horizon (25%)
- **Category:** FUNCTION > Badge Distribution > Flow to Horizon
- **Objective:** Verify Flow to Horizon badge is awarded approximately 25% of the time
- **Precondition:** Test with statistically significant sample
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Flow to Horizon badges
- **Expected:** Flow to Horizon badge is awarded approximately 25% of the time
- **Priority:** Medium

## FUNC-006: Badge probability - Beyond the Boundary (10%)
- **Category:** FUNCTION > Badge Distribution > Beyond the Boundary
- **Objective:** Verify Beyond the Boundary badge is awarded approximately 10% of the time
- **Precondition:** Test with statistically significant sample
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Beyond the Boundary badges
- **Expected:** Beyond the Boundary badge is awarded approximately 10% of the time
- **Priority:** Medium

## FUNC-007: Badge probability - Root Further (5%)
- **Category:** FUNCTION > Badge Distribution > Root Further
- **Objective:** Verify Root Further badge is awarded approximately 5% of the time
- **Precondition:** Test with statistically significant sample
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Root Further badges
- **Expected:** Root Further badge is awarded approximately 5% of the time
- **Priority:** Medium

## FUNC-008: Badge probability - Touch of Light (20%)
- **Category:** FUNCTION > Badge Distribution > Touch of Light
- **Objective:** Verify Touch of Light badge is awarded approximately 20% of the time
- **Precondition:** Test with statistically significant sample
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Touch of Light badges
- **Expected:** Touch of Light badge is awarded approximately 20% of the time
- **Priority:** Medium

## FUNC-009: Badge probability - Revival (10%)
- **Category:** FUNCTION > Badge Distribution > Revival
- **Objective:** Verify Revival badge is awarded approximately 10% of the time
- **Precondition:** Test with statistically significant sample
- **Steps:**
  1. Open 100 secret boxes across test accounts
  2. Record the badge received for each opening
  3. Calculate percentage of Revival badges
- **Expected:** Revival badge is awarded approximately 10% of the time
- **Priority:** Medium

## FUNC-010: Badge probabilities sum to 100%
- **Category:** FUNCTION > Badge Distribution > Total
- **Objective:** Verify all badge probabilities sum to exactly 100%
- **Precondition:** Access to badge probability configuration
- **Steps:**
  1. Verify configuration: 30% + 25% + 10% + 5% + 20% + 10% = 100%
- **Expected:** Total probability equals 100%, no edge case where no badge is awarded
- **Priority:** High

## FUNC-011: Disable box click when count = 0
- **Category:** FUNCTION > Zero State > Disabled click
- **Objective:** Verify box image is not clickable when count is 0
- **Precondition:** User is logged in; unopened secret box count = 0
- **Steps:**
  1. Open the secret box modal
  2. Click on the box image
  3. Double-click on the box image
- **Expected:** Nothing happens; no box is opened; no error message; no badge awarded
- **Priority:** High

## FUNC-012: Hide instruction text when count = 0
- **Category:** FUNCTION > Zero State > Hidden text
- **Objective:** Verify instruction text is hidden when count is 0
- **Precondition:** User is logged in; unopened secret box count = 0
- **Steps:**
  1. Open the secret box modal
  2. Observe the area between title and box image
- **Expected:** "Click vao box de mo" text is not displayed
- **Priority:** High

## FUNC-013: Prevent double-click double-open
- **Category:** FUNCTION > Open Box > Double click prevention
- **Objective:** Verify rapid double-click does not open two boxes
- **Precondition:** User is logged in; unopened secret box count >= 2
- **Steps:**
  1. Open the secret box modal
  2. Rapidly double-click the box image
- **Expected:** Only one box is opened; counter decreases by 1 only; only one badge is awarded
- **Priority:** High

## FUNC-014: Prevent rapid multiple clicks
- **Category:** FUNCTION > Open Box > Rapid click prevention
- **Objective:** Verify rapid multiple clicks do not open multiple boxes
- **Precondition:** User is logged in; unopened secret box count >= 5
- **Steps:**
  1. Open the secret box modal
  2. Rapidly click the box image 5 times in quick succession
- **Expected:** Only one box is opened per interaction cycle; subsequent clicks are ignored until the first opening completes
- **Priority:** High

## FUNC-015: Badge saved to database
- **Category:** FUNCTION > Data Persistence > Badge save
- **Objective:** Verify awarded badge is persisted in the database
- **Precondition:** User is logged in; unopened secret box count >= 1
- **Steps:**
  1. Open the secret box modal
  2. Click box image to open a box
  3. Note the badge received
  4. Close modal and navigate to user's badge/award collection
  5. Verify in database
- **Expected:** The awarded badge appears in the user's collection and is stored in the database
- **Priority:** High

## FUNC-016: Counter persists after modal close and reopen
- **Category:** FUNCTION > Data Persistence > Counter
- **Objective:** Verify counter reflects accurate count after closing and reopening modal
- **Precondition:** User is logged in; unopened secret box count = 3
- **Steps:**
  1. Open the secret box modal, verify counter shows "03"
  2. Open one box, counter should show "02"
  3. Close the modal
  4. Reopen the modal
- **Expected:** Counter shows "02" reflecting the updated count
- **Priority:** High

## FUNC-017: Open last remaining box (count goes from 1 to 0)
- **Category:** FUNCTION > Edge Case > Last box
- **Objective:** Verify correct behavior when opening the last available box
- **Precondition:** User is logged in; unopened secret box count = 1
- **Steps:**
  1. Open the secret box modal, verify counter shows "01"
  2. Click on the box image to open
  3. Observe the result
- **Expected:** Box opens, badge is awarded, counter updates to "00", subsequent reopening of modal shows disabled state (instruction hidden, click disabled)
- **Priority:** High

## FUNC-018: Concurrent session handling
- **Category:** FUNCTION > Edge Case > Concurrent access
- **Objective:** Verify correct behavior when user opens modal in multiple tabs
- **Precondition:** User is logged in; unopened secret box count = 1
- **Steps:**
  1. Open the secret box modal in Tab A
  2. Open the secret box modal in Tab B
  3. Click box image in Tab A to open
  4. Click box image in Tab B to open
- **Expected:** Only one box is opened; second tab shows error or updated state; no duplicate badge awarded
- **Priority:** Medium

## FUNC-019: Network error during box opening
- **Category:** FUNCTION > Error Handling > Network error
- **Objective:** Verify graceful handling when network fails during box opening
- **Precondition:** User is logged in; unopened secret box count >= 1
- **Steps:**
  1. Open the secret box modal
  2. Disconnect network / simulate network failure
  3. Click on the box image
- **Expected:** Error message is displayed; no box is consumed; counter remains unchanged; user can retry after reconnecting
- **Priority:** Medium

## FUNC-020: Server error during box opening
- **Category:** FUNCTION > Error Handling > Server error
- **Objective:** Verify graceful handling when server returns error
- **Precondition:** User is logged in; unopened secret box count >= 1; simulate server 500 error
- **Steps:**
  1. Open the secret box modal
  2. Click on the box image (with simulated server error)
- **Expected:** Error message is displayed; no box is consumed; counter remains unchanged
- **Priority:** Medium

## FUNC-021: Opening box with large counter value
- **Category:** FUNCTION > Edge Case > Large count
- **Objective:** Verify modal handles large counter values correctly
- **Precondition:** User is logged in; unopened secret box count = 99
- **Steps:**
  1. Open the secret box modal
  2. Observe the counter display
- **Expected:** Counter displays "99" correctly without layout breakage
- **Priority:** Low

## FUNC-022: Close modal during box opening animation
- **Category:** FUNCTION > Edge Case > Close during animation
- **Objective:** Verify behavior when user closes modal while box is being opened
- **Precondition:** User is logged in; unopened secret box count >= 1
- **Steps:**
  1. Open the secret box modal
  2. Click on the box image to start opening
  3. Immediately click X button to close modal
- **Expected:** Modal closes; if the opening was processed, badge is still awarded and counter decremented; if not processed, no changes occur; data remains consistent
- **Priority:** Medium
