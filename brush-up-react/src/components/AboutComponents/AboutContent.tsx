import { useEffect , useRef, useState } from "react"

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

function AboutContent() {
  const [users, setUsers] = useState<User[]>([])
  const itemRef = useRef<HTMLLIElement>(null)


  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  },[])

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.backgroundColor = 'lightblue';
      itemRef.current.style.padding = '10px';
    }
  }, []);

  return (
    <div>
      <ul>
        {
          users.map((user)=>(
            <li ref={itemRef} className="py-2" key={user.id}>
              {user.id} -{user.name} - {user.email} - {user.phone} - {user.website}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default AboutContent
