'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { role, id } = ctx.state.user;
  const userpage = ctx.state.user.pages[0].id; //user has this page under Pages
  var link = await strapi.services.links.findOne(ctx.params);
  if(userpage != link.page.id) {
    return ctx.unauthorized("You are not allowed to perform this action.");
  }
  await next();


};