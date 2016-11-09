angular.module('app').factory('ProductsFactory', function($resource, $cacheFactory) {
	/*var products = [
	 {
	 id: 1,
	 product_name: 'Kekec Pašteta',
	 manufacturer:  'Osem d.o.o.',
	 packingUnit: 'kos',
	 nettQuantity: '75 gramov',
	 price: 0.45,
	 ean: '383000860420',
	 description: "svinjsko mastno tkivo, voda, svinjska jetra, svinjskomeso, mlečna beljakovina, jedilna sol,dekstroza, začimbe,ojačevalec arome E 621, antioksidant E 300, barvilo E 120, konzervans E 250.",
	 img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/3830008604200a.jpg'
	 },
	 {
	 id: 2,
	 product_name: 'Testenine Barilla, špageti, polnozr., št.5, 500g',
	 manufacturer:  'BARILLA ADRIATIK',
	 packingUnit: 'kos',
	 nettQuantity: '500 gramov',
	 price: 1.18,
	 ean: '807680952941',
	 description: "Najboljši špageti na svetu",
	 img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/8076809529419-5.jpg'
	 },
	 {
	 id: 3,
	 product_name: 'Nutella, 3kg',
	 manufacturer:  'MITTEL CO S.R.L. S.U',
	 packingUnit: 'kos',
	 nettQuantity: '3000 gramov',
	 price: 20,
	 ean: '800050013133',
	 description: "Sladkor, rastlisko olje, lešniki 13%, manj masten kakav 7,4%, posneto mleko v prahu 6,6%, sirotka v prahu +, emulgator: lecitini (soja, vaniljin)",
	 img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/8000500131329.jpg'
	 },

	 ];*/
	return $resource('http://smartninja.betoo.si/api/eshop/products/:id', {}, {
		query: {isArray: true}
	});
});