package com.voxpopuli.services;

import com.voxpopuli.exceptions.DuplicateVoteException;
import com.voxpopuli.exceptions.VotingClosedException;
import com.voxpopuli.repositories.CommentRepository;
import com.voxpopuli.repositories.OptionRepository;
import com.voxpopuli.repositories.PollRepository;
import com.voxpopuli.voxpopuli.Comment;
import com.voxpopuli.voxpopuli.Option;
import com.voxpopuli.voxpopuli.Poll;
import com.voxpopuli.voxpopuli.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    public PollService(PollRepository pollRepository, OptionRepository optionRepository) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
    }

    public Page<Poll> getAllPolls(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pollRepository.findAll(pageable);
    }

    public Poll getPollById(Long id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Poll not found with id: " + id));
    }

    public List<Comment> getCommentsForPoll(Long pollId) {
        return commentRepository.findAllByPollId(pollId);
    }

    @Transactional
    public Poll savePoll(Poll poll) {
        poll.getOptions().forEach(option -> option.setPoll(poll));
        return pollRepository.save(poll);
    }

    @Transactional
    public Option addOptionToPoll(Long pollId, Option option) {
        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Poll not found"));
        poll.addOption(option);
        pollRepository.save(poll);
        return option;
    }

    @Transactional
    public Option vote(Long optionId, String username) {
        Option option = optionRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Option not found"));
        Poll poll = option.getPoll();
        if (LocalDateTime.now().isAfter(poll.getEndTime())) {
            throw new VotingClosedException("Voting is closed for this poll.");
        }
        boolean hasVoted = poll.getOptions().stream()
                .flatMap(opt -> opt.getVotes().stream())
                .anyMatch(vote -> vote.getUsername().equals(username) && vote.getOption().getPoll().getId().equals(poll.getId()));

        if (hasVoted) {
            throw new DuplicateVoteException("User has already voted in this poll.");
        }

        Vote vote = new Vote(option, username);
        option.getVotes().add(vote);
        return optionRepository.save(option);
    }

    @Transactional
    public Comment addCommentToPoll(Long pollId, Comment comment) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));
        comment.setPoll(poll);
        return commentRepository.save(comment);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void deleteExpiredPolls() {
        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        List<Poll> expiredPolls = pollRepository.findAllByEndTimeBefore(oneDayAgo);
        pollRepository.deleteAll(expiredPolls);
    }
}
