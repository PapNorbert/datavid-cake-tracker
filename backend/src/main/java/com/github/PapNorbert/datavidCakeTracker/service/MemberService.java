package com.github.PapNorbert.datavidCakeTracker.service;

import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberCreationDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.mapper.MemberMapper;
import com.github.PapNorbert.datavidCakeTracker.model.Member;
import com.github.PapNorbert.datavidCakeTracker.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public CreatedObjectDto createMember(MemberCreationDto memberCreationDto) {

        Member savedMember = memberRepository.saveAndFlush(
                memberMapper.creationDtoToMember(memberCreationDto)
        );
        return new CreatedObjectDto(savedMember.getId());
    }
}
