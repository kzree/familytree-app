package com.familytree.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Person {
    private final UUID id;
    @NotBlank
    private final String name;
    private final String gender;
    private final String birthDate; // Birthdate is in ISO format yyyy/mm/dd
    private final UUID parent1;
    private final UUID parent2;

    public Person(@JsonProperty("id") UUID id,
                  @JsonProperty("name") String name,
                  @JsonProperty("gender") String gender,
                  @JsonProperty("birthDate") String birthDate,
                  @JsonProperty("parent1") UUID parent1,
                  @JsonProperty("parent2") UUID parent2) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthDate = birthDate;
        this.parent1 = parent1;
        this.parent2 = parent2;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public UUID getParent1() {
        return parent1;
    }

    public UUID getParent2() {
        return parent2;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getGender() {
        return gender;
    }
}
