export class OAuth2Token{
    private access_token : string;
    private expires_in : number;
    private token_type : string;
    private refresh_token : string;
    private scope : string;
    private user : number;
    private createdAt : Date = new Date();

    constructor(oauth2Token? : OAuth2Token){
        this.access_token = oauth2Token && oauth2Token.access_token || null;
        this.expires_in = oauth2Token && oauth2Token.expires_in || -1;;
        this.refresh_token = oauth2Token && oauth2Token.refresh_token || null;
        this.scope = oauth2Token && oauth2Token.scope || null;;
        this.token_type = oauth2Token && oauth2Token.token_type || null;;
        this.user = oauth2Token && oauth2Token.user || -1;;
        this.createdAt = oauth2Token && new Date();
    }

    set setAccessToken(token : string){
        this.access_token = token;
    }   

    get getAccessToken() : string{
        return this.access_token;
    }

    set setExpiresIn(expiration : number){
        this.expires_in = expiration;
    }

    get getExpiresIn() : number{
        return this.expires_in;
    }

    set setRefreshToken(refreshToken : string){
        this.refresh_token = refreshToken;
    }

    get getRefreshToken() : string{
       return this.refresh_token;
    }

    set setScope(scope : string){
        this.scope = scope
    }

    get getScope() : string{
        return this.scope;
    }

    set setTokenType(tokenType : string){
        this.token_type = tokenType;
    }

    get getTokenType() : string {
        return this.token_type;
    }

    set setUser(userId : number){
        this.user = userId;
    }

    get getUser() : number{
        return this.user;
    }

    set setCreation(date : string){
        this.createdAt = new Date(date);
    }

    get getCreation() : Date{
        return this.createdAt;
    }

    public isAccessTokenValid() : boolean {
        if(sessionStorage.getItem('access_token') == null){
            return false;
        }
        let now = Date.now();
        return ((now - this.createdAt.getTime()) - (this.expires_in * 1000)) < 0;
    }

    public static cleanTokensFromStorage(){
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("expires_in");
        sessionStorage.removeItem("token_type");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("scope");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem('createdAt');
    }

    public setTokenToStorage(){
        sessionStorage.setItem("access_token",this.access_token);
        sessionStorage.setItem("expires_in",this.expires_in.toString());
        sessionStorage.setItem("token_type",this.token_type);
        sessionStorage.setItem("refresh_token",this.refresh_token);
        sessionStorage.setItem("scope",this.scope);
        sessionStorage.setItem("userId",this.user.toString());
        sessionStorage.setItem('createdAt',this.createdAt.toJSON());
    }

    public getTokensFromStorage(){
        this.setAccessToken = sessionStorage.getItem('access_token');
        this.setExpiresIn = Number(sessionStorage.getItem('expires_in'));
        this.setTokenType = sessionStorage.getItem('token_type');
        this.setRefreshToken = sessionStorage.getItem('refresh_token');
        this.setScope = sessionStorage.getItem('scope');
        this.setUser = Number(sessionStorage.getItem('userId'));
        this.setCreation = sessionStorage.getItem('createdAt');
    }
}