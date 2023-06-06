import GoBackButton from "@/components/GoBackButton"
import { NextPage } from "next"

const SettingsPgae: NextPage = () => {
  return (
    <div className="flex flex-col">
      <header className="fixed top-12">
        <GoBackButton />
      </header>
      <div className="py-8"></div>
    </div>
  )
}

export default SettingsPgae
