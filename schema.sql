CREATE SEQUENCE phrase_id_seq;
CREATE TABLE phrases(
   id INT PRIMARY KEY NOT NULL DEFAULT nextval('phrase_id_seq'),
   phrase TEXT NOT NULL
);
ALTER SEQUENCE phrase_id_seq OWNED BY phrases.id;

CREATE SEQUENCE vote_id_seq;
CREATE TABLE votes(
   id INT PRIMARY KEY NOT NULL DEFAULT nextval('vote_id_seq'),
   humor REAL NOT NULL,
   severity REAL NOT NULL,
   importance REAL NOT NULL,
   phrase_id INT REFERENCES phrases(id) NOT NULL
);
ALTER SEQUENCE vote_id_seq OWNED BY votes.id;
