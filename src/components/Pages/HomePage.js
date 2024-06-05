import React,{useState } from 'react'
import gitImg from '../Images/GitHubIcon.jpg';
import  {Link ,useNavigate   } from 'react-router-dom';



function HomePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  
  const handleInputChange =(e) => {
    setSearch (e.target.value );
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  }

 
  return (
    <div className='con'>
      <form  onSubmit={handleSubmit}>
        <img src={gitImg} className='logo'  alt="github logo"/> 
        
        <div className='input-group'>
          <Link exact to={`/search?q=${search}`}><i className="fa-solid fa-magnifying-glass"></i></Link>
          <input className='input-g' type='search' placeholder='Search For Github Repositories'
          onChange={handleInputChange} value={search} />
        </div>
        
      </form>
    </div>
  );
};
export default HomePage;

