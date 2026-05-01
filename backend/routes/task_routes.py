from flask import Blueprint, request, jsonify
from models import db, Task

task_bp = Blueprint("task", __name__)

# CREATE TASK
# @task_bp.route("/tasks", methods=["POST"])
# def create_task():
#     data = request.json

#     task = Task(
#         title=data["title"],
#         description=data.get("description", ""),
#         project_id=data["project_id"],
#         assigned_to=data.get("assigned_to"),
#         status="todo"
#     )

#     db.session.add(task)
#     db.session.commit()

#     return jsonify({"message": "Task created"})
@task_bp.route("/tasks", methods=["POST"])
def create_task():
    try:
        data = request.json
        print("TASK DATA:", data)

        task = Task(
            title=data.get("title"),
            description=data.get("description", ""),
            project_id=data.get("project_id"),
            assigned_to=data.get("assigned_to"),
            status="todo"
        )

        db.session.add(task)
        db.session.commit()

        return jsonify({"message": "Task created"})

    except Exception as e:
        print("TASK ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

# GET TASKS BY PROJECT
@task_bp.route("/tasks/<int:project_id>", methods=["GET"])
def get_tasks(project_id):
    tasks = Task.query.filter_by(project_id=project_id).all()

    result = []
    for t in tasks:
        result.append({
            "id": t.id,
            "title": t.title,
            "status": t.status,
            "assigned_to": t.assigned_to
        })

    return jsonify(result)


# UPDATE TASK STATUS
@task_bp.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json

    task = Task.query.get(task_id)
    task.status = data["status"]

    db.session.commit()

    return jsonify({"message": "Task updated"})