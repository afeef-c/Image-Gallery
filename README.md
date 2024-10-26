# Image Upload and Management Application

This application allows users to upload, title, and reorder images using a React frontend with Redux for state management and a Django API backend. It supports features like image title and order customization and handles file uploads through an interactive UI.

## Features

- **Multiple Image Uploads**: Upload multiple images at once with customizable titles and display order.
- **Order Customization**: Set the display order of each uploaded image.
- **Title Assignment**: Assign a title to each image (defaults to the file name).
- **Image Preview & Editing**: Preview uploaded images with options to edit their titles and order before final upload.
- **API Integration**: Uses Django REST framework for backend API interactions.
- **Error Handling**: Handles errors, such as validation or upload issues, with user feedback.

## Technologies Used

### Frontend

- **React**: Built with React for dynamic, responsive UI.
- **Redux**: Manages state for image uploads and titles.
- **React Hook Form**: Manages form data and validations.
- **Axios**: Handles HTTP requests to the backend API.
- **React Toastify**: Displays success and error messages.
- **Tailwind CSS**: Provides responsive and modern styling.

### Backend

- **Django & Django REST Framework**: Handles image data and file uploads.
- **JWT Authentication**: Secures API endpoints.

## Setup and Installation

### Prerequisites

- **Node.js** (for the frontend)
- **Python 3 & Django** (for the backend)
- **Git** (for version control)

### Clone the Repository

```bash
git clone https://github.com/afeef-c/Image-Gallery.git
cd image-upload-app
