class Time {
     static addDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        dateObj = dateObj.setUTCHours(0,0,0,0);
        return dateObj;
     }
     static getToday(){
      var d = new Date();
      d.setUTCHours(0,0,0,0);
      return d;
     }
     static getStartOfTheDay(d){
      d.setUTCHours(0,0,0,0);
      return d;
     }
     static add2Hours(dt) {
      dt.setHours( dt.getHours() + 2 );
      return dt;
    }
}
module.exports = Time;
