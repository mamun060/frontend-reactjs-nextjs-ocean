interface InputProps {
    type?: string;
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string
} 


const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      <input
        {...props}
      />
    </div>
  )
}

export default Input
