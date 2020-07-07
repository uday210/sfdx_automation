public class BasicCallableClass implements Callable{
    public String Name;
    public BasicCallableClass(){
        Name = 'Test';
    }
    public string getName(){
        
        return Name;
    }
     public string setName(String Name){
        
         this.Name = Name;
         return Name;
    }
    

    public Object call(String action, Map<String, Object> args) {
        switch on action {
			when 'getName' {
            return this.getName();
            }
            when 'setName' {
                return this.setName((String)args.get('Name'));
            }
        }

        return null;
    }
}