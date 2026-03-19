# Homepage SAA - ACCESSING Test Cases

Testcase_Type: Access control and security

---

## TC_HOMEPAGE_SAA_ACC_001
- **Category:** ACCESSING
- **Sub_Category:** Authentication
- **Test_Objective:** Verify that the Homepage SAA is accessible to unauthenticated (logged-out) users
- **Precondition:** User is not logged in
- **Test_Data:**
- **Steps:**
  1. Open the browser
  2. Navigate to the Homepage SAA URL
- **Expected_Result:**
  1. The Homepage SAA loads successfully
  2. The page displays the hero banner, countdown, awards section, kudos section, and footer
  3. Header shows navigation links without user-specific controls (no notification bell, no user avatar)
- **Specs:** A1, 3.5, C1, C2, D1, 7
- **Priority:** High

---

## TC_HOMEPAGE_SAA_ACC_002
- **Category:** ACCESSING
- **Sub_Category:** Authentication
- **Test_Objective:** Verify that the Homepage SAA is accessible to authenticated (logged-in) users
- **Precondition:** User is logged in with a valid account
- **Test_Data:** Valid user credentials
- **Steps:**
  1. Log in to the application with valid credentials
  2. Navigate to the Homepage SAA URL
- **Expected_Result:**
  1. The Homepage SAA loads successfully
  2. Header displays notification bell (A1.6), language switcher (A1.7), and user avatar (A1.8)
  3. All page sections render correctly
- **Specs:** A1, A1.6, A1.7, A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_ACC_003
- **Category:** ACCESSING
- **Sub_Category:** Authorization
- **Test_Objective:** Verify that the Admin Dashboard option appears only for admin role users in the profile dropdown
- **Precondition:** User is logged in with admin role
- **Test_Data:** Admin user credentials
- **Steps:**
  1. Log in with admin credentials
  2. Navigate to the Homepage SAA
  3. Click the user avatar icon (A1.8)
- **Expected_Result:**
  1. Profile dropdown opens
  2. Dropdown displays: Profile, Sign out, Admin Dashboard options
- **Specs:** A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_ACC_004
- **Category:** ACCESSING
- **Sub_Category:** Authorization
- **Test_Objective:** Verify that the Admin Dashboard option does NOT appear for regular (non-admin) users
- **Precondition:** User is logged in with regular (non-admin) role
- **Test_Data:** Regular user credentials
- **Steps:**
  1. Log in with regular user credentials
  2. Navigate to the Homepage SAA
  3. Click the user avatar icon (A1.8)
- **Expected_Result:**
  1. Profile dropdown opens
  2. Dropdown displays: Profile, Sign out (no Admin Dashboard option)
- **Specs:** A1.8
- **Priority:** High

---

## TC_HOMEPAGE_SAA_ACC_005
- **Category:** ACCESSING
- **Sub_Category:** URL Access
- **Test_Objective:** Verify that accessing the Homepage SAA via direct URL works correctly
- **Precondition:** User has a valid browser
- **Test_Data:** Homepage SAA URL
- **Steps:**
  1. Open the browser
  2. Enter the Homepage SAA URL directly in the address bar
  3. Press Enter
- **Expected_Result:**
  1. The Homepage SAA loads without error
  2. All sections display correctly
- **Specs:** 3.5, C1, C2, D1, 7
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_ACC_006
- **Category:** ACCESSING
- **Sub_Category:** Session
- **Test_Objective:** Verify that the Homepage SAA reflects session expiry correctly
- **Precondition:** User was previously logged in, session has expired
- **Test_Data:**
- **Steps:**
  1. Log in to the application
  2. Wait for the session to expire (or manually clear session)
  3. Navigate to (or refresh) the Homepage SAA
- **Expected_Result:**
  1. The Homepage SAA loads successfully
  2. Header reverts to unauthenticated state (no notification bell, no user avatar)
  3. Public content remains visible
- **Specs:** A1
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_ACC_007
- **Category:** ACCESSING
- **Sub_Category:** Authentication
- **Test_Objective:** Verify that notification panel requires authentication
- **Precondition:** User is not logged in
- **Test_Data:**
- **Steps:**
  1. Navigate to the Homepage SAA while not logged in
  2. Attempt to access the notification feature (if bell icon is visible)
- **Expected_Result:**
  1. Notification bell icon is not displayed for unauthenticated users, OR
  2. Clicking the bell redirects to the login page
- **Specs:** A1.6
- **Priority:** Medium

---

## TC_HOMEPAGE_SAA_ACC_008
- **Category:** ACCESSING
- **Sub_Category:** URL Access
- **Test_Objective:** Verify that invalid/malformed URL paths under homepage are handled gracefully
- **Precondition:** User has a valid browser
- **Test_Data:** Invalid URL path (e.g., /homepage-invalid-path)
- **Steps:**
  1. Open the browser
  2. Navigate to an invalid URL path related to the homepage
- **Expected_Result:**
  1. Application displays a 404 error page or redirects to the homepage
  2. No server error (500) is exposed
- **Specs:**
- **Priority:** Low
