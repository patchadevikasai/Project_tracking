import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  
  // Fetch all projects
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/projects')
      .then(response => {
        console.log('Fetched projects:', response.data); // Debugging
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  // Handle accepting a project
  const handleAccept = (id) => {
    axios.put(`http://127.0.0.1:5000/accept_project/${id}`)
      .then(response => {
        console.log('API Response:', response.data); // Debugging
        alert(response.data.message);

        setProjects(prevProjects =>
          prevProjects.map(project =>
            project.id === id ? { ...project, status: 'Accepted' } : project
          )
        );
      })
      .catch(error => {
        console.error('There was an error accepting the project!', error);
      });
  };

  return (
    <div>
      <h1>Available Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            {project.status === 'Available' && (
              <button onClick={() => handleAccept(project.id)}>Accept Project</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
