export const socketUrl = () =>{
    try{
        let orgEndPoint = process.env.BASE_URL
        if(!orgEndPoint){
            return `URL/${process.env.EVENT_NAMESPACE}`
        }
    
        return 'ws'+orgEndPoint.substring(5,orgEndPoint.length - 6)+process.env.EVENT_NAMESPACE
    }catch(e){
        return `URL/${process.env.EVENT_NAMESPACE}`
    }
}