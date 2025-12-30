package com.casamanduva.dto;

import lombok.Data;

import java.util.List;

@Data
public class EstimateEnquiryDTO {

    private String name;
    private String phone;
    private String email;
    private String location;

    private Integer area;
    private BhkType bhkType;
    private PackageType packageType;

    // frontend sends String → we handle conversion in service
    private String selectedRooms;

    // frontend sends this → backend ignores/calculates
    private Long estimatedBudget;

    private String source;
}
