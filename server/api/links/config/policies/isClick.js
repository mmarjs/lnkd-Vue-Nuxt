'use strict';

/**
 * `isClick` policy.
 */

module.exports = async (ctx, next) => {
  if(ctx.request.query.click) {
    var link = await strapi.services.links.fetch(ctx.params);
    var updateclicks = strapi.services.links.edit({id:ctx.params.id}, {clicks: link.attributes.clicks+1})
  }
  
  await next();


};