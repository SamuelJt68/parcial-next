import React from "react";
import razas from "./ApiDogs"

export default async function Getdatosdogs(){
    try{
        const api = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!api.ok){
            throw new Error("Error al optener api");}
        
        
    }
    catch(err){
        console.log((err as Error).message)
    }
}