# Specs - Dropdown-profile Admin (Frame 721:5277)

## Frame Overview
- **Name:** Dropdown-profile Admin
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Frame ID:** 721:5277
- **Status:** spec
- **Type:** Dropdown navigation component for admin user profile

---

## 1. Screen Overview

The "Dropdown-profile Admin" is a dropdown menu component displayed when an admin user clicks on their profile area. It contains three menu items: "Profile" (active state), "Dashboard", and "Logout". Each item has an associated icon. The dropdown has a dark background with light text.

## 2. Design Items

| No | Item | Type | Description |
|----|------|------|-------------|
| A | Dropdown-List | others (navigation) | Dropdown menu container with 3 items: Profile, Dashboard, Logout. Click opens item and closes menu; Hover changes background to highlight |
| A.1 | Profile | button (icon_text) | Menu item for Profile with user icon, currently in active/highlighted state. Click navigates to user profile page |
| A.2 | Dashboard | others (list_item) | Menu item for Dashboard with grid icon. Not active by default. Click closes dropdown and navigates to Dashboard. Hover changes background |
| A.3 | Logout | button (icon_text) | Menu item for Logout with chevron/arrow icon. Click performs logout (API/session close), closes menu, redirects to login screen |

## 3. Visual Specifications

- **Dropdown container:** Dark background (dark theme), rounded corners
- **Profile item (A.1):** Active state with highlighted/light background, user icon on right, light/yellow text
- **Dashboard item (A.2):** Default state with dark background, grid icon on right, white text
- **Logout item (A.3):** Default state with dark background, chevron/arrow icon on right, white text
- **Hover state:** Background changes to highlight color on mouse hover
- **Item layout:** Text label on left, icon on right

## 4. Navigation / Actions

- **Profile (A.1):** Navigates to user profile page
- **Dashboard (A.2):** Closes dropdown and navigates to Admin Dashboard page
- **Logout (A.3):** Calls logout API, closes session, closes menu, redirects to login screen

## 5. States

- **Active state (Profile):** Highlighted background, distinct from other items
- **Default state (Dashboard, Logout):** Standard dark background
- **Hover state (all items):** Background changes to highlight color
