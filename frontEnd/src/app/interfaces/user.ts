export interface User {
    user_name:string
    email:string
    password:string
    phone?:string
    addresses?:{
        addr_type:string
        details:string
    }
    routes?:{
        route:string
    }

    tokens?:[
        {token:string}
    ]
}
