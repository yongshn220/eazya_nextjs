"use client"

import { Button } from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Label} from "@components/ui/label";
import {useState} from "react";
import SelectMajorCombobox from "@containers/home/SelectMajorCombobox";


export default function InitialAccountSetup() {
  const [major, setMajor] = useState<string>("")

  function handleSubmit() {
    //TODO
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Welcome to EazyA!</DialogTitle>
          <DialogDescription>
            Please fill the information below. You can change it any time in the profile setting.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex-center gap-4">
            <Label htmlFor="Major" className="text-right">Major</Label>
            <SelectMajorCombobox major={major} setMajor={setMajor}/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
