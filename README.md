# Currency Exchange App

## Overview

The **Currency Exchange App** allows users to view real-time exchange rates, add rates to favorites, and access them offline. The app fetches data from the **Fixer.io API** and stores favorited currencies locally using **AsyncStorage** for offline access.

## Setup Instructions

1. **Install Dependencies**  
   Run the following command:
   `npm install`

2. **Create .env File**

   Create a .env file and add your Fixer.io API key:
   `FIXER_API_KEY=your_fixer_api_key_here`

3. **Run the App**

   For Android:
   `npm run android`

   For IOS:
   `npm run ios`

## Architecture and Design Choices

- State Management: Uses React’s useState, Redux and AsyncStorage for managing state.
- Networking: Fetches exchange rates from the Fixer.io API.
- Offline Mode: Stores favorited currencies and last fetched exchange rates in AsyncStorage for offline access