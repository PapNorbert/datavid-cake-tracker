package com.github.PapNorbert.datavidCakeTracker.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembersListWithPaginationDto {
    Collection<MemberDetailedDto> members;
    Pagination pagination;
}
