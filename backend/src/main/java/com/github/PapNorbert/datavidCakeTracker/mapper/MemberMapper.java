package com.github.PapNorbert.datavidCakeTracker.mapper;

import com.github.PapNorbert.datavidCakeTracker.dto.incoming.MemberCreationDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.CreatedObjectDto;
import com.github.PapNorbert.datavidCakeTracker.dto.outgoing.MemberDetailedDto;
import com.github.PapNorbert.datavidCakeTracker.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    CreatedObjectDto memberToCreatedObjectDto(Member member);

    @Mapping(target = "id", ignore = true)
    Member creationDtoToMember(MemberCreationDto createdObjectDto);

    MemberDetailedDto modelToDetailedDto(Member member);

    List<MemberDetailedDto> modelsToDetailedDtos(List<Member> members);
}
