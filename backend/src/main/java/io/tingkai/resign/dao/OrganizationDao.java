package io.tingkai.resign.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.Organization;

@Repository
public interface OrganizationDao extends JpaRepository<Organization, UUID> {
}
