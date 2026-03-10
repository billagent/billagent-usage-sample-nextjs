'use client';

import { useState, useEffect } from 'react';
import ContractText from './ContractText';

// Pre-computed timezone options array (sorted by offset) - first few as placeholder
// Pre-computed timezone options array (sorted by offset)
const timezoneOptions = [
  {
    "value": -11,
    "label": "-11:00 American Samoa Time - Midway",
    "name": "Pacific/Midway"
  },
  {
    "value": -11,
    "label": "-11:00 American Samoa Time - Pago Pago",
    "name": "Pacific/Pago_Pago"
  },
  {
    "value": -11,
    "label": "-11:00 Niue Time - Alofi",
    "name": "Pacific/Niue"
  },
  {
    "value": -10,
    "label": "-10:00 Cook Islands Time - Avarua",
    "name": "Pacific/Rarotonga"
  },
  {
    "value": -10,
    "label": "-10:00 Hawaii-Aleutian Time - Adak",
    "name": "America/Adak"
  },
  {
    "value": -10,
    "label": "-10:00 Hawaii-Aleutian Time - Honolulu, East Honolulu, Pearl City, Makakilo / Kapolei / Honokai Hale",
    "name": "Pacific/Honolulu"
  },
  {
    "value": -10,
    "label": "-10:00 Tahiti Time - Faaa, Papeete, Punaauia",
    "name": "Pacific/Tahiti"
  },
  {
    "value": -9.5,
    "label": "-09:30 Marquesas Time - Marquesas",
    "name": "Pacific/Marquesas"
  },
  {
    "value": -9,
    "label": "-09:00 Alaska Time - Anchorage, Fairbanks, Juneau, Eagle River",
    "name": "America/Anchorage"
  },
  {
    "value": -9,
    "label": "-09:00 Gambier Time - Gambier",
    "name": "Pacific/Gambier"
  },
  {
    "value": -8,
    "label": "-08:00 Pacific Time - Los Angeles, San Diego, San Jose, San Francisco",
    "name": "America/Los_Angeles"
  },
  {
    "value": -8,
    "label": "-08:00 Pacific Time - Tijuana, Mexicali, Ensenada, Rosarito",
    "name": "America/Tijuana"
  },
  {
    "value": -8,
    "label": "-08:00 Pacific Time - Vancouver, Surrey, Victoria, Burnaby",
    "name": "America/Vancouver"
  },
  {
    "value": -8,
    "label": "-08:00 Pitcairn Time - Adamstown",
    "name": "Pacific/Pitcairn"
  },
  {
    "value": -7,
    "label": "-07:00 Mexican Pacific Time - Hermosillo, Culiacán, Mazatlán, Tepic",
    "name": "America/Hermosillo"
  },
  {
    "value": -7,
    "label": "-07:00 Mountain Time - Calgary, Edmonton, Lethbridge, Red Deer",
    "name": "America/Edmonton"
  },
  {
    "value": -7,
    "label": "-07:00 Mountain Time - Ciudad Juárez",
    "name": "America/Ciudad_Juarez"
  },
  {
    "value": -7,
    "label": "-07:00 Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs",
    "name": "America/Denver"
  },
  {
    "value": -7,
    "label": "-07:00 Mountain Time - Phoenix, Tucson, Mesa, Chandler",
    "name": "America/Phoenix"
  },
  {
    "value": -7,
    "label": "-07:00 Yukon Time - Whitehorse, Fort St. John, Creston, Dawson",
    "name": "America/Whitehorse"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Belize City, San Pedro, Orange Walk, Belmopan",
    "name": "America/Belize"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Chicago, Houston, San Antonio, Dallas",
    "name": "America/Chicago"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Guatemala City, Villa Nueva, Mixco, Cobán",
    "name": "America/Guatemala"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Managua, León, Masaya, Chinandega",
    "name": "America/Managua"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Mexico City, Iztapalapa, Puebla, Ecatepec de Morelos",
    "name": "America/Mexico_City"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Reynosa, Heroica Matamoros, Nuevo Laredo, Ciudad Acuña",
    "name": "America/Matamoros"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - San José, Limón, San Francisco, Alajuela",
    "name": "America/Costa_Rica"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - San Salvador, Soyapango, San Miguel, Santa Ana",
    "name": "America/El_Salvador"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Saskatoon, Regina, Prince Albert, Moose Jaw",
    "name": "America/Regina"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Tegucigalpa, San Pedro Sula, La Ceiba, Choloma",
    "name": "America/Tegucigalpa"
  },
  {
    "value": -6,
    "label": "-06:00 Central Time - Winnipeg, Brandon, Steinbach, Kenora",
    "name": "America/Winnipeg"
  },
  {
    "value": -6,
    "label": "-06:00 Galapagos Time - Galapagos",
    "name": "Pacific/Galapagos"
  },
  {
    "value": -6,
    "label": "-06:00 Easter Island Time - Easter",
    "name": "Pacific/Easter"
  },
  {
    "value": -5,
    "label": "-05:00 Acre Time - Rio Branco, Cruzeiro do Sul, Tarauacá, Sena Madureira",
    "name": "America/Rio_Branco"
  },
  {
    "value": -5,
    "label": "-05:00 Colombia Time - Bogotá, Cali, Medellín, Barranquilla",
    "name": "America/Bogota"
  },
  {
    "value": -5,
    "label": "-05:00 Cuba Time - Havana, Santiago de Cuba, Camagüey, Holguín",
    "name": "America/Havana"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Atikokan",
    "name": "America/Atikokan"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Cancún, Chetumal, Playa del Carmen, Cozumel",
    "name": "America/Cancun"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - George Town, West Bay",
    "name": "America/Cayman"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Kingston, New Kingston, Spanish Town, Portmore",
    "name": "America/Jamaica"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Nassau, Lucaya, Freeport, Killarney",
    "name": "America/Nassau"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - New York City, Brooklyn, Queens, Philadelphia",
    "name": "America/New_York"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Panamá, San Miguelito, Juan Díaz, David",
    "name": "America/Panama"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Port-au-Prince, Carrefour, Delmas, Port-de-Paix",
    "name": "America/Port-au-Prince"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Providenciales, Cockburn Town",
    "name": "America/Grand_Turk"
  },
  {
    "value": -5,
    "label": "-05:00 Eastern Time - Toronto, Montréal, Ottawa, Mississauga",
    "name": "America/Toronto"
  },
  {
    "value": -5,
    "label": "-05:00 Ecuador Time - Quito, Guayaquil, Cuenca, Santo Domingo de los Colorados",
    "name": "America/Guayaquil"
  },
  {
    "value": -5,
    "label": "-05:00 Peru Time - Lima, Callao, Arequipa, Trujillo",
    "name": "America/Lima"
  },
  {
    "value": -4,
    "label": "-04:00 Amazon Time - Manaus, Campo Grande, Cuiabá, Porto Velho",
    "name": "America/Manaus"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Basseterre",
    "name": "America/St_Kitts"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Blanc-Sablon",
    "name": "America/Blanc-Sablon"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Brades, Plymouth",
    "name": "America/Montserrat"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Bridgetown",
    "name": "America/Barbados"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Chaguanas, Mon Repos, San Fernando, Port of Spain",
    "name": "America/Port_of_Spain"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie",
    "name": "America/Martinique"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Gros Islet, Castries",
    "name": "America/St_Lucia"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Gustavia",
    "name": "America/St_Barthelemy"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Halifax, Sydney, Dartmouth, Moncton",
    "name": "America/Halifax"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Hamilton",
    "name": "Atlantic/Bermuda"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Kingstown, Calliaqua",
    "name": "America/St_Vincent"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Kralendijk",
    "name": "America/Kralendijk"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg",
    "name": "America/Guadeloupe"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Marigot",
    "name": "America/Marigot"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Oranjestad, Noord, Tanki Leendert, San Nicolas",
    "name": "America/Aruba"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Philipsburg",
    "name": "America/Lower_Princes"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Road Town",
    "name": "America/Tortola"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Roseau",
    "name": "America/Dominica"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Saint Croix, Charlotte Amalie",
    "name": "America/St_Thomas"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Saint George's",
    "name": "America/Grenada"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Saint John’s",
    "name": "America/Antigua"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - San Juan, Bayamón, Carolina, Ponce",
    "name": "America/Puerto_Rico"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este",
    "name": "America/Santo_Domingo"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - The Valley",
    "name": "America/Anguilla"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Thule",
    "name": "America/Thule"
  },
  {
    "value": -4,
    "label": "-04:00 Atlantic Time - Willemstad, Bandariba",
    "name": "America/Curacao"
  },
  {
    "value": -4,
    "label": "-04:00 Bolivia Time - La Paz, Santa Cruz de la Sierra, Cochabamba, Sucre",
    "name": "America/La_Paz"
  },
  {
    "value": -4,
    "label": "-04:00 Guyana Time - Georgetown, Linden, New Amsterdam",
    "name": "America/Guyana"
  },
  {
    "value": -4,
    "label": "-04:00 Venezuela Time - Caracas, Maracaibo, Valencia, Barquisimeto",
    "name": "America/Caracas"
  },
  {
    "value": -4,
    "label": "-04:00 Chile Time - Santiago, Puente Alto, Maipú, Antofagasta",
    "name": "America/Santiago"
  },
  {
    "value": -3.5,
    "label": "-03:30 Newfoundland Time - St. John's, Mount Pearl, Paradise, Corner Brook",
    "name": "America/St_Johns"
  },
  {
    "value": -3,
    "label": "-03:00 Argentina Time - Buenos Aires, Córdoba, Rosario, Mar del Plata",
    "name": "America/Argentina/Buenos_Aires"
  },
  {
    "value": -3,
    "label": "-03:00 Brasilia Time - São Paulo, Rio de Janeiro, Belo Horizonte, Salvador",
    "name": "America/Sao_Paulo"
  },
  {
    "value": -3,
    "label": "-03:00 Chile Time - Palmer, Rothera",
    "name": "Antarctica/Palmer"
  },
  {
    "value": -3,
    "label": "-03:00 Chile Time - Punta Arenas, Coyhaique, Puerto Natales, Puerto Aysén",
    "name": "America/Punta_Arenas"
  },
  {
    "value": -3,
    "label": "-03:00 Falkland Islands Time - Stanley",
    "name": "Atlantic/Stanley"
  },
  {
    "value": -3,
    "label": "-03:00 French Guiana Time - Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou",
    "name": "America/Cayenne"
  },
  {
    "value": -3,
    "label": "-03:00 Paraguay Time - Asunción, Ciudad del Este, San Lorenzo, Capiatá",
    "name": "America/Asuncion"
  },
  {
    "value": -3,
    "label": "-03:00 St. Pierre & Miquelon Time - Saint-Pierre",
    "name": "America/Miquelon"
  },
  {
    "value": -3,
    "label": "-03:00 Suriname Time - Paramaribo, Blauwgrond, Rainville, Flora",
    "name": "America/Paramaribo"
  },
  {
    "value": -3,
    "label": "-03:00 Uruguay Time - Montevideo, Salto, Paysandú, Las Piedras",
    "name": "America/Montevideo"
  },
  {
    "value": -2,
    "label": "-02:00 Fernando de Noronha Time - Noronha",
    "name": "America/Noronha"
  },
  {
    "value": -2,
    "label": "-02:00 Greenland Time - Nuuk, Scoresbysund",
    "name": "America/Nuuk"
  },
  {
    "value": -2,
    "label": "-02:00 South Georgia Time - Grytviken",
    "name": "Atlantic/South_Georgia"
  },
  {
    "value": -1,
    "label": "-01:00 Azores Time - Ponta Delgada",
    "name": "Atlantic/Azores"
  },
  {
    "value": -1,
    "label": "-01:00 Cape Verde Time - Praia, Mindelo, Espargos, Assomada",
    "name": "Atlantic/Cape_Verde"
  },
  {
    "value": 0,
    "label": "+00:00 Coordinated Universal Time (UTC)",
    "name": "Etc/UTC"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Abidjan, Abobo, Bouaké, Korhogo",
    "name": "Africa/Abidjan"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Bamako, Sikasso, Koutiala, Ségou",
    "name": "Africa/Bamako"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Bissau, Gabú, Bafatá, Xitole",
    "name": "Africa/Bissau"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Conakry, Camayenne, Nzérékoré, Kankan",
    "name": "Africa/Conakry"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Dakar, Touba, Pikine, Guédiawaye",
    "name": "Africa/Dakar"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Danmarkshavn",
    "name": "America/Danmarkshavn"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Douglas",
    "name": "Europe/Isle_of_Man"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Dublin, South Dublin, Cork, Limerick",
    "name": "Europe/Dublin"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Freetown, Bo, Kenema, Koidu",
    "name": "Africa/Freetown"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Jamestown",
    "name": "Atlantic/St_Helena"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Kumasi, Accra, Tamale, Takoradi",
    "name": "Africa/Accra"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Lomé, Sokodé, Kara, Atakpamé",
    "name": "Africa/Lome"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - London, Birmingham, Glasgow, Manchester",
    "name": "Europe/London"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Monrovia, Gbarnga, Buchanan, Ganta",
    "name": "Africa/Monrovia"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Nouakchott, Nouadhibou, Kiffa, Dar Naim",
    "name": "Africa/Nouakchott"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Ouagadougou, Bobo-Dioulasso, Koudougou, Saaba",
    "name": "Africa/Ouagadougou"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Reykjavík, Kópavogur, Hafnarfjörður, Reykjanesbær",
    "name": "Atlantic/Reykjavik"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Saint Helier",
    "name": "Europe/Jersey"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Saint Peter Port",
    "name": "Europe/Guernsey"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - São Tomé",
    "name": "Africa/Sao_Tome"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Serekunda, Brikama, Bununka Kunda, Sukuta",
    "name": "Africa/Banjul"
  },
  {
    "value": 0,
    "label": "+00:00 Greenwich Mean Time - Troll",
    "name": "Antarctica/Troll"
  },
  {
    "value": 0,
    "label": "+00:00 Western European Time - Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde",
    "name": "Atlantic/Canary"
  },
  {
    "value": 0,
    "label": "+00:00 Western European Time - Lisbon, Porto, Amadora, Braga",
    "name": "Europe/Lisbon"
  },
  {
    "value": 0,
    "label": "+00:00 Western European Time - Tórshavn",
    "name": "Atlantic/Faroe"
  },
  {
    "value": 0,
    "label": "+00:00 Western European Time - Casablanca, Rabat, Fes, Tangier",
    "name": "Africa/Casablanca"
  },
  {
    "value": 0,
    "label": "+00:00 Western European Time - Laayoune, Dakhla, Boujdour",
    "name": "Africa/El_Aaiun"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Algiers, Oran, Constantine, Annaba",
    "name": "Africa/Algiers"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Andorra la Vella, les Escaldes",
    "name": "Europe/Andorra"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Belgrade, Niš, Novi Sad, Zemun",
    "name": "Europe/Belgrade"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Berlin, Hamburg, Munich, Köln",
    "name": "Europe/Berlin"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Bratislava, Košice, Petržalka, Nitra",
    "name": "Europe/Bratislava"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Brussels, Antwerpen, Gent, Charleroi",
    "name": "Europe/Brussels"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Budapest, Debrecen, Szeged, Miskolc",
    "name": "Europe/Budapest"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Copenhagen, Århus, Odense, Aalborg",
    "name": "Europe/Copenhagen"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Gibraltar",
    "name": "Europe/Gibraltar"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Ljubljana, Maribor, Celje, Kranj",
    "name": "Europe/Ljubljana"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Longyearbyen",
    "name": "Arctic/Longyearbyen"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Luxembourg, Esch-sur-Alzette, Dudelange",
    "name": "Europe/Luxembourg"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Madrid, Barcelona, Valencia, Zaragoza",
    "name": "Europe/Madrid"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Monaco, Monte-Carlo",
    "name": "Europe/Monaco"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Oslo, Bergen, Trondheim, Stavanger",
    "name": "Europe/Oslo"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Paris, Marseille, Lyon, Toulouse",
    "name": "Europe/Paris"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Podgorica, Nikšić, Herceg Novi, Pljevlja",
    "name": "Europe/Podgorica"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Prague, Brno, Ostrava, Pilsen",
    "name": "Europe/Prague"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Rome, Milan, Naples, Turin",
    "name": "Europe/Rome"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Rotterdam, Amsterdam, The Hague, Utrecht",
    "name": "Europe/Amsterdam"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - San Marino",
    "name": "Europe/San_Marino"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - San Pawl il-Baħar, Birkirkara, Mosta, Sliema",
    "name": "Europe/Malta"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Sarajevo, Banja Luka, Zenica, Tuzla",
    "name": "Europe/Sarajevo"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Skopje, Kumanovo, Prilep, Bitola",
    "name": "Europe/Skopje"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Stockholm, Göteborg, Malmö, Uppsala",
    "name": "Europe/Stockholm"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Tirana, Durrës, Vlorë, Elbasan",
    "name": "Europe/Tirane"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Tunis, Sfax, Sousse, Kairouan",
    "name": "Africa/Tunis"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Vaduz",
    "name": "Europe/Vaduz"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Vatican City",
    "name": "Europe/Vatican"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Vienna, Graz, Linz, Favoriten",
    "name": "Europe/Vienna"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Warsaw, Łódź, Kraków, Wrocław",
    "name": "Europe/Warsaw"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Zagreb, Split, Rijeka, Osijek",
    "name": "Europe/Zagreb"
  },
  {
    "value": 1,
    "label": "+01:00 Central European Time - Zürich, Genève, Basel, Lausanne",
    "name": "Europe/Zurich"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Bangui, Bimbo, Bégoua, Carnot",
    "name": "Africa/Bangui"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Bata, Malabo, Ebebiyin",
    "name": "Africa/Malabo"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Brazzaville, Pointe-Noire, Dolisie, Nkayi",
    "name": "Africa/Brazzaville"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Cotonou, Abomey-Calavi, Porto-Novo, Parakou",
    "name": "Africa/Porto-Novo"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Douala, Yaoundé, Bamenda, Bafoussam",
    "name": "Africa/Douala"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Kinshasa, Kikwit, Masina, Mbandaka",
    "name": "Africa/Kinshasa"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Lagos, Kano, Ibadan, Abuja",
    "name": "Africa/Lagos"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Libreville, Port-Gentil, Franceville, Owendo",
    "name": "Africa/Libreville"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Luanda, Lubango, Huambo, Benguela",
    "name": "Africa/Luanda"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - N'Djamena, Moundou, Abéché, Sarh",
    "name": "Africa/Ndjamena"
  },
  {
    "value": 1,
    "label": "+01:00 West Africa Time - Niamey, Maradi, Zinder, Tahoua",
    "name": "Africa/Niamey"
  },
  {
    "value": 1,
    "label": "+01:00 Central Africa Time - Windhoek, Rundu, Walvis Bay, Swakopmund",
    "name": "Africa/Windhoek"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Bujumbura, Gitega, Ngozi, Rumonge",
    "name": "Africa/Bujumbura"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Gaborone, Francistown, Mogoditshane, Maun",
    "name": "Africa/Gaborone"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Harare, Bulawayo, Chitungwiza, Mutare",
    "name": "Africa/Harare"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Juba, Winejok, Yei, Malakal",
    "name": "Africa/Juba"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Khartoum, Omdurman, Khartoum North, Nyala",
    "name": "Africa/Khartoum"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Kigali, Gisenyi, Musanze, Nyagatare",
    "name": "Africa/Kigali"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Lilongwe, Blantyre, Mzuzu, Zomba",
    "name": "Africa/Blantyre"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Lubumbashi, Mbuji-Mayi, Kananga, Kisangani",
    "name": "Africa/Lubumbashi"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Lusaka, Kitwe, Ndola, Chipata",
    "name": "Africa/Lusaka"
  },
  {
    "value": 2,
    "label": "+02:00 Central Africa Time - Maputo, Matola, Nampula, Beira",
    "name": "Africa/Maputo"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Athens, Thessaloníki, Pátra, Piraeus",
    "name": "Europe/Athens"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Beirut, Ra’s Bayrūt, Tripoli, Sidon",
    "name": "Asia/Beirut"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Bucharest, Sector 3, Iaşi, Sector 6",
    "name": "Europe/Bucharest"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Cairo, Alexandria, Giza, Shubrā al Khaymah",
    "name": "Africa/Cairo"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Chisinau, Tiraspol, Bălţi, Bender",
    "name": "Europe/Chisinau"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - East Jerusalem, Gaza, Khān Yūnis, Jabālyā",
    "name": "Asia/Hebron"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Helsinki, Espoo, Tampere, Vantaa",
    "name": "Europe/Helsinki"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk",
    "name": "Europe/Kaliningrad"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Kyiv, Kharkiv, Odesa, Dnipro",
    "name": "Europe/Kyiv"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Mariehamn",
    "name": "Europe/Mariehamn"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Nicosia, Limassol, Larnaca, Stróvolos",
    "name": "Asia/Nicosia"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Riga, Daugavpils, Liepāja, Jelgava",
    "name": "Europe/Riga"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Sofia, Plovdiv, Varna, Burgas",
    "name": "Europe/Sofia"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Tallinn, Tartu, Narva, Pärnu",
    "name": "Europe/Tallinn"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Tripoli, Benghazi, Misratah, Zliten",
    "name": "Africa/Tripoli"
  },
  {
    "value": 2,
    "label": "+02:00 Eastern European Time - Vilnius, Kaunas, Klaipėda, Šiauliai",
    "name": "Europe/Vilnius"
  },
  {
    "value": 2,
    "label": "+02:00 Israel Time - Jerusalem, Tel Aviv, West Jerusalem, Haifa",
    "name": "Asia/Jerusalem"
  },
  {
    "value": 2,
    "label": "+02:00 South Africa Time - Johannesburg, Cape Town, Durban, Pretoria",
    "name": "Africa/Johannesburg"
  },
  {
    "value": 2,
    "label": "+02:00 South Africa Time - Manzini, Mbabane, Lobamba",
    "name": "Africa/Mbabane"
  },
  {
    "value": 2,
    "label": "+02:00 South Africa Time - Maseru, Maputsoe, Mohale's Hoek, Mafeteng",
    "name": "Africa/Maseru"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Al Aḩmadī, Ḩawallī, As Sālimīyah, Şabāḩ as Sālim",
    "name": "Asia/Kuwait"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Al Muharraq, Manama, Madīnat Ḩamad, Ar Rifā‘",
    "name": "Asia/Bahrain"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Baghdad, Al Mawşil al Jadīdah, Al Başrah al Qadīmah, Mosul",
    "name": "Asia/Baghdad"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Doha, Ar Rayyān, Al Maţār al ‘Atīq, Al Manşūrah",
    "name": "Asia/Qatar"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Jeddah, Riyadh, Makkah, Madinah",
    "name": "Asia/Riyadh"
  },
  {
    "value": 3,
    "label": "+03:00 Arabian Time - Sanaa, Aden, Taiz, Ibb",
    "name": "Asia/Aden"
  },
  {
    "value": 3,
    "label": "+03:00 Asia/Amman - Amman, Zarqa, Irbid, Russeifa",
    "name": "Asia/Amman"
  },
  {
    "value": 3,
    "label": "+03:00 Asia/Damascus - Aleppo, Damascus, Homs, Latakia",
    "name": "Asia/Damascus"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Addis Ababa, Jijiga, Gonder, Mek'ele",
    "name": "Africa/Addis_Ababa"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Antananarivo, Toamasina, Antsirabe, Mahajanga",
    "name": "Indian/Antananarivo"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Asmara, Keren, Himora, Massawa",
    "name": "Africa/Asmara"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Dar es Salaam, Mwanza, Dodoma, Zanzibar",
    "name": "Africa/Dar_es_Salaam"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Djibouti, Ali Sabih, Dikhil, Tadjoura",
    "name": "Africa/Djibouti"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Kampala, Nansana, Kira, Bunamwaya",
    "name": "Africa/Kampala"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Mamoudzou, Koungou, Labattoir, Kaouéni",
    "name": "Indian/Mayotte"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Mogadishu, Borama, Hargeysa, Berbera",
    "name": "Africa/Mogadishu"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Moroni, Moutsamoudou, Fomboni",
    "name": "Indian/Comoro"
  },
  {
    "value": 3,
    "label": "+03:00 East Africa Time - Nairobi, Kakamega, Mombasa, Nakuru",
    "name": "Africa/Nairobi"
  },
  {
    "value": 3,
    "label": "+03:00 Moscow Time - Minsk, Homyel', Hrodna, Vitebsk",
    "name": "Europe/Minsk"
  },
  {
    "value": 3,
    "label": "+03:00 Moscow Time - Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan",
    "name": "Europe/Moscow"
  },
  {
    "value": 3,
    "label": "+03:00 Moscow Time - Sevastopol, Simferopol, Kerch, Yevpatoriya",
    "name": "Europe/Simferopol"
  },
  {
    "value": 3,
    "label": "+03:00 Syowa Time - Syowa",
    "name": "Antarctica/Syowa"
  },
  {
    "value": 3,
    "label": "+03:00 Turkey Time - Istanbul, Ankara, Bursa, İzmir",
    "name": "Europe/Istanbul"
  },
  {
    "value": 3.5,
    "label": "+03:30 Iran Time - Tehran, Mashhad, Isfahan, Karaj",
    "name": "Asia/Tehran"
  },
  {
    "value": 4,
    "label": "+04:00 Armenia Time - Yerevan, Malatia-Sebastia, Shengavit, Nor Nork",
    "name": "Asia/Yerevan"
  },
  {
    "value": 4,
    "label": "+04:00 Azerbaijan Time - Baku, Sumqayıt, Ganja, Lankaran",
    "name": "Asia/Baku"
  },
  {
    "value": 4,
    "label": "+04:00 Georgia Time - Tbilisi, Batumi, Kutaisi, Rustavi",
    "name": "Asia/Tbilisi"
  },
  {
    "value": 4,
    "label": "+04:00 Gulf Time - Dubai, Abu Dhabi, Sharjah, Al Ain City",
    "name": "Asia/Dubai"
  },
  {
    "value": 4,
    "label": "+04:00 Gulf Time - Muscat, Seeb, Bawshar, ‘Ibrī",
    "name": "Asia/Muscat"
  },
  {
    "value": 4,
    "label": "+04:00 Mauritius Time - Port Louis, Vacoas, Beau Bassin-Rose Hill, Curepipe",
    "name": "Indian/Mauritius"
  },
  {
    "value": 4,
    "label": "+04:00 Réunion Time - Saint-Denis, Saint-Paul, Saint-Pierre, Le Tampon",
    "name": "Indian/Reunion"
  },
  {
    "value": 4,
    "label": "+04:00 Samara Time - Samara, Saratov, Tolyatti, Izhevsk",
    "name": "Europe/Samara"
  },
  {
    "value": 4,
    "label": "+04:00 Seychelles Time - Victoria",
    "name": "Indian/Mahe"
  },
  {
    "value": 4.5,
    "label": "+04:30 Afghanistan Time - Kabul, Herāt, Mazār-e Sharīf, Kandahār",
    "name": "Asia/Kabul"
  },
  {
    "value": 5,
    "label": "+05:00 French Southern & Antarctic Time - Port-aux-Français",
    "name": "Indian/Kerguelen"
  },
  {
    "value": 5,
    "label": "+05:00 Kazakhstan Time - Almaty, Shymkent, Aktobe, Karagandy",
    "name": "Asia/Almaty"
  },
  {
    "value": 5,
    "label": "+05:00 Maldives Time - Male",
    "name": "Indian/Maldives"
  },
  {
    "value": 5,
    "label": "+05:00 Mawson Time - Mawson, Vostok",
    "name": "Antarctica/Mawson"
  },
  {
    "value": 5,
    "label": "+05:00 Pakistan Time - Lahore, Karachi, Peshawar, Faisalabad",
    "name": "Asia/Karachi"
  },
  {
    "value": 5,
    "label": "+05:00 Tajikistan Time - Dushanbe, Isfara, Istaravshan, Kŭlob",
    "name": "Asia/Dushanbe"
  },
  {
    "value": 5,
    "label": "+05:00 Turkmenistan Time - Ashgabat, Türkmenabat, Daşoguz, Mary",
    "name": "Asia/Ashgabat"
  },
  {
    "value": 5,
    "label": "+05:00 Uzbekistan Time - Tashkent, Andijon, Namangan, Samarkand",
    "name": "Asia/Tashkent"
  },
  {
    "value": 5,
    "label": "+05:00 Yekaterinburg Time - Yekaterinburg, Chelyabinsk, Ufa, Perm",
    "name": "Asia/Yekaterinburg"
  },
  {
    "value": 5.5,
    "label": "+05:30 India Time - Colombo, Dehiwala-Mount Lavinia, Maharagama, Jaffna",
    "name": "Asia/Colombo"
  },
  {
    "value": 5.5,
    "label": "+05:30 India Time - Mumbai, Delhi, Bengaluru, Hyderabad",
    "name": "Asia/Kolkata"
  },
  {
    "value": 5.75,
    "label": "+05:45 Nepal Time - Kathmandu, Pokhara, Bharatpur, Pātan",
    "name": "Asia/Kathmandu"
  },
  {
    "value": 6,
    "label": "+06:00 Bangladesh Time - Dhaka, Chattogram, Gazipur, Khulna",
    "name": "Asia/Dhaka"
  },
  {
    "value": 6,
    "label": "+06:00 Bhutan Time - Thimphu, Phuntsholing, Tsirang, Punākha",
    "name": "Asia/Thimphu"
  },
  {
    "value": 6,
    "label": "+06:00 China Time - Ürümqi, Shihezi, Korla, Aqsu",
    "name": "Asia/Urumqi"
  },
  {
    "value": 6,
    "label": "+06:00 Indian Ocean Time - Chagos",
    "name": "Indian/Chagos"
  },
  {
    "value": 6,
    "label": "+06:00 Kyrgyzstan Time - Bishkek, Osh, Jalal-Abad, Karakol",
    "name": "Asia/Bishkek"
  },
  {
    "value": 6,
    "label": "+06:00 Omsk Time - Omsk, Tara, Kalachinsk, Isil’kul’",
    "name": "Asia/Omsk"
  },
  {
    "value": 6.5,
    "label": "+06:30 Cocos Islands Time - West Island",
    "name": "Indian/Cocos"
  },
  {
    "value": 6.5,
    "label": "+06:30 Myanmar Time - Yangon, Mandalay, Nay Pyi Taw, Hlaingthaya Township",
    "name": "Asia/Yangon"
  },
  {
    "value": 7,
    "label": "+07:00 Christmas Island Time - Flying Fish Cove",
    "name": "Indian/Christmas"
  },
  {
    "value": 7,
    "label": "+07:00 Davis Time - Davis",
    "name": "Antarctica/Davis"
  },
  {
    "value": 7,
    "label": "+07:00 Hovd Time - Ulaangom, Khovd, Ölgii, Altai",
    "name": "Asia/Hovd"
  },
  {
    "value": 7,
    "label": "+07:00 Indochina Time - Bangkok, Samut Prakan, Mueang Nonthaburi, Chon Buri",
    "name": "Asia/Bangkok"
  },
  {
    "value": 7,
    "label": "+07:00 Indochina Time - Ho Chi Minh City, Cần Thơ, Da Nang, Biên Hòa",
    "name": "Asia/Ho_Chi_Minh"
  },
  {
    "value": 7,
    "label": "+07:00 Indochina Time - Phnom Penh, Takeo, Siem Reap, Battambang",
    "name": "Asia/Phnom_Penh"
  },
  {
    "value": 7,
    "label": "+07:00 Indochina Time - Vientiane, Savannakhet, Pakse, Thakhèk",
    "name": "Asia/Vientiane"
  },
  {
    "value": 7,
    "label": "+07:00 Novosibirsk Time - Novosibirsk, Krasnoyarsk, Barnaul, Tomsk",
    "name": "Asia/Novosibirsk"
  },
  {
    "value": 7,
    "label": "+07:00 Western Indonesia Time - Jakarta, Surabaya, Bekasi, Bandung",
    "name": "Asia/Jakarta"
  },
  {
    "value": 8,
    "label": "+08:00 Australian Western Time - Casey",
    "name": "Antarctica/Casey"
  },
  {
    "value": 8,
    "label": "+08:00 Australian Western Time - Perth, Mandurah, Bunbury, Geraldton",
    "name": "Australia/Perth"
  },
  {
    "value": 8,
    "label": "+08:00 Brunei Time - Bandar Seri Begawan, Sengkurong, Mentiri, Kuala Belait",
    "name": "Asia/Brunei"
  },
  {
    "value": 8,
    "label": "+08:00 Central Indonesia Time - Makassar, Samarinda, Denpasar, Balikpapan",
    "name": "Asia/Makassar"
  },
  {
    "value": 8,
    "label": "+08:00 China Time - Macau, Taipa, Sé, Luhuan",
    "name": "Asia/Macau"
  },
  {
    "value": 8,
    "label": "+08:00 China Time - Shanghai, Beijing, Shenzhen, Guangzhou",
    "name": "Asia/Shanghai"
  },
  {
    "value": 8,
    "label": "+08:00 Hong Kong Time - Hong Kong, New Territories, Kowloon, Hong Kong Island",
    "name": "Asia/Hong_Kong"
  },
  {
    "value": 8,
    "label": "+08:00 Irkutsk Time - Irkutsk, Ulan-Ude, Bratsk, Angarsk",
    "name": "Asia/Irkutsk"
  },
  {
    "value": 8,
    "label": "+08:00 Malaysia Time - Kuala Lumpur, Johor Bahru, Kampung Baru Subang, Petaling Jaya",
    "name": "Asia/Kuala_Lumpur"
  },
  {
    "value": 8,
    "label": "+08:00 Philippine Time - Quezon City, Davao, Caloocan City, Manila",
    "name": "Asia/Manila"
  },
  {
    "value": 8,
    "label": "+08:00 Singapore Time - Singapore, Ulu Bedok, Bedok New Town, Tampines Estate",
    "name": "Asia/Singapore"
  },
  {
    "value": 8,
    "label": "+08:00 Taiwan Time - Taipei, New Taipei City, Taichung, Kaohsiung",
    "name": "Asia/Taipei"
  },
  {
    "value": 8,
    "label": "+08:00 Ulaanbaatar Time - Ulan Bator, Erdenet, Darhan, Choibalsan",
    "name": "Asia/Ulaanbaatar"
  },
  {
    "value": 8.75,
    "label": "+08:45 Australian Central Western Time - Eucla",
    "name": "Australia/Eucla"
  },
  {
    "value": 9,
    "label": "+09:00 Eastern Indonesia Time - Jayapura, Ambon, Sorong, Ternate",
    "name": "Asia/Jayapura"
  },
  {
    "value": 9,
    "label": "+09:00 Japan Time - Tokyo, Yokohama, Osaka, Nagoya",
    "name": "Asia/Tokyo"
  },
  {
    "value": 9,
    "label": "+09:00 Korean Time - Pyongyang, Hamhŭng, Namp’o, Sunch’ŏn",
    "name": "Asia/Pyongyang"
  },
  {
    "value": 9,
    "label": "+09:00 Korean Time - Seoul, Busan, Incheon, Daegu",
    "name": "Asia/Seoul"
  },
  {
    "value": 9,
    "label": "+09:00 Palau Time - Ngerulmud",
    "name": "Pacific/Palau"
  },
  {
    "value": 9,
    "label": "+09:00 Timor-Leste Time - Dili, Maliana, Suai, Likisá",
    "name": "Asia/Dili"
  },
  {
    "value": 9,
    "label": "+09:00 Yakutsk Time - Chita, Yakutsk, Blagoveshchensk, Belogorsk",
    "name": "Asia/Chita"
  },
  {
    "value": 9.5,
    "label": "+09:30 Australian Central Time - Darwin, Palmerston, Alice Springs",
    "name": "Australia/Darwin"
  },
  {
    "value": 9.5,
    "label": "+09:30 Australian Central Time - Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale",
    "name": "Australia/Adelaide"
  },
  {
    "value": 10,
    "label": "+10:00 Australian Eastern Time - Brisbane, Gold Coast, Sunshine Coast, Logan City",
    "name": "Australia/Brisbane"
  },
  {
    "value": 10,
    "label": "+10:00 Chamorro Time - Dededo Village, Yigo Village, Tamuning-Tumon-Harmon Village, Tamuning",
    "name": "Pacific/Guam"
  },
  {
    "value": 10,
    "label": "+10:00 Chamorro Time - Saipan",
    "name": "Pacific/Saipan"
  },
  {
    "value": 10,
    "label": "+10:00 Chuuk Time - Chuuk",
    "name": "Pacific/Chuuk"
  },
  {
    "value": 10,
    "label": "+10:00 Dumont d’Urville Time - DumontDUrville",
    "name": "Antarctica/DumontDUrville"
  },
  {
    "value": 10,
    "label": "+10:00 Papua New Guinea Time - Port Moresby, Lae, Mount Hagen, Popondetta",
    "name": "Pacific/Port_Moresby"
  },
  {
    "value": 10,
    "label": "+10:00 Vladivostok Time - Khabarovsk, Vladivostok, Khabarovsk Vtoroy, Komsomolsk-on-Amur",
    "name": "Asia/Vladivostok"
  },
  {
    "value": 10,
    "label": "+10:00 Australian Eastern Time - Sydney, Melbourne, Newcastle, Canberra",
    "name": "Australia/Sydney"
  },
  {
    "value": 10.5,
    "label": "+10:30 Lord Howe Time - Lord Howe",
    "name": "Australia/Lord_Howe"
  },
  {
    "value": 11,
    "label": "+11:00 Bougainville Time - Arawa",
    "name": "Pacific/Bougainville"
  },
  {
    "value": 11,
    "label": "+11:00 Kosrae Time - Kosrae, Palikir",
    "name": "Pacific/Kosrae"
  },
  {
    "value": 11,
    "label": "+11:00 New Caledonia Time - Nouméa, Mont-Dore, Dumbéa",
    "name": "Pacific/Noumea"
  },
  {
    "value": 11,
    "label": "+11:00 Sakhalin Time - Yuzhno-Sakhalinsk, Magadan, Korsakov, Kholmsk",
    "name": "Asia/Sakhalin"
  },
  {
    "value": 11,
    "label": "+11:00 Solomon Islands Time - Honiara, Panatina, Nggosi, Tandai",
    "name": "Pacific/Guadalcanal"
  },
  {
    "value": 11,
    "label": "+11:00 Vanuatu Time - Port-Vila",
    "name": "Pacific/Efate"
  },
  {
    "value": 11,
    "label": "+11:00 Norfolk Island Time - Kingston",
    "name": "Pacific/Norfolk"
  },
  {
    "value": 12,
    "label": "+12:00 Fiji Time - Nasinu, Suva, Lautoka, Nadi",
    "name": "Pacific/Fiji"
  },
  {
    "value": 12,
    "label": "+12:00 Gilbert Islands Time - Tarawa",
    "name": "Pacific/Tarawa"
  },
  {
    "value": 12,
    "label": "+12:00 Kamchatka Time - Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Anadyr",
    "name": "Asia/Kamchatka"
  },
  {
    "value": 12,
    "label": "+12:00 Marshall Islands Time - Majuro, Kwajalein",
    "name": "Pacific/Majuro"
  },
  {
    "value": 12,
    "label": "+12:00 Nauru Time - Yaren",
    "name": "Pacific/Nauru"
  },
  {
    "value": 12,
    "label": "+12:00 Tuvalu Time - Funafuti",
    "name": "Pacific/Funafuti"
  },
  {
    "value": 12,
    "label": "+12:00 Wake Island Time - Wake",
    "name": "Pacific/Wake"
  },
  {
    "value": 12,
    "label": "+12:00 Wallis & Futuna Time - Mata-Utu",
    "name": "Pacific/Wallis"
  },
  {
    "value": 12,
    "label": "+12:00 New Zealand Time - Auckland, Christchurch, Wellington, Manukau City",
    "name": "Pacific/Auckland"
  },
  {
    "value": 12,
    "label": "+12:00 New Zealand Time - McMurdo",
    "name": "Antarctica/McMurdo"
  },
  {
    "value": 12.75,
    "label": "+12:45 Chatham Time - Chatham",
    "name": "Pacific/Chatham"
  },
  {
    "value": 13,
    "label": "+13:00 Phoenix Islands Time - Kanton",
    "name": "Pacific/Kanton"
  },
  {
    "value": 13,
    "label": "+13:00 Samoa Time - Apia",
    "name": "Pacific/Apia"
  },
  {
    "value": 13,
    "label": "+13:00 Tokelau Time - Fakaofo",
    "name": "Pacific/Fakaofo"
  },
  {
    "value": 13,
    "label": "+13:00 Tonga Time - Nuku‘alofa",
    "name": "Pacific/Tongatapu"
  },
  {
    "value": 14,
    "label": "+14:00 Line Islands Time - Kiritimati",
    "name": "Pacific/Kiritimati"
  }
];

