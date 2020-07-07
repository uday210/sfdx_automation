/**
 * Created by x213555 on 9/25/18.
 */
({
    render: function(c,h) {
        if (c.get('v.isDefault')) {
            let check = JSON.parse(window.sessionStorage.getItem('errorDefaultCheck'));
            check[c.get('v.tabId')]=true;
            window.sessionStorage.setItem('errorDefaultCheck', JSON.stringify(check));
        }
        return this.superRender();
    },
    unrender: function(c,h) {
        if (c.get('v.isDefault')) {
            let check = JSON.parse(window.sessionStorage.getItem('errorDefaultCheck'));
            check[c.get('v.tabId')]=false;
            window.sessionStorage.setItem('errorDefaultCheck', JSON.stringify(check));
        }
        return this.superUnrender(c,h);
    }
})