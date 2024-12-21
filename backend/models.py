from app import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    status = db.Column(db.String(20), default="Pending")  # Status: Pending, Accepted, In Progress, Completed

    def __init__(self, title, description):
        self.title = title
        self.description = description

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status
        }
