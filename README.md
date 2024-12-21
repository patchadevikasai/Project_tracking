# Project Management and Progress Tracking System

This project is a comprehensive system for managing project assignments and tracking the progress of candidates. It consists of a **backend** built with Flask and a **frontend** using React.js. The system enables:

1. 🗂️ **Project Assignment**: Allows candidates to view, accept, and track assigned projects.
2. 📈 **Progress Tracking and Scoring**: Dynamically tracks candidate progress and calculates scores based on task completion.

## Features

### Backend
- 🛠️ Built using Flask.
- 🌐 RESTful APIs for managing projects, candidates, and progress data.
- 💾 Database integration for persistent storage (SQLite).

### Frontend
- 🎨 Built using React.js.
- 🖥️ User-friendly interface to view and interact with project details.
- 📊 Dynamic progress tracking and score visualization.

## Prerequisites

Before setting up the project, ensure you have the following installed:
- 🐍 Python
- 🔷 ReactJS
- 📦 npm or yarn
- 🌍 Git

## Installation

### Clone the Repository

```bash
git clone https://github.com/patchadevikasai/Project_tracking.git
cd Project_tracking
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask development server:
   ```bash
   python app.py
   ```

   The backend will be available at `http://127.0.0.1:5000/`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000/`.

## Project Structure

```
Project_tracking/
├── backend/
│   ├── app.py            # Main Flask application
│   ├── models.py         # Database models        
│   ├── requirements.txt  # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js        # Main React component
│   │   ├── index.js      # React entry point
│   ├── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

## Usage

1. 🚀 Start both the backend and frontend servers.
2. 🌐 Access the application at `http://localhost:3000/`.
3. 🖱️ Use the interface to:
   - View and accept assigned projects.
   - Track progress and view scores dynamically.

## Deployment

To deploy the project:

### Backend
1. 🐳 Use a production server like Gunicorn.
2. ☁️ Deploy on platforms like Heroku, AWS, or any other cloud service.

### Frontend
1. 🏗️ Build the React app:
   ```bash
   npm run build
   ```
2. 🌍 Host the built files on platforms like Netlify, Vercel, or S3.

## Contributing

🤝 Contributions are welcome! Feel free to open issues or submit pull requests.

## License

📝 This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

📧 For any questions or feedback, please reach out:
- **Author**: Patcha Devika Sai
- **Email**: devikasai50@gmail.com
