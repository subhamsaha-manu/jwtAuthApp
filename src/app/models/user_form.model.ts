export class UserForm{

    constructor(
        private _email : string,
        private _password : string,
        private _firstName? : string,
        private _middleName? : string,
        private _lastName? : string,
        private _mobileNumber? : number
    ){}

    get email():String{
        return this._email;
    }

    get password(){
        return this._password;
    }

    get firstName(){
        return this._firstName;
    }

    get middleName(){
        return this._middleName;
    }

    get lastName(){
        return this._lastName;
    }

    get mobileNumber(){
        return this._mobileNumber;
    }

    
}