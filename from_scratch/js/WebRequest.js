var WebRequest = function(url) {
    ((!/^.*\/$/.test(url)) ? this.base_url = url += '/' : this.base_url = url)
}

WebRequest.prototype = {
    get: function(id) {
        $.ajax({
            url:(id ? this.base_url + id : this.base_url),
            type:'GET',
        })
        
        // Called every time .get method completes.
        .done(function(result, state, retObject) {
            // JSON object we got back.
            this.result = result;
            // State of the response.
            this.state = state;
            // Full response object we got back.
            this.retObject = retObject;
        }.bind(this))
        
        // Called only when .get method fails.
        .fail(function(retObject, status, error) {
            // Reason for error in text form.
            this.error = error;
            // State of the response.
            this.state = state;
            // Full response object we got back.
            this.retObject = retObject;
        }.bind(this));
    },

    post: function(id, object) {
        if(object && id) {
            $.ajax({
                url:this.base_url + id,
                type:'POST',
                headers: { 'Content-Type':'application/json' },
                contentType: 'application/json',
                data: $.param(object),
            })
          
            // Called every time .post completes.
            .done(function(res) { this.result = res; }.bind(this))
            
            // Called only when .post fails.
            .fail(function(res) { this.result = res; }.bind(this))
        }
    },

    put: function(id, object) {
        if(object && id) {
            $.ajax({
                url:this.base_url + id,
                type:'PUT',
                headers: { 'Content-Type':'application/json' },
                contentType:'application/json',
                data:$.param(object),
            })
            
            // Called every time .put completes.
            .done(function(res) { this.result = res; }.bind(this))
            
            // Called only when .put fails.
            .fail(function(res) { this.result = res; }.bind(this))
        }
    },

    delete: function(id, object) {
        if(object && id) {
            $.ajax({
                url:this.base_url + id,
                type:'DELETE',
            })
            
            // Called every time .delete completes.
            .done(function(res) { this.result = res; }.bind(this))
            
            // Called only when .delete fails.
            .fail(function(res) { this.result = res; }.bind(this))
        }
    },
};
