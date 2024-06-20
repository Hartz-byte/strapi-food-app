'use strict';

/**
 * register-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::register-user.register-user');
