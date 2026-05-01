import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("mysql+pymysql://root:pMKnOQINkBrJFEAuMPPuRQidnJGGzOsQ@switchyard.proxy.rlwy.net:50649/railway")

    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "ssl": {"ssl": {}}
        }
    }

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "secretkey"