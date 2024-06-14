package com.github.PapNorbert.datavidCakeTracker.repository;

import com.github.PapNorbert.datavidCakeTracker.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface MemberRepository {
    Page<Member> findAll(Specification<Member> spec, Pageable pageable);

    Page<Member> findAllByBirthdayDistance(Pageable pageable);

    Member saveAndFlush(Member entity);

    // returns the number of updated entities
    Integer update(Long id, Member entity);

    void deleteById(Long id);
}
