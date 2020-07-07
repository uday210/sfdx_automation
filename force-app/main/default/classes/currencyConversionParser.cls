global class currencyConversionParser implements Schedulable {

    global void execute(SchedulableContext SC) {

        GetCurrencyRates();
    }
    public static void GetCurrencyRates(){
        Http h  = new http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.exchangeratesapi.io/latest?base=USD');
        req.setMethod('GET');
        HttpResponse res = h.send(req);
        system.debug(res.getBody());
        system.debug(currencyConversionParser.parse(res.getBody()));
        currencyConversionParser.CurrencyConversion cp = currencyConversionParser.parse(res.getBody());
        
        /**************************************
        **    //save this value in SOBJECT   **
        **                                   **
        **************************************/
        
        Double CadConversionRate = cp.rates.CAD;
        
            
    }

    public class Rates {
        public Double PHP {get;set;} 
        public Double HUF {get;set;} 
        public Double IDR {get;set;} 
        public Double TRY_Z {get;set;} // in json: TRY
        public Double RON {get;set;} 
        public Double ISK {get;set;} 
        public Double ILS {get;set;} 
        public Double CNY {get;set;} 
        public Double USD {get;set;} 
        public Double EUR {get;set;} 
        public Double PLN {get;set;} 
        public Double GBP {get;set;} 
        public Double CAD {get;set;} 
        public Double AUD {get;set;} 
        public Double MYR {get;set;} 
        public Double NZD {get;set;} 
        public Double CHF {get;set;} 
        public Double HRK {get;set;} 
        public Double SGD {get;set;} 
        public Double DKK {get;set;} 
        public Double BGN {get;set;} 
        public Double CZK {get;set;} 
        public Double BRL {get;set;} 
        public Double JPY {get;set;} 
        public Double KRW {get;set;} 
        public Double INR {get;set;} 
        public Double SEK {get;set;} 
        public Double MXN {get;set;} 
        public Double RUB {get;set;} 
        public Double HKD {get;set;} 
        public Double ZAR {get;set;} 
        public Double THB {get;set;} 
        public Double NOK {get;set;} 

        public Rates(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'PHP') {
                            PHP = parser.getDoubleValue();
                        } else if (text == 'HUF') {
                            HUF = parser.getDoubleValue();
                        } else if (text == 'IDR') {
                            IDR = parser.getDoubleValue();
                        } else if (text == 'TRY') {
                            TRY_Z = parser.getDoubleValue();
                        } else if (text == 'RON') {
                            RON = parser.getDoubleValue();
                        } else if (text == 'ISK') {
                            ISK = parser.getDoubleValue();
                        } else if (text == 'ILS') {
                            ILS = parser.getDoubleValue();
                        } else if (text == 'CNY') {
                            CNY = parser.getDoubleValue();
                        } else if (text == 'USD') {
                            USD = parser.getDoubleValue();
                        } else if (text == 'EUR') {
                            EUR = parser.getDoubleValue();
                        } else if (text == 'PLN') {
                            PLN = parser.getDoubleValue();
                        } else if (text == 'GBP') {
                            GBP = parser.getDoubleValue();
                        } else if (text == 'CAD') {
                            CAD = parser.getDoubleValue();
                        } else if (text == 'AUD') {
                            AUD = parser.getDoubleValue();
                        } else if (text == 'MYR') {
                            MYR = parser.getDoubleValue();
                        } else if (text == 'NZD') {
                            NZD = parser.getDoubleValue();
                        } else if (text == 'CHF') {
                            CHF = parser.getDoubleValue();
                        } else if (text == 'HRK') {
                            HRK = parser.getDoubleValue();
                        } else if (text == 'SGD') {
                            SGD = parser.getDoubleValue();
                        } else if (text == 'DKK') {
                            DKK = parser.getDoubleValue();
                        } else if (text == 'BGN') {
                            BGN = parser.getDoubleValue();
                        } else if (text == 'CZK') {
                            CZK = parser.getDoubleValue();
                        } else if (text == 'BRL') {
                            BRL = parser.getDoubleValue();
                        } else if (text == 'JPY') {
                            JPY = parser.getDoubleValue();
                        } else if (text == 'KRW') {
                            KRW = parser.getDoubleValue();
                        } else if (text == 'INR') {
                            INR = parser.getDoubleValue();
                        } else if (text == 'SEK') {
                            SEK = parser.getDoubleValue();
                        } else if (text == 'MXN') {
                            MXN = parser.getDoubleValue();
                        } else if (text == 'RUB') {
                            RUB = parser.getDoubleValue();
                        } else if (text == 'HKD') {
                            HKD = parser.getDoubleValue();
                        } else if (text == 'ZAR') {
                            ZAR = parser.getDoubleValue();
                        } else if (text == 'THB') {
                            THB = parser.getDoubleValue();
                        } else if (text == 'NOK') {
                            NOK = parser.getDoubleValue();
                        } else {
                            System.debug(LoggingLevel.WARN, 'Rates consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    public class CurrencyConversion {
        public Rates rates {get;set;} 
        public String base {get;set;} 
        public String dateIs {get;set;} 

        public CurrencyConversion(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'rates') {
                            rates = new Rates(parser);
                        } else if (text == 'base') {
                            base = parser.getText();
                        } else if (text == 'date') {
                            dateIs = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'CurrencyConversion consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    
    public static CurrencyConversion parse(String json) {
        System.JSONParser parser = System.JSON.createParser(json);
        return new CurrencyConversion(parser);
    }
    
    public static void consumeObject(System.JSONParser parser) {
        Integer depth = 0;
        do {
            System.JSONToken curr = parser.getCurrentToken();
            if (curr == System.JSONToken.START_OBJECT || 
                curr == System.JSONToken.START_ARRAY) {
                depth++;
            } else if (curr == System.JSONToken.END_OBJECT ||
                curr == System.JSONToken.END_ARRAY) {
                depth--;
            }
        } while (depth > 0 && parser.nextToken() != null);
    }
    




}