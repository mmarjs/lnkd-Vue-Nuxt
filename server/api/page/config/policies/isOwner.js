'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { role, id } = ctx.state.user;
  const userpage = ctx.state.user.pages[0].id; //user has this page under Pages
  const pageId = ctx.params.id; //page about to be updated / deleted

  if(userpage != pageId) {
    return ctx.unauthorized("You are not allowed to perform this action.");
  }
  await next();


};