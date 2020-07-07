/**
 * Created by x213555 on 5/29/19.
 */
({
    fuzzyMatch: function(target, matcher) {
        target=target.toLowerCase();
        return matcher.reduce(function(acc, val) {
            let match = target.match(new  RegExp(val+='.*'));
            if (!match) return false && acc;
            target = match[0];
            return true && acc;
        }, true);
    }
})