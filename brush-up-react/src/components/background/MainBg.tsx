interface MainBgProps {
    children: React.ReactNode
}

function MainBg({children}: MainBgProps) {
  return (
    <div className="bg-white">
      {children}
    </div>
  )
}
 
export default MainBg
