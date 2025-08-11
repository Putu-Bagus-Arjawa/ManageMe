import jewete from "jsonwebtoken"



const buatToken = (userId) =>{
    return jewete.sign(
    {
        id:userId
    },
        process.env.JWT_RAHASIA, 
    {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

export default buatToken