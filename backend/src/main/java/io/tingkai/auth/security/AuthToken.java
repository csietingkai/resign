package io.tingkai.auth.security;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import io.tingkai.auth.enumeration.Role;
import lombok.Data;

@Data
public class AuthToken implements Serializable {
	private static final long serialVersionUID = 1L;
	private UUID id;
	private String name;
	private Role role;
	private String tokenString;
	private LocalDateTime expiryDate;
}
