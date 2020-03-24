package com.familytree.server.dao;

import com.familytree.server.model.Family;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FamilyDao {

    // Inserts family to the database
    int insertFamily(UUID id, Family family);

    default int insertFamily(Family family) {
        UUID id = UUID.randomUUID();
        return insertFamily(id, family);
    }

    // Selects everything in the database
    List<Family> selectAllFamilies();

    // Selects family by id from the database
    Optional<Family> selectFamilyById(UUID id);

    // Updates a certain family in the database
    int updateFamilyById(UUID id, Family family);
}
