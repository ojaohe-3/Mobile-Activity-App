CREATE TABLE Org(
    oid INTEGER PRIMARY KEY,
    name Text NOT NULL
);

CREATE TABLE Profiles(
    uid INTEGER PRIMARY KEY,
    name Text NOT NULL,
    oid INTEGER,
    FOREIGN KEY (oid) 
        REFERENCES Org (oid)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

CREATE TABLE GameSessions(
    sid INTEGER PRIMARY KEY,
    oid INTEGER,
    body TEXT NOT NULL,
    flag INT2 NOT NULL,
    FOREIGN KEY (oid) 
        REFERENCES Org (oid)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

CREATE TABLE Session_Profiles(
    sid INTEGER,
    pid INTEGER,
    PRIMARY KEY (sid, pid),
    FOREIGN KEY (sid) 
        REFERENCES GameSessions (sid) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION,
    FOREIGN KEY (pid) 
        REFERENCES Profiles (pid) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
);

INSERT INTO Org (name) VALUES ('Unassigned');
