from flask import Blueprint, request, jsonify
from models import db, Project
from utils.auth_middleware import admin_required

project_bp = Blueprint("project", __name__)

# CREATE PROJECT
@project_bp.route("/projects", methods=["POST"])
@admin_required
# @project_bp.route("/projects", methods=["POST"])
def create_project():
    try:
        data = request.json
        print("DATA RECEIVED:", data)

        project = Project(
            name=data.get("name"),
            description=data.get("description", ""),
            created_by=data.get("created_by", 1)
        )

        db.session.add(project)
        db.session.commit()

        return jsonify({"message": "Project created"})
    
    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

# GET ALL PROJECTS
@project_bp.route("/projects", methods=["GET"])
def get_projects():
    projects = Project.query.all()

    result = []
    for p in projects:
        result.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "created_by": p.created_by
        })

    return jsonify(result)