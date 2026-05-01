from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"   # ✅ good practice

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default="member")

    # relationship
    projects = db.relationship("Project", backref="creator", lazy=True)


class Project(db.Model):
    __tablename__ = "projects"   # ✅ good practice

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))

    # 🔥 Foreign key (IMPORTANT)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))

    status = db.Column(db.String(20), default="todo")  
    # todo / inprogress / done

    deadline = db.Column(db.DateTime)

    # 🔗 Relationships
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    assigned_to = db.Column(db.Integer, db.ForeignKey("users.id"))

    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())