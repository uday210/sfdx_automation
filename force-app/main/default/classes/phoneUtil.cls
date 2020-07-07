public class phoneUtil{

    public static String format(String phoneNumber, String pattern) {
        
        // Handle null values
        if(phoneNumber == null || pattern == null) {
            throw new NullPointerException();
        }
        
        String num = phoneNumber;
        String formattedNumber = '';
            
        // split the formatter into its pieces
        List<String> splitFormatter = pattern.splitByCharacterType();
        
        for(String split : splitFormatter) {
            String thisBit = '';
            
            // If it's the 'X' part, then we want to grab the digits of the phone number
            if(split.containsOnly('X')) {
                thisBit = num.left(split.length());
                num = num.removeStart(thisBit);
            } else if(!String.isBlank(num)){
                thisBit = split;
            }
            
            // Add thisBit onto the formatted number string
            formattedNumber += thisBit;
        }
        
        return formattedNumber;
    }
}