"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {useState} from "react";
import {MajorList} from "@components/constants/values";
import {ScrollArea} from "@components/ui/scroll-area";

const majorList = MajorList

export default function SelectMajorCombobox({major, setMajor}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {major
            ? majorList.find((_major) => _major === major)
            : "Select major..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search Major" />
          <ScrollArea className="h-64">
            <CommandEmpty>No major found.</CommandEmpty>
            <CommandGroup>
              {majorList.map((_major) => (
                <CommandItem
                  key={_major}
                  value={_major}
                  onSelect={(currentValue) => {
                    setMajor(_major === major ? "" : _major)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      major === _major ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {_major}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
