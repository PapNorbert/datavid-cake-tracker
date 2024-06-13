package com.github.PapNorbert.datavidCakeTracker.repository.jpa;

import com.github.PapNorbert.datavidCakeTracker.model.Member;
import com.github.PapNorbert.datavidCakeTracker.repository.MemberRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaRepository extends MemberRepository, JpaRepository<Member, Long> {


}
