"use client"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import {useRecoilState} from "@node_modules/recoil";
import {imageFullViewAtom} from "@components/constants/globalStates";


export default function ImageFullViewer() {
  const [src, setSrc] = useRecoilState(imageFullViewAtom)

  return (
    <Dialog open={!!src} onOpenChange={() => setSrc(null)}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="w-11/12 h-5/6">
        {
          src &&
          <div
            onClick={() => setSrc(null)}
          >
            <Image
              src={src}
              fill
              sizes="20vw, 20vw, 20vw"
              alt="full view image"
              className="object-contain object-center"
            />
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}
