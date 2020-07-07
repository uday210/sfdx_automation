({
    logError:function(c, h, error, callback) {
        error.tabId = c.get('v.tabId');
        if (error.description === undefined) {
            error.description = "Technical Error: Unknown Error Has Occurred";
        } else if(error.description instanceof Error) {
            error.description = error.description.message;
            error.apexStackTrace = error.description.stack;
        } else if (error.description.indexOf('pruException') !== -1) {
            var obj = JSON.parse(error.description);
            if (obj.messages != null) {
                error.description = obj.messages[0];
                error.apexStackTrace = obj.stackTrace;
                error.isHardException = obj.isHardException;
                error.callouts = JSON.stringify(obj.callouts);
            }
        }
        if (error.isHardException || error.isHardException == null) {
            var action = c.get("c.splunkLogError");
            var re = new RegExp('https?\:\/\/.*?\-\-([^\.]*).*');
            action.setParams({
                "component": c.get('v.parentCompType'),
                "description": error.description,
                "environment": re.exec(window.location.href) ? re.exec(window.location.href)[1] : 'prod',
                "title": error.title,
                "stackTrace": error.apexStackTrace,
                "callouts": error.callouts
            });
            action.setCallback(this, function (response) {
                if (callback) callback(c, h, error, response);
            });
            $A.enqueueAction(action);
        }
        else if (callback) callback(c, h, error, null);
    },
    showError: function(c, h, error, response) {
        if(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                error.description+=' [Error Id:'+response.getReturnValue()+']';
            }
            else {
                //We can't really do all that much if the error logging component is failing
                console.log(response.getError());
            }
        }
        h.throwToastForError(c, error);
    },
    throwToastForError: function(c, error) {
        if(error.isHardException || error.isHardException == null) {
            if(!c.get('v.isDefault')) {
                //this is not the default element
                let errorEvent = $A.get("e.c:ErrorToastEvent");
                errorEvent.setParams({
                    error: JSON.stringify(error)
                });
                errorEvent.fire();
            }
            else {
                //this is the default error handler
                let errors=c.get('v.errors')||[];
                errors.push(error);
                c.set('v.errors', errors);
            }
        }
        else {
            this.throwSoftError(c, error)
        }
    },

    throwSoftError: function(c, error){
        //soft errors are still thrown in the old way
        var toast = $A.get("e.force:showToast");
        toast.setParams({
            "title": error.title,
            "message": error.description,
            "type": "warning",
            "mode": "sticky"
        });
        toast.fire();
    }
})