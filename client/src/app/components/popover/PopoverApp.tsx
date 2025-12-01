import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export function PopoverApp({ ...props }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={props.isValid}
          variant="outline"
          className=" w-12 h-6 cursor-pointer shadow-lg bg-violet-500 text-violet-50 hover:bg-violet-200 hover:text-violet-500 rounded-sm outline"
        >
          <Settings2></Settings2>
        </Button>
        {/* <SlidersVertical ></SlidersVertical> */}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Emotions</h4>
            <p className="text-muted-foreground text-sm">
              Set the emotions for the interaction.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionLike">
                <Image
                  src="/images/emotion_like.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionLike"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionLove">
                <Image
                  src="/images/emotion_love.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionLove"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionHaha">
                <Image
                  src="/images/emotion_haha.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionHaha"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionYay">
                <Image
                  src="/images/emotion_yay.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionYay"
                defaultValue="0"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionWow">
                <Image
                  src="/images/emotion_wow.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionWow"
                defaultValue="0"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionSad">
                <Image
                  src="/images/emotion_sad.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionSad"
                defaultValue="0"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="emotionAngry">
                <Image
                  src="/images/emotion_angry.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
                ></Image>
              </Label>
              <Input
                id="emotionAngry"
                defaultValue="0"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
