package com.github.PapNorbert.datavidCakeTracker.util;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;

public class AgeChecker {

    public static boolean isEighteenOrOlder(Date birthDate) {
        LocalDate birthLocalDate = birthDate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        LocalDate currentDate = LocalDate.now();

        // period between the birthDate and the current date
        Period age = Period.between(birthLocalDate, currentDate);
        return age.getYears() >= 18;
    }
}
