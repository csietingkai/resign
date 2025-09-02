package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.model.exception.NotExistException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.CoworkerDao;
import io.tingkai.resign.entity.Coworker;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CoworkerFacade {

	@Autowired
	private CoworkerDao coworkerDao;

	public List<Coworker> queryAll() {
		List<Coworker> entities = coworkerDao.findAll();
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_COWORKER));
		}
		return entities;
	}

	public List<Coworker> queryByOrganizationId(UUID organizationId) {
		List<Coworker> entities = coworkerDao.findByOrganizationId(organizationId);
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_COWORKER));
		}
		return entities;
	}

	public Coworker queryById(UUID id) {
		Optional<Coworker> optional = coworkerDao.findById(id);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_COWORKER));
			return null;
		}
		return optional.get();
	}

	public Coworker insert(Coworker entity) throws FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getName(), entity.getEname())) {
			throw new FieldMissingException();
		}
		return coworkerDao.save(entity);
	}

	public Coworker update(Coworker entity) throws FieldMissingException, NotExistException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getId(), entity.getOrganizationId(), entity.getName(), entity.getEname())) {
			throw new FieldMissingException();
		}
		Optional<Coworker> optional = coworkerDao.findById(entity.getId());
		if (optional.isEmpty()) {
			throw new NotExistException();
		}
		Coworker updateEntity = optional.get();
		updateEntity.setName(entity.getName());
		updateEntity.setEname(entity.getEname());
		return coworkerDao.save(updateEntity);
	}

	public void remove(UUID id) {
		this.coworkerDao.deleteById(id);
	}
}
