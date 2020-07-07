({
    onclick: function(c,e,h) {
        let func=c.get('v.onclick');
        if(c.get('v.loading') == null) c.set('v.autoLoading', true);
        func.setCallback(this, function(response) {
            let functionResult = response.getReturnValue();
            if (functionResult instanceof Promise) {
                functionResult.then((promiseResult) => {
                    c.set('v.autoLoading', false);
                }).catch((error)=>{
                    c.set('v.autoLoading', false);
                    throw error;
                }).finally(()=>{
                    c.set('v.autoLoading', false);
                });
            } else {
                c.set('v.autoLoading', false);
            }
        });
        $A.enqueueAction(func);
        e.stopPropagation();
    },
})