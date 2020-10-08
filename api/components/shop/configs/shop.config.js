const link = '/admin/shop/';
const imgPath = '/shop/images/';

module.exports = {
   categories : {
      title : 'Категории',
      img : imgPath + 'm_shop_categories.svg',
      link : link + 'categories'
   },
   products : {
      title : 'Товары',
      img : imgPath + 'm_shop_products.svg',
      link : link + 'products'
   },
   orders : {
      title : 'Заказы',
      img : imgPath + 'm_shop_orders.svg',
      link : link + 'orders'
   },
   clients : {
      title : 'Клиенты',
      img : imgPath + 'm_shop_users.svg',
      link : link + 'clients'
   },
   options : {
      title : 'Опции',
      img : imgPath + 'jm_shop_options.svg',
      link : link + 'options'
   },
   config : {
      title : 'Настройки',
      img : imgPath + 'm_shop_configuration.svg',
      link : link + 'config'
   },
   info : {
      title : 'Инфо',
      img : imgPath + 'm_shop_info.svg',
      link : link + 'info'
   },
};
