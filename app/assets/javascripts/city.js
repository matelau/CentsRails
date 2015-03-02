	// //build datalists on load
$(document).ready(function() {
	var server_cities = [
	    "Abbeville, Louisiana",
	    "Aberdeen, South Dakota",
	    "Abilene, Texas",
	    "Acworth, Georgia",
	    "Ada, Oklahoma",
	    "Affton, Missouri",
	    "Afton, Wyoming",
	    "Ahuimanu, Hawaii",
	    "Aiea, Hawaii",
	    "Aiken, South Carolina",
	    "Akron, Ohio",
	    "Alabama",
	    "Alabaster, Alabama",
	    "Alafaya, Florida",
	    "Alamogordo, New Mexico",
	    "Alaska",
	    "Albany, Georgia",
	    "Albany, New York",
	    "Albany, Oregon",
	    "Albertville, Alabama",
	    "Albuquerque, New Mexico",
	    "Alexander City, Alabama",
	    "Alexandria, Louisiana",
	    "Alexandria, Virginia",
	    "Allen Park, Michigan",
	    "Allen, Texas",
	    "Allentown, Pennsylvania",
	    "Alliance, Nebraska",
	    "Allison Park, Pennsylvania",
	    "Aloha, Oregon",
	    "Alpharetta, Georgia",
	    "Altamont, Oregon",
	    "Altoona, Iowa",
	    "Altoona, Pennsylvania",
	    "Altus, Oklahoma",
	    "Amarillo, Texas",
	    "American Falls, Idaho",
	    "American Fork, Utah",
	    "Ames, Iowa",
	    "Ammon, Idaho",
	    "Anaconda-Deer Lodge County, Montana",
	    "Anaheim, California",
	    "Anchor Point, Alaska",
	    "Anchorage, Alaska",
	    "Anderson, Indiana",
	    "Anderson, South Carolina",
	    "Andover, Kansas",
	    "Andover, Minnesota",
	    "Ankeny, Iowa",
	    "Ann Arbor, Michigan",
	    "Annandale, Virginia",
	    "Annapolis, Maryland",
	    "Anniston, Alabama",
	    "Ansonia, Connecticut",
	    "Antelope Valley-Crestview, Wyoming",
	    "Anthem, Arizona",
	    "Anthony, New Mexico",
	    "Antioch, California",
	    "Apache Junction, Arizona",
	    "Apex, North Carolina",
	    "Apple Valley, Minnesota",
	    "Appleton, Wisconsin",
	    "Ardmore, Oklahoma",
	    "Arizona",
	    "Arkadelphia, Arkansas",
	    "Arkansas",
	    "Arkansas City, Kansas",
	    "Arlington Heights, Illinois",
	    "Arlington, Massachusetts",
	    "Arlington, Texas",
	    "Arlington, Vermont",
	    "Arlington, Virginia",
	    "Arnold, Missouri",
	    "Artesia, New Mexico",
	    "Arvada, Colorado",
	    "Ashaway, Rhode Island",
	    "Ashburn, Virginia",
	    "Asheboro, North Carolina",
	    "Asheville, North Carolina",
	    "Ashland, Kentucky",
	    "Ashland, Oregon",
	    "Aspen Hill, Maryland",
	    "Atchison, Kansas",
	    "Athens, Alabama",
	    "Athens, Georgia",
	    "Athens, Tennessee",
	    "Atlanta, Georgia",
	    "Atlantic City, New Jersey",
	    "Attleboro, Massachusetts",
	    "Auburn, Alabama",
	    "Auburn, Maine",
	    "Auburn, Nebraska",
	    "Auburn, Washington",
	    "Augusta, Georgia",
	    "Augusta, Kansas",
	    "Augusta, Maine",
	    "Aurora, Colorado",
	    "Aurora, Illinois",
	    "Aurora, Nebraska",
	    "Austin, Minnesota",
	    "Austin, Texas",
	    "Avondale, Arizona",
	    "Aztec, New Mexico",
	    "Badger, Alaska",
	    "Baker, Louisiana",
	    "Bakersfield, California",
	    "Baldwin, Pennsylvania",
	    "Ballwin, Missouri",
	    "Baltimore, Maryland",
	    "Bangor, Maine",
	    "Bar Nunn, Wyoming",
	    "Barboursville, West Virginia",
	    "Bardstown, Kentucky",
	    "Barnstable Town, Massachusetts",
	    "Barre, Vermont",
	    "Barrow, Alaska",
	    "Bartlesville, Oklahoma",
	    "Bartlett, Illinois",
	    "Bartlett, Tennessee",
	    "Batesville, Arkansas",
	    "Bath, Maine",
	    "Baton Rouge, Louisiana",
	    "Battle Creek, Michigan",
	    "Battle Mountain, Nevada",
	    "Bay City, Michigan",
	    "Bay St. Louis, Mississippi",
	    "Bayonne, New Jersey",
	    "Bayou Blue, Louisiana",
	    "Bayou Cane, Louisiana",
	    "Bear, Delaware",
	    "Beatrice, Nebraska",
	    "Beaufort, South Carolina",
	    "Beaumont, Texas",
	    "Beavercreek, Ohio",
	    "Beaverton, Oregon",
	    "Beckley, West Virginia",
	    "Bel Air North, Maryland",
	    "Bel Air South, Maryland",
	    "Belcourt, North Dakota",
	    "Belen, New Mexico",
	    "Belfast, Maine",
	    "Belgrade, Montana",
	    "Bella Vista, Arkansas",
	    "Belle Chasse, Louisiana",
	    "Belle Fourche, South Dakota",
	    "Belleville, Illinois",
	    "Bellevue, Nebraska",
	    "Bellevue, Washington",
	    "Bellingham, Washington",
	    "Bellows Falls, Vermont",
	    "Beloit, Wisconsin",
	    "Belton, Missouri",
	    "Bend, Oregon",
	    "Bennington, Vermont",
	    "Benton, Arkansas",
	    "Bentonville, Arkansas",
	    "Berea, Kentucky",
	    "Berea, South Carolina",
	    "Beresford, South Dakota",
	    "Bergenfield, New Jersey",
	    "Berkeley, California",
	    "Berlin, New Hampshire",
	    "Bernalillo, New Mexico",
	    "Berwyn, Illinois",
	    "Bessemer, Alabama",
	    "Bethany, Oklahoma",
	    "Bethany, Oregon",
	    "Bethel Park, Pennsylvania",
	    "Bethel, Alaska",
	    "Bethel, Connecticut",
	    "Bethesda, Maryland",
	    "Bethlehem, Pennsylvania",
	    "Bettendorf, Iowa",
	    "Beulah, North Dakota",
	    "Beverly, Massachusetts",
	    "Biddeford, Maine",
	    "Big Lake, Alaska",
	    "Bigfork, Montana",
	    "Billings, Montana",
	    "Biloxi, Mississippi",
	    "Binghamton, New York",
	    "Birmingham, Alabama",
	    "Bismarck, North Dakota",
	    "Bixby, Oklahoma",
	    "Blackfoot, Idaho",
	    "Blackhawk, South Dakota",
	    "Blacksburg, Virginia",
	    "Blades, Delaware",
	    "Blaine, Minnesota",
	    "Blair, Nebraska",
	    "Blennerhassett, West Virginia",
	    "Bloomfield, New Mexico",
	    "Bloomington, Illinois",
	    "Bloomington, Indiana",
	    "Bloomington, Minnesota",
	    "Blue Springs, Missouri",
	    "Bluefield, West Virginia",
	    "Bluffton, South Carolina",
	    "Blytheville, Arkansas",
	    "Boardman, Ohio",
	    "Boca Raton, Florida",
	    "Bogalusa, Louisiana",
	    "Boise, Idaho",
	    "Bolingbrook, Illinois",
	    "Boone, Iowa",
	    "Booneville, Mississippi",
	    "Bossier City, Louisiana",
	    "Boston, Massachusetts",
	    "Bothell, Washington",
	    "Bottineau, North Dakota",
	    "Boulder City, Nevada",
	    "Boulder, Colorado",
	    "Bountiful, Utah",
	    "Bowie, Maryland",
	    "Bowling Green, Kentucky",
	    "Bowman, North Dakota",
	    "Box Elder, South Dakota",
	    "Boynton Beach, Florida",
	    "Bozeman, Montana",
	    "Bradford, Rhode Island",
	    "Braintree Town, Massachusetts",
	    "Brandon, Florida",
	    "Brandon, Mississippi",
	    "Brandon, South Dakota",
	    "Brandon, Vermont",
	    "Brattleboro, Vermont",
	    "Bremerton, Washington",
	    "Brentwood, New York",
	    "Brentwood, Tennessee",
	    "Brewer, Maine",
	    "Bridgeport, Connecticut",
	    "Bridgeport, West Virginia",
	    "Bridgeton, New Jersey",
	    "Bridgeville, Delaware",
	    "Brigham City, Utah",
	    "Brighton, Colorado",
	    "Brighton, New York",
	    "Bristol, Connecticut",
	    "Bristol, New Hampshire",
	    "Bristol, Tennessee",
	    "Bristol, Vermont",
	    "Brockton, Massachusetts",
	    "Broken Arrow, Oklahoma",
	    "Broken Bow, Nebraska",
	    "Brookfield, Wisconsin",
	    "Brookhaven, Mississippi",
	    "Brookhaven, West Virginia",
	    "Brookings, South Dakota",
	    "Brookline, Massachusetts",
	    "Brooklyn Center, Minnesota",
	    "Brooklyn Park, Minnesota",
	    "Brookside, Delaware",
	    "Broomfield, Colorado",
	    "Brownsburg, Indiana",
	    "Brownsville, Texas",
	    "Brunswick, Maine",
	    "Brunswick, Ohio",
	    "Bryant, Arkansas",
	    "Buckeye, Arizona",
	    "Buckhannon, West Virginia",
	    "Buffalo Grove, Illinois",
	    "Buffalo, New York",
	    "Buffalo, Wyoming",
	    "Buhl, Idaho",
	    "Bullhead City, Arizona",
	    "Burbank, California",
	    "Burien, Washington",
	    "Burke, Virginia",
	    "Burley, Idaho",
	    "Burlington, Iowa",
	    "Burlington, Kentucky",
	    "Burlington, North Carolina",
	    "Burlington, Vermont",
	    "Burnsville, Minnesota",
	    "Burton, Michigan",
	    "Butte, Alaska",
	    "Butte-Silver Bow, Montana",
	    "Byram, Mississippi",
	    "Cabot, Arkansas",
	    "Caldwell, Idaho",
	    "Caledonia, Wisconsin",
	    "California",
	    "Cambridge, Massachusetts",
	    "Camden, Arkansas",
	    "Camden, Delaware",
	    "Camden, Maine",
	    "Camden, New Jersey",
	    "Campbellsville, Kentucky",
	    "Canby, Oregon",
	    "Candler-McAfee, Georgia",
	    "Canton, Georgia",
	    "Canton, Mississippi",
	    "Canton, Ohio",
	    "Canton, South Dakota",
	    "Cape Coral, Florida",
	    "Cape Girardeau, Missouri",
	    "Caribou, Maine",
	    "Carlin, Nevada",
	    "Carlisle, Pennsylvania",
	    "Carlsbad, California",
	    "Carlsbad, New Mexico",
	    "Carmel, Indiana",
	    "Carney, Maryland",
	    "Carol Stream, Illinois",
	    "Carolina, Rhode Island",
	    "Carrboro, North Carolina",
	    "Carrington, North Dakota",
	    "Carroll, Iowa",
	    "Carrollton, Georgia",
	    "Carrollton, Texas",
	    "Carson City, Nevada",
	    "Carteret, New Jersey",
	    "Cartersville, Georgia",
	    "Cary, North Carolina",
	    "Casa Grande, Arizona",
	    "Casas Adobes, Arizona",
	    "Casper, Wyoming",
	    "Casselton, North Dakota",
	    "Castle Rock, Colorado",
	    "Castleton, Vermont",
	    "Catalina Foothills, Arizona",
	    "Catonsville, Maryland",
	    "Cavalier, North Dakota",
	    "Cave Spring, Virginia",
	    "Cayce, South Carolina",
	    "Cedar City, Utah",
	    "Cedar Falls, Iowa",
	    "Cedar Mill, Oregon",
	    "Cedar Rapids, Iowa",
	    "Centennial, Colorado",
	    "Center Point, Alabama",
	    "Centereach, New York",
	    "Centerton, Arkansas",
	    "Central Falls, Rhode Island",
	    "Central Islip, New York",
	    "Central Point, Oregon",
	    "Central, Louisiana",
	    "Centreville, Virginia",
	    "Chadron, Nebraska",
	    "Chalco, Nebraska",
	    "Chalmette, Louisiana",
	    "Chamberlain, South Dakota",
	    "Chambersburg, Pennsylvania",
	    "Champaign, Illinois",
	    "Champlin, Minnesota",
	    "Chandler, Arizona",
	    "Chanhassen, Minnesota",
	    "Chanute, Kansas",
	    "Chaparral, New Mexico",
	    "Chapel Hill, North Carolina",
	    "Charles Town, West Virginia",
	    "Charleston, South Carolina",
	    "Charleston, West Virginia",
	    "Charlotte, North Carolina",
	    "Charlottesville, Virginia",
	    "Chaska, Minnesota",
	    "Chattanooga, Tennessee",
	    "Cheat Lake, West Virginia",
	    "Cheektowaga, New York",
	    "Chelsea, Massachusetts",
	    "Chena Ridge, Alaska",
	    "Chepachet, Rhode Island",
	    "Chesapeake, Virginia",
	    "Chester, Pennsylvania",
	    "Chester, Vermont",
	    "Chesterfield, Missouri",
	    "Cheswold, Delaware",
	    "Cheyenne, Wyoming",
	    "Chicago, Illinois",
	    "Chickasha, Oklahoma",
	    "Chicopee, Massachusetts",
	    "Chillum, Maryland",
	    "Choctaw, Oklahoma",
	    "Chubbuck, Idaho",
	    "Chula Vista, California",
	    "Cicero, Illinois",
	    "Cimarron Hills, Colorado",
	    "Cincinnati, Ohio",
	    "Claiborne, Louisiana",
	    "Claremont, New Hampshire",
	    "Claremore, Oklahoma",
	    "Clarksburg, West Virginia",
	    "Clarksdale, Mississippi",
	    "Clarksville, Arkansas",
	    "Clarksville, Indiana",
	    "Clarksville, Tennessee",
	    "Claymont, Delaware",
	    "Clayton, Delaware",
	    "Clayville, Rhode Island",
	    "Clearfield, Utah",
	    "Clearwater, Florida",
	    "Clemson, South Carolina",
	    "Cleveland Heights, Ohio",
	    "Cleveland, Mississippi",
	    "Cleveland, Ohio",
	    "Cleveland, Tennessee",
	    "Cliffside Park, New Jersey",
	    "Clifton, Colorado",
	    "Clifton, New Jersey",
	    "Clinton, Iowa",
	    "Clinton, Maryland",
	    "Clinton, Mississippi",
	    "Clinton, Utah",
	    "Clive, Iowa",
	    "Clovis, New Mexico",
	    "Cody, Wyoming",
	    "Coeur d'Alene, Idaho",
	    "Coffeyville, Kansas",
	    "Cold Springs, Nevada",
	    "College Park, Maryland",
	    "College Station, Texas",
	    "College, Alaska",
	    "Collierville, Tennessee",
	    "Colonial Pine Hills, South Dakota",
	    "Colorado",
	    "Colorado Springs, Colorado",
	    "Colstrip, Montana",
	    "Columbia Falls, Montana",
	    "Columbia, Maryland",
	    "Columbia, Missouri",
	    "Columbia, South Carolina",
	    "Columbia, Tennessee",
	    "Columbine, Colorado",
	    "Columbus, Georgia",
	    "Columbus, Indiana",
	    "Columbus, Mississippi",
	    "Columbus, Nebraska",
	    "Columbus, Ohio",
	    "Commack, New York",
	    "Commerce City, Colorado",
	    "Concord, California",
	    "Concord, New Hampshire",
	    "Concord, North Carolina",
	    "Connecticut",
	    "Conning Towers Nautilus Park, Connecticut",
	    "Conrad, Montana",
	    "Contoocook, New Hampshire",
	    "Conway, Arkansas",
	    "Conway, South Carolina",
	    "Cookeville, Tennessee",
	    "Coon Rapids, Minnesota",
	    "Coos Bay, Oregon",
	    "Coral Springs, Florida",
	    "Coralville, Iowa",
	    "Coram, New York",
	    "Cordova, Alaska",
	    "Corinth, Mississippi",
	    "Cornelius, North Carolina",
	    "Corona, California",
	    "Corpus Christi, Texas",
	    "Corrales, New Mexico",
	    "Corvallis, Oregon",
	    "Costa Mesa, California",
	    "Cottage Grove, Minnesota",
	    "Cottage Lake, Washington",
	    "Cottonwood Heights, Utah",
	    "Council Bluffs, Iowa",
	    "Covington, Kentucky",
	    "Coweta, Oklahoma",
	    "Cozad, Nebraska",
	    "Cranston, Rhode Island",
	    "Crete, Nebraska",
	    "Creve Coeur, Missouri",
	    "Crofton, Maryland",
	    "Cross Lanes, West Virginia",
	    "Crowley, Louisiana",
	    "Crown Point, Indiana",
	    "Crystal Lake, Illinois",
	    "Cudahy, Wisconsin",
	    "Cullman, Alabama",
	    "Cumberland Hill, Rhode Island",
	    "Custer, South Dakota",
	    "Cut Bank, Montana",
	    "Cuyahoga Falls, Ohio",
	    "D'Iberville, Mississippi",
	    "Dakota Dunes, South Dakota",
	    "Dakota Ridge, Colorado",
	    "Dale City, Virginia",
	    "Dallas, Oregon",
	    "Dallas, Texas",
	    "Dalton, Georgia",
	    "Daly City, California",
	    "Danbury, Connecticut",
	    "Danville, Kentucky",
	    "Danville, Virginia",
	    "Daphne, Alabama",
	    "Darien, Connecticut",
	    "Davenport, Iowa",
	    "Davie, Florida",
	    "Dayton, Nevada",
	    "Dayton, Ohio",
	    "Daytona Beach, Florida",
	    "De Pere, Wisconsin",
	    "DeKalb, Illinois",
	    "Dearborn Heights, Michigan",
	    "Dearborn, Michigan",
	    "Decatur, Alabama",
	    "Decatur, Illinois",
	    "Deer Lodge, Montana",
	    "Deerfield Beach, Florida",
	    "Del City, Oklahoma",
	    "Delaware",
	    "Delaware City, Delaware",
	    "Delaware, Ohio",
	    "Dell Rapids, South Dakota",
	    "Delmar, Delaware",
	    "Deltona, Florida",
	    "Deming, New Mexico",
	    "Denton, Texas",
	    "Dentsville, South Carolina",
	    "Denver, Colorado",
	    "Derby, Connecticut",
	    "Derby, Kansas",
	    "Derry, New Hampshire",
	    "Des Moines, Iowa",
	    "Des Moines, Washington",
	    "Des Plaines, Illinois",
	    "Detroit, Michigan",
	    "Devils Lake, North Dakota",
	    "Dickinson, North Dakota",
	    "Dickson, Tennessee",
	    "Dillingham, Alaska",
	    "Dillon, Montana",
	    "District of Columbia",
	    "Dodge City, Kansas",
	    "Dothan, Alabama",
	    "Douglas, Arizona",
	    "Douglas, Wyoming",
	    "Douglasville, Georgia",
	    "Dover Base Housing, Delaware",
	    "Dover, Delaware",
	    "Dover, New Hampshire",
	    "Downers Grove, Illinois",
	    "Downey, California",
	    "Draper, Utah",
	    "Drexel Heights, Arizona",
	    "Drexel Hill, Pennsylvania",
	    "Dublin, Ohio",
	    "Dubuque, Iowa",
	    "Duluth, Georgia",
	    "Duluth, Minnesota",
	    "Dunbar, West Virginia",
	    "Duncan, Oklahoma",
	    "Dundalk, Maryland",
	    "Dunwoody, Georgia",
	    "Durango, Colorado",
	    "Durant, Oklahoma",
	    "Durham, New Hampshire",
	    "Durham, North Carolina",
	    "Dyersburg, Tennessee",
	    "Eagan, Minnesota",
	    "Eagle Mountain, Utah",
	    "Eagle, Idaho",
	    "Easley, South Carolina",
	    "East Chicago, Indiana",
	    "East Hartford, Connecticut",
	    "East Haven, Connecticut",
	    "East Honolulu, Hawaii",
	    "East Lansing, Michigan",
	    "East Los Angeles, California",
	    "East Meadow, New York",
	    "East Merrimack, New Hampshire",
	    "East Orange, New Jersey",
	    "East Point, Georgia",
	    "East Providence, Rhode Island",
	    "East Ridge, Tennessee",
	    "Easton, Pennsylvania",
	    "Eastpointe, Michigan",
	    "Eau Claire, Wisconsin",
	    "Eden Prairie, Minnesota",
	    "Edgemoor, Delaware",
	    "Edina, Minnesota",
	    "Edinburg, Texas",
	    "Edmond, Oklahoma",
	    "Edmonds, Washington",
	    "Eielson AFB, Alaska",
	    "El Cajon, California",
	    "El Dorado, Arkansas",
	    "El Dorado, Kansas",
	    "El Mirage, Arizona",
	    "El Monte, California",
	    "El Paso, Texas",
	    "El Reno, Oklahoma",
	    "Eldersburg, Maryland",
	    "Eldorado at Santa Fe, New Mexico",
	    "Elgin, Illinois",
	    "Elizabeth, New Jersey",
	    "Elizabethton, Tennessee",
	    "Elizabethtown, Kentucky",
	    "Elk City, Oklahoma",
	    "Elk Grove, California",
	    "Elk Point, South Dakota",
	    "Elk River, Minnesota",
	    "Elkhart, Indiana",
	    "Elkins, West Virginia",
	    "Elko, Nevada",
	    "Ellendale, North Dakota",
	    "Ellicott City, Maryland",
	    "Ellsworth, Maine",
	    "Elmhurst, Illinois",
	    "Elmira, New York",
	    "Elmont, New York",
	    "Elsmere, Delaware",
	    "Ely, Nevada",
	    "Elyria, Ohio",
	    "Emmett, Idaho",
	    "Emporia, Kansas",
	    "Englewood, Colorado",
	    "Englewood, New Jersey",
	    "Enid, Oklahoma",
	    "Enosburg Falls, Vermont",
	    "Enterprise, Alabama",
	    "Enterprise, Nevada",
	    "Erie, Colorado",
	    "Erie, Pennsylvania",
	    "Erlanger, Kentucky",
	    "Escondido, California",
	    "Essex Junction, Vermont",
	    "Essex, Maryland",
	    "Estelle, Louisiana",
	    "Ester, Alaska",
	    "Ethete, Wyoming",
	    "Euclid, Ohio",
	    "Eugene, Oregon",
	    "Evans, Colorado",
	    "Evans, Georgia",
	    "Evanston, Illinois",
	    "Evanston, Wyoming",
	    "Evansville, Indiana",
	    "Evansville, Wyoming",
	    "Everett, Massachusetts",
	    "Everett, Washington",
	    "Evergreen, Montana",
	    "Ewa Beach, Hawaii",
	    "Ewa Gentry, Hawaii",
	    "Exeter, New Hampshire",
	    "Fair Haven, Vermont",
	    "Fair Lawn, New Jersey",
	    "Fair Oaks, Virginia",
	    "Fairbanks, Alaska",
	    "Fairborn, Ohio",
	    "Fairbury, Nebraska",
	    "Fairfield, California",
	    "Fairfield, Iowa",
	    "Fairfield, Ohio",
	    "Fairhope, Alabama",
	    "Fairmont, West Virginia",
	    "Fall River, Massachusetts",
	    "Fallon, Nevada",
	    "Falls City, Nebraska",
	    "Fargo, North Dakota",
	    "Faribault, Minnesota",
	    "Farmers Loop, Alaska",
	    "Farmington Hills, Michigan",
	    "Farmington, Maine",
	    "Farmington, New Hampshire",
	    "Farmington, New Mexico",
	    "Farmington, Utah",
	    "Farragut, Tennessee",
	    "Fayetteville, Arkansas",
	    "Fayetteville, North Carolina",
	    "Federal Way, Washington",
	    "Ferguson, Missouri",
	    "Fernley, Nevada",
	    "Findlay, Ohio",
	    "Fishers, Indiana",
	    "Fishhook, Alaska",
	    "Fitchburg, Massachusetts",
	    "Fitchburg, Wisconsin",
	    "Five Forks, South Carolina",
	    "Flagstaff, Arizona",
	    "Flandreau, South Dakota",
	    "Flint, Michigan",
	    "Florence, Alabama",
	    "Florence, Arizona",
	    "Florence, Kentucky",
	    "Florence, South Carolina",
	    "Florida",
	    "Florissant, Missouri",
	    "Foley, Alabama",
	    "Fond du Lac, Wisconsin",
	    "Fontana, California",
	    "Forest Grove, Oregon",
	    "Forest Hills, Michigan",
	    "Forrest City, Arkansas",
	    "Fort Campbell North, Kentucky",
	    "Fort Collins, Colorado",
	    "Fort Dodge, Iowa",
	    "Fort Knox, Kentucky",
	    "Fort Lauderdale, Florida",
	    "Fort Lee, New Jersey",
	    "Fort Madison, Iowa",
	    "Fort Myers, Florida",
	    "Fort Pierre, South Dakota",
	    "Fort Riley, Kansas",
	    "Fort Scott, Kansas",
	    "Fort Smith, Arkansas",
	    "Fort Thomas, Kentucky",
	    "Fort Washakie, Wyoming",
	    "Fort Wayne, Indiana",
	    "Fort Worth, Texas",
	    "Fortuna Foothills, Arizona",
	    "Foster Center, Rhode Island",
	    "Fountain Hills, Arizona",
	    "Fountain, Colorado",
	    "Four Corners, Montana",
	    "Four Corners, Oregon",
	    "Fox Farm-College, Wyoming",
	    "Framingham, Massachusetts",
	    "Frankfort, Kentucky",
	    "Franklin Square, New York",
	    "Franklin Town, Massachusetts",
	    "Franklin, Indiana",
	    "Franklin, New Hampshire",
	    "Franklin, Tennessee",
	    "Franklin, Wisconsin",
	    "Frederick, Maryland",
	    "Fredericksburg, Virginia",
	    "Freeport, New York",
	    "Fremont, California",
	    "Fremont, Nebraska",
	    "Fresno, California",
	    "Fridley, Minnesota",
	    "Frisco, Texas",
	    "Fruitland, Idaho",
	    "Fullerton, California",
	    "Fullerton, Pennsylvania",
	    "Gadsden, Alabama",
	    "Gaffney, South Carolina",
	    "Gahanna, Ohio",
	    "Gainesville, Florida",
	    "Gainesville, Georgia",
	    "Gaithersburg, Maryland",
	    "Gallatin, Tennessee",
	    "Gallup, New Mexico",
	    "Gantt, South Carolina",
	    "Garden City, Idaho",
	    "Garden City, Kansas",
	    "Garden City, Michigan",
	    "Garden Grove, California",
	    "Gardiner, Maine",
	    "Gardner, Kansas",
	    "Gardnerville Ranchos, Nevada",
	    "Gardnerville, Nevada",
	    "Garfield, New Jersey",
	    "Garland, Texas",
	    "Garner, North Carolina",
	    "Garrison, North Dakota",
	    "Gary, Indiana",
	    "Gastonia, North Carolina",
	    "Gateway, Alaska",
	    "Gautier, Mississippi",
	    "Georgetown, Delaware",
	    "Georgetown, Kentucky",
	    "Georgia",
	    "Gering, Nebraska",
	    "Germantown, Maryland",
	    "Germantown, Tennessee",
	    "Germantown, Wisconsin",
	    "Gilbert, Arizona",
	    "Gillette, Wyoming",
	    "Gladstone, Missouri",
	    "Glasgow, Delaware",
	    "Glasgow, Kentucky",
	    "Glasgow, Montana",
	    "Glen Burnie, Maryland",
	    "Glendale, Arizona",
	    "Glendale, California",
	    "Glendive, Montana",
	    "Glenpool, Oklahoma",
	    "Glenrock, Wyoming",
	    "Glenview, Illinois",
	    "Goffstown, New Hampshire",
	    "Golden, Colorado",
	    "Goldsboro, North Carolina",
	    "Goldstream, Alaska",
	    "Gooding, Idaho",
	    "Goodlettsville, Tennessee",
	    "Goodyear, Arizona",
	    "Goose Creek, South Carolina",
	    "Gorham, Maine",
	    "Goshen, Indiana",
	    "Gothenburg, Nebraska",
	    "Grafton, North Dakota",
	    "Grafton, West Virginia",
	    "Grand Forks AFB, North Dakota",
	    "Grand Forks, North Dakota",
	    "Grand Island, Nebraska",
	    "Grand Junction, Colorado",
	    "Grand Prairie, Texas",
	    "Grand Rapids, Michigan",
	    "Grandview, Missouri",
	    "Granger, Indiana",
	    "Grangeville, Idaho",
	    "Grants Pass, Oregon",
	    "Grants, New Mexico",
	    "Great Bend, Kansas",
	    "Great Falls, Montana",
	    "Greeley, Colorado",
	    "Green Bay, Wisconsin",
	    "Green River, Wyoming",
	    "Green Valley, Arizona",
	    "Greene, Rhode Island",
	    "Greeneville, Tennessee",
	    "Greenfield, Wisconsin",
	    "Greensboro, North Carolina",
	    "Greenville, Delaware",
	    "Greenville, Mississippi",
	    "Greenville, North Carolina",
	    "Greenville, Rhode Island",
	    "Greenville, South Carolina",
	    "Greenwich, Connecticut",
	    "Greenwood, Arkansas",
	    "Greenwood, Indiana",
	    "Greenwood, Mississippi",
	    "Greenwood, South Carolina",
	    "Greer, South Carolina",
	    "Grenada, Mississippi",
	    "Gresham, Oregon",
	    "Gretna, Louisiana",
	    "Gretna, Nebraska",
	    "Greybull, Wyoming",
	    "Griffin, Georgia",
	    "Grinnell, Iowa",
	    "Groton, Connecticut",
	    "Grove City, Ohio",
	    "Gulfport, Mississippi",
	    "Guthrie, Oklahoma",
	    "Guymon, Oklahoma",
	    "Hackensack, New Jersey",
	    "Hagerstown, Maryland",
	    "Haiku-Pauwela, Hawaii",
	    "Hailey, Idaho",
	    "Halawa, Hawaii",
	    "Hamilton, Montana",
	    "Hamilton, Ohio",
	    "Hammond, Indiana",
	    "Hammond, Louisiana",
	    "Hampden, Maine",
	    "Hampton Beach, New Hampshire",
	    "Hampton, New Hampshire",
	    "Hampton, Virginia",
	    "Hanahan, South Carolina",
	    "Hannibal, Missouri",
	    "Hanover, New Hampshire",
	    "Hanover, Pennsylvania",
	    "Hardin, Montana",
	    "Hardwick, Vermont",
	    "Harmony, Rhode Island",
	    "Harrington, Delaware",
	    "Harrisburg, Pennsylvania",
	    "Harrisburg, South Dakota",
	    "Harrison, Arkansas",
	    "Harrisonburg, Virginia",
	    "Harrisville, Rhode Island",
	    "Hartford, Connecticut",
	    "Hartford, South Dakota",
	    "Harvey, Louisiana",
	    "Harvey, North Dakota",
	    "Hastings, Nebraska",
	    "Hattiesburg, Mississippi",
	    "Havelock, North Carolina",
	    "Haverhill, Massachusetts",
	    "Havre, Montana",
	    "Hawaii",
	    "Hawaiian Paradise Park, Hawaii",
	    "Hawthorne, Nevada",
	    "Hayden, Idaho",
	    "Hayesville, Oregon",
	    "Hays, Kansas",
	    "Haysville, Kansas",
	    "Hayward, California",
	    "Hazelwood, Missouri",
	    "Hazen, North Dakota",
	    "Hazleton, Pennsylvania",
	    "Helena Valley Northeast, Montana",
	    "Helena Valley Northwest, Montana",
	    "Helena Valley Southeast, Montana",
	    "Helena Valley West Central, Montana",
	    "Helena, Alabama",
	    "Helena, Montana",
	    "Helena-West Helena, Arkansas",
	    "Hempstead, New York",
	    "Henderson, Kentucky",
	    "Henderson, Nevada",
	    "Hendersonville, Tennessee",
	    "Henniker, New Hampshire",
	    "Hermiston, Oregon",
	    "Hermitage, Pennsylvania",
	    "Hernando, Mississippi",
	    "Herndon, Virginia",
	    "Herriman, Utah",
	    "Hettinger, North Dakota",
	    "Hialeah, Florida",
	    "Hickam Housing, Hawaii",
	    "Hickory, North Carolina",
	    "Hicksville, New York",
	    "High Point, North Carolina",
	    "Highland Acres, Delaware",
	    "Highland, Indiana",
	    "Highlands Ranch, Colorado",
	    "Hillsboro, North Dakota",
	    "Hillsboro, Oregon",
	    "Hillsborough, New Hampshire",
	    "Hilo, Hawaii",
	    "Hilton Head Island, South Carolina",
	    "Hinesville, Georgia",
	    "Hobart, Indiana",
	    "Hobbs, New Mexico",
	    "Hoboken, New Jersey",
	    "Hockessin, Delaware",
	    "Hoffman Estates, Illinois",
	    "Holdrege, Nebraska",
	    "Holladay, Utah",
	    "Holland, Michigan",
	    "Holly Springs, North Carolina",
	    "Hollywood, Florida",
	    "Holualoa, Hawaii",
	    "Holyoke, Massachusetts",
	    "Homer, Alaska",
	    "Homewood, Alabama",
	    "Honolulu, Hawaii",
	    "Hooksett, New Hampshire",
	    "Hoover, Alabama",
	    "Hope Valley, Rhode Island",
	    "Hope, Arkansas",
	    "Hopkinsville, Kentucky",
	    "Horace, North Dakota",
	    "Horn Lake, Mississippi",
	    "Hot Springs Village, Arkansas",
	    "Hot Springs, Arkansas",
	    "Hot Springs, South Dakota",
	    "Houlton, Maine",
	    "Houma, Louisiana",
	    "Houston, Texas",
	    "Huber Heights, Ohio",
	    "Hudson, New Hampshire",
	    "Hueytown, Alabama",
	    "Huntersville, North Carolina",
	    "Huntington Beach, California",
	    "Huntington Station, New York",
	    "Huntington, West Virginia",
	    "Huntsville, Alabama",
	    "Huron, South Dakota",
	    "Hurricane, West Virginia",
	    "Hutchinson, Kansas",
	    "Idaho",
	    "Idaho Falls, Idaho",
	    "Illinois",
	    "Incline Village, Nevada",
	    "Independence, Kansas",
	    "Independence, Kentucky",
	    "Independence, Missouri",
	    "Indian Hills, Nevada",
	    "Indian Trail, North Carolina",
	    "Indiana",
	    "Indianapolis, Indiana",
	    "Indianola, Iowa",
	    "Indianola, Mississippi",
	    "Inglewood, California",
	    "Inver Grove Heights, Minnesota",
	    "Iowa",
	    "Iowa City, Iowa",
	    "Irondequoit, New York",
	    "Irvine, California",
	    "Irving, Texas",
	    "Issaquah, Washington",
	    "Ithaca, New York",
	    "Jackson, Michigan",
	    "Jackson, Mississippi",
	    "Jackson, Tennessee",
	    "Jackson, Wyoming",
	    "Jacksonville, Arkansas",
	    "Jacksonville, Florida",
	    "Jacksonville, North Carolina",
	    "Jaffrey, New Hampshire",
	    "Jamestown, New York",
	    "Jamestown, North Dakota",
	    "Janesville, Wisconsin",
	    "Jefferson City, Missouri",
	    "Jeffersontown, Kentucky",
	    "Jeffersonville, Indiana",
	    "Jenks, Oklahoma",
	    "Jericho, Vermont",
	    "Jerome, Idaho",
	    "Jersey City, New Jersey",
	    "Johns Creek, Georgia",
	    "Johnson City, Tennessee",
	    "Johnson Lane, Nevada",
	    "Johnson, Vermont",
	    "Johnston, Iowa",
	    "Johnstown, Pennsylvania",
	    "Joliet, Illinois",
	    "Jonesboro, Arkansas",
	    "Joplin, Missouri",
	    "Junction City, Kansas",
	    "Juneau, Alaska",
	    "Kahului, Hawaii",
	    "Kailua, Hawaii",
	    "Kalamazoo, Michigan",
	    "Kalaoa, Hawaii",
	    "Kalifornsky, Alaska",
	    "Kalispell, Montana",
	    "Kaneohe Station, Hawaii",
	    "Kaneohe, Hawaii",
	    "Kannapolis, North Carolina",
	    "Kansas",
	    "Kansas City, Kansas",
	    "Kansas City, Missouri",
	    "Kapaa, Hawaii",
	    "Kapolei, Hawaii",
	    "Kaysville, Utah",
	    "Kearney, Nebraska",
	    "Kearns, Utah",
	    "Kearny, New Jersey",
	    "Keene, New Hampshire",
	    "Keizer, Oregon",
	    "Kemmerer, Wyoming",
	    "Ken Caryl, Colorado",
	    "Kenai, Alaska",
	    "Kendall, Florida",
	    "Kennebunk, Maine",
	    "Kenner, Louisiana",
	    "Kennesaw, Georgia",
	    "Kennewick, Washington",
	    "Kenosha, Wisconsin",
	    "Kenova, West Virginia",
	    "Kensington, Connecticut",
	    "Kent Acres, Delaware",
	    "Kent, Washington",
	    "Kentucky",
	    "Kentwood, Michigan",
	    "Keokuk, Iowa",
	    "Kernersville, North Carolina",
	    "Ketchikan, Alaska",
	    "Kettering, Ohio",
	    "Keyser, West Virginia",
	    "Kihei, Hawaii",
	    "Killeen, Texas",
	    "Kimberly, Idaho",
	    "King of Prussia, Pennsylvania",
	    "Kingman, Arizona",
	    "Kingsport, Tennessee",
	    "Kingston, Rhode Island",
	    "Kinston, North Carolina",
	    "Kirkland, Washington",
	    "Kirkwood, Missouri",
	    "Kirtland, New Mexico",
	    "Kittery, Maine",
	    "Klamath Falls, Oregon",
	    "Knik-Fairview, Alaska",
	    "Knoxville, Tennessee",
	    "Kodiak, Alaska",
	    "Kokomo, Indiana",
	    "Kotzebue, Alaska",
	    "Kula, Hawaii",
	    "Kuna, Idaho",
	    "La Crosse, Wisconsin",
	    "La Porte, Indiana",
	    "La Vergne, Tennessee",
	    "La Vista, Nebraska",
	    "LaGrange, Georgia",
	    "Lacey, Washington",
	    "Laconia, New Hampshire",
	    "Ladson, South Carolina",
	    "Lafayette, Colorado",
	    "Lafayette, Indiana",
	    "Lafayette, Louisiana",
	    "Lahaina, Hawaii",
	    "Lake Charles, Louisiana",
	    "Lake Havasu City, Arizona",
	    "Lake Oswego, Oregon",
	    "Lake Ridge, Virginia",
	    "Lake Stevens, Washington",
	    "Lakeland, Florida",
	    "Lakeland, Tennessee",
	    "Lakes, Alaska",
	    "Lakeville, Minnesota",
	    "Lakewood, Colorado",
	    "Lakewood, New Jersey",
	    "Lakewood, Ohio",
	    "Lakewood, Washington",
	    "Lancaster, California",
	    "Lancaster, Ohio",
	    "Lancaster, Pennsylvania",
	    "Lander, Wyoming",
	    "Langdon, North Dakota",
	    "Lansdale, Pennsylvania",
	    "Lansing, Kansas",
	    "Lansing, Michigan",
	    "Laplace, Louisiana",
	    "Laramie, Wyoming",
	    "Laredo, Texas",
	    "Largo, Florida",
	    "Larimore, North Dakota",
	    "Las Cruces, New Mexico",
	    "Las Vegas, Nevada",
	    "Las Vegas, New Mexico",
	    "Lauderhill, Florida",
	    "Laughlin, Nevada",
	    "Laurel, Delaware",
	    "Laurel, Mississippi",
	    "Laurel, Montana",
	    "Lawrence, Indiana",
	    "Lawrence, Kansas",
	    "Lawrence, Massachusetts",
	    "Lawrenceburg, Kentucky",
	    "Lawrenceville, Georgia",
	    "Lawton, Oklahoma",
	    "Layton, Utah",
	    "Le Mars, Iowa",
	    "Lead, South Dakota",
	    "League City, Texas",
	    "Leavenworth, Kansas",
	    "Leawood, Kansas",
	    "Lebanon, New Hampshire",
	    "Lebanon, Oregon",
	    "Lebanon, Pennsylvania",
	    "Lebanon, Tennessee",
	    "Lee Acres, New Mexico",
	    "Lee's Summit, Missouri",
	    "Leesburg, Virginia",
	    "Lehi, Utah",
	    "Lehigh Acres, Florida",
	    "Lemmon Valley, Nevada",
	    "Lenexa, Kansas",
	    "Lennox, South Dakota",
	    "Leominster, Massachusetts",
	    "Levittown, New York",
	    "Levittown, Pennsylvania",
	    "Lewes, Delaware",
	    "Lewisburg, West Virginia",
	    "Lewiston, Idaho",
	    "Lewiston, Maine",
	    "Lewistown, Montana",
	    "Lewisville, Texas",
	    "Lexington, Massachusetts",
	    "Lexington, Nebraska",
	    "Lexington, South Carolina",
	    "Lexington-Fayette, Kentucky",
	    "Libby, Montana",
	    "Liberal, Kansas",
	    "Liberty, Missouri",
	    "Lihue, Hawaii",
	    "Lima, Ohio",
	    "Lincoln Park, Michigan",
	    "Lincoln, Maine",
	    "Lincoln, Nebraska",
	    "Lincoln, North Dakota",
	    "Linden, New Jersey",
	    "Linton Hall, Virginia",
	    "Lisbon Falls, Maine",
	    "Lisbon, North Dakota",
	    "Little Rock, Arkansas",
	    "Littleton, Colorado",
	    "Littleton, New Hampshire",
	    "Livingston, Montana",
	    "Livonia, Michigan",
	    "Lockwood, Montana",
	    "Lodi, New Jersey",
	    "Logan, Utah",
	    "Lolo, Montana",
	    "Lombard, Illinois",
	    "Londonderry, New Hampshire",
	    "Long Beach, California",
	    "Long Beach, Mississippi",
	    "Long Beach, New York",
	    "Long Branch, New Jersey",
	    "Long Neck, Delaware",
	    "Longmont, Colorado",
	    "Longview, Texas",
	    "Longview, Washington",
	    "Lorain, Ohio",
	    "Los Alamos, New Mexico",
	    "Los Angeles, California",
	    "Los Lunas, New Mexico",
	    "Los Ranchos de Albuquerque, New Mexico",
	    "Louisiana",
	    "Louisville, Colorado",
	    "Louisville, Kentucky",
	    "Loveland, Colorado",
	    "Lovell, Wyoming",
	    "Lovington, New Mexico",
	    "Lowell, Massachusetts",
	    "Lubbock, Texas",
	    "Luling, Louisiana",
	    "Lumberton, North Carolina",
	    "Lusk, Wyoming",
	    "Lyman, Wyoming",
	    "Lynchburg, Virginia",
	    "Lyndon, Kentucky",
	    "Lyndonville, Vermont",
	    "Lynn, Massachusetts",
	    "Lynnwood, Washington",
	    "Mableton, Georgia",
	    "Macon, Georgia",
	    "Madison Heights, Michigan",
	    "Madison, Alabama",
	    "Madison, Mississippi",
	    "Madison, South Dakota",
	    "Madison, Wisconsin",
	    "Madisonville, Kentucky",
	    "Magna, Utah",
	    "Magnolia, Arkansas",
	    "Maili, Hawaii",
	    "Maine",
	    "Makaha, Hawaii",
	    "Makakilo, Hawaii",
	    "Makawao, Hawaii",
	    "Malden, Massachusetts",
	    "Malmstrom AFB, Montana",
	    "Malvern, Arkansas",
	    "Manassas, Virginia",
	    "Manchester Center, Vermont",
	    "Manchester, Connecticut",
	    "Manchester, Missouri",
	    "Manchester, New Hampshire",
	    "Mandan, North Dakota",
	    "Manhattan, Kansas",
	    "Manitowoc, Wisconsin",
	    "Mankato, Minnesota",
	    "Mansfield, Ohio",
	    "Maple Grove, Minnesota",
	    "Maplewood, Minnesota",
	    "Marana, Arizona",
	    "Maricopa, Arizona",
	    "Marietta, Georgia",
	    "Marion, Arkansas",
	    "Marion, Indiana",
	    "Marion, Iowa",
	    "Marion, Ohio",
	    "Marlborough, Massachusetts",
	    "Marrero, Louisiana",
	    "Marshalltown, Iowa",
	    "Marshfield, Wisconsin",
	    "Martinez, Georgia",
	    "Martinsburg, West Virginia",
	    "Marumsco, Virginia",
	    "Maryland",
	    "Maryland Heights, Missouri",
	    "Marysville, Washington",
	    "Maryville, Tennessee",
	    "Mason City, Iowa",
	    "Massachusetts",
	    "Matthews, North Carolina",
	    "Mauldin, South Carolina",
	    "Maumelle, Arkansas",
	    "Mayfield, Kentucky",
	    "Maysville, Kentucky",
	    "Mayville, North Dakota",
	    "McAlester, Oklahoma",
	    "McAllen, Texas",
	    "McComb, Mississippi",
	    "McCook, Nebraska",
	    "McDonough, Georgia",
	    "McKeesport, Pennsylvania",
	    "McKinney, Texas",
	    "McLean, Virginia",
	    "McMinnville, Oregon",
	    "McMinnville, Tennessee",
	    "McPherson, Kansas",
	    "Meadow Lake, New Mexico",
	    "Meadow Lakes, Alaska",
	    "Mechanicsville, Virginia",
	    "Medford, Massachusetts",
	    "Medford, Oregon",
	    "Mehlville, Missouri",
	    "Melbourne, Florida",
	    "Melville, Rhode Island",
	    "Memphis, Tennessee",
	    "Menomonee Falls, Wisconsin",
	    "Mentor, Ohio",
	    "Mequon, Wisconsin",
	    "Meriden, Connecticut",
	    "Meridian, Idaho",
	    "Meridian, Mississippi",
	    "Merriam, Kansas",
	    "Merrillville, Indiana",
	    "Mesa, Arizona",
	    "Mesquite, Nevada",
	    "Mesquite, Texas",
	    "Metairie, Louisiana",
	    "Methuen Town, Massachusetts",
	    "Miami Beach, Florida",
	    "Miami Gardens, Florida",
	    "Miami, Florida",
	    "Miami, Oklahoma",
	    "Michigan",
	    "Michigan City, Indiana",
	    "Middle Valley, Tennessee",
	    "Middlebury, Vermont",
	    "Middlesborough, Kentucky",
	    "Middleton, Idaho",
	    "Middleton, Wisconsin",
	    "Middletown, Connecticut",
	    "Middletown, Delaware",
	    "Middletown, Ohio",
	    "Midland, Michigan",
	    "Midland, Texas",
	    "Midvale, Utah",
	    "Midwest City, Oklahoma",
	    "Milbank, South Dakota",
	    "Miles City, Montana",
	    "Milford Mill, Maryland",
	    "Milford, Connecticut",
	    "Milford, Delaware",
	    "Milford, New Hampshire",
	    "Mililani Mauka, Hawaii",
	    "Mililani Town, Hawaii",
	    "Millbrook, Alabama",
	    "Millcreek, Utah",
	    "Millinocket, Maine",
	    "Mills, Wyoming",
	    "Millsboro, Delaware",
	    "Millville, New Jersey",
	    "Milton, Delaware",
	    "Milton, Georgia",
	    "Milton, Vermont",
	    "Milwaukee, Wisconsin",
	    "Milwaukie, Oregon",
	    "Minden, Louisiana",
	    "Minden, Nevada",
	    "Minneapolis, Minnesota",
	    "Minnesota",
	    "Minnetonka, Minnesota",
	    "Minot AFB, North Dakota",
	    "Minot, North Dakota",
	    "Mint Hill, North Carolina",
	    "Miramar, Florida",
	    "Mishawaka, Indiana",
	    "Misquamicut, Rhode Island",
	    "Mission, Kansas",
	    "Mission, Texas",
	    "Mississippi",
	    "Missoula, Montana",
	    "Missouri",
	    "Mitchell, South Dakota",
	    "Moapa Valley, Nevada",
	    "Mobile, Alabama",
	    "Mobridge, South Dakota",
	    "Modesto, California",
	    "Moline, Illinois",
	    "Monroe, Louisiana",
	    "Monroe, North Carolina",
	    "Monroeville, Pennsylvania",
	    "Montana",
	    "Montana City, Montana",
	    "Montgomery Village, Maryland",
	    "Montgomery, Alabama",
	    "Monticello, Arkansas",
	    "Montpelier, Vermont",
	    "Montrose, Colorado",
	    "Moore, Oklahoma",
	    "Mooresville, North Carolina",
	    "Moorhead, Minnesota",
	    "Moose Wilson Road, Wyoming",
	    "Moreno Valley, California",
	    "Morgan City, Louisiana",
	    "Morgantown, West Virginia",
	    "Morristown, Tennessee",
	    "Morrisville, Vermont",
	    "Moscow, Idaho",
	    "Moss Point, Mississippi",
	    "Moundsville, West Virginia",
	    "Mount Juliet, Tennessee",
	    "Mount Pleasant, Iowa",
	    "Mount Pleasant, Michigan",
	    "Mount Pleasant, South Carolina",
	    "Mount Pleasant, Wisconsin",
	    "Mount Prospect, Illinois",
	    "Mount Vernon, New York",
	    "Mount Vernon, Washington",
	    "Mount Washington, Kentucky",
	    "Mountain Brook, Alabama",
	    "Mountain Home AFB, Idaho",
	    "Mountain Home, Arkansas",
	    "Mountain Home, Idaho",
	    "Muncie, Indiana",
	    "Munster, Indiana",
	    "Murfreesboro, Tennessee",
	    "Murray, Kentucky",
	    "Murray, Utah",
	    "Murrieta, California",
	    "Murrysville, Pennsylvania",
	    "Muscatine, Iowa",
	    "Muskego, Wisconsin",
	    "Muskegon, Michigan",
	    "Muskogee, Oklahoma",
	    "Mustang, Oklahoma",
	    "Myrtle Beach, South Carolina",
	    "Nampa, Idaho",
	    "Nanakuli, Hawaii",
	    "Naperville, Illinois",
	    "Narragansett Pier, Rhode Island",
	    "Nashua, New Hampshire",
	    "Nashville, Tennessee",
	    "Natchez, Mississippi",
	    "Natchitoches, Louisiana",
	    "Naugatuck, Connecticut",
	    "Nebraska",
	    "Nebraska City, Nebraska",
	    "Neenah, Wisconsin",
	    "Nellis AFB, Nevada",
	    "Nevada",
	    "New Albany, Indiana",
	    "New Bedford, Massachusetts",
	    "New Berlin, Wisconsin",
	    "New Bern, North Carolina",
	    "New Britain, Connecticut",
	    "New Brunswick, New Jersey",
	    "New Castle, Delaware",
	    "New Castle, Pennsylvania",
	    "New City, New York",
	    "New Hampshire",
	    "New Haven, Connecticut",
	    "New Iberia, Louisiana",
	    "New Jersey",
	    "New London, Connecticut",
	    "New Martinsville, West Virginia",
	    "New Mexico",
	    "New Orleans, Louisiana",
	    "New Rochelle, New York",
	    "New Rockford, North Dakota",
	    "New Town, North Dakota",
	    "New York",
	    "New York, New York",
	    "Newark, Delaware",
	    "Newark, New Jersey",
	    "Newark, Ohio",
	    "Newberg, Oregon",
	    "Newcastle, Wyoming",
	    "Newington, Connecticut",
	    "Newmarket, New Hampshire",
	    "Newnan, Georgia",
	    "Newport East, Rhode Island",
	    "Newport News, Virginia",
	    "Newport, Kentucky",
	    "Newport, New Hampshire",
	    "Newport, Rhode Island",
	    "Newport, Vermont",
	    "Newton, Iowa",
	    "Newton, Kansas",
	    "Newton, Massachusetts",
	    "Niagara Falls, New York",
	    "Nicholasville, Kentucky",
	    "Nikiski, Alaska",
	    "Nitro, West Virginia",
	    "Nixa, Missouri",
	    "Noblesville, Indiana",
	    "Nogales, Arizona",
	    "Nome, Alaska",
	    "Norfolk, Nebraska",
	    "Norfolk, Virginia",
	    "Normal, Illinois",
	    "Norman, Oklahoma",
	    "Norristown, Pennsylvania",
	    "North Augusta, South Carolina",
	    "North Bennington, Vermont",
	    "North Bethesda, Maryland",
	    "North Browning, Montana",
	    "North Carolina",
	    "North Charleston, South Carolina",
	    "North Conway, New Hampshire",
	    "North Dakota",
	    "North Eagle Butte, South Dakota",
	    "North Haven, Connecticut",
	    "North Las Vegas, Nevada",
	    "North Liberty, Iowa",
	    "North Little Rock, Arkansas",
	    "North Myrtle Beach, South Carolina",
	    "North Ogden, Utah",
	    "North Olmsted, Ohio",
	    "North Plainfield, New Jersey",
	    "North Platte, Nebraska",
	    "North Pole, Alaska",
	    "North Rock Springs, Wyoming",
	    "North Sioux City, South Dakota",
	    "North Star, Delaware",
	    "North Tonawanda, New York",
	    "North Valley, New Mexico",
	    "North Windham, Maine",
	    "Northfield, Vermont",
	    "Northglenn, Colorado",
	    "Northport, Alabama",
	    "Norwalk, California",
	    "Norwalk, Connecticut",
	    "Norwalk, Iowa",
	    "Norwich, Connecticut",
	    "Novi, Michigan",
	    "O'Fallon, Missouri",
	    "O'Neill, Nebraska",
	    "Oak Creek, Wisconsin",
	    "Oak Grove, Oregon",
	    "Oak Hill, West Virginia",
	    "Oak Lawn, Illinois",
	    "Oak Park, Illinois",
	    "Oak Park, Michigan",
	    "Oak Ridge, Tennessee",
	    "Oakdale, Minnesota",
	    "Oakes, North Dakota",
	    "Oakland, California",
	    "Oakton, Virginia",
	    "Oakville, Connecticut",
	    "Oakville, Missouri",
	    "Ocean Pointe, Hawaii",
	    "Ocean Springs, Mississippi",
	    "Ocean View, Delaware",
	    "Oceanside, California",
	    "Oceanside, New York",
	    "Odenton, Maryland",
	    "Odessa, Texas",
	    "Offutt AFB, Nebraska",
	    "Ogallala, Nebraska",
	    "Ogden, Utah",
	    "Ohio",
	    "Oklahoma",
	    "Oklahoma City, Oklahoma",
	    "Okmulgee, Oklahoma",
	    "Olathe, Kansas",
	    "Old Bridge, New Jersey",
	    "Old Jamestown, Missouri",
	    "Old Orchard Beach, Maine",
	    "Old Town, Maine",
	    "Olive Branch, Mississippi",
	    "Olney, Maryland",
	    "Olympia, Washington",
	    "Omaha, Nebraska",
	    "Onalaska, Wisconsin",
	    "Ontario, California",
	    "Opelika, Alabama",
	    "Opelousas, Louisiana",
	    "Orange, California",
	    "Orange, Connecticut",
	    "Orangeburg, South Carolina",
	    "Orchard Homes, Montana",
	    "Oregon",
	    "Oregon City, Oregon",
	    "Orem, Utah",
	    "Orland Park, Illinois",
	    "Orlando, Florida",
	    "Oro Valley, Arizona",
	    "Orofino, Idaho",
	    "Orono, Maine",
	    "Oshkosh, Wisconsin",
	    "Oskaloosa, Iowa",
	    "Ottawa, Kansas",
	    "Ottumwa, Iowa",
	    "Overland Park, Kansas",
	    "Owasso, Oklahoma",
	    "Owatonna, Minnesota",
	    "Owensboro, Kentucky",
	    "Owings Mills, Maryland",
	    "Oxford, Alabama",
	    "Oxford, Mississippi",
	    "Oxnard, California",
	    "Oyster Bay, New York",
	    "Ozark, Alabama",
	    "Paducah, Kentucky",
	    "Pahrump, Nevada",
	    "Palatine, Illinois",
	    "Palm Bay, Florida",
	    "Palm Coast, Florida",
	    "Palmdale, California",
	    "Palmer, Alaska",
	    "Papillion, Nebraska",
	    "Paradise, Nevada",
	    "Paragould, Arkansas",
	    "Paramus, New Jersey",
	    "Paris, Kentucky",
	    "Park River, North Dakota",
	    "Parker, Colorado",
	    "Parker, South Carolina",
	    "Parkersburg, West Virginia",
	    "Parkland, Washington",
	    "Parkville, Maryland",
	    "Parma, Ohio",
	    "Parsons, Kansas",
	    "Pasadena, California",
	    "Pasadena, Texas",
	    "Pascagoula, Mississippi",
	    "Pasco, Washington",
	    "Pascoag, Rhode Island",
	    "Passaic, New Jersey",
	    "Paterson, New Jersey",
	    "Pawtucket, Rhode Island",
	    "Payette, Idaho",
	    "Payson, Utah",
	    "Pea Ridge, West Virginia",
	    "Peabody, Massachusetts",
	    "Peachtree City, Georgia",
	    "Pearl City, Hawaii",
	    "Pearl, Mississippi",
	    "Pearland, Texas",
	    "Pelham, Alabama",
	    "Pella, Iowa",
	    "Pembroke Pines, Florida",
	    "Pendleton, Oregon",
	    "Pennsylvania",
	    "Peoria, Arizona",
	    "Peoria, Illinois",
	    "Perry Hall, Maryland",
	    "Perth Amboy, New Jersey",
	    "Petal, Mississippi",
	    "Peterborough, New Hampshire",
	    "Petersburg, Alaska",
	    "Petersburg, Virginia",
	    "Phenix City, Alabama",
	    "Philadelphia, Pennsylvania",
	    "Phoenix, Arizona",
	    "Phoenixville, Pennsylvania",
	    "Picayune, Mississippi",
	    "Pierre, South Dakota",
	    "Pike Creek Valley, Delaware",
	    "Pike Creek, Delaware",
	    "Pikesville, Maryland",
	    "Pinardville, New Hampshire",
	    "Pine Bluff, Arkansas",
	    "Pine Hills, Florida",
	    "Pine Ridge, South Dakota",
	    "Pinedale, Wyoming",
	    "Pineville, Louisiana",
	    "Pittsburg, Kansas",
	    "Pittsburgh, Pennsylvania",
	    "Pittsfield, Maine",
	    "Pittsfield, Massachusetts",
	    "Plainfield, Indiana",
	    "Plainfield, New Jersey",
	    "Plano, Texas",
	    "Plantation, Florida",
	    "Plattsmouth, Nebraska",
	    "Pleasant Grove, Utah",
	    "Pleasant Prairie, Wisconsin",
	    "Plum, Pennsylvania",
	    "Plymouth, Minnesota",
	    "Plymouth, New Hampshire",
	    "Pocatello, Idaho",
	    "Point Pleasant, West Virginia",
	    "Polson, Montana",
	    "Pomona, California",
	    "Pompano Beach, Florida",
	    "Ponca City, Oklahoma",
	    "Pontiac, Michigan",
	    "Port Huron, Michigan",
	    "Port St. Lucie, Florida",
	    "Portage, Indiana",
	    "Portage, Michigan",
	    "Portales, New Mexico",
	    "Portland, Maine",
	    "Portland, Oregon",
	    "Portsmouth, New Hampshire",
	    "Portsmouth, Virginia",
	    "Post Falls, Idaho",
	    "Potomac, Maryland",
	    "Pottstown, Pennsylvania",
	    "Poughkeepsie, New York",
	    "Poultney, Vermont",
	    "Powell, Wyoming",
	    "Prairie Village, Kansas",
	    "Prairieville, Louisiana",
	    "Prattville, Alabama",
	    "Prescott Valley, Arizona",
	    "Prescott, Arizona",
	    "Presque Isle, Maine",
	    "Preston, Idaho",
	    "Prichard, Alabama",
	    "Princeton, West Virginia",
	    "Providence, Rhode Island",
	    "Provo, Utah",
	    "Pueblo West, Colorado",
	    "Pueblo, Colorado",
	    "Pukalani, Hawaii",
	    "Pullman, Washington",
	    "Puyallup, Washington",
	    "Queen Creek, Arizona",
	    "Quincy, Illinois",
	    "Quincy, Massachusetts",
	    "Quonochontaug, Rhode Island",
	    "Racine, Wisconsin",
	    "Radcliff, Kentucky",
	    "Rahway, New Jersey",
	    "Raleigh, North Carolina",
	    "Ralston, Nebraska",
	    "Ramsey, Minnesota",
	    "Ranchettes, Wyoming",
	    "Rancho Cucamonga, California",
	    "Randallstown, Maryland",
	    "Randolph, Massachusetts",
	    "Randolph, Vermont",
	    "Ranson, West Virginia",
	    "Rapid City, South Dakota",
	    "Rapid Valley, South Dakota",
	    "Rathdrum, Idaho",
	    "Raton, New Mexico",
	    "Ravenswood, West Virginia",
	    "Rawlins, Wyoming",
	    "Raymond, New Hampshire",
	    "Raymore, Missouri",
	    "Raytown, Missouri",
	    "Reading, Pennsylvania",
	    "Red Hill, South Carolina",
	    "Red Lodge, Montana",
	    "Redan, Georgia",
	    "Redfield, South Dakota",
	    "Redmond, Oregon",
	    "Redmond, Washington",
	    "Reisterstown, Maryland",
	    "Reno, Nevada",
	    "Renton, Washington",
	    "Reston, Virginia",
	    "Revere, Massachusetts",
	    "Rexburg, Idaho",
	    "Reynoldsburg, Ohio",
	    "Rhode Island",
	    "Rialto, California",
	    "Richardson, Texas",
	    "Richfield, Minnesota",
	    "Richford, Vermont",
	    "Richland, Washington",
	    "Richmond, California",
	    "Richmond, Indiana",
	    "Richmond, Kentucky",
	    "Richmond, Virginia",
	    "Ridgeland, Mississippi",
	    "Ridgeway, Alaska",
	    "Ridgewood, New Jersey",
	    "Rigby, Idaho",
	    "Rio Rancho, New Mexico",
	    "Rio Rico, Arizona",
	    "Ripley, West Virginia",
	    "Rising Sun-Lebanon, Delaware",
	    "River Ridge, Louisiana",
	    "Riverside, California",
	    "Riverside, Connecticut",
	    "Riverton, Utah",
	    "Riverton, Wyoming",
	    "Riverview, Delaware",
	    "Riverview, Florida",
	    "Roanoke, Virginia",
	    "Rochester Hills, Michigan",
	    "Rochester, Minnesota",
	    "Rochester, New Hampshire",
	    "Rochester, New York",
	    "Rock Hill, South Carolina",
	    "Rock Springs, Wyoming",
	    "Rockford, Illinois",
	    "Rockland, Maine",
	    "Rockville, Maryland",
	    "Rocky Mount, North Carolina",
	    "Rogers, Arkansas",
	    "Rolla, Missouri",
	    "Rolla, North Dakota",
	    "Rome, Georgia",
	    "Rome, New York",
	    "Romeoville, Illinois",
	    "Roseburg, Oregon",
	    "Roseville, California",
	    "Roseville, Michigan",
	    "Roseville, Minnesota",
	    "Roswell, Georgia",
	    "Roswell, New Mexico",
	    "Round Rock, Texas",
	    "Roy, Utah",
	    "Royal Kunia, Hawaii",
	    "Royal Oak, Michigan",
	    "Rugby, North Dakota",
	    "Ruidoso, New Mexico",
	    "Rumford, Maine",
	    "Rupert, Idaho",
	    "Russellville, Arkansas",
	    "Ruston, Louisiana",
	    "Rutland, Vermont",
	    "Saco, Maine",
	    "Sacramento, California",
	    "Saginaw, Michigan",
	    "Sahuarita, Arizona",
	    "Salem, Massachusetts",
	    "Salem, Oregon",
	    "Salem, Virginia",
	    "Salina, Kansas",
	    "Salinas, California",
	    "Salisbury, Maryland",
	    "Salisbury, North Carolina",
	    "Salmon, Idaho",
	    "Salt Lake City, Utah",
	    "Sammamish, Washington",
	    "San Angelo, Texas",
	    "San Antonio, Texas",
	    "San Bernardino, California",
	    "San Diego, California",
	    "San Francisco, California",
	    "San Jose, California",
	    "San Luis, Arizona",
	    "San Tan Valley, Arizona",
	    "Sand Springs, Oklahoma",
	    "Sandpoint, Idaho",
	    "Sandy Springs, Georgia",
	    "Sandy, Utah",
	    "Sanford, Maine",
	    "Sanford, North Carolina",
	    "Santa Ana, California",
	    "Santa Clara, California",
	    "Santa Clarita, California",
	    "Santa Fe, New Mexico",
	    "Santa Maria, California",
	    "Santa Rosa, California",
	    "Sapulpa, Oklahoma",
	    "Saratoga Springs, Utah",
	    "Saratoga, Wyoming",
	    "Savage, Minnesota",
	    "Savannah, Georgia",
	    "Sayreville, New Jersey",
	    "Scarborough, Maine",
	    "Schaumburg, Illinois",
	    "Schenectady, New York",
	    "Schererville, Indiana",
	    "Schofield Barracks, Hawaii",
	    "Schuyler, Nebraska",
	    "Scottsbluff, Nebraska",
	    "Scottsboro, Alabama",
	    "Scottsdale, Arizona",
	    "Scranton, Pennsylvania",
	    "SeaTac, Washington",
	    "Seaford, Delaware",
	    "Searcy, Arkansas",
	    "Seattle, Washington",
	    "Security-Widefield, Colorado",
	    "Sedalia, Missouri",
	    "Selbyville, Delaware",
	    "Selma, Alabama",
	    "Seven Oaks, South Carolina",
	    "Severn, Maryland",
	    "Severna Park, Maryland",
	    "Sevierville, Tennessee",
	    "Seward, Alaska",
	    "Seward, Nebraska",
	    "Shakopee, Minnesota",
	    "Shawnee, Kansas",
	    "Shawnee, Oklahoma",
	    "Sheboygan, Wisconsin",
	    "Shelby, Montana",
	    "Shelby, North Carolina",
	    "Shelbyville, Kentucky",
	    "Shelbyville, Tennessee",
	    "Shell Valley, North Dakota",
	    "Shelley, Idaho",
	    "Shelton, Connecticut",
	    "Shenandoah, Louisiana",
	    "Shepherdsville, Kentucky",
	    "Sheridan, Wyoming",
	    "Sherrelwood, Colorado",
	    "Sherwood, Arkansas",
	    "Sherwood, Oregon",
	    "Shiprock, New Mexico",
	    "Shively, Kentucky",
	    "Shoreline, Washington",
	    "Shoreview, Minnesota",
	    "Short Pump, Virginia",
	    "Shreveport, Louisiana",
	    "Sidney, Montana",
	    "Sidney, Nebraska",
	    "Sierra Vista, Arizona",
	    "Siloam Springs, Arkansas",
	    "Silver City, New Mexico",
	    "Silver Spring, Maryland",
	    "Silver Springs, Nevada",
	    "Simi Valley, California",
	    "Simpsonville, South Carolina",
	    "Sioux City, Iowa",
	    "Sioux Falls, South Dakota",
	    "Sisseton, South Dakota",
	    "Sissonville, West Virginia",
	    "Sitka, Alaska",
	    "Skokie, Illinois",
	    "Skowhegan, Maine",
	    "Slidell, Louisiana",
	    "Smyrna, Delaware",
	    "Smyrna, Georgia",
	    "Smyrna, Tennessee",
	    "Socastee, South Carolina",
	    "Socorro, New Mexico",
	    "Soddy-Daisy, Tennessee",
	    "Soldotna, Alaska",
	    "Somerset, Kentucky",
	    "Somerset, New Jersey",
	    "Somersworth, New Hampshire",
	    "Somerville, Massachusetts",
	    "South Barre, Vermont",
	    "South Bend, Indiana",
	    "South Burlington, Vermont",
	    "South Carolina",
	    "South Charleston, West Virginia",
	    "South Dakota",
	    "South Eliot, Maine",
	    "South Greeley, Wyoming",
	    "South Hill, Washington",
	    "South Hooksett, New Hampshire",
	    "South Jordan, Utah",
	    "South Milwaukee, Wisconsin",
	    "South Ogden, Utah",
	    "South Park, Wyoming",
	    "South Plainfield, New Jersey",
	    "South Portland, Maine",
	    "South Riding, Virginia",
	    "South Salt Lake, Utah",
	    "South Sanford, Maine",
	    "South Sioux City, Nebraska",
	    "South Valley, New Mexico",
	    "Southaven, Mississippi",
	    "Southfield, Michigan",
	    "Southgate, Michigan",
	    "Spanaway, Washington",
	    "Spanish Fork, Utah",
	    "Spanish Lake, Missouri",
	    "Spanish Springs, Nevada",
	    "Sparks, Nevada",
	    "Spartanburg, South Carolina",
	    "Spearfish, South Dakota",
	    "Spencer, Iowa",
	    "Spokane Valley, Washington",
	    "Spokane, Washington",
	    "Spring Creek, Nevada",
	    "Spring Hill, Florida",
	    "Spring Hill, Tennessee",
	    "Spring Valley, Nevada",
	    "Spring Valley, New York",
	    "Springdale, Arkansas",
	    "Springfield, Illinois",
	    "Springfield, Massachusetts",
	    "Springfield, Missouri",
	    "Springfield, Ohio",
	    "Springfield, Oregon",
	    "Springfield, Tennessee",
	    "Springfield, Vermont",
	    "Springfield, Virginia",
	    "Springvale, Maine",
	    "Springville, Utah",
	    "St. Albans, Vermont",
	    "St. Albans, West Virginia",
	    "St. Andrews, South Carolina",
	    "St. Anthony, Idaho",
	    "St. Charles, Missouri",
	    "St. Clair Shores, Michigan",
	    "St. Cloud, Minnesota",
	    "St. George, Utah",
	    "St. Johnsbury, Vermont",
	    "St. Joseph, Missouri",
	    "St. Louis Park, Minnesota",
	    "St. Louis, Missouri",
	    "St. Matthews, Kentucky",
	    "St. Paul, Minnesota",
	    "St. Peters, Missouri",
	    "St. Petersburg, Florida",
	    "Stamford, Connecticut",
	    "Stanley, North Dakota",
	    "Star, Idaho",
	    "Starkville, Mississippi",
	    "State College, Pennsylvania",
	    "Statesboro, Georgia",
	    "Statesville, North Carolina",
	    "Staunton, Virginia",
	    "Steele Creek, Alaska",
	    "Sterling Heights, Michigan",
	    "Sterling, Alaska",
	    "Sterling, Virginia",
	    "Stevens Point, Wisconsin",
	    "Stillwater, Oklahoma",
	    "Stockbridge, Georgia",
	    "Stockton, California",
	    "Storm Lake, Iowa",
	    "Storrs, Connecticut",
	    "Stow, Ohio",
	    "Stratford, Connecticut",
	    "Streamwood, Illinois",
	    "Strongsville, Ohio",
	    "Sturgis, South Dakota",
	    "Stuttgart, Arkansas",
	    "Suffolk, Virginia",
	    "Sugar Land, Texas",
	    "Sulphur, Louisiana",
	    "Summerlin South, Nevada",
	    "Summerset, South Dakota",
	    "Summersville, West Virginia",
	    "Summerville, South Carolina",
	    "Summit, New Jersey",
	    "Sumter, South Carolina",
	    "Sun City West, Arizona",
	    "Sun City, Arizona",
	    "Sun Prairie, Wisconsin",
	    "Sun Valley, Nevada",
	    "Suncook, New Hampshire",
	    "Sunland Park, New Mexico",
	    "Sunnyvale, California",
	    "Sunrise Manor, Nevada",
	    "Sunrise, Florida",
	    "Superior, Wisconsin",
	    "Surprise, Arizona",
	    "Swanton, Vermont",
	    "Syracuse, New York",
	    "Syracuse, Utah",
	    "Tacoma, Washington",
	    "Tahlequah, Oklahoma",
	    "Talladega, Alabama",
	    "Tallahassee, Florida",
	    "Tampa, Florida",
	    "Tanaina, Alaska",
	    "Taos, New Mexico",
	    "Taunton, Massachusetts",
	    "Taylor, Michigan",
	    "Taylors, South Carolina",
	    "Taylorsville, Utah",
	    "Tea, South Dakota",
	    "Teays Valley, West Virginia",
	    "Temecula, California",
	    "Tempe, Arizona",
	    "Tennessee",
	    "Terre Haute, Indiana",
	    "Terrytown, Louisiana",
	    "Texarkana, Arkansas",
	    "Texas",
	    "The Woodlands, Texas",
	    "Thermopolis, Wyoming",
	    "Thibodaux, Louisiana",
	    "Thomasville, North Carolina",
	    "Thompsonville, Connecticut",
	    "Thornton, Colorado",
	    "Thousand Oaks, California",
	    "Tigard, Oregon",
	    "Tillmans Corner, Alabama",
	    "Tilton Northfield, New Hampshire",
	    "Tinley Park, Illinois",
	    "Tiverton, Rhode Island",
	    "Toledo, Ohio",
	    "Toms River, New Jersey",
	    "Tonawanda, New York",
	    "Tonopah, Nevada",
	    "Tooele, Utah",
	    "Topeka, Kansas",
	    "Topsham, Maine",
	    "Torrance, California",
	    "Torrington, Connecticut",
	    "Torrington, Wyoming",
	    "Town 'n' Country, Florida",
	    "Townsend, Delaware",
	    "Towson, Maryland",
	    "Trenton, New Jersey",
	    "Troutdale, Oregon",
	    "Troy, Alabama",
	    "Troy, Michigan",
	    "Troy, New York",
	    "Trumbull, Connecticut",
	    "Trussville, Alabama",
	    "Truth or Consequences, New Mexico",
	    "Tualatin, Oregon",
	    "Tuckahoe, Virginia",
	    "Tucker, Georgia",
	    "Tucson, Arizona",
	    "Tullahoma, Tennessee",
	    "Tulsa, Oklahoma",
	    "Tupelo, Mississippi",
	    "Tuscaloosa, Alabama",
	    "Twin Falls, Idaho",
	    "Tyler, Texas",
	    "Unalaska, Alaska",
	    "Union City, New Jersey",
	    "University City, Missouri",
	    "University Place, Washington",
	    "Upper Arlington, Ohio",
	    "Upper St. Clair, Pennsylvania",
	    "Urbana, Illinois",
	    "Urbandale, Iowa",
	    "Utah",
	    "Utica, New York",
	    "Valdez, Alaska",
	    "Valdosta, Georgia",
	    "Vallejo, California",
	    "Valley City, North Dakota",
	    "Valley Falls, Rhode Island",
	    "Valley Stream, New York",
	    "Valparaiso, Indiana",
	    "Van Buren, Arkansas",
	    "Vancouver, Washington",
	    "Vergennes, Vermont",
	    "Vermillion, South Dakota",
	    "Vermont",
	    "Vestavia Hills, Alabama",
	    "Vicksburg, Mississippi",
	    "Victorville, California",
	    "Vienna, West Virginia",
	    "Vineland, New Jersey",
	    "Virginia",
	    "Virginia Beach, Virginia",
	    "Visalia, California",
	    "Volga, South Dakota",
	    "Waco, Texas",
	    "Wade Hampton, South Carolina",
	    "Wahiawa, Hawaii",
	    "Wahoo, Nebraska",
	    "Wahpeton, North Dakota",
	    "Waianae, Hawaii",
	    "Waihee-Waiehu, Hawaii",
	    "Waikele, Hawaii",
	    "Wailuku, Hawaii",
	    "Waimalu, Hawaii",
	    "Waimea, Hawaii",
	    "Waipahu, Hawaii",
	    "Waipio, Hawaii",
	    "Wake Forest, North Carolina",
	    "Wakefield-Peacedale, Rhode Island",
	    "Waldorf, Maryland",
	    "Walla Walla, Washington",
	    "Wallingford Center, Connecticut",
	    "Waltham, Massachusetts",
	    "Warner Robins, Georgia",
	    "Warr Acres, Oklahoma",
	    "Warren AFB, Wyoming",
	    "Warren, Michigan",
	    "Warren, Ohio",
	    "Warrensburg, Missouri",
	    "Warwick, Rhode Island",
	    "Washburn, North Dakota",
	    "Washington",
	    "Washington, District of Columbia",
	    "Washington, Utah",
	    "Washoe Valley, Nevada",
	    "Wasilla, Alaska",
	    "Watch Hill, Rhode Island",
	    "Waterbury, Connecticut",
	    "Waterbury, Vermont",
	    "Waterloo, Iowa",
	    "Watertown Town, Massachusetts",
	    "Watertown, South Dakota",
	    "Watertown, Wisconsin",
	    "Waterville, Maine",
	    "Watford City, North Dakota",
	    "Waukee, Iowa",
	    "Waukegan, Illinois",
	    "Waukesha, Wisconsin",
	    "Wausau, Wisconsin",
	    "Wauwatosa, Wisconsin",
	    "Waverly, Iowa",
	    "Wayne, Nebraska",
	    "Weatherford, Oklahoma",
	    "Webster Groves, Missouri",
	    "Weekapaug, Rhode Island",
	    "Weirton, West Virginia",
	    "Weiser, Idaho",
	    "Welby, Colorado",
	    "Wellington, Kansas",
	    "Wenatchee, Washington",
	    "Wentzville, Missouri",
	    "West Allis, Wisconsin",
	    "West Babylon, New York",
	    "West Bend, Wisconsin",
	    "West Brattleboro, Vermont",
	    "West Chester, Pennsylvania",
	    "West Columbia, South Carolina",
	    "West Covina, California",
	    "West Des Moines, Iowa",
	    "West Falls Church, Virginia",
	    "West Fargo, North Dakota",
	    "West Hartford, Connecticut",
	    "West Haven, Connecticut",
	    "West Jordan, Utah",
	    "West Lafayette, Indiana",
	    "West Linn, Oregon",
	    "West Memphis, Arkansas",
	    "West Mifflin, Pennsylvania",
	    "West Monroe, Louisiana",
	    "West New York, New Jersey",
	    "West Palm Beach, Florida",
	    "West Point, Mississippi",
	    "West Rutland, Vermont",
	    "West Seneca, New York",
	    "West Valley City, Utah",
	    "West Virginia",
	    "West Wendover, Nevada",
	    "Westbrook, Maine",
	    "Westerly, Rhode Island",
	    "Westerville, Ohio",
	    "Westfield, Indiana",
	    "Westfield, Massachusetts",
	    "Westfield, New Jersey",
	    "Westlake, Ohio",
	    "Westland, Michigan",
	    "Westminster, Colorado",
	    "Weston, Florida",
	    "Weston, West Virginia",
	    "Westover, West Virginia",
	    "Westport, Connecticut",
	    "Wethersfield, Connecticut",
	    "Weymouth Town, Massachusetts",
	    "Wheat Ridge, Colorado",
	    "Wheatland, Wyoming",
	    "Wheaton, Illinois",
	    "Wheaton, Maryland",
	    "Wheeling, West Virginia",
	    "White Bear Lake, Minnesota",
	    "White Plains, New York",
	    "White River Junction, Vermont",
	    "White Rock, New Mexico",
	    "Whitefish, Montana",
	    "Whitney, Nevada",
	    "Wichita Falls, Texas",
	    "Wichita, Kansas",
	    "Wilder, Vermont",
	    "Wildwood, Missouri",
	    "Wilkes-Barre, Pennsylvania",
	    "Wilkinsburg, Pennsylvania",
	    "Williamsport, Pennsylvania",
	    "Williamstown, Vermont",
	    "Willimantic, Connecticut",
	    "Williston, North Dakota",
	    "Willow Grove, Pennsylvania",
	    "Wilmington Manor, Delaware",
	    "Wilmington, Delaware",
	    "Wilmington, North Carolina",
	    "Wilson, North Carolina",
	    "Wilsonville, Oregon",
	    "Winchester, Kentucky",
	    "Winchester, Nevada",
	    "Winchester, New Hampshire",
	    "Winchester, Virginia",
	    "Windsor Locks, Connecticut",
	    "Windsor, Colorado",
	    "Windsor, Vermont",
	    "Winfield, Kansas",
	    "Winnemucca, Nevada",
	    "Winner, South Dakota",
	    "Winona, Minnesota",
	    "Winooski, Vermont",
	    "Winslow, Maine",
	    "Winston-Salem, North Carolina",
	    "Wisconsin",
	    "Wisconsin Rapids, Wisconsin",
	    "Woburn, Massachusetts",
	    "Wolf Point, Montana",
	    "Wolfeboro, New Hampshire",
	    "Woodburn, Oregon",
	    "Woodbury, Minnesota",
	    "Woodlawn, Maryland",
	    "Woodside East, Delaware",
	    "Woodstock, Georgia",
	    "Woodward, Oklahoma",
	    "Woonsocket, Rhode Island",
	    "Worcester, Massachusetts",
	    "Worland, Wyoming",
	    "Wrangell, Alaska",
	    "Wright, Wyoming",
	    "Wyoming",
	    "Wyoming, Delaware",
	    "Wyoming, Michigan",
	    "Wyoming, Rhode Island",
	    "Yakima, Washington",
	    "Yankton, South Dakota",
	    "Yarmouth, Maine",
	    "Yazoo City, Mississippi",
	    "Yerington, Nevada",
	    "Yonkers, New York",
	    "York, Nebraska",
	    "York, Pennsylvania",
	    "Youngstown, Ohio",
	    "Yukon, Oklahoma",
	    "Yuma, Arizona",
	    "Zachary, Louisiana",
	    "Zionsville, Indiana",
	    "Zuni Pueblo, New Mexico"
	];
	$( "#search_1_name" ).autocomplete({
	  source: server_cities
	});
	$( "#search_2_name" ).autocomplete({
	  source: server_cities
	});
});
	

