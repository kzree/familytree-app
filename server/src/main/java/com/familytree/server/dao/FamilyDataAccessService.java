package com.familytree.server.dao;

import com.familytree.server.model.Family;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("familyDao")
public class FamilyDataAccessService implements FamilyDao{

    private static List<Family> DB = new ArrayList<>();

    @Override
    public int insertFamily(UUID id, Family family) {
        DB.add(new Family(id, family.getName()));
        return 1;
    }

    @Override
    public List<Family> selectAllFamilies() {
        return DB;
    }

    @Override
    public Optional<Family> selectFamilyById(UUID id) {
        return DB.stream()
                .filter(family -> family.getId().equals(id))
                .findFirst();
    }

    @Override
    public int updateFamilyById(UUID id, Family updatedFamily) {
        return selectFamilyById(id).map(family1 -> {
            int indexOfFamilyToUpdate = DB.indexOf(family1);
            if(indexOfFamilyToUpdate >= 0) {
                DB.set(indexOfFamilyToUpdate, new Family(id, updatedFamily.getName()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }
}
