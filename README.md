# SyncSpace — Multi-Tab Settings Synchronization

SyncSpace is a responsive settings application that synchronizes user preferences across multiple browser tabs in real time. It allows users to change their theme, language, and font size while keeping preferences consistent across tabs and browser sessions.

## Features

* **Dark Mode:** Switch between light and dark themes.
* **Language Selection:** Choose from English, Tamil, Hindi, French, and Spanish.
* **Adjustable Font Size:** Customize text size from 12px to 28px.
* **Real-Time Synchronization:** Updates are shared between open tabs using the Broadcast Channel API.
* **Persistent Settings:** Preferences are saved in localStorage and restored when the application is reopened.
* **Conflict Resolution:** Each setting has a logical version counter and tab identifier to determine which update takes precedence.
* **Responsive Interface:** A clean interface designed for different screen sizes.

## Tech Stack

* React
* TypeScript
* Vite
* HTML and CSS
* Broadcast Channel API
* localStorage API

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/multi-tab-settings.git
```

Navigate into the project directory:

```bash
cd multi-tab-settings
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Technical Approach

SyncSpace stores each setting with its value and version metadata. When a user changes a preference, the application updates its state, saves the settings to localStorage, and broadcasts the update to other open tabs.

The Broadcast Channel API enables communication between same-origin tabs without requiring a page refresh. The storage event provides an additional mechanism for receiving changes when localStorage is updated by another tab.

When updates arrive, the application merges settings individually using their version counters. If two versions have the same counter, the tab identifier provides a deterministic tie-breaker. This helps tabs converge on the same setting values.

The application reads saved preferences during initialization so previously selected settings can be restored when it is reopened.

## Testing Checklist

* [ ] Theme changes synchronize across tabs.
* [ ] Language changes synchronize across tabs.
* [ ] Font-size changes synchronize across tabs.
* [ ] Preferences persist after refreshing.
* [ ] Preferences persist after closing and reopening the application.
* [ ] Multiple tabs converge after concurrent updates.
* [ ] Production build completes successfully.

## Future Improvements

* Add automated tests for synchronization and conflict resolution.
* Improve initialization to prevent any initial theme flash.
* Deploy the application so it can be accessed online.

## Author

Developed as a multi-tab settings synchronization project.
