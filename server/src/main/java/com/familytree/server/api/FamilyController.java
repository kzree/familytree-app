package com.familytree.server.api;

import com.familytree.server.model.Family;
import com.familytree.server.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RequestMapping("/api/v1/family")
@RestController
public class FamilyController {
    private final FamilyService familyService;

    @Autowired
    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
    }

    // Adds a family to the database
    @PostMapping
    public void addFamily(@Valid @NonNull @RequestBody Family family) {
        familyService.addFamily(family);
    }

    // Returns the database contents
    @GetMapping(path= "/all")
    public List<Family> getAllFamilies() {
        return familyService.getAllFamilies();
    }

    @GetMapping(path = "{id}")
    public Family getFamilyById(@PathVariable("id") UUID id) {
        return familyService.getFamilyById(id).orElse(null);
    }

    @PutMapping(path = "{id}")
    public void updateFamilyById(@PathVariable("id") UUID id, @RequestBody Family updatedFamily) {
        familyService.updateFamily(id, updatedFamily);
    }
}
