package com.github.PapNorbert.datavidCakeTracker.repository.jpa;

import com.github.PapNorbert.datavidCakeTracker.model.Member;
import com.github.PapNorbert.datavidCakeTracker.repository.MemberRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Profile("jpa")
public interface MemberJpaRepository extends MemberRepository, JpaRepository<Member, Long> {

    @Override
    @Query(
            "SELECT m FROM Member m ORDER BY "
//                    calculate months until the birthday
                    + "CASE "
                    + "   WHEN (MONTH(m.birthDate) < MONTH(CURRENT_DATE) OR "
                    + "         (MONTH(m.birthDate) = MONTH(CURRENT_DATE) AND DAY(m.birthDate) < DAY(CURRENT_DATE))) THEN "
                    + "       12 + MONTH(m.birthDate) - MONTH(CURRENT_DATE) "
                    + "   ELSE "
                    + "       MONTH(m.birthDate) - MONTH(CURRENT_DATE) "
                    + "END "
//                    order by month adjusted if it's past the current date
                    + "ASC, "
//                    order by day
                    + "DAY(m.birthDate) ASC"
    )
    Page<Member> findAllByBirthdayDistance(Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Member "
            + "SET firstName= :#{#entity.firstName}, lastName= :#{#entity.lastName}, "
            + "birthDate= :#{#entity.birthDate}, country= :#{#entity.country}, "
            + "city= :#{#entity.city} "
            + " WHERE id = :id ")
    @Override
    Integer update(Long id, Member entity);

}