//request data from server




var data, hide_1, hide_2, main, gray, font, active_tab, axis_location, horz_locs;

var sketch = new Processing.Sketch();

function city_api_request(query) {
	field1 = document.getElementById("search_1_name").value;
	field2 = document.getElementById("search_2_name").value;
	url = "";

	type = "city"

	if(field1 == "" && field2 == ""){
		return;
	}
	else if(field2 == ""){
		url = "https://trycents.com:6001/data/type="+type+"&option="+field1;
	}
	else if(field1 == ""){
		url = "https://trycents.com:6001/data/type="+type+"&option="+field2;
	}
	else{
		url = "https://trycents.com:6001/data/type="+type+"&option="+field1+"&option="+field2;
	}

	//data = new Object();
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true );

    xmlHttp.onreadystatechange = function() {
    	if (xmlHttp.readyState === 4) { 
      		if (xmlHttp.status === 200) {
      			data = jQuery.parseJSON(xmlHttp.responseText);
      			//make api request here with type included
				localStorage.setItem("query_type", type);
				localStorage.setItem("data_store",JSON.stringify(data));

				//location.reload();
				if (!data["location_2"])
  				{
		  			hide_2 = true;
		  			document.getElementById("search_2_button").value = "HIDE";
		  			$("#search_2_button").attr("disabled", "true");
  				}
  				else
  				{
  					hide_2 = false;
  					document.getElementById("search_2_button").value = "SHOW";
		  			$("#search_2_button").removeAttr("disabled");
		  			document.getElementById("search_2_name").value = data["location_2"];

  				}
      		}
      	}
    }
    xmlHttp.send( null );
};

