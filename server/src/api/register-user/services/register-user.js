'use strict';

/**
 * register-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::register-user.register-user');
