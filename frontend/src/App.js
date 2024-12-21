import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing the CSS file
// Importing the CSS file

function App() {
  const [projects, setProjects] = useState([]);
  const [progress, setProgress] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const candidateId = 1; // Assume candidate ID is 1 for testing

  // Fetch projects and progress from the backend
  useEffect(() => {
    // Fetch all project assignments excluding the ones marked as completed (Project ID 3)
    axios.get('http://127.0.0.1:5000/projects')
      .then(response => {
        const filteredProjects = response.data.filter(project => project.id !== 3);
        setProjects(filteredProjects);
      })
      .catch(error => console.error('Error fetching projects:', error));

    // Fetch candidate progress for each project
    axios.get(`http://127.0.0.1:5000/progress/${candidateId}`)
      .then(response => {
        setProgress(response.data);
        calculateTotalScore(response.data); // Update total score after fetching progress
      })
      .catch(error => console.error('Error fetching progress:', error));
  }, []);

  // Function to handle updating progress and recalculating the total score
  const handleUpdateProgress = (projectId, status, score) => {
    axios
      .put(`http://127.0.0.1:5000/update_progress/${candidateId}/${projectId}`, {
        status,
        score,
      })
      .then(response => {
        alert(response.data.message);

        // Update the progress state to reflect changes
        setProgress(prevProgress => {
          const updatedProgress = prevProgress.map(p =>
            p.project_id === projectId ? { ...p, status, score } : p
          );

          // Recalculate total score after updating progress
          calculateTotalScore(updatedProgress);

          return updatedProgress;
        });
      })
      .catch(error => console.error('Error updating progress:', error));
  };

  // Function to calculate total score dynamically based on the current progress
  const calculateTotalScore = updatedProgress => {
    const total = updatedProgress.reduce((sum, projectProgress) => sum + projectProgress.score, 0);
    setTotalScore(total);
  };

  // Function to get status for each project (either completed, in progress, or not started)
  const getProjectStatus = projectId => {
    const projectProgress = progress.find(p => p.project_id === projectId);
    return projectProgress ? projectProgress.status : 'Not Started'; // Default if no progress found
  };

  return (
    <div className="App">
      <h1>Project Assignment System</h1>
      <h2>Total Score: {totalScore}</h2>
      <ul>
        {projects.map(project => {
          const projectStatus = getProjectStatus(project.id); // Get the status for each project
          const projectProgress = progress.find(p => p.project_id === project.id);
          const score = projectProgress ? projectProgress.score : 0;

          return (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${score}%`,
                    backgroundColor: score === 100 ? '#4caf50' : score >= 50 ? '#ff9800' : '#9e9e9e',
                  }}
                ></div>
              </div>
              <p className={`status ${projectStatus.toLowerCase().replace(' ', '-')}`}>
                Status: {projectStatus}
              </p>
              <p className="score">Score: {score}</p>
              {/* Display buttons to mark project as in-progress or completed */}
              {projectStatus !== 'Completed' && (
                <button onClick={() => handleUpdateProgress(project.id, 'Completed', 100)}>
                  Mark as Completed
                </button>
              )}
              {projectStatus !== 'In Progress' && (
                <button onClick={() => handleUpdateProgress(project.id, 'In Progress', 50)}>
                  Mark as In Progress
                </button>
              )}
              {/* Button to accept the project */}
              {projectStatus === 'Not Started' && (
                <button onClick={() => handleUpdateProgress(project.id, 'In Progress', 50)}>
                  Accept Project
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <footer>
        <p>© 2024 Project Assignment System</p>
      </footer>
    </div>
  );
}

export default App;
