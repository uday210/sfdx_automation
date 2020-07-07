/**
 * Created by x213555 on 7/3/18.
 */
({
    //takes a callingComp and calls the function with the given function name from it
    //supports isAura, isBackground, isStorable, and fromVariable flags
    callAsPromise: function callAsPromise(c, e, h){
        const args = e.getParam('arguments').callInfo;
        //sample args:
        // {
        //     callingComp: component,
        //     functionName: 'foo',
        //     params: {
        //         x: 1
        //     },
        //     isAura: false,
        //     isBackground: false,
        //     isStorable: false,
        //     fromVariable: false,
        // }

        let promise = new Promise($A.getCallback((resolve, reject) => {
            let action = args.callingComp.get((args.fromVariable?'v.':'c.')+args.functionName);
            action.setParams(args.params||{});
            if (args.isBackground) {
                action.setBackground();
            }
            if (args.isStorable) {
                action.setStorable();
            }
            action.setCallback(this, function(response){
                if(!args.isAura) {
                    if (response.getState() === 'SUCCESS') {
                        resolve(response.getReturnValue());
                    } else {
                        reject(response.getError()[0].message);
                    }
                } else {
                    resolve(response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        }));
        return promise;
    },
    createExternalPromise: function(c,e,h) {
        let res;
        let rej;
        let exPromise = new Promise($A.getCallback((resolve, reject) => {
            res = resolve;
            rej = reject;
        }));
        exPromise.resolve = function(value) {
            this.pending=false;
            res(value);
            return this;
        };
        exPromise.reject = function(value) {
            this.pending=false;
            this.rejected=true;
            rej(value);
            return this;
        };
        exPromise.pending = true;
        return exPromise;
    },
    createResolvedPromise: function(c,e,h) {
        let resPromise = new Promise((resolve, reject) => {
            resolve();
        });
        resPromise.pending=false;
        return resPromise;
    }
})