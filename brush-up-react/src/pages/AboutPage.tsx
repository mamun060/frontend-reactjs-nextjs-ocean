import AboutContent from "../components/AboutComponents/AboutContent"
import SubscribeInput from "../components/AboutComponents/SubscribeInput"

function AboutPage() {
  return (
    <div className="text-center py-10">
      <AboutContent />
      <div className="pt-10">
        <SubscribeInput />
      </div>
    </div>
  )
}

export default AboutPage
