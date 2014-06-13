/*
Copyright (c) 2014, George McKinney
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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
