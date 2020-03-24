package com.familytree.server.service;

import com.familytree.server.dao.FamilyDao;
import com.familytree.server.mock.MockData;
import com.familytree.server.model.Family;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FamilyService {

    private final FamilyDao familyDao;

    @Autowired
    public FamilyService(@Qualifier("familyDao") FamilyDao familyDao) {
        this.familyDao = familyDao;
        MockData.initFamiliesToDB(familyDao);
    }

    // Adds family to the database
    public int addFamily(Family family) {
        return familyDao.insertFamily(family);
    }

    // Gets all the families from the database
    public List<Family> getAllFamilies() {
        return familyDao.selectAllFamilies();
    }

    // Finds family by given id
    public Optional<Family> getFamilyById(UUID id) {
        return familyDao.selectFamilyById(id);
    }

    // Updates family by given id
    public int updateFamily(UUID id, Family family) {
        return familyDao.updateFamilyById(id, family);
    }
}
