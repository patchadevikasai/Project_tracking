from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///projects.db')  # Using environment variable for database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(20), default='Available')  # Available, Accepted, Completed

    def __repr__(self):
        return f'<Project {self.title}>'

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, nullable=False)  # Assuming a candidate model exists
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    status = db.Column(db.String(20), default='Not Started')  # Not Started, In Progress, Completed
    score = db.Column(db.Integer, default=0)  # Score for the candidate based on task completion

    project = db.relationship('Project', backref=db.backref('progress', lazy=True))

    def __repr__(self):
        return f'<Progress {self.candidate_id} - {self.project_id}>'

# Routes
@app.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        return jsonify([{
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'status': project.status
        } for project in projects]), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching projects', 'error': str(e)}), 500

@app.route('/progress/<int:candidate_id>', methods=['GET'])
def get_progress(candidate_id):
    try:
        progress = Progress.query.filter_by(candidate_id=candidate_id).all()
        return jsonify([{
            'project_id': p.project_id,
            'status': p.status,
            'score': p.score
        } for p in progress]), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching progress', 'error': str(e)}), 500

@app.route('/update_progress/<int:candidate_id>/<int:project_id>', methods=['PUT'])
def update_progress(candidate_id, project_id):
    try:
        progress = Progress.query.filter_by(candidate_id=candidate_id, project_id=project_id).first()
        if progress:
            progress.status = request.json.get('status', progress.status)
            progress.score = request.json.get('score', progress.score)
            db.session.commit()
            return jsonify({'message': 'Progress updated successfully!'}), 200
        else:
            return jsonify({'message': 'Progress not found!'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating progress', 'error': str(e)}), 500

@app.route('/calculate_score/<int:candidate_id>', methods=['GET'])
def calculate_score(candidate_id):
    try:
        progress = Progress.query.filter_by(candidate_id=candidate_id).all()
        total_score = sum([p.score for p in progress])
        return jsonify({'candidate_id': candidate_id, 'total_score': total_score}), 200
    except Exception as e:
        return jsonify({'message': 'Error calculating score', 'error': str(e)}), 500

# Add sample data and create tables manually when needed
def create_tables():
    try:
        db.create_all()

        # Add sample projects if the table is empty
        if Project.query.count() == 0:
            project1 = Project(title="Project 1", description="Description of Project 1", status="Available")
            project2 = Project(title="Project 2", description="Description of Project 2", status="Available")
            project3 = Project(title="Project 3", description="Description of Project 3", status="Available")
            
            db.session.add(project1)
            db.session.add(project2)
            db.session.add(project3)
            db.session.commit()

        # Add sample progress if the table is empty
        if Progress.query.count() == 0:
            progress1 = Progress(candidate_id=1, project_id=1, status="In Progress", score=50)
            progress2 = Progress(candidate_id=1, project_id=2, status="Not Started", score=0)
            progress3 = Progress(candidate_id=2, project_id=1, status="Completed", score=100)
            
            db.session.add(progress1)
            db.session.add(progress2)
            db.session.add(progress3)
            db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error creating tables and adding sample data: {e}")

if __name__ == '__main__':
    # Manually create tables before starting the app
    with app.app_context():
        create_tables()

    app.run(debug=True)
