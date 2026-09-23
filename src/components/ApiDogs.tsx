import React from "react";

export default async function Getrazasdogs(){
    try{
        const api = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!api.ok){
            throw new Error("Error al optener api");}
        const datos = await api.json();
        const razas = Object.keys(datos.message).slice(0, 15);
        return razas;
        
    }
    catch(err){
        console.log((err as Error).message)
    }
}