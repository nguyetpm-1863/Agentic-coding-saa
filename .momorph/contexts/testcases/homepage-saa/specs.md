# Homepage SAA - Screen Specifications

## 1. Screen Overview

- **Screen Name:** Homepage SAA
- **Frame ID:** 2167:9026
- **File Key:** 9ypp4enmFmdK3YAFJLIu6C
- **Status:** spec
- **Description:** The main landing page for the Sun* Annual Awards (SAA) 2025 application. It features a hero banner with a countdown timer to the event, event information, CTA buttons for Awards and Kudos, an awards category grid, a Sun* Kudos promotion section, a persistent header with navigation, a footer, and a floating widget button.

## 2. UI Elements

### A. Header (A1)
| No | Name | Type | Description |
|----|------|------|-------------|
| A1 | Header | navigation | Main navigation bar with logo, links, and control icons |
| A1.1 | LOGO | button (icon_text) | Logo 64x60px, click navigates to homepage |
| A1.2 | Button-Selected state | button (text_link) | 'About SAA 2025' link - selected state with yellow/underline |
| A1.3 | Button Hover State | button (text_link) | 'Awards Information' link - hover state with highlight |
| A1.5 | Button-Normal state | button (text_link) | 'Sun* Kudos' link - normal state |
| A1.6 | Notification | button (icon_text) | Bell icon 40x40px, opens notification panel, red badge for unread |
| A1.7 | Language | button (icon_text) | Language switcher showing 'VN', options: VN/EN |
| A1.8 | Button-IC | button (icon_text) | User account icon 40x40px, opens profile dropdown (Profile/Sign out/Admin Dashboard) |

### B. Hero / Keyvisual Section (3.5, B1-B4)
| No | Name | Type | Description |
|----|------|------|-------------|
| 3.5 | Keyvisual | hero | Main banner with 'ROOT FURTHER' title, countdown, event info, CTAs |
| B1 | Countdown time | countdown | Countdown section to event start time (configurable via env var, ISO-8601) |
| B1.2 | Coming soon | label | 'Coming soon' subtitle, hidden when countdown reaches zero |
| B1.3 | Countdown | countdown | Three time groups: Days, Hours, Minutes (2-digit zero-padded) |
| B1.3.1 | Days | countdown_tile | Days remaining display with 'DAYS' label |
| B1.3.2 | Hours | countdown_unit | Hours remaining display with 'HOURS' label |
| B1.3.3 | Minutes | countdown_unit | Minutes remaining display with 'MINUTES' label |
| B2 | Thong tin su kien | info_block | Static event info: time '18h30', location, Facebook livestream note |
| B3 | Call-To-Action | button (text_link) | Two CTA buttons: 'ABOUT AWARDS' and 'ABOUT KUDOS' |
| B3.1 | Button-IC About | button (icon_text) | 'ABOUT AWARDS' button, navigates to Awards Information page |
| B3.2 | Button-IC Kudos | button (icon_text) | 'ABOUT KUDOS' button, navigates to Sun* Kudos page |
| B4 | Content | info_block | 'Root Further' description paragraph, static text |

### C. Awards Section (C1, C2)
| No | Name | Type | Description |
|----|------|------|-------------|
| C1 | Header Giai thuong | info_block | Section header: 'Sun* annual awards 2025' caption, 'He thong giai thuong' title |
| C2 | Award list | card grid | Grid of award category cards (Mobile/Tablet: 2 cols, Desktop: 3 cols) |
| C2.1 | Top Talent Award | card | Award card with thumbnail, title, description, 'Chi tiet' link |
| C2.1.1 | Picture-Award | card image | Square thumbnail with yellow border and light effect |
| C2.1.2 | Top Talent | label | Award category title (clickable) |
| C2.1.3 | Description | label | Short description, max 2 lines with ellipsis |
| C2.1.4 | Button-IC | button (icon_text) | 'Chi tiet' detail link |
| C2.2 | Top Project Award | card | Same pattern as C2.1 |
| C2.3 | Top Project Leader Award | card | Same pattern as C2.1 |
| C2.4 | Best Manager Award | card | Same pattern as C2.1 |
| C2.5 | Signature 2025 - Creator Award | card | Same pattern as C2.1 |
| C2.6 | MVP Award | card | Same pattern as C2.1 |

### D. Sun* Kudos Section (D1, D2)
| No | Name | Type | Description |
|----|------|------|-------------|
| D1 | Sunkudos | card | Promotion block with title, description, and CTA |
| D2 | Content | info_block | 'Sun* Kudos' title, 'Phong trao ghi nhan' label, description, image |
| D2.1 | Button-IC | button (icon_text) | 'Chi tiet' button navigating to Sun* Kudos page |

### E. Footer (7)
| No | Name | Type | Description |
|----|------|------|-------------|
| 7 | Footer | navigation | Footer with logo, navigation links, copyright |
| 7.1 | LOGO | logo | Logo 69x64px, same behavior as header logo |
| 7.2 | Button-IC | button (text_link) | 'About SAA 2025' footer link |
| 7.3 | Button-IC | button (text_link) | 'Awards Information' footer link |
| 7.4 | Button-IC | button (text_link) | 'Sun* Kudos' footer link |
| 7.5 | Button-IC | button (text_link) | 'Tieu chuan chung' link |

### F. Widget (6)
| No | Name | Type | Description |
|----|------|------|-------------|
| 6 | Widget Button | button (icon_text) | Fixed floating button (105x64px), yellow pill, pencil + SAA icon, opens quick action menu |

## 3. Validation Rules

- Countdown timer values are always 2-digit zero-padded (e.g., '05', '00')
- Countdown target datetime is configurable via environment variable in ISO-8601 format
- Award card descriptions display max 2 lines with ellipsis truncation
- 'Coming soon' label is hidden when countdown reaches 00:00:00

## 4. User Interactions

| Action | Element | Result |
|--------|---------|--------|
| Click Logo (header/footer) | A1.1, 7.1 | Navigate to homepage / scroll to top |
| Click 'About SAA 2025' | A1.2, 7.2 | Navigate to About SAA 2025 page; if selected, scroll to top |
| Click 'Awards Information' | A1.3, 7.3 | Navigate to Awards Information page |
| Click 'Sun* Kudos' | A1.5, 7.4 | Navigate to Sun* Kudos page |
| Click Notification bell | A1.6 | Open notification panel |
| Click Language switcher | A1.7 | Open language menu (VN/EN) |
| Click User avatar | A1.8 | Open profile dropdown (Profile/Sign out/Admin Dashboard) |
| Click 'ABOUT AWARDS' | B3.1 | Navigate to Awards Information page |
| Click 'ABOUT KUDOS' | B3.2 | Navigate to Sun* Kudos page |
| Click award card (image/title/detail) | C2.x | Navigate to Awards Information page with hashtag slug to auto-scroll |
| Hover award card | C2.x | Card elevates with border/light highlight |
| Click 'Chi tiet' (Kudos) | D2.1 | Navigate to Sun* Kudos page |
| Click Widget button | 6 | Open quick action menu |
| Hover nav links | A1.2-A1.5 | Highlight background |

## 5. Security Considerations

- User authentication state determines header controls visibility (notification, avatar, admin dashboard option)
- Language preference and session must be managed securely
- Navigation links should not expose internal routes or parameters to unauthorized users
- Notification panel access requires authenticated session
- Admin Dashboard option in profile dropdown should only appear for admin role users
- All navigation should use safe internal routing (no open redirects)
