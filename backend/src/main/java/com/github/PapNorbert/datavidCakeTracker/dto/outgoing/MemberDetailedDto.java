package com.github.PapNorbert.datavidCakeTracker.dto.outgoing;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDetailedDto {
    protected Long id;
    private String firstName;
    private String lastName;
    private Date birthDate;
    private String country;
    private String city;
}

