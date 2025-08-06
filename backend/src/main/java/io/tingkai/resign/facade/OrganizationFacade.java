package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
