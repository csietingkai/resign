package io.tingkai.resign.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.Coworker;

@Repository
public interface CoworkerDao extends JpaRepository<Coworker, UUID> {
}
