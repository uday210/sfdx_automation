global class dynamicData{

    global class dataInfo{

    webservice  String dataIs;
    dataInfo(String dataIs){
        this.dataIs = dataIs;
    }
   }

    webservice static String getdata(){
    
        
    return JSON.serialize([select id,name from Account ]);
    
    
    }
    
}