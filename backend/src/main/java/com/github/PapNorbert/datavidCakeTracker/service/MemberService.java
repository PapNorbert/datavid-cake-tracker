package com.github.PapNorbert.datavidCakeTracker.service;

import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberCreationDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.mapper.MemberMapper;
import com.github.PapNorbert.datavidCakeTracker.model.Member;
import com.github.PapNorbert.datavidCakeTracker.repository.MemberRepository;
import com.github.PapNorbert.datavidCakeTracker.service.exception.MemberNotOldEnoughException;
import com.github.PapNorbert.datavidCakeTracker.util.AgeChecker;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Data
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public CreatedObjectDto createMember(MemberCreationDto memberCreationDto) throws MemberNotOldEnoughException {
//        check if user is at least 18 years old, if it is save the new member
        if(! AgeChecker.isEighteenOrOlder(memberCreationDto.getBirthDate())) {
            LOGGER.warn("Member is not old enough.");
            throw new MemberNotOldEnoughException("Member is not old enough.");
        }
        Member savedMember = memberRepository.saveAndFlush(
                memberMapper.creationDtoToMember(memberCreationDto)
        );
        return new CreatedObjectDto(savedMember.getId());
    }
}
