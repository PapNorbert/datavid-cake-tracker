package com.github.PapNorbert.datavidCakeTracker.repository;

import com.github.PapNorbert.datavidCakeTracker.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberRepository {
    Page<Member> findAll(Pageable pageable);

    Member getById(Long id);

    Member saveAndFlush(Member entity);
}
