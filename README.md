# 📱 Secret Calculator Vault (Frontend)

Welcome to the **Secret Calculator Vault**! This is a state-of-the-art stealth application built with React Native and Expo. It masterfully disguises itself as a fully functional calculator while hiding a premium, encrypted vault for your private media and documents behind a secret PIN.

---

## 🎯 GOALS
- **Stealth First**: Look and feel like a real calculator.
- **Premium UX**: High-end glassmorphism and neon-glow interface.
- **Secure Access**: Instant vault reveal only with your unique PIN.
- **Cloud Powered**: Seamless connection to your secure backend API.

---

## 🏗️ TECH STACK
- **Language**: JavaScript (ES6+)
- **Runtime**: React Native (Expo SDK 54+)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State**: React Context API (Global Auth & Media)
- **Networking**: Axios (Backend API Integration)
- **Storage**: AsyncStorage (Local Session Management)
- **UI Effects**: Expo Blur, Linear Gradient, Lucide Icons
- **Media**: Expo Image Picker (Secure Photo/Video selection)

---

## 📂 FOLDER STRUCTURE
```text
frontend/
├── context/      # GLOBAL BRAIN: Manages authentication & media fetching
├── screens/      # PAGES: Every UI screen (Calculator, Setup, Vault)
├── assets/       # MEDIA: Local icons and images
├── .env          # CONFIG: Backend URL setup (Invisible on GitHub)
├── App.js        # ENTRY: Root navigation system & global providers
└── package.json  # LIST: Dependencies and version list
```

---

## ⚙️ INSTALLATION GUIDE

### 1. Clone the repository
```bash
git clone https://github.com/Sibi-2006/Calculator-app.git
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables (`.env`)
Create a file named `.env` in the root of the `frontend` folder and add:

```env
EXPO_PUBLIC_API_URL=https://calculator-backend-kncu.onrender.com
```

> [!TIP]
> This connects your mobile app to the live backend. You can replace this with your local IP if testing during development.

### 4. Run the app
```bash
# Start the Expo server
npx expo start
```

- **Android/iOS**: Scan the QR code using the **Expo Go** app from your store.
- **Emulator**: Press `a` (Android) or `i` (iOS) to launch on your computer.

---

## 🔐 CORE CONCEPT

### 🧮 Stealth Mode (The Cover)
- Default state of the app.
- Behaves like a real calculator (Math functions work!).
- No branding or navigation hints to avoid suspicion.

### 🔓 Vault Mode (The System)
- Unblocks only after typing your PIN and pressing **`=`**.
- Reveals a high-end, dark-themed vault with tabs for:
  - **Photos**: Secret grid of encrypted images.
  - **Videos**: Private video library and player.
  - **Files**: Secure document storage.
  - **Settings**: Complete control over your vault security.

---

## 📱 SCREENS OVERVIEW
- **SetupScreen**: Professional onboarding to create your first Vault and PIN.
- **CalculatorScreen**: Your secret gateway and primary disguise.
- **PhotoGallery**: Beautiful grid view of items with cloud sync.
- **VideoGallery**: Clean interface for managing private video clips.
- **FileManager**: Organized list of your protected documents and archives.
- **VaultSettings**: Advanced tools to update PIN or wipe the entire vault.

---

## 🎨 DESIGN SYSTEM (Neon Abyss)
The vault uses the **Neon Abyss** design system:
- **Primary Base**: `#060e20` (Midnight darkness)
- **Glow Accents**: Neon Cyan (`#00f2ff`) and Electric Purple (`#4d21e8`)
- **Depth**: Layers of glassmorphism (frosted blur) instead of borders for a modern, fluid feel.

---

## 🔗 BACKEND CONNECTION
This app relies on a secure REST API hosted on Render:
- **Live URL**: [https://calculator-backend-kncu.onrender.com](https://calculator-backend-kncu.onrender.com)
- **Auth**: Every request uses a **Bearer Token** (JWT) stored safely in the app.
- **Metadata**: Files are managed via MongoDB, with blobs hosted on Cloudinary for reliability.

---

## ⚠️ IMPORTANT NOTES
- **Connection Required**: The backend must be live for the vault to sync files.
- **Security**: Never share your `.env` settings or local PIN.
- **Expo Go**: Ensure your mobile device is on the same network if using a local backend.

---

## 🚀 FUTURE IMPROVEMENTS
- **Biometric API**: Native Fingerprint and FaceID support.
- **Local Cache**: Offline access to small files using LruCache.
- **Encryption+**: Client-side AES encryption for extreme privacy.
- **Dynamic Icons**: Change the calculator icon to other generic apps like "Notes" or "Converter".

---

## 📜 LICENSE
Distributed under the **MIT License**. Check the license file for legal details.
