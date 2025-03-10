package io.tingkai.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import io.tingkai.auth.constant.AuthConstant;

@Configuration
public class AuthRedisConfig {

	@Value("${spring.redis.auth.host}")
	private String host;

	@Value("${spring.redis.auth.port}")
	private int port;

	@Value("${spring.redis.auth.password}")
	private String password;

	@Value("${spring.redis.auth.database}")
	private int database;
	
	@Bean(name = AuthConstant.AUTH_CACHE)
	public RedisTemplate<?, ?> userCache() {
		return newRedisTemplate(authConnectionFactory());
	}

	@Bean(name = AuthConstant.AUTH_CACHE + "_conectionFactory")
	public LettuceConnectionFactory authConnectionFactory() {
		return connectionFactory(database);
	}

	private RedisTemplate<byte[], byte[]> newRedisTemplate(LettuceConnectionFactory connectionFactory) {
		RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory);
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
		objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
		template.setKeySerializer(new StringRedisSerializer());
		template.setValueSerializer(new Jackson2JsonRedisSerializer<>(objectMapper, Object.class));
		template.setHashKeySerializer(new StringRedisSerializer());
		template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
		return template;
	}

	private LettuceConnectionFactory connectionFactory(int database) {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(host, port);
		redisStandaloneConfiguration.setPassword(RedisPassword.of(password));
		redisStandaloneConfiguration.setDatabase(database);
		return new LettuceConnectionFactory(redisStandaloneConfiguration);
	}
}