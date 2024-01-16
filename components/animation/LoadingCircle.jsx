import Lottie from "lottie-react";
import loadingAnimation from '@components/constants/animation/loadingCircle.json'

export default function LoadingCircle() {
  return (
    <div className="flex-center">
      <Lottie animationData={loadingAnimation} loop={true} className="w-[100px] h-[100px]"/>
    </div>
  )
}
