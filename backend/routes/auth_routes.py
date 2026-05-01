from flask import Blueprint, request, jsonify
from models import db, User
from flask_bcrypt import Bcrypt
import jwt
import datetime

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()

SECRET = "secretkey"


# ========================
# 🔥 SIGNUP
# ========================
@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        print("SIGNUP DATA:", data)

        # ✅ Validate input
        if not data.get("name") or not data.get("email") or not data.get("password"):
            return jsonify({"error": "Missing fields"}), 400

        # ✅ Check if user already exists
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # ✅ Hash password
        hashed_pw = bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8")

        # ✅ Create user
        user = User(
            name=data["name"],
            email=data["email"],
            password=hashed_pw,
            role="member"   # default role
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User created successfully"})

    except Exception as e:
        print("SIGNUP ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# ========================
# 🔥 LOGIN
# ========================
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        print("LOGIN DATA:", data)

        user = User.query.filter_by(email=data["email"]).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not bcrypt.check_password_hash(user.password, data["password"]):
            return jsonify({"error": "Invalid password"}), 401

        # ✅ Generate JWT token
        token = jwt.encode({
            "user_id": user.id,
            "role": user.role,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET, algorithm="HS256")

        return jsonify({
            "token": token,
            "role": user.role,
            "user_id": user.id   # 🔥 IMPORTANT
        })

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return jsonify({"error": str(e)}), 500