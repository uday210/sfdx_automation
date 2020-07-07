/**
 * Created by x213555 on 6/7/18.
 */
({
    redirectErrorEvent: function (c,e,h) {
        let error = e.getParam('error');
        let targetId = e.getParam('targetId');
        let errorEvent = c.getEvent("error");
        errorEvent.setParams({
            error: error,
            targetId: targetId
        });
        errorEvent.fire();
    }
});