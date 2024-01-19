// import {Button} from "@components/ui/button";
// import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
// import {CommunityType} from "@components/constants/enums";
// import {hoveredTextColor} from "@components/constants/values";
// import Link from 'next/link'
//
//
// export default function GeneralMenu({type}) {
//   return (
//     <div>
//       {/* desktop view */}
//       <div className="hidden md:flex justify-center bg-white border-b">
//         {
//           Object.values(CommunityType).map((menuType) => (
//             <Link href={`/community/${menuType}`}>
//               <Button variant="Ghost"
//                 key={menuType}
//                 className={type === menuType ? hoveredTextColor : ''}
//               >
//                 {menuType}
//               </Button>
//             </Link>
//           ))
//         }
//       </div>
//
//       {/* mobile view */}
//       <div className="flex-center md:hidden mt-5">
//         <Select>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select a community" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {
//                 Object.values(CommunityType).map((menuType) => (
//                   <SelectItem
//                     key={menuType}
//                     value={menuType}
//                   >
//                     {menuType}
//                   </SelectItem>
//                 ))
//               }
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   )
// }
