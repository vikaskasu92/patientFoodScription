export class User{
    constructor(
        private _access_token:string,
        public token_type:string,
        private _refresh_token:string,
        private tokenExpirationDate:Date,
        public scope:string
    ){}

    get token(){
        if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()){
            return null;
        }
        return this._access_token;
    }

    get refreshToken(){
        return this._refresh_token;
    }
}