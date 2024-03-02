CREATE TABLE poll (
                      id BIGSERIAL PRIMARY KEY,
                      name VARCHAR(255),
                      description TEXT,
                      start_time TIMESTAMP,
                      end_time TIMESTAMP
);

CREATE TABLE option (
                        id BIGSERIAL PRIMARY KEY,
                        description TEXT,
                        votes INT,
                        poll_id BIGINT,
                        FOREIGN KEY (poll_id) REFERENCES poll (id)
);