package com.voxpopuli.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class VotingClosedException extends RuntimeException {
    public VotingClosedException(String message) {
        super(message);
    }
}