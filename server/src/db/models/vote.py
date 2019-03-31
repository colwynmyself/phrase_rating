from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.types import INTEGER, REAL

from src.db.models.base import Base


class Vote(Base):
    __tablename__ = "votes"

    id = Column(INTEGER, primary_key=True)
    humor = Column(REAL, nullable=False)
    severity = Column(REAL, nullable=False)
    importance = Column(REAL, nullable=False)
    phrase_id = Column(INTEGER, ForeignKey("phrases.id"), nullable=False)
