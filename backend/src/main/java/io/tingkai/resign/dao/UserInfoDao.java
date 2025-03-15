package io.tingkai.resign.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.tingkai.resign.entity.UserInfo;

@Repository
public interface UserInfoDao extends JpaRepository<UserInfo, UUID> {

	Optional<UserInfo> findByUserName(String userName);

}
