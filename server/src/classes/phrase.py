class Phrase:
    def __init__(self, name: str, humor: float, importance: float, severity: float):
        self.name = name
        self.humor = humor
        self.importance = importance
        self.severity = severity

    def serialize(self):
        return self.__dict__
