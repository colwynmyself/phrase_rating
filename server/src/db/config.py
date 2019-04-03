import yaml
from os.path import abspath, join, dirname
from io import open

CONFIG_FILE = abspath(join(dirname(__file__), "..", "..", "config", "database.yml"))


class DbConfig:
    def __init__(self, env):
        self._env = env

        db_config = self._get_db_config()
        self.db_user = db_config.get("user")
        self.db_pass = db_config.get("pass")
        self.db_name = db_config.get("name")
        self.db_host = db_config.get("host")
        self.db_port = db_config.get("port")

    def _get_db_config(self):
        with open(CONFIG_FILE, "r") as f:
            all_configs = yaml.safe_load(f)
            return all_configs.get(self._env)
