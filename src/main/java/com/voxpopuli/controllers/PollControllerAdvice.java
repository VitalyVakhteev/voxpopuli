package com.voxpopuli.controllers;

import com.voxpopuli.exceptions.DuplicateVoteException;
import com.voxpopuli.exceptions.VotingClosedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class PollControllerAdvice {

    @ExceptionHandler(VotingClosedException.class)
    public ResponseEntity<Object> handleVotingClosed(VotingClosedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(DuplicateVoteException.class)
    public ResponseEntity<Object> handleDuplicateVote(DuplicateVoteException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }
}
