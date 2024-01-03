import {Button} from "@components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {GeneralMenuType} from "@components/constants/enums";
import {hoveredTextColor} from "@components/constants/values";

export default function GeneralMenu({type, setType}) {
  return (
    <div>
      <div className="hidden md:flex justify-center bg-white border-b">
        {
          Object.values(GeneralMenuType).map((menuType) => (
            <Button variant="Ghost"
              key={menuType}
              className={type === menuType ? hoveredTextColor : ''}
              onClick={() => setType(menuType)}
            >
              {menuType}
            </Button>
          ))
        }
      </div>

      <div className="flex-center md:hidden mt-5">
        <Select onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a community" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                Object.values(GeneralMenuType).map((menuType) => (
                  <SelectItem
                    key={menuType}
                    value={menuType}
                  >
                    {menuType}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
