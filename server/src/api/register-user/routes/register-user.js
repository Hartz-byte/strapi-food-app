'use strict';

/**
 * register-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::register-user.register-user');
