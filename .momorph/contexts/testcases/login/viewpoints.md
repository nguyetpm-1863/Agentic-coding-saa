# Login Screen - Test Viewpoints

## Source: testViewpoints Knowledge Base

### 1. Design of Login Screen

| Viewpoint | Expected Result |
|-----------|----------------|
| Check display of screen: Header, Title, Footer, Layout of items, State of each item, Position and format of Message area | Same as the designed spec |

### 2. Login by Google Account

| Viewpoint | Expected Result |
|-----------|----------------|
| First time login when registered account is logging Google | Can login successfully even if not input username/password |
| First time login when other account is logging Google | Handle auto login or can not login based on spec |
| First time login when not login Google by any user (PC) | Display Google login screen. Can login successfully after login Google by registered account |
| First time login by Google account but not add any GG account to device (Mobile) | Display Google login screen. Can login successfully after login Google by registered account |
| Next time login: Not expired login token + Registered account is logging Google | Auto login by Registered account |
| Next time login: Not expired login token + Registered account is not logging Google | Auto login by Registered account |
| Next time login: Expired login token + Registered account is logging Google | Can not auto login. Display login page. Can login successfully with Registered account |
| Next time login: Expired login token + Registered account is not logging Google | Can not auto login. Display login page. Can login successfully with Registered account |
| Next time login after clear Cookies of browser | Can not auto login. Display login page. Can login successfully with Registered account |
| Next time login after Logout | Can not auto login. Display login page. Can login successfully with Registered account |
| Next time login on another Web browser | Can not auto login. Display login page. Can login successfully with Registered account |

### 3. Other Cases

| Viewpoint | Expected Result |
|-----------|----------------|
| Login on multi devices | Can login/can not login based on spec |
| Log in multi accounts on 1 device | Can login/can not login based on spec |
| Login by special account: Deleted/Inactive/Block account | Can not login by this account. Display corresponding error message |
