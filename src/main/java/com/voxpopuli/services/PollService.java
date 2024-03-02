package com.voxpopuli.services;

import com.voxpopuli.repositories.OptionRepository;
import com.voxpopuli.repositories.PollRepository;
import com.voxpopuli.voxpopuli.Option;
import com.voxpopuli.voxpopuli.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final OptionRepository optionRepository;

    @Autowired
    public PollService(PollRepository pollRepository, OptionRepository optionRepository) {
        this.pollRepository = pollRepository;
        this.optionRepository = optionRepository;
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Poll getPollById(Long id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Poll not found with id: " + id));
    }

    public Poll savePoll(Poll poll) {
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
    public Option vote(Long optionId) {
        Option option = optionRepository.findById(optionId).orElseThrow(() -> new RuntimeException("Option not found"));
        option.setVotes(option.getVotes() + 1);
        return optionRepository.save(option);
    }
}