interface ContractWithTimezoneProps {
  contractText: string;
  onFormattedTextChange?: (text: string) => void;
  /** When provided, a template dropdown is shown in Contract Settings. Keys are option labels. */
  contractTemplates?: Record<string, string>;
  selectedTemplate?: string;
  onTemplateChange?: (templateKey: string) => void;
}

// Helper function to get browser timezone and validate it exists in our options
function getBrowserTimezone(): string {
  try {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Check if the browser timezone exists in our options
    const timezoneExists = timezoneOptions.some(option => option.name === browserTimezone);
    return timezoneExists ? browserTimezone : 'Etc/UTC';
  } catch (error) {
    // Fallback to UTC if timezone detection fails
    return 'Etc/UTC';
  }
}

export default function ContractWithTimezone({
  contractText,
  onFormattedTextChange,
  contractTemplates,
  selectedTemplate,
  onTemplateChange,
}: ContractWithTimezoneProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
    // Initialize with browser timezone on client-side
    if (typeof window !== 'undefined') {
      return getBrowserTimezone();
    }
    return 'Etc/UTC';
  });

  const [buyer, setBuyer] = useState('BUYER');
  const [seller, setSeller] = useState('SELLER');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(() => new Date());

  // Format Date for datetime-local input (local time)
  const toDateTimeLocalValue = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Update timezone on mount to ensure we have the browser timezone
  useEffect(() => {
    const browserTimezone = getBrowserTimezone();
    setSelectedTimezone(browserTimezone);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex items-center justify-between text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <span>Contract Settings</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isAccordionOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isAccordionOpen && (
          <div className="mt-2 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {contractTemplates && onTemplateChange && selectedTemplate !== undefined && (
              <div>
                <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template
                </label>
                <select
                  id="template-select"
                  value={selectedTemplate}
                  onChange={(e) => onTemplateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {Object.keys(contractTemplates).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="seller-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seller
                </label>
                <input
                  id="seller-input"
                  type="text"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter seller name"
                />
              </div>
              <div>
                <label htmlFor="buyer-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Buyer
                </label>
                <input
                  id="buyer-input"
                  type="text"
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter buyer name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="start-date-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start date
              </label>
              <input
                id="start-date-input"
                type="datetime-local"
                value={toDateTimeLocalValue(startDate)}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : new Date())}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                id="timezone-select"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {timezoneOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <ContractText 
        contractText={contractText} 
        timezone={selectedTimezone} 
        buyer={buyer} 
        seller={seller}
        startDate={startDate}
        {...(onFormattedTextChange && { onFormattedTextChange })}
      />
    </div>
  );
}
