@RestResource(urlMapping='/DatesDifference/*')
global class DatesDifference {
    
    @HTTPPost
    global static void getDiffOfDates(String StartDate,String EndDate){
        RestResponse res = RestContext.response;
        try{
        Date startDateIs = date.parse(StartDate);
		Date EndDateIs = date.parse(EndDate);
		Integer numberDaysDue = startDateIs.daysBetween(EndDateIs);
        
      
		res.responseBody = Blob.valueOf(String.ValueOf(numberDaysDue));
        }catch(Exception ex){
            res.statusCode = 400;
            res.responseBody = Blob.valueOf(ex.getMessage());
        }
        
    }

}