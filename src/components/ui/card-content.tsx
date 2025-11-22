
import Image from "next/image"
import { Star } from "lucide-react"
import type { Content } from "@/types"

export default function ContentCard({ content }: { content: Content }) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden hover:ring-1 hover:ring-[#00ff2a] transition-all duration-300">
      <div className="relative aspect-video">
        <Image src={content.image || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-black mb-1">{content.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3 w-3 fill-[#00ff2a] text-[#00ff2a]" />
          <span className="text-xs text-gray-900">{content.rating}</span>
        </div>
        <p className="text-xs text-gray-800">{content.category}</p>
      </div>
    </div>
  )
}
