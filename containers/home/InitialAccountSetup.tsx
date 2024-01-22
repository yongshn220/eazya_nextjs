"use client"

import { Button } from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Label} from "@components/ui/label";
import {Input} from "@components/ui/input";
import {useState} from "react";
import SelectMajorCombobox from "@containers/home/SelectMajorCombobox";


export default function InitialAccountSetup() {
  const [majorSearchInput, setMajorSearchInput] = useState<string>("")
  const [majorSelectOn, setMajorSelectOn] = useState<boolean>(false)


  function handleMajorInputChange(e) {
    if (e.target.value === "") {
      setMajorSelectOn(false)
    }
    else {
      setMajorSelectOn(true)
      setMajorSearchInput(e.target.value)
    }
  }

  function handleMajorSelect(value) {
    setMajorSearchInput(value)
    setMajorSelectOn(false)
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
            <SelectMajorCombobox/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
