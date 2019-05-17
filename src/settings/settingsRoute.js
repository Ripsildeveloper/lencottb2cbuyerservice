'use strict';
var adsMgr  = require('./ads/adsMgr');
var bannersMgr = require('./banner/bannerMgr');
var promotionsMgr = require('./promotions/promotionsMgr');
var footerMgr = require('./footer/footerMgr');
var headerMgr = require('./header/headerMgr');

module.exports = function(app) {
    app.route('/ads')
    .get(adsMgr.getAds);   // used to display hot products
    app.route('/banners')
    .get(bannersMgr.getBanners);
    app.route('/promotions')
    .get(promotionsMgr.getPromotions);

    app.route('/footerDetails')
    .get(footerMgr.getFooterDetails);
    app.route('/headerDetails')
    .get(headerMgr.getHeaderDetails);
    
}