from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from src.db.config import DbConfig


def _generate_connection_string(env):
    config = DbConfig(env)
    return "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
        config.db_user, config.db_pass, config.db_host, config.db_port, config.db_name
    )


class Db:
    def __init__(self, env="development"):
        self._engine = create_engine(
            _generate_connection_string(env), pool_pre_ping=True
        )
        self._sessionmaker = sessionmaker(bind=self._engine, autoflush=True)

    def create_session(self):
        return self._sessionmaker()
