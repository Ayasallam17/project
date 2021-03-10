export interface User {
    user_name:string
    email:string
    password:string
    phone?:string
    addresses?:{
        addr_type:string
        details:string
    }
    max_orders?:number
    routes?:{
        route:string
    }
    tokens?:[
        {token:string}
    ]
}
