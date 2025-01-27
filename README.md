# GitHub Explorer

This is a React Native app that integrates with the GitHub API to allow users to explore repositories, with features like infinite scrolling, dark mode, and core navigation.

## Features

-   GitHub API Integration
-   Infinite Scrolling
-   Dark Mode
-   Repository Details
-   Search Functionality

## Design Choices and Implementation Overview

### 1. API Integration:
To fetch repository data, I used the GitHub REST API's search endpoint:
GitHub Search Repositories API (https://api.github.com/search/repositories?q={query}).
I handled the fetching process asynchronously using `fetch()` to ensure smooth UI performance.

- API Request: I send a GET request with the search query entered by the user.
- Data Parsing: The received JSON data is parsed and displayed in the app.

### 2. Search Functionality:
The app allows users to search for repositories by name. Upon submitting the search query, it fetches the data from GitHub using the aforementioned API.

- Pagination: Infinite scrolling is implemented using React Native’s FlatList component, where new data is loaded as the user scrolls to the bottom of the list.


### 3. Repository Details:
Each repository’s details are displayed in a separate view with the following information:
- Repository name
- Description
- Number of stars, forks, and programming language
- Owner's username and avatar
- List of Contributors: The app fetches and displays the list of contributors for the repository using the GitHub API's contributors endpoint.



### 4. Favorites:
Users can mark repositories as favorites by clicking a heart icon. Favorited repositories are displayed in a separate screen, which can be accessed via the navigation bar.

### 5. State Management:
The app uses React Context API for state management to handle the favorites and dark mode settings.

### 6. Error Handling:
I used try/catch blocks to handle API request errors. If the app detects no internet connection or no repositories found, appropriate messages are displayed to the user.

### 7. Bonus Features:
- **Infinite Scrolling**: Implemented using FlatList with an event listener for scroll position.
- **Dark Mode**: Users can toggle between dark and light modes using React Native’s `getColorScheme` hook.


## Prerequisites

Before you begin, make sure you have the following installed on your system:

-   **Node.js**: [Download Node.js](https://nodejs.org/)
-   **npm** (comes with Node.js) or **yarn**: [Install Yarn](https://yarnpkg.com/)
-   **React Native CLI**: [Installation Guide](https://reactnative.dev/docs/environment-setup)
-   **Git**: [Install Git](https://git-scm.com/)
-   **Expo Go App** (if you're using Expo) installed on your mobile device: [Expo Go](https://expo.dev/client)

----------

## Setup Instructions

**For Android Devices:-** Download the apk file from Releases or [Download from here](https://github.com/VinayakHinduja/Saasaki-Technologies-assessment-Github-Explorer/releases/download/Release/Github.Explorer.apk).

Follow these steps to set up and run the app locally:

1.  **Clone the Repository**  
    Open your terminal and run:
    
    ```bash
    git clone https://github.com/VinayakHinduja/Saasaki-Technologies-assessment-Github-Explorer.git
    ```
    
2.  **Navigate to the Project Directory**
    
    ```bash
    cd Saasaki-Technologies-assessment-Github-Explorer
    ```
    
3.  **Install Dependencies**  
    Run the following command to install all required dependencies:
    
    ```bash
    npm install
    ```
    
    Or, if you're using Yarn:
    
    ```bash
    yarn install
    ```
    
4.  **Start the Development Server**
    
    -   If you're using Expo:
        
        ```bash
        npm start
        ```
        
        Or:
        
        ```bash
        yarn start
        ```
        
5.  **Run the App**
    
    -   For Android:
        
        ```bash
        npx react-native run-android
        ```
        
    -   For iOS:
        
        ```bash
        npx react-native run-ios
        ```        

## API Setup

The app fetches data from the GitHub API. No additional API setup is required, as the base URL is already configured.

----------
Your README is coming along nicely! It’s clear and well-organized. To make it even more helpful, you could consider adding a few additional sections, like:

## Technologies Used

- **React Native**: For building the mobile app
- **GitHub API**: To fetch repositories and user data
- **React Navigation**: For navigation between screens
- **Context API**: For state management
- **Expo**: For easy development and testing


## Folder Structure

The project is organized as follows:

```
src/
├── api/          # Contains API integration files (e.g., fetch logic for GitHub API)
├── assets/       # Stores images, icons, and other static assets
├── components/   # Reusable UI components (e.g., buttons, cards, list items)
├── context/      # Context API files for managing global state (e.g., theme context)
├── screens/      # All the app's screens (e.g., HomeScreen, SearchScreen, etc.)
├── util/         # Utility functions or helpers
.gitignore        # Git ignore file for excluding specific files/directories
App.js            # Root component of the React Native app
app.json          # Configuration for the app (e.g., app name, entry point)
eas.json          # Expo Application Services configuration
index.js          # Entry point for the app
package.json      # Project dependencies and scripts

```

## Troubleshooting

-   **Metro Bundler issues**: Clear cache using:
    
    ```bash
    npm start --reset-cache
    ```
    
-   **Emulator/Simulator not working**: Make sure your device is connected or your emulator is running.


## Contributions

Feel free to fork this repository, create a branch, and submit a pull request for any improvements or bug fixes.