function sketchProc(processing) {
	
	processing.setup = function() {

		console.log("loaded city.js successfully");
		main = processing.color(136, 68, 18);
		gray = processing.color(138, 136, 137);



		processing.size(655,375);
		//always set the initial tab to the first one
		active_tab = 1;
		hide_1 = false;
		hide_2 = false;
		//load font
		font = processing.loadFont("Roboto");
		processing.textFont(font, 12);

		horz_locs = [87, 145, 215, 308, 389, 488, 577];

		//var to hold all data relevant to a given category
		above_1 = new Array();
		above_2 = new Array();
		below_1 = new Array();
		below_2 = new Array();
		data = new Array();

  		data = jQuery.parseJSON(unescape(localStorage.getItem("data_store")));
  		//localStorage.removeItem("data_store");

  		if (data == null)
  		{
  			data = new Array();

  			data["weather_1"] =    [38.0, 44.0, 53.0, 61.0, 71.0, 82.0, 90.0, 89.0, 78.0, 65.0, 50.0, 40.0, 38.0, 90.0];
			data["weatherlow_1"] = [26.0, 31.0, 38.0, 43.0, 52.0, 61.0, 69.0, 67.0, 58.0, 46.0, 36.0, 27.0, 26.0, 69.0];
			data["weather_2"]    = [67.0, 71.0, 77.0, 85.0, 95.0, 104.0, 106.0, 104.0, 100.0, 89.0, 76.0, 66.0, 66.0, 106.0];
			data["weatherlow_2"] = [46.0, 49.0, 53.0, 60.0, 69.0, 78.0, 83.0, 83.0, 77.0, 65.0, 53.0, 45.0, 45.0, 83.0];

			data["location_1"] = "Salt Lake City, Utah";
			data["location_2"] = "Phoenix, Arizona";

			data["cli_1"] = [102, 94, 95, 95, 119, 105, 92, 92, 119];
			data["cli_2"] = [96, 92, 100, 106, 97, 101, 99, 92, 106];

			data["labor_1"] = [3.4, 48000, 4.4];
			data["labor_2"] = [6.4, 51000, 3.3];
			data["labor_3"] = [5.8, 44800, 4.6];

			//sales, income min, income max, property
			data["taxes_1"] = [6.85, 5.0, 5.0, 0.67];
			data["taxes_2"] = [8.3, 2.59, 4.54, 1.59];
			data["taxes_3"] = [8.25, 3.5, 7.8, 1.15];
  		}
  		//console.log(data["location_2"]);
  		if (!data["location_2"])
  		{
  			hide_2 = true;
  			document.getElementById("search_2_button").value = "SHOW";
  			$("#search_2_button").attr("disabled", "true");
  		}
  		else
  		{
  			document.getElementById("search_2_name").value = data["location_2"];
  		}

		document.getElementById("search_1_name").value = data["location_1"];
	};


	processing.draw = function() {
		processing.background(255);

		if (active_tab == 1)
			city_summary();
		else if (active_tab == 2)
			cost_of_living();
		else if (active_tab == 3)
			labor_stats();
		else if (active_tab == 4)
			taxes();
		else
			weather();

		//show cli mouse over details
		if (active_tab == 2)
		{
			var category = ["Overall, costs in", "Goods in", "Groceries in", "Health care costs in", "Housing costs in", "Transportation costs in", "Utilities in"];
			for (var i=0; i<7; i++)
			{
				//aligned horizontally
				if (processing.mouseX < horz_locs[i] && processing.mouseX >= (horz_locs[i] - 16) && !hide_1)
				{
						//location 1, postive change
						var data1 = data["cli_1"][i];
						if (processing.mouseY < (axis_location-10) && processing.mouseY > above_1[i])
						{
							processing.fill(255);
							processing.stroke(0);
							var length = processing.max(data["location_1"].length, category[i]);
							var height;
							if (processing.mouseY < 60)
								height = 62;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["location_1"], processing.mouseX, height-36);
							processing.text("are " + String(data1 - 100) + "% above the", processing.mouseX, height-24);
							processing.text("national average.", processing.mouseX, height-12);

						}
						if (processing.mouseY > (axis_location+10) && processing.mouseY < below_1[i])
						{
							processing.fill(255);
							processing.stroke(0);
							var length = processing.max(data["location_1"].length, category[i]);
							var height;
							if (processing.mouseY > 595)
								height = 593;
							else
								height = processing.mouseY;
							processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
							processing.fill(0);
							processing.textAlign(processing.CENTER);
							processing.text(category[i], processing.mouseX, height-48);
							processing.text(data["location_1"], processing.mouseX, height-36);
							processing.text("are " + String(100 - data1) + "% below the", processing.mouseX, height-24);
							processing.text("national average.", processing.mouseX, height-12);

						}
						
				}
				if (processing.mouseX >= horz_locs[i] && processing.mouseX < (horz_locs[i] + 16) && !hide_2)
				{
					var data2 = data["cli_2"][i];
					if (processing.mouseY < (axis_location-10) && processing.mouseY > above_2[i])
					{
						processing.fill(255);
						processing.stroke(0);
						var length = processing.max(data["location_2"].length, category[i]);
						var height;
						if (processing.mouseY < 60)
							height = 62;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["location_2"], processing.mouseX, height-36);
						processing.text("are " + String(data2 - 100) + "% above the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
					if (processing.mouseY > (axis_location+10) && processing.mouseY < below_2[i])
					{
						processing.fill(255);
						processing.stroke(0);
						var length = processing.max(data["location_2"].length, category[i]);
						var height;
						if (processing.mouseY > 595)
							height = 593;
						else
							height = processing.mouseY;
						processing.rect(processing.mouseX-(120+length)/2, height-60, length+120, 52);
						processing.fill(0);
						processing.textAlign(processing.CENTER);
						processing.text(category[i], processing.mouseX, height-48);
						processing.text(data["location_2"], processing.mouseX, height-36);
						processing.text("are " + String(100 - data2) + "% below the", processing.mouseX, height-24);
						processing.text("national average.", processing.mouseX, height-12);

					}
				}
			}
		}
	};

	function city_summary() {
		//draw categories and separations
		var title_offset = 0;
		if (hide_1 || hide_2)
			title_offset = 40;
		processing.textAlign(processing.RIGHT);
		processing.fill(0);
		processing.text("AVERAGE COST OF LIVING", 235+title_offset, 55);
		processing.text("AVERAGE INCOME", 235+title_offset, 135);
		processing.text("INCOME TAX RANGE", 235+title_offset, 215);
		processing.text("AVERAGE TEMPERATURES", 235+title_offset, 295);
		processing.stroke(225);
		processing.strokeWeight(1);
		processing.line(65+title_offset, 93, 235+title_offset, 93);
		processing.line(65+title_offset, 173, 235+title_offset, 173);
		processing.line(65+title_offset, 253, 235+title_offset, 253);
		processing.textAlign(processing.CENTER);
		processing.text("(CLICK TABS ON RIGHT FOR MORE DETAILS)", 330, 355);

		var offset = 0;

		//draw data
		processing.textFont(font, 30);
		if (!hide_1)
		{
			if (hide_2)
				offset = 80;
			processing.fill(main);
			var c1 = data["cli_1"][0] - 100;
			var percent1 = "";
			if (c1 < 0)
			{
				c1 = c1 * -1;
				percent1 = "BELOW";
			}
			else
				percent1 = "ABOVE";

			processing.text(c1 + "%", 360+offset, 50);
			processing.text("$" + (data["labor_1"][1]).toLocaleString(), 360+offset, 140);
			if (data["taxes_1"][1] == data["taxes_1"][2])
				processing.text(data["taxes_1"][1] + "%", 360+offset, 218);
			else
			{
				processing.textFont(font, 24);
				processing.text(data["taxes_1"][1] + "%-" + data["taxes_1"][2] + "%", 360+offset, 215);
				processing.textFont(font, 30);
			}
			processing.text(data["weatherlow_1"][12] + "°- " + data["weather_1"][13] + "°", 360+offset, 295);
			processing.textFont(font, 12);
			processing.fill(main);
			processing.text(percent1 + " NATIONAL", 360+offset, 70);
			processing.text("AVERAGE", 360+offset, 85);
			processing.text("FAHRENHEIT", 360+offset, 310);
			//processing.textFont(font, 24);
		}
		
		
		processing.textFont(font, 30);
		if (!hide_2)
		{
			if (hide_1)
				offset = -80;
			processing.fill(gray);
			var c2 = data["cli_2"][0] - 100;
			var percent2 = "";
			if (c2 < 0)
			{
				c2 = c2 * -1;
				percent2 = "BELOW";
			}
			else
				percent2 = "ABOVE";

			processing.text(c2 + "%", 540+offset, 50);
			processing.text("$" + (data["labor_2"][1]).toLocaleString(), 540+offset, 140);
			if (data["taxes_2"][1] == data["taxes_2"][2])
				processing.text(data["taxes_2"][1] + "%", 540+offset, 218);
			else
			{
				processing.textFont(font, 24);
				processing.text(data["taxes_2"][1] + "%-" + data["taxes_2"][2] + "%", 540+offset, 215);
				processing.textFont(font, 30);
			}
			processing.text(data["weatherlow_2"][12] + "°- " + data["weather_2"][13] + "°", 540+offset, 295);
			processing.fill(gray);
			processing.textFont(font, 12);
			processing.text(percent2 + " NATIONAL", 540+offset, 70);
			processing.text("AVERAGE", 540+offset, 85);
			processing.text("FAHRENHEIT", 540+offset, 310);
		}

		processing.textFont(font, 12);

	};

	function cost_of_living() {

		var graph_top, graph_bot;
		graph_top = 45;
		graph_bot = 330;


		//calculate min and max depending on what data is being shown/hidden
		if (!hide_2 && hide_1)
		{
			min = data["cli_2"][7];
			max = data["cli_2"][8];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["cli_1"][7];
			max = data["cli_1"][8];
		}
		else
		{
			if(data["location_2"])
			{
				min = processing.min(data["cli_1"][7], data["cli_2"][7]);
				max = processing.max(data["cli_1"][8], data["cli_2"][8]);
			}
			else
			{
				min = data["cli_1"][7];
				max = data["cli_1"][8];
			}
		}



		//draw axis depending on where national average (100) falls within the calculated min and max
		axis_location;
		if (max <= 100)
			axis_location = 60;
		else if (min > 100)
			axis_location = 315;
		else
			axis_location = 60 + 255 * (1 - ((100 - min) / (max - min)));


		//determin how much of scale is above and below the 100 line
		processing.stroke(235);
		processing.fill(0);
		processing.textAlign(processing.RIGHT);
		var num_above, num_below;
		if (max <= 100)
		{
			num_above = 0;
			num_below = 10;
		}
		else if (min >= 100)
		{
			num_above = 10;
			num_below = 0;
		}
		else
		{
			num_above = (max - 100) / (max - min);
			num_below = 1.0 - num_above;
			num_above = processing.round(num_above * 10);
			num_below = processing.round(num_below * 10);
		}
		var range = (axis_location-15-graph_top)/ num_above;
		var scale = (max - 100) / num_above;
		
		//draw scale
		for (var i=1; i<=num_above; i++)
		{
			processing.line(60 , (axis_location-15)-(i*range), 605, axis_location-15-(i*range));
			processing.text(String(processing.round(10*((100 + scale * i)-100))/10) + "%", 55,  axis_location-15-(i*range)+5);
		}

		range = (graph_bot-(axis_location+15)) / num_below;
		scale = (100 - min) / num_below;
		for (var i=1; i<=num_below; i++)
		{
			processing.line(60 , (axis_location+15)+(i*range), 605, axis_location+15+(i*range));
			processing.text("-" + String(processing.round(10*((100 + scale * i)-100))/10) + "%", 55,  axis_location+15+(i*range)+5);
		}

		processing.fill(255);
		processing.noStroke();
		processing.strokeWeight(2);
		processing.rect(60, axis_location - 9, 545, 19);
		
		processing.textAlign(processing.CENTER);
		processing.fill(0);
		processing.text("OVERALL", horz_locs[0], axis_location+5);
		processing.text("GOODS", horz_locs[1], axis_location+5);
		processing.text("GROCERIES", horz_locs[2], axis_location+5);
		processing.text("HEALTH CARE", horz_locs[3], axis_location+5);
		processing.text("HOUSING", horz_locs[4], axis_location+5);
		processing.text("TRANSPORTATION", horz_locs[5], axis_location+5);
		processing.text("UTILITIES", horz_locs[6], axis_location+5);
		
		//draw data
		processing.noStroke();
		for (var i=0; i<7; i++)
		{
			if (!hide_1)
			{
				var data1 = data["cli_1"][i];
				processing.fill(main);
				if (data1 > 100) //above
				{
					var height = ((data1-100) / (max-100)) * (axis_location - 15 -graph_top);
					processing.rect(horz_locs[i]-16, axis_location-15, 16, -height);
					above_1[i] = graph_top + ((axis_location - 15 - graph_top) * (1 - (data1-100) / (max-100)));
				}
				else if (data1 < 100)
				{
					var height = ((data1-100) / (min-100)) * (graph_bot - (axis_location + 15));
					processing.rect(horz_locs[i]-16, axis_location+15, 16, height);
					below_1[i] = graph_bot - ((graph_bot - axis_location - 15) * (1 - (100-data1) / (100-min)));
				}
				else
				{
					processing.rect(horz_locs[i], axis_location - 15, 16, -5);
					above_1[i] = axis_location-25;
				}
			}

			if (!hide_2)
			{
				var data2 = data["cli_2"][i];
				processing.fill(gray);
				if (data2 > 100) //above
				{
					var height = ((data2-100) / (max-100)) * (axis_location - 15 -graph_top);
					processing.rect(horz_locs[i], axis_location-15, 16, -height);
					above_2[i] = graph_top + ((axis_location - 15 - graph_top) * (1 - (data2-100) / (max-100)));
				}
				else if (data2 < 100)
				{
					var height = ((data2-100) / (min-100)) * (graph_bot - (axis_location + 15));
					processing.rect(horz_locs[i], axis_location+15, 16, height);
					below_2[i] = graph_bot - ((graph_bot - axis_location - 15) * (1 - (100-data2) / (100-min)));
				}
				else
				{
					processing.rect(horz_locs[i], axis_location - 15, 16, -5);
					above_2[i] = axis_location-25;
				}
			}

		}

		processing.stroke(0);
		processing.line(60, graph_top, 60, axis_location-16);
		processing.line(60, axis_location+15, 60, graph_bot);
		processing.line(605, graph_top, 605, axis_location-16);
		processing.line(605, axis_location+15, 605, graph_bot);
		processing.line(60, axis_location - 15, 604, axis_location - 15);
		processing.line(60, axis_location + 15, 604, axis_location + 15);

		//title and help
		processing.line(185, 30, 487, 30);
		processing.line(213, 347, 459, 347);
		processing.fill(0);
		processing.text("OVERALL AND CATEGORICAL COST OF LIVING (%)", 335, 25);
		processing.text("MOUSE OVER DATA FOR MORE DETAILS", 337, 362);
		
	};


	function labor_stats() {
		
		axis_location = [135, 310, 535];
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 595;

		//draw labels
		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("UNEMPLOYMENT RATE", axis_location[0], graph_bot+23);
		processing.text("AVERAGE SALARY", axis_location[2], graph_bot+23);
		processing.text("ECONOMIC GROWTH", axis_location[1], graph_bot+23);
		processing.text("LABOR STATISTICS COMPARED TO NATIONAL AVERAGES", 327, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		//need max for percentages
		var min_1, max_1, min_2, max_2;
		if (hide_2 && !hide_1)
		{
			var temp_max_1 = processing.max(data["labor_1"][0], data["labor_3"][0]);
			var temp_max_2 = processing.max(data["labor_1"][2], data["labor_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["labor_1"][1], data["labor_3"][1]) * 1.1;
		}
		else if (hide_1 && !hide_2)
		{
			var temp_max_1 = processing.max(data["labor_2"][0], data["labor_3"][0]);
			var temp_max_2 = processing.max(data["labor_2"][2], data["labor_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["labor_2"][1], data["labor_3"][1]) * 1.1;
		}
		else
		{
			if (data["location_2"])
			{
				var temp_max_1 = processing.max(data["labor_1"][0], data["labor_2"][0], data["labor_3"][0]);
				var temp_max_2 = processing.max(data["labor_1"][2], data["labor_2"][2], data["labor_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["labor_1"][1], data["labor_2"][1], data["labor_3"][1]) * 1.1;
			}
			else
			{
				var temp_max_1 = processing.max(data["labor_1"][0], data["labor_3"][0]);
				var temp_max_2 = processing.max(data["labor_1"][2], data["labor_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["labor_1"][1], data["labor_3"][1]) * 1.1;
			}

		}

		min_1 = 0.0;
		min_2 = 0.0;

		//draw scales
		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max_1 - min_1)/10;
		var money_scale = (max_2 - min_2)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text(String(processing.round(min_1 + per_scale * i * 10)/10) + "%", graph_left-5, h+5);
			processing.textAlign(processing.LEFT);
			processing.text("$" + String(processing.round(min_2 + money_scale * i / 1000)) + "k", graph_right+5, h+5);
		}


		

		//draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][0] -  min_1)/(max_1 - min_1));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][2] -  min_1)/(max_1 - min_1));
		var line_3 = graph_bot + (graph_top - graph_bot)*((data["labor_3"][1] -  min_2)/(max_2 - min_2));
		
		processing.line(graph_left, line_1, axis_location[0]+40, line_1);
		processing.line(axis_location[0]+41, line_1, axis_location[1]-46, line_2);
		processing.line(axis_location[1]-45, line_2, axis_location[1]+45, line_2);
		processing.line(axis_location[1]+46, line_2, axis_location[2]-41, line_3);
		processing.line(axis_location[2]-40, line_3, graph_right-1, line_3);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[1]+axis_location[2])/2-40, (line_2+line_3)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[1]+axis_location[2])/2, (line_2+line_3)/2-9);
		processing.text("AVERAGES", (axis_location[1]+axis_location[2])/2, (line_2+line_3)/2+8);

		var height_1 = (graph_top - graph_bot)*((data["labor_1"][0] -  min_1)/(max_1 - min_1));
		var height_2 = (graph_top - graph_bot)*((data["labor_1"][2] -  min_1)/(max_1 - min_1));
		var height_3 = (graph_top - graph_bot)*((data["labor_1"][1] -  min_2)/(max_2 - min_2));
		if (!hide_2)
		{
			var height_4 = (graph_top - graph_bot)*((data["labor_2"][0] -  min_1)/(max_1 - min_1));
			var height_5 = (graph_top - graph_bot)*((data["labor_2"][2] -  min_1)/(max_1 - min_1));
			var height_6 = (graph_top - graph_bot)*((data["labor_2"][1] -  min_2)/(max_2 - min_2));
		}

		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-25, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-25, graph_bot, 30, height_2);
			processing.rect(axis_location[2]-25, graph_bot, 30, height_3);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 30, height_4);
			processing.rect(axis_location[1]-5, graph_bot, 30, height_5);
			processing.rect(axis_location[2]-5, graph_bot, 30, height_6);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-20, graph_bot, 20, height_1);
			processing.rect(axis_location[1]-20, graph_bot, 20, height_2);
			processing.rect(axis_location[2]-20, graph_bot, 20, height_3);
			if (data["labor_1"][2] == null)
			{
				processing.textAlign(processing.LEFT);
				processing.textFont(font, 16);
				processing.text("N/A", axis_location[1]-30, graph_bot-7);
			}
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 20, height_4);
			processing.rect(axis_location[1], graph_bot, 20, height_5);
			processing.rect(axis_location[2], graph_bot, 20, height_6);	
			if (data["labor_2"][2] == null)
			{
				processing.textAlign(processing.RIGHT);
				processing.textFont(font, 16);
				processing.text("N/A", axis_location[1]+30, graph_bot-7);
			}
		}
		processing.textFont(font, 12);
	};

	function taxes() {
		axis_location = [105, 215, 340, 530];
		var graph_top = 50; 
		var graph_bot = 320;
		var graph_left = 60;
		var graph_right = 595;

		processing.textAlign(processing.CENTER);
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(0);
		processing.text("SALES TAX", axis_location[0], graph_bot+15);
		processing.text("-INCOME TAX-", (axis_location[2]+axis_location[1])/2, graph_bot+15);
		processing.text("MIN", axis_location[1], graph_bot+15);
		processing.text("MAX", axis_location[2], graph_bot+15);
		processing.text("PROPERTY TAX", axis_location[3], graph_bot+15);
		processing.text("TAX RATES COMPARED TO NATIONAL AVERAGES", 327, 30);

		//left and right axis
		processing.line(graph_left, graph_top, graph_left, graph_bot);
		processing.line(graph_right, graph_top, graph_right, graph_bot);

		//bottom lines around categories
		processing.line(graph_left, graph_bot+1, graph_right-1, graph_bot+1);

		var min_1, max_1, min_2, max_2;
		if (hide_2 && !hide_1)
		{
			var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_3"][0]);
			var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["taxes_1"][3], data["taxes_3"][3]) * 1.1;
		}
		else if (hide_1 && !hide_2)
		{
			var temp_max_1 = processing.max(data["taxes_2"][0], data["taxes_3"][0]);
			var temp_max_2 = processing.max(data["taxes_2"][2], data["taxes_3"][2]);	
			max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
			max_2 = processing.max(data["taxes_2"][3], data["taxes_3"][3]) * 1.1;
		}
		else
		{
			if (data["location_2"])
			{
				var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_2"][0], data["taxes_3"][0]);
				var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_2"][2], data["taxes_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["taxes_1"][3], data["taxes_2"][3], data["taxes_3"][3]) * 1.1;
			}
			else
			{
				var temp_max_1 = processing.max(data["taxes_1"][0], data["taxes_3"][0]);
				var temp_max_2 = processing.max(data["taxes_1"][2], data["taxes_3"][2]);	
				max_1 = processing.max(temp_max_2, temp_max_1) * 1.1;
				max_2 = processing.max(data["taxes_1"][3], data["taxes_3"][3]) * 1.1;
			}

		}

		min_1 = 0.0;
		min_2 = 0.0;

		processing.stroke(235);
		processing.fill(0);
		var range = (graph_top - graph_bot)/10;
		var per_scale = (max_1 - min_1)/10;
		var money_scale = (max_2 - min_2)/10;
		for (var i=1; i<=10; i++)
		{
			var h = graph_bot + range * i;
			processing.line(graph_left+2, h, graph_right-3, h);
			processing.textAlign(processing.RIGHT);
			processing.text(String(processing.round(min_1 + per_scale * i * 10)/10) + "%", graph_left-5, h+5);
			processing.textAlign(processing.LEFT);
			processing.text("$" + String(processing.round(min_2 + money_scale * i * 100)/100), graph_right+5, h+5);
		}

		//draw NATIONAL AVERAGE rectangle and data
		processing.stroke(0);
		var line_1 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][0] -  min_1)/(max_1 - min_1));
		var line_2 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][1] -  min_1)/(max_1 - min_1));
		var line_3 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][2] -  min_1)/(max_1 - min_1));
		var line_4 = graph_bot + (graph_top - graph_bot)*((data["taxes_3"][3] -  min_2)/(max_2 - min_2));
		
		processing.line(graph_left, line_1, axis_location[0]+40, line_1);
		processing.line(axis_location[0]+41, line_1, axis_location[1]-40, line_2);
		processing.line(axis_location[1]-40, line_2, axis_location[1]+40, line_2);
		processing.line(axis_location[1]+41, line_2, axis_location[2]-41, line_3);
		processing.line(axis_location[2]-40, line_3, axis_location[2]+40, line_3);
		processing.line(axis_location[2]+41, line_3, axis_location[3]-41, line_4);
		processing.line(axis_location[3]-40, line_4, graph_right-1, line_4);

		processing.fill(255);
		processing.stroke(255);
		processing.rect((axis_location[2]+axis_location[3])/2-40, (line_3+line_4)/2-30, 77, 50)
		processing.noStroke();
		processing.fill(0);
		processing.textAlign(processing.CENTER);
		processing.text("NATIONAL", (axis_location[2]+axis_location[3])/2, (line_3+line_4)/2-9);
		processing.text("AVERAGES", (axis_location[2]+axis_location[3])/2, (line_3+line_4)/2+8);

		var height_1 = (graph_top - graph_bot)*((data["taxes_1"][0] -  min_1)/(max_1 - min_1));
		var height_2 = (graph_top - graph_bot)*((data["taxes_1"][1] -  min_1)/(max_1 - min_1));
		var height_3 = (graph_top - graph_bot)*((data["taxes_1"][2] -  min_1)/(max_1 - min_1));
		var height_4 = (graph_top - graph_bot)*((data["taxes_1"][3] -  min_2)/(max_2 - min_2));
		if (!hide_2)
		{
			var height_5 = (graph_top - graph_bot)*((data["taxes_2"][0] -  min_1)/(max_1 - min_1));
			var height_6 = (graph_top - graph_bot)*((data["taxes_2"][1] -  min_1)/(max_1 - min_1));
			var height_7 = (graph_top - graph_bot)*((data["taxes_2"][2] -  min_1)/(max_1 - min_1));
			var height_8 = (graph_top - graph_bot)*((data["taxes_2"][3] -  min_2)/(max_2 - min_2));
		}

		//buffer boxes
		if (!hide_1)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-25, graph_bot, 30, height_1);
			processing.rect(axis_location[1]-25, graph_bot, 30, height_2);
			processing.rect(axis_location[2]-25, graph_bot, 30, height_3);
			processing.rect(axis_location[3]-25, graph_bot, 30, height_4);
		}

		if (!hide_2)
		{
			processing.fill(255);
			processing.rect(axis_location[0]-5, graph_bot, 30, height_5);
			processing.rect(axis_location[1]-5, graph_bot, 30, height_6);
			processing.rect(axis_location[2]-5, graph_bot, 30, height_7);
			processing.rect(axis_location[3]-5, graph_bot, 30, height_8);
		}
		//data
		if (!hide_1)
		{
			processing.fill(main);
			processing.noStroke();
			processing.rect(axis_location[0]-20, graph_bot, 20, height_1);
			processing.rect(axis_location[1]-20, graph_bot, 20, height_2);
			processing.rect(axis_location[2]-20, graph_bot, 20, height_3);
			processing.rect(axis_location[3]-20, graph_bot, 20, height_4);
		}

		if (!hide_2)
		{
			processing.fill(gray);
			processing.noStroke();
			processing.rect(axis_location[0], graph_bot, 20, height_5);
			processing.rect(axis_location[1], graph_bot, 20, height_6);
			processing.rect(axis_location[2], graph_bot, 20, height_7);
			processing.rect(axis_location[3], graph_bot, 20, height_8);		
		}
		
	};

	function weather() {
		//draw axis
		processing.stroke(0);
		processing.fill(0);
		processing.strokeWeight(2);
		processing.line(60, 50, 60, 324);
		processing.line(605, 50, 605, 324);
		processing.line(60, 325, 605, 325);
		

		var min, max;
		if (!hide_2 && hide_1)
		{
			min = data["weatherlow_2"][12];
			max = data["weather_2"][13];

		}
		else if (hide_2 && !hide_1)
		{
			min = data["weatherlow_1"][12];
			max = data["weather_1"][13];
		}
		else
		{
			if (data["location_2"])
			{
				min = processing.min(data["weatherlow_1"][12], data["weatherlow_2"][12]);
				max = processing.max(data["weather_1"][13], data["weather_2"][13]);
			}
			else
			{
				min = data["weatherlow_1"][12];
				max = data["weather_1"][13];
			}
		}

		min = min - ((max-min) / 10);
		max = max + ((max-min) / 10);

		//background separation
		processing.fill(245);
		processing.noStroke();
		processing.rect(100, 55, 48, 268);
		processing.rect(190, 55, 48, 268);
		processing.rect(280, 55, 48, 268);
		processing.rect(370, 55, 48, 268);
		processing.rect(460, 55, 48, 268);
		processing.rect(550, 55, 48, 268);


		processing.stroke(0);
		processing.fill(0);
		processing.strokeWeight(2);
		var range = max - min;
		var scale = (max - min) / 10;
		for (var i=0; i<=10; i++)
		{
			processing.strokeWeight(1);
			processing.line(62, 325-27*i, 597, 325-27*i);
			processing.textAlign(processing.RIGHT);
			processing.stroke(235);
			processing.text(processing.round(min+i*scale)+"°", 50, 325-27*i);
			
		}


		processing.fill(0);
		processing.textAlign(processing.LEFT);
		//add labels
		processing.text("JAN", 70-2, 345);
		processing.text("FEB", 115-2, 345);
		processing.text("MAR", 160-2, 345);
		processing.text("APR", 205-2, 345);
		processing.text("MAY", 250-2, 345);
		processing.text("JUN", 295-2, 345);
		processing.text("JUL", 340-2, 345);
		processing.text("AUG", 385-2, 345);
		processing.text("SEP", 430-2, 345);
		processing.text("OCT", 475-2, 345);
		processing.text("NOV", 520-2, 345);
		processing.text("DEC", 565-2, 345);
		processing.fill(0);
		processing.text("AVERAGE MONTHLY TEMPERATURE (°F) RANGE", 175, 40);

		//draw data
		processing.strokeWeight(4);
		for (var i=1; i<13; i++)
		{
			if (!hide_1)
			{
				processing.stroke(main);
				processing.fill(main);
				var percent_1 = (data["weather_1"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_1"][i-1] -  min) / range;
				processing.ellipse(28+45*i, (1-percent_1) * 275 + 49, 3, 3);
				processing.ellipse(28+45*i, (1-percent_2) * 275 + 49, 3, 3);
				processing.line(28+45*i, (1-percent_1) * 275 + 49, 28+45*i, (1-percent_2) * 275 + 49);
			}

			if (!hide_2)
			{
				processing.stroke(gray);
				processing.fill(gray);
				var percent_1 = (data["weather_2"][i-1] - min) / range;
				var percent_2 = (data["weatherlow_2"][i-1] -  min) / range;
				processing.ellipse(41+45*i, (1-percent_1) * 275 + 49, 3, 3);
				processing.ellipse(41+45*i, (1-percent_2) * 275 + 49, 3, 3);
				processing.line(41+45*i, (1-percent_1) * 275 + 49, 41+45*i, (1-percent_2) * 275 + 49);
			}
		}

		//draw legend
		processing.strokeWeight(2);
		processing.fill(255);
		processing.stroke(235);
		processing.rect(525, 25, 100, 68);
		processing.fill(main);
		processing.stroke(main);
		processing.ellipse(545, 59, 3, 3);
		processing.ellipse(545, 80, 3, 3);
		processing.line(545, 60, 545, 80);
		processing.fill(gray);
		processing.stroke(gray);
		processing.ellipse(605, 59, 3, 3);
		processing.ellipse(605, 80, 3, 3);
		processing.line(605, 60, 605, 80);

		processing.fill(0);
		processing.text("AVG TEMP", 545, 43);
		processing.text("HIGHS", 557, 62);
		processing.text("LOWS", 558, 83);
	};

};

function update_tab(name) {
	active_tab = name;
	hide_1 = false;
	document.getElementById("search_1_button").value = "HIDE";
	if(data["location_2"])
	{
		hide_2 = false;
		document.getElementById("search_2_button").value = "HIDE";
	}
};

function hide_toggle(num) {
	if (num == 1)
	{
		if (document.getElementById("search_1_button").value == "HIDE") { 
			document.getElementById("search_1_button").value = "SHOW";
		}
		else { 
			document.getElementById("search_1_button").value = "HIDE";
		}
		hide_1 = !hide_1;
	}
	else
	{
		if (document.getElementById("search_2_button").value == "HIDE") { 
			document.getElementById("search_2_button").value = "SHOW";
		}
		else { 
			document.getElementById("search_2_button").value = "HIDE";
		}
		hide_2 = !hide_2;
	}
};

var canvas = document.getElementById("main_viz");
if (canvas != null)
	var processingInstance = new Processing(canvas, sketchProc);


