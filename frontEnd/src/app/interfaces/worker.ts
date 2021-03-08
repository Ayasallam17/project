export interface Worker {
    user_id:string
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
