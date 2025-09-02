package io.tingkai.resign.dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.Coworker;

@Repository
public interface CoworkerDao extends JpaRepository<Coworker, UUID> {

	List<Coworker> findByOrganizationId(UUID organizationId);
}
