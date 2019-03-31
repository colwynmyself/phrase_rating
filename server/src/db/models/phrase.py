from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.types import INTEGER, TEXT

from src.db.models.base import Base


class Phrase(Base):
    __tablename__ = "phrases"

    id = Column(INTEGER, primary_key=True)
    phrase = Column(TEXT, nullable=False)
