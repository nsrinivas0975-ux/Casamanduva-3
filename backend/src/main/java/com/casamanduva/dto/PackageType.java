package com.casamanduva.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum PackageType {
    ESSENTIAL, PREMIUM, LUXURY;

    @JsonCreator
    public static PackageType from(String value) {
        if (value == null) return null;
        return PackageType.valueOf(value.toUpperCase());
    }
}
