package com.github.PapNorbert.datavidCakeTracker.dto.incoming;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberIncomingDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Past
    private Date birthDate;
    @NotBlank
    private String country;
    @NotBlank
    private String city;
}
