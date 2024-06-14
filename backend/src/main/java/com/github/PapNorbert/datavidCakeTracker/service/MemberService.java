package com.github.PapNorbert.datavidCakeTracker.service;

import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberIncomingDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.MemberDetailedDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.MembersListWithPaginationDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.Pagination;
import com.github.PapNorbert.datavidCakeTracker.mapper.MemberMapper;
import com.github.PapNorbert.datavidCakeTracker.model.Member;
import com.github.PapNorbert.datavidCakeTracker.repository.MemberRepository;
import com.github.PapNorbert.datavidCakeTracker.repository.jpa.MemberSpecification;
import com.github.PapNorbert.datavidCakeTracker.service.exception.MemberNotOldEnoughException;
import com.github.PapNorbert.datavidCakeTracker.service.exception.NotFoundException;
import com.github.PapNorbert.datavidCakeTracker.service.exception.NotUpdatedException;
import com.github.PapNorbert.datavidCakeTracker.util.AgeChecker;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Data
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public MembersListWithPaginationDto getMembersPaginated(
            int page, int limit, String lastName,
            String firstName, boolean orderByDate
    ) {
        if (orderByDate) {
            PageRequest pageRequest = PageRequest.of(page, limit);
            Page<Member> memberPage = memberRepository.findAllByBirthdayDistance(pageRequest);
            List<MemberDetailedDto> memberDetailedDtos =
                    memberMapper.modelsToDetailedDtos(memberPage.getContent());
            Pagination pagination = new Pagination(page, limit,
                    memberPage.getTotalElements(), memberPage.getTotalPages());
            return new MembersListWithPaginationDto(memberDetailedDtos, pagination);
        } else {
            PageRequest pageRequest = PageRequest.of(page, limit,
                    Sort.by("lastName").and(Sort.by("firstName")));
            Specification<Member> specification = createSpecification(lastName, firstName);
            Page<Member> memberPage = memberRepository.findAll(specification, pageRequest);
            List<MemberDetailedDto> memberDetailedDtos =
                    memberMapper.modelsToDetailedDtos(memberPage.getContent());
            Pagination pagination = new Pagination(page, limit,
                    memberPage.getTotalElements(), memberPage.getTotalPages());
            return new MembersListWithPaginationDto(memberDetailedDtos, pagination);
        }
    }

    public CreatedObjectDto createMember(MemberIncomingDto memberIncomingDto) throws MemberNotOldEnoughException {
//        check if user is at least 18 years old, if it is, save the new member
        if (!AgeChecker.isEighteenOrOlder(memberIncomingDto.getBirthDate())) {
            LOGGER.warn("Member is not 18 years old, birth date: {}", memberIncomingDto.getBirthDate());
            throw new MemberNotOldEnoughException("Members must be at least 18 years old!");
        }
        Member savedMember = memberRepository.saveAndFlush(
                memberMapper.incomingDtoToMember(memberIncomingDto)
        );
        return new CreatedObjectDto(savedMember.getId());
    }

    public void update(Long id, MemberIncomingDto memberIncomingDto) {
        try {
            if (memberRepository.update(id,
                    memberMapper.incomingDtoToMember(memberIncomingDto)) <= 0) {
                LOGGER.error("No update done for member with ID {}", id);
                throw new NotUpdatedException("No update done for member with ID " + id);
            }
        } catch (EntityNotFoundException e) {
            LOGGER.error("Member with ID {} not found when trying to update", id);
            throw new NotFoundException("Member with ID " + id + " not found", e);
        }
    }

    public void delete(Long id) {
        try {
            memberRepository.deleteById(id);
        } catch (EntityNotFoundException e) {
            LOGGER.error("Member with ID {} not found when trying to delete", id);
            throw new NotFoundException("Member with ID " + id + " not found", e);
        }
    }

    private Specification<Member> createSpecification(String lastName, String firstName) {
        Specification<Member> specification = Specification.where(null);
        if (lastName != null && !lastName.isEmpty()) {
            specification = specification.and(MemberSpecification.lastNameContains(lastName));
        }
        if (firstName != null && !firstName.isEmpty()) {
            specification = specification.and(MemberSpecification.firstNameContains(firstName));
        }
        return specification;
    }
}
