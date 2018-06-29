angular.module("Gula.services")
  .factory("CalculateAreaService", function () {
    // Define constants regarding the Earth Circumference
    let EARTH_RADIUS = 6371000;
    let EARTH_DIAMETER = EARTH_RADIUS * 2;
    let EARTH_CIRCUMFERENCE = EARTH_DIAMETER * Math.PI;

    // Define lists to hold separate latitude and longitude values
    var listY = [];
    var listX = [];

    // Define a list to hold area values for individual triangle sub-segments
    var listArea = [];


    /**
     * Calculate the are of two different segments
     *
     * @param {number} x1 defines the horizontal segment of the first point
     * @param {number} x2 defines the horizontal segment of the second point
     * @param {number} y1 defines the vertical segment of the first point
     * @param {number} y2 defines the vertical segment of the second point
     * @return {number} returns the calculated area
     */
    let calculateAreaInSquareMeters = function (x1, x2, y1, y2) {
      return (y1 * x2 - x1 * y2) / 2;
    };

    /**
     * Calculate a Y segment defined by the distance between the origin point and an arbitrary point
     * in a plane
     *
     * @param {Number} latitudeRef Represents the origin point's latitude (first collected coordinate value)
     * @param {Number} latitude Represents the second point which defines the line segment
     * @return {Number} Represents the Segment's Y value calculated
     */
    let calculateYSegment = function (latitudeRef, latitude) {
      return (latitude - latitudeRef) * EARTH_CIRCUMFERENCE / 360;
    };

    /**
     * Calculate an X segment defined by the distance between the origin point and an arbitrary point
     * in a plane
     *
     * @param {Number} longitudeRef Represents the origin point's longitude (first collected coordinate value)
     * @param {Number} longitude Represents the second point's longitude which defines the line segment
     * @param {Number} latitude Represents the latitude of the second point
     * @return {Number} Represents the Segment's X value calculated
     */
    let calculateXSegment = function (longitudeRef, longitude, latitude) {
      let latitudeRadians = latitude * (Math.PI / 180);

      return (longitude - longitudeRef) * EARTH_CIRCUMFERENCE * Math.cos(latitudeRadians) / 360.0;
    };


    return {

      // TODO: update function to receive real coordinates as a function
      /**
       * Calculates the Area from a list of Coordinates.  It uses triangles
       * to approximate the area of the polygon
       *
       *  @param  {Array} coordinates Represents an array of array with latitude and longitude decimal values
       *  @return {Number}     Represents the sum of all segment areas.
       */
      calculateAreaOfGPSPolygonOnEarthInSquareMeters: function (coordinates) {

        // Only Calculate Area of a polygon (Anything with at least 3 points)
        if (coordinates.length < 3) {
          return 0;
        }

        // get a reference latitude and longitude
        let latitudeRef = coordinates[0][0];
        let longitudeRef = coordinates[0][1];

        // 1) Calculate line segments

        for (var i = 1; i < coordinates.length; i++) {
          // Fetch Latitude
          let latitude = coordinates[i][0];
          // Fetch Longitude
          let longitude = coordinates[i][1];

          listY.push(calculateYSegment(latitudeRef, latitude));

          listX.push(calculateXSegment(longitudeRef, longitude, latitude));

        }

        // 2) Calculate area for each triangle segment

        for (var i = 1; i < listX.length; i++) {
          // Fetch two consecutive points
          let x1 = listX[i-1];
          let y1 = listY[i-1]
          let x2 = listX[i];
          let y2 = listY[i];

          listArea.push(calculateAreaInSquareMeters(x1, x2, y1, y2))
        }

        // 3) Sum all triangle areas

        var areaSum = 0;

        listArea.forEach(function (item) {
          areaSum = areaSum + item;
        })

        // 4) Take absolute value
        return Math.abs(areaSum)


      }
    }
  });
