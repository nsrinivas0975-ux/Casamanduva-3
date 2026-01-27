package com.casamanduva.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum BhkType {
    ONE_BHK, TWO_BHK, THREE_BHK;

    @JsonCreator
    public static BhkType from(String value) {
        if (value == null) return null;

        return switch (value.toLowerCase()) {
            case "1bhk", "one_bhk" -> ONE_BHK;
            case "2bhk", "two_bhk" -> TWO_BHK;
            case "3bhk", "three_bhk" -> THREE_BHK;
            default -> throw new IllegalArgumentException("Invalid bhkType: " + value);
        };
    }
}
