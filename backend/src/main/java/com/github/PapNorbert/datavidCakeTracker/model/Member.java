package com.github.PapNorbert.datavidCakeTracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Data()
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "members")
public class Member extends BaseEntity {
    @Column(nullable = false, name = "first_name", unique = true)
    private String firstName;
    @Column(nullable = false, name = "last_name", unique = true)
    private String lastName;
    @Column(nullable = false, name = "birth_date")
    private Date birthDate;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String city;
}