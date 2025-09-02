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
import io.tingkai.resign.dao.OrganizationDao;
import io.tingkai.resign.entity.Organization;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrganizationFacade {

	@Autowired
	private OrganizationDao organizationDao;

	public List<Organization> queryAll() {
		List<Organization> entities = organizationDao.findAll();
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_ORGANIZATION));
		}
		return entities;
	}

	public Organization queryById(UUID id) {
		Optional<Organization> optional = organizationDao.findById(id);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_ORGANIZATION));
			return null;
		}
		return optional.get();
	}

	public Organization insert(Organization entity) throws FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getName())) {
			throw new FieldMissingException();
		}
		return organizationDao.save(entity);
	}

	public Organization update(Organization entity) throws FieldMissingException, NotExistException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getId(), entity.getName())) {
			throw new FieldMissingException();
		}
		Optional<Organization> optional = organizationDao.findById(entity.getId());
		if (optional.isEmpty()) {
			throw new NotExistException();
		}
		Organization updateEntity = optional.get();
		updateEntity.setName(entity.getName());
		return organizationDao.save(updateEntity);
	}

	public void remove(UUID id) {
		this.organizationDao.deleteById(id);
	}
}
