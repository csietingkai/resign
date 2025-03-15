package io.tingkai.resign.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.StampCard;

@Repository
public interface StampCardDao extends JpaRepository<StampCard, UUID> {

	public Optional<StampCard> findByUserName(String userName);

	public List<StampCard> findAllByOrderByPointDesc();
}
