import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import {useState,useEffect} from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import {Link,Routes,Route} from 'react-router-dom';
import { Starred } from './Starred';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';


export const Gallery=({datas})=> {

  const[search,setSearch] = useState()
  const[toggle,setToggle] = useState(false)
  const[images,setImages] = useState([])
  const [isStarred, setStarred] = useState(false);
  const[pages,setPages] = useState(1)
  const[totalPages,setTotalPages] = useState(0);
  const[data,setData] = useState([])

  const API_URL = 'https://api.unsplash.com/search/photos';

  const IMAGES_PER_PAGE = 20

  const apiKey = process.env.REACT_APP_ACCESS_KEY;

  const handleToggleStar = (product) => {

    setToggle(!toggle)

    const updatedData = images.map(item => {
      if (item.id == product.id) {
        if (item.hasOwnProperty('bookmark')) {
          
          return { ...item, bookmark: !item.bookmark };
        } else {
          
          return { ...item, bookmark: true };
        }
      }
      return item;
    });
    setImages(updatedData);
  
  
    if (!product.bookmark) {

      setData([...data, product]);
    } else {
 
      // If the image is unbookmarked, remove it from the data state
      const filteredData = data.filter((item) => item.id !== product.id);
      setData(filteredData);
    }
   
  


 
  };

  datas(data)


  const fecthData = async()=>{
    try{

      const result = await axios.get(`${API_URL}?query=${search}&page=${pages}&per_page=${IMAGES_PER_PAGE}&client_id=${apiKey}`)

 
      setImages(result?.data?.results)
      setTotalPages(result?.data?.total_pages)

    }catch(err){
      setImages([])
      setTotalPages(0)
      console.log(err.message)
    }
  }



const inputHandler =(e)=>{
  setSearch(e.target.value)

}





const submitHandler =(e)=>{
  e.preventDefault()
  fecthData()




}

useEffect(()=>{
fecthData()
},[pages])

useEffect(()=>{
  
  


},[toggle])



  return (
    <div className="App">
    <h1>Image Gallery Application</h1>
    <Link to='/star'>Starred Images</Link>
  
    <form>
      <input type='text' value={search}   placeholder='Enter Your Search....' onChange={inputHandler}/>
      <Button variant='contained' color='success' onClick={submitHandler}>Search</Button>
      
    </form>
<ImageList  variant="masonry" cols={4} gap={8}>


{

   images?.map((image)=>{

    // image.bookmark = false;
    return(
      <>
      <ImageListItem key={image.id}>
      <img key={image.id} src={image.urls.small} alt={image.alt_description}/>
      
      {/* {image.bookmark? <StarIcon/> : <StarBorderOutlinedIcon/>} */}
      <ImageListItemBar
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${image.slug}`}
                  onClick={()=>handleToggleStar(image)}
                >
                 {image.bookmark ? <StarIcon/> : <StarBorderOutlinedIcon/>}
                </IconButton>
              }
              actionPosition="right"
            />
    

      </ImageListItem>
    
      </>
   
    )
   })


}

</ImageList>

{
  pages>1 && (
    <Button variant='contained' color='primary' onClick={()=>setPages(pages-1)}>Previous</Button>
  )
}
{
  pages<totalPages && (
    <Button variant='contained' color='primary' onClick={()=>setPages(pages+1)}>Next</Button>
  )
}


{/* <Random/> */}

    </div>
  );
}


