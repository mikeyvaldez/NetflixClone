import { PlayIcon } from "@heroicons/react/24/solid"

interface BillboardButtonProps {
    text: string
}


export default function BillboardButton({text}: BillboardButtonProps) {
  return (
    <button className="bg-white rounded-md py-2 px-4 w-auto text-lg font-semibold flex items-center hover:neutral-400 transition">
        <PlayIcon className="w-7 text-black mr-1" />
        <p>{text}</p>
    </button>
  )
}
