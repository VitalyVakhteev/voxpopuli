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
                        poll_id BIGINT,
                        FOREIGN KEY (poll_id) REFERENCES poll (id)
);

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(255) UNIQUE NOT NULL,
                       hashed_pwd TEXT NOT NULL
);

CREATE TABLE vote (
                      id BIGSERIAL PRIMARY KEY,
                      user_id BIGINT,
                      option_id BIGINT,
                      FOREIGN KEY (user_id) REFERENCES users (id),
                      FOREIGN KEY (option_id) REFERENCES option (id),
                      UNIQUE (user_id, option_id)
);

CREATE TABLE comment (
                         id BIGSERIAL PRIMARY KEY,
                         text TEXT NOT NULL,
                         username VARCHAR(255) NOT NULL,
                         poll_id BIGINT,
                         FOREIGN KEY (poll_id) REFERENCES poll (id)
);
