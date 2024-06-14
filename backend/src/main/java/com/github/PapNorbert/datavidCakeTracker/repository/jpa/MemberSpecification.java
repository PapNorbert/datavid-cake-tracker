package com.github.PapNorbert.datavidCakeTracker.repository.jpa;

import com.github.PapNorbert.datavidCakeTracker.model.Member;
import org.springframework.data.jpa.domain.Specification;

public class MemberSpecification {

    public static Specification<Member> lastNameContains(String lastName) {
        return (memberRoot, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(memberRoot.get("lastName"), "%" + lastName + "%");
    }

    public static Specification<Member> firstNameContains(String firstName) {
        return (memberRoot, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(memberRoot.get("firstName"), "%" + firstName + "%");
    }
}
