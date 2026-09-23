import Image from "next/image";
import Link from "next/link"
import { getDictionary, hasLocale } from './dictionaries'
import { notFound } from 'next/navigation'
import type { Metadata } from "next";
import getrazasDog from "@/components/ApiDogs";
import PosterDog from "@/components/PosterDog"
import Getrazasdogs from "@/components/ApiDogs";

export const metadata: Metadata = {
  title: "Listado de razas",
  description: "Conoce acerca de razas y cuidados",
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound() 

  const dict = await getDictionary(lang)
 
  const razas = await getrazasDog();

  return (
    <div className="grid-raw-2 bg-[#F5F5F0]">
      
      <div className="grid-cols-2">
              <h1 className="text-center font-black:">
                Listado razas 
              </h1>
              <button className="rounded-2xl bg-[] text-center">
                Random
              </button>
      </div>
      <div className="grid grid-cols-3 mt-[3%] pb-[3%] items-center gap-12 mx-auto max-w-[980]">
        {razas?.slice(0, 12).map((raza: string) => (
           <div key={raza} className="ml-[14%] mr-[10%]">
           <Link href={`/${lang}/${raza}`}>
           <PosterDog id={raza} name={raza} />
           </Link>
      </div>
                ))}
      </div>
  </div>
  );
}

