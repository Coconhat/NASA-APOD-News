# NASA APOD News App

This is a React-based web application that displays NASA's Astronomy Picture of the Day (APOD) along with its description. The app shows news from the past 15 days and stores the fetched data in localStorage for faster loading and offline access.

## Features

- **Displays NASA's Astronomy Picture of the Day (APOD)**: The app fetches and displays the latest picture or video from NASA's daily astronomy feed.
- **Shows Past 15 Days of APOD**: It loads and displays data for the past 15 days, ensuring that the user can view past content.
- **Efficient Caching**: News data is stored in `localStorage`, so users don't need to re-fetch the data each time, enhancing app performance.
- **Modal View**: Users can click on a news item to view the image in full-screen and read the detailed description.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Coconhat/NASA-APOD-News/

2. Navigate into the project directory:
   cd nasa-apod-news

3. Install the required dependencies:
   npm install

4. Create a .env file in the root of your project and add your NASA API key:
   NASA_API_KEY=your_nasa_api_key

5. Run the app locally: :>
   npm start







