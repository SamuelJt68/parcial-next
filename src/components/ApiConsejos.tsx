import React from "react";

export default async function Getdatos(){
    try{
        const api = await fetch("https://api.adviceslip.com/advice");
        if (!api.ok){
            throw new Error("Error al optener api");}
        const datos = await api.json();
        return datos;
    }
    catch(err){
        console.log((err as Error).message)
    }
}