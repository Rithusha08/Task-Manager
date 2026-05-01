
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from routes.auth_routes import auth_bp
# from routes.project_routes import project_bp


# app = Flask(__name__)
# # 🚨 Hardcode directly (no config.py, no dotenv)
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:pMKnOQINkBrJFEAuMPPuRQidnJGGzOsQ@switchyard.proxy.rlwy.net:50649/railway"

# app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
#     "connect_args": {
#         "ssl": {"ssl": {}}
#     }
# }

# db = SQLAlchemy(app)

# print("DB URI INSIDE APP:", app.config.get("SQLALCHEMY_DATABASE_URI"))
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from models import db   # ✅ use SAME db instance
from extensions import bcrypt   # ✅ import from new file
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.project_routes import project_bp
from routes.task_routes import task_bp
from flask_cors import CORS

app = Flask(__name__)


CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# 🔧 DB Config
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:pMKnOQINkBrJFEAuMPPuRQidnJGGzOsQ@switchyard.proxy.rlwy.net:50649/railway"

app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "connect_args": {
        "ssl": {"ssl": {}}
    }
}

# ✅ Initialize DB correctly
db.init_app(app)



print("DB URI:", app.config.get("SQLALCHEMY_DATABASE_URI"))

# 🔧 Register routes
app.register_blueprint(auth_bp)
app.register_blueprint(project_bp)
app.register_blueprint(task_bp)





CORS(app, resources={r"/*": {"origins": "*"}})
if __name__ == "__main__":
    app.run(debug=True)