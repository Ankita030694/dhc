# Authentication & Dashboard Setup

## 🔐 Overview

A complete authentication and dashboard system has been implemented for managing contact form submissions.

## 📋 Features Implemented

### 1. **Login Page** (`/login`)
- Firebase Authentication with email/password
- User-friendly error messages
- Loading states
- Mobile responsive design
- Secure authentication flow

### 2. **Dashboard Page** (`/dashboard`)
- Protected route (requires authentication)
- View all form submissions
- Real-time statistics:
  - Total submissions
  - Last 24 hours
  - This week
- Individual submission cards with:
  - Name, email, phone
  - Message preview
  - Timestamp
- Click to view full details in modal
- Delete submissions functionality
- Refresh button to reload data
- Logout functionality

### 3. **Contact Form Integration**
- Saves to Firestore collection `"form"`
- Data structure:
  ```javascript
  {
    name: string,
    email: string,
    phone: string,
    message: string,
    timestamp: serverTimestamp()
  }
  ```

## 🚀 Setup Instructions

### Step 1: Create Firebase User (Admin Account)

You need to create an admin user in Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `delhihousecafe-94aea`
3. Navigate to **Authentication** → **Users** tab
4. Click **Add User**
5. Enter:
   - **Email**: Your admin email (e.g., `admin@delhihousecafe.co.uk`)
   - **Password**: Strong password (min 6 characters)
6. Click **Add User**

### Step 2: Set Firestore Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to form collection (for contact form)
    match /form/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Update Authentication Settings (Optional)

1. Go to **Authentication** → **Settings**
2. Under **Authorized domains**, ensure your domain is added
3. Enable **Email/Password** sign-in method if not already enabled

## 📱 Usage

### Login
1. Navigate to `/login`
2. Enter admin email and password
3. Click **Login**
4. Upon success, you'll be redirected to `/dashboard`

### Dashboard
1. View all form submissions
2. Click on any card to view full details
3. Use the **Delete** button to remove submissions
4. Click **Refresh** to reload latest data
5. Click **Logout** to sign out

### Security
- Dashboard is protected - redirects to login if not authenticated
- Authentication state persists across page refreshes
- Firestore rules prevent unauthorized access

## 🎨 Design Features

- Consistent branding with existing site design
- FontAwesome icons throughout
- Smooth animations with Framer Motion
- Fully mobile responsive
- Glass morphism effects
- Dark theme matching the site

## 📊 Data Collection

All contact form submissions are automatically saved to Firestore with:
- User information (name, email, phone)
- Message content
- Timestamp (server-generated)

## 🔒 Security Best Practices

1. **Never commit Firebase credentials** to version control
2. Keep admin passwords secure
3. Use environment variables for sensitive data in production
4. Regularly review Firestore security rules
5. Monitor authentication activity in Firebase Console

## 📝 Admin Credentials

**Important**: Create your admin account in Firebase Console as described in Step 1.

Recommended email format:
- `admin@delhihousecafe.co.uk`
- Or any email you prefer

## 🌐 Routes

- `/login` - Admin login page
- `/dashboard` - View and manage form submissions
- `/contact` - Public contact form (saves to Firestore)

## 💡 Tips

1. **Test the flow**: Submit a test form at `/contact` to see it appear in the dashboard
2. **Bookmark dashboard**: Add `/dashboard` to your bookmarks for quick access
3. **Mobile access**: The dashboard works perfectly on mobile devices
4. **Data backup**: Regularly export data from Firestore for backups

## 🆘 Troubleshooting

### "Invalid email or password"
- Double-check credentials
- Ensure user is created in Firebase Console
- Check caps lock is off

### "Failed to login"
- Check internet connection
- Verify Firebase project settings
- Check browser console for errors

### Submissions not showing
- Click the **Refresh** button
- Check Firestore rules are set correctly
- Verify data exists in Firestore Console

## 🎯 Next Steps

1. Create your admin account in Firebase
2. Update Firestore rules
3. Test login with your credentials
4. Submit a test form and verify it appears in dashboard
5. Familiarize yourself with the dashboard features

---

For additional support, check the Firebase Console or contact your developer.

