import Image from "next/image"
import Logo from "@/app/[lang]/pawsome-advice-logo.png"

export default function Header(){
    return(
        <div className="w-[100%] h-[100%] grid-cols-1 bg-[#FF6B35] items center">
            <Image
                src={Logo}
                width={100}
                height={200}
                alt="Descripción de la imagen"
            />
        </div>
    )
}