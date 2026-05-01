import jwt
from flask import request, jsonify

SECRET = "secretkey"

def admin_required(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"message": "Token missing"}), 401

        try:
            data = jwt.decode(token, SECRET, algorithms=["HS256"])

            if data["role"] != "admin":
                return jsonify({"message": "Admin only"}), 403

        except:
            return jsonify({"message": "Invalid token"}), 401

        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    return wrapper