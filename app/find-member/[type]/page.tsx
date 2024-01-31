import {CommunityType} from "@components/constants/enums";
import FindMember from "@containers/find-member";
import {Metadata} from "@node_modules/next";


export const metadata: Metadata = {
  title: 'University Find-Member - Connect for Competitions, Projects, and Clubs',
  description: "Discover and join university competitions, projects, study groups, clubs, and activities. Connect with like-minded students and find friends to share these experiences at [Your University Name].",
  keywords: 'University Competitions, Student Projects, Study Groups, University Clubs, Campus Activities, Student Collaboration',
}

export default function FindMemberHome({params}) {
  const type: CommunityType = params.type

  return (
    <FindMember communityType={type} />
  )
}
