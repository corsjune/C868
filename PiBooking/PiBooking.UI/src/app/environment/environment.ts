 
    declare var CONFIG:any;
    declare var STRIPEPK:any;
    declare var REMOTESESSIONURL:any;

    export class environment {  

        public stripePK: string; //CONFIG.stripePK;

        public remoteSessionUrl:string;  //CONFIG.remoteSessionUrl;
       
        constructor() {
            this.stripePK="";
            this.remoteSessionUrl = "https://localhost:44310/api/";

        }
};
