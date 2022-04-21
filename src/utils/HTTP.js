export default class HTTP {
    static accessToken(){
        return localStorage.getItem("access_token");
    }
    static queryPost(url, params, failed, success){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        };
        fetch(url, requestOptions)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                success(data);
            })
            .catch(function(err){
                failed(err);
            });
    }
    static queryPostFromData(url, params, failed, success){
        const requestOptions = {
            method: 'POST',
            body: params
        };
        fetch(url, requestOptions)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                success(data);
            })
            .catch(function(err){
                failed(err);
            });
    }
}