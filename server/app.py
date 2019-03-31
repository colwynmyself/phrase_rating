import os
from typing import List

from flask import Flask, jsonify, request, Response

from src.classes.phrase import Phrase
from src.db.connection import Db
from src.db import models

PORT = os.environ.get("PORT", 9200)
ENV = os.environ.get("APP_ENV", "development")
DEBUG = os.environ.get("DEBUG", False)

app = Flask(__name__)
db = Db(ENV)


def calculate_phrase(phrase: models.Phrase, session):
    votes: List[models.Vote] = session.query(models.Vote).filter(models.Vote.phrase_id == phrase.id).all()
    humor = 0
    severity = 0
    importance = 0

    for vote in votes:
        humor += vote.humor
        severity += vote.severity
        importance += vote.importance

    humor = humor / max(len(votes), 1)
    severity = severity / max(len(votes), 1)
    importance = importance / max(len(votes), 1)

    return Phrase(name=phrase.phrase, humor=humor, severity=severity, importance=importance)


@app.route("/phrases", methods=["GET"])
def get_phrases():
    session = db.create_session()

    phrases = [calculate_phrase(p, session) for p in session.query(models.Phrase)]

    session.close()
    response = {"phrases": [p.serialize() for p in phrases]}
    return jsonify(response)


@app.route("/phrases", methods=["POST"])
def create_phrase():
    data = request.get_json()
    phrase_name = data.get('phrase')

    if not phrase_name:
        return Response(response={"error": "phrase is a required field"}, status=400)

    session = db.create_session()

    phrase: models.Phrase = session.query(models.Phrase).filter(models.Phrase.phrase == phrase_name).one_or_none()

    if not phrase:
        phrase: models.Phrase = models.Phrase(phrase=phrase_name)
        session.add(phrase)
        session.commit()

    phrase_id = phrase.id

    session.close()

    return jsonify({"phrase.id": phrase_id})

@app.route("/phrases/vote", methods=["POST"])
def vote_on_phrase():
    data = request.get_json()

    phrase_id = data.get('phrase_id')
    humor = data.get('humor')
    severity = data.get('severity')
    importance = data.get('importance')

    if not (phrase_id and humor and severity and importance):
        return Response(response={"error": "phrase_id, humor, severity, and importance are required fields"}, status=400)

    session = db.create_session()

    vote: models.Vote = models.Vote(
        phrase_id=phrase_id,
        humor=humor,
        severity=severity,
        importance=importance,
    )
    session.add(vote)
    session.commit()

    vote_id = vote.id

    session.close()

    return jsonify({"vote.id": vote_id})


if __name__ == "__main__":
    app.run(port=PORT, debug=DEBUG)
