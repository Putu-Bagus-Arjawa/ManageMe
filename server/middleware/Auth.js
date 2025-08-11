import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import generateTable from "./generateTable.js";
import buatToken from "../lib/token.js";



export const register = async (req, res)=>{
    const {name, password} = req.body
    try {
        const nameCheck =  await prisma.user.findFirst({
            where:{name}
        })

        if (nameCheck) {
            return res.status(409).json({ message: "Nama sudah digunakan" }); 
        }
        if (!name ||!password) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }

        if (password.length < 8 ) {
            return res.status(400).json({ message: "Password Terlalu Singkat" });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
        data:{
                name,
                password: hashedPassword, 
            }
        });
        
        await generateTable.generateEating(user.id)
        await generateTable.generateAllocation(user.id)


        res.status(201).json({message: "Anda Berhasil Register"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Registrasi gagal',
            detail: error.message 
        });
    }
}

export const login =  async (req, res)=>{
    
    try {
        const {name, password} = req.body

        const user = await prisma.user.findFirst({
            where:{name}
        })

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Username or Password invalid"})
        }

        const token = buatToken(user.id)

        res.cookie(
            "token", 
            token, 
            {   
                httpOnly:true, 
                sameSite:"strict", 
                maxAge:1000*60*60
            }
        )
        res.status(200).json({urlnya: "/", message:"Login succeed"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Login Gagal',
            detail: error.message 
        });
    }
}

export const logout = (req, res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",   
    })
    res.json({message: "Anda berhasil logout"})
}




