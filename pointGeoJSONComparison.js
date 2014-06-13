/*
 * 
 * Written by twitter.com/georgemck
 * June 2014
 * 
 * Released as Open Source 
 * 
 */

function pointGeoJSONComparison(geoJSON,longitude,latitude,distance){
         
 	var outerLoop = geoJSON.features.length;
 
 	for (var i = 0; i < outerLoop; i++) {
 	    var currentGeoJSON = geoJSON.features[i];
 	    var items, itemz = 0;
 		var thisDist = null;
		try {
				//Iterate through geometries
				items = currentGeoJSON.geometries[0].coordinates.length;
				
				for (var j = 0; j < items; j++) { 				
					thisDist = gju.pointDistance({type: 'Point', coordinates:[longitude, latitude]}, {type: 'Point', coordinates:[currentGeoJSON.geometries[0].coordinates[j][0], currentGeoJSON.geometries[0].coordinates[j][1]]});
		 
					if(thisDist < distance){
						message = currentGeoJSON.properties.Name + " is less than " + distance + " meters. Precisely, " + thisDist.toString() + " meters";
						return message;
		 			}
				}
			
		} catch (e){
				//console.log(i + " " + currentGeoJSON.properties.Name + " no geometries");		
     	}
		try {
				//Iterate through single geometry
				itemz = currentGeoJSON.geometry.coordinates.length;
			
				//Is this geometry type a single point?
				var geometryType = currentGeoJSON.geometry.type;
			
				for (var k = 0; k < itemz; k++) { 				
					if(geometryType != "Point"){
						thisDist = gju.pointDistance({type: 'Point', coordinates:[longitude, latitude]}, {type: 'Point', coordinates:[currentGeoJSON.geometry.coordinates[k][0], currentGeoJSON.geometry.coordinates[k][1]]});
						} else {
						thisDist = gju.pointDistance({type: 'Point', coordinates:[longitude, latitude]}, {type: 'Point', coordinates:[currentGeoJSON.geometry.coordinates[0], currentGeoJSON.geometry.coordinates[1]]});
					}
		 
					if(thisDist < distance){
						message = currentGeoJSON.properties.Name + " is less than " + distance + " meters. Precisely, " + thisDist.toString() + " meters";
						return message;
		 			}
				}

		} catch (e){
				//console.log(i + " " + currentGeoJSON.properties.Name + " geometries");		
	 	}
     }
   	return null;
 }
