package com.familytree.server.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Person {
    private final UUID id;
    @NotBlank
    private final String name;
    private final String gender;
    private final String birthDate; // Birth date is in ISO format yyyy/mm/dd
    private final String deathDate; // Death date is in ISO format yyyy/mm/dd
    private final UUID parent1;     // Mother
    private final UUID parent2;     // Father
    private final boolean dead;
    private final UUID family;

    public Person(@JsonProperty("id") UUID id,
                  @JsonProperty("name") String name,
                  @JsonProperty("gender") String gender,
                  @JsonProperty("birthDate") String birthDate,
                  @JsonProperty("dead") boolean dead,
                  @JsonProperty("deathDate") String deathDate,
                  @JsonProperty("parent1") UUID parent1,
                  @JsonProperty("parent2") UUID parent2,
                  @JsonProperty("family") UUID family){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthDate = birthDate;
        this.dead = dead;
        this.deathDate = deathDate;
        this.parent1 = parent1; // Mother
        this.parent2 = parent2; // Father
        this.family = family;
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

    public boolean isDead() {
        return dead;
    }

    public String getDeathDate() {
        return deathDate;
    }

    public String getGender() {
        return gender;
    }

    public UUID getFamily() {
        return family;
    }
}
