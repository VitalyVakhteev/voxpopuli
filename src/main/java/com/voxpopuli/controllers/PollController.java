package com.voxpopuli.controllers;

import com.voxpopuli.services.PollService;
import com.voxpopuli.voxpopuli.Comment;
import com.voxpopuli.voxpopuli.Option;
import com.voxpopuli.voxpopuli.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;

    @Autowired
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping
    public ResponseEntity<List<Poll>> getAllPolls() {
        List<Poll> polls = pollService.getAllPolls();
        return ResponseEntity.ok(polls);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable Long id) {
        Poll poll = pollService.getPollById(id);
        return ResponseEntity.ok(poll);
    }

    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody Poll poll) {
        Poll newPoll = pollService.savePoll(poll);
        return ResponseEntity.ok(newPoll);
    }

    @PostMapping("/{pollId}/options")
    public ResponseEntity<Option> addOptionToPoll(@PathVariable Long pollId, @RequestBody Option option) {
        Option newOption = pollService.addOptionToPoll(pollId, option);
        return ResponseEntity.ok(newOption);
    }

    @PostMapping("/options/{optionId}/vote")
    public ResponseEntity<Option> vote(@PathVariable Long optionId, @RequestParam String username) {
        Option updatedOption = pollService.vote(optionId, username);
        return ResponseEntity.ok(updatedOption);
    }

    @GetMapping("/{pollId}/comments")
    public ResponseEntity<List<Comment>> getCommentsForPoll(@PathVariable Long pollId) {
        List<Comment> comments = pollService.getCommentsForPoll(pollId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{pollId}/comments")
    public ResponseEntity<Comment> addCommentToPoll(@PathVariable Long pollId, @RequestBody Comment comment) {
        Comment newComment = pollService.addCommentToPoll(pollId, comment);
        return ResponseEntity.ok(newComment);
    }
}
