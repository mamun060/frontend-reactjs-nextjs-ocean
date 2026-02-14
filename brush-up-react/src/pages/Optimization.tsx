import ChildComponent from "../components/parent/childComponent";

export default function Optimization() {
  return (
    <div className=" mx-auto w-auto text-center py-12">
      <div>
        <h1 className=" text-4xl font-extrabold text-blue-700">Optimization parent</h1>
        <p className=" text-xl text-gray-500">This is the parent component. It will render the child components below.</p>
      </div>
      <div>
        <h4>child components</h4>
        <ChildComponent name="John Doe" />
        <ChildComponent name="Jane Smith" />
        <ChildComponent name="Bob Johnson" />
      </div>
    </div>
  )
}
