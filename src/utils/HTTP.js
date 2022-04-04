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