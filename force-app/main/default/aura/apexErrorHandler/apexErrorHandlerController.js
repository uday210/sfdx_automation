({
    init: function (c,e,h) {
        let callingComp = c.get('v.callingComp');
        if(callingComp) {
            callingComp.addValueProvider(
                'errorHandler',
                {
                    get: function (key) {
                        return {
                            execute: {
                                handleError: function (error) {
                                    let action = c.get('c.logError');
                                    let pendingErrors = c.get('v.pendingErrors')||[];
                                    pendingErrors.push(error);
                                    c.set('v.pendingErrors', pendingErrors);
                                    $A.enqueueAction(action);
                                },
                                displayError: function (error) {
                                    let action = c.get('c.showError');
                                    let pendingErrors = c.get('v.pendingErrors')||[];
                                    pendingErrors.push(error);
                                    c.set('v.pendingErrors', pendingErrors);
                                    $A.enqueueAction(action);
                                },
                                displaySoftError: function (error) {
                                    let action = c.get('c.showSoftError');
                                    let pendingErrors = c.get('v.pendingErrors')||[];
                                    pendingErrors.push(error);
                                    c.set('v.pendingErrors', pendingErrors);
                                    $A.enqueueAction(action);
                                }
                            }[key]
                        }
                    },
                    set: function (key, value) {}
                }
            );
        }
    },
    toggleShowAdditional: function (c,e,h) {
        c.set('v.showAdditional', !c.get('v.showAdditional'));
    },
    scriptsLoaded: function(c,e,h) {
        $(window).on("beforeunload", function () {
            window.sessionStorage.setItem('errorDefaultCheck', '{}');
        });
        if (!c.get('v.hasCheckedDefault')) {
            c.set('v.hasCheckedDefault', true);

            let promise = new Promise((resolve, reject) => {
                try {
                    c.find('workspace').getEnclosingTabId().then(function (id) {
                        if(!id) {
                            resolve(window.location.href);
                        }
                        else {
                            resolve(JSON.stringify(id));
                        }
                    });
                } catch (error) {
                    resolve('visualForce:'+window.location.href);
                }
            }).then(function(id){
                let check = JSON.parse(window.sessionStorage.getItem('errorDefaultCheck')||'{}');
                if (!check[id]) {
                    check[id]=true;
                    window.sessionStorage.setItem('errorDefaultCheck', JSON.stringify(check));
                    c.set('v.isDefault', true);
                }
                c.set('v.tabId', id);
            });
        }
    },
    closeError: function(c,e,h) {
        c.set('v.errors', []);
    },
    logError: function(c,e,h) {
        let error;
        if (e) {
            error = e.getParam("arguments").errorObj;
        }
        let pendingErrors = c.get('v.pendingErrors')||[];
        if (pendingErrors.length) {
            error = pendingErrors.splice(0,1)[0];
            c.set('v.pendingErrors', pendingErrors);
        }
        if (!error) return;
        h.logError(c, h, error, null);
    },
    showError: function(c,e,h) {
        let error;
        if (e) {
            error = e.getParam("arguments").errorObj;
        }
        let pendingErrors = c.get('v.pendingErrors')||[];
        if (pendingErrors.length) {
            let pendingErrors = c.get('v.pendingErrors')||[];
            error = pendingErrors.splice(0,1)[0];
            c.set('v.pendingErrors', pendingErrors);
        }
        if (!error) return;
        h.logError(c, h, error, h.showError);
    },
    showSoftError: function(c,e,h) {
        let error;
        if (e) {
            error = e.getParam("arguments").errorObj;
        }
        let pendingErrors = c.get('v.pendingErrors')||[];
        if (pendingErrors.length) {
            let pendingErrors = c.get('v.pendingErrors')||[];
            error = pendingErrors.splice(0,1)[0];
            c.set('v.pendingErrors', pendingErrors);
        }
        if (!error) return;
        h.throwSoftError(c, error);
    },
    addErrorToast: function(c,e,h) {
        let error = JSON.parse(e.getParam('error'));
        if(c.get('v.isDefault') && c.get('v.tabId') === error.tabId) {
            h.showError(c, h, error, null);
        }
    }
})