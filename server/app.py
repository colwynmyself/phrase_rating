import os

from flask import Flask, jsonify

from phrase.classes.phrase import Phrase

PORT = os.environ.get("PORT", 8080)
ENV = os.environ.get("APP_ENV", "debug")
DEBUG = ENV == "debug"

app = Flask(__name__)


@app.route("/phrases", methods=["GET"])
def get_phrases():
    phrases = [
        Phrase("clusterfuck", 0.7, 0.8, 0.8),
        Phrase("hot garbage", 0.6, 0.2, 0.3),
        Phrase("hot mess", 0.4, 0.1, 0.1),
        Phrase("shitshow", 0.8, 0.5, 0.6),
    ]
    response = {"phrases": [p.serialize() for p in phrases]}
    return jsonify(response)


if __name__ == "__main__":
    app.run(port=PORT, debug=DEBUG)
