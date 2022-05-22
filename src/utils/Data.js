export default class Data {
    static accessToken(){
        // recupère l' access token pour continuer la session courante
        return localStorage.getItem("access_token");
    }
    static refreshToken(){
        // recupère le refresh token pour renouveller une session
        return localStorage.getItem("refresh_token");
    }
    static setAccessToken(token){
        // change l' access token pour continuer la session courante
        return localStorage.setItem("access_token", token);
    }
    static setRefreshToken(token){
        // change le refresh token pour renouveller une session
        return localStorage.setItem("refresh_token", token);
    }
    static setUserId(id){
        return localStorage.setItem("id_user", id);
    }
    static isUserId(id){
        return id == localStorage.getItem("id_user", id).toString();
    }
    static getUserId(){
        return localStorage.getItem("id_user").toString();
    }
    static isMe(user){
        return Data.isUserId(user.id_str);
    }
}