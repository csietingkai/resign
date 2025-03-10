package io.tingkai.resign.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.UserSetting;

@Repository
public interface UserSettingDao extends JpaRepository<UserSetting, UUID> {

	public Optional<UserSetting> findByUserId(UUID userId);
}
