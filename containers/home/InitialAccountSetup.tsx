"use client"

import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Label} from "@components/ui/label";
import {useEffect, useState} from "react";
import SelectMajorCombobox from "@containers/home/SelectMajorCombobox";
import {MajorType} from "@components/constants/values";
import editProfileAction from "@actions/profile/editProfileAction";
import {EditProfileRequest} from "@models/requests/EditProfileRequest";
import {useSession} from "next-auth/react";


export default function InitialAccountSetup() {
  const {data: session, update} = useSession()
  const [major, setMajor] = useState<MajorType>(MajorType.NONE)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (session?.user) {
      if (!session.user.initialized) {
        setOpen(true)
      }

      setMajor(session.user.major)
    }
  }, [session])

  if (!session) return <></>

  function handleSubmit() {
    setLoading(true)

    const req: EditProfileRequest = {
      major: major
    }

    editProfileAction(req).then((res) => {
      if (res) {
        console.log("Profile Updated")
        update((prev) => ({...prev, initialized: true}))
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {
            loading
              ? <Button disabled={true}>Joining...</Button>
              : <Button onClick={handleSubmit} disabled={major === MajorType.NONE}>Join</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
