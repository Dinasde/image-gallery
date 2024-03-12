import React, { useEffect } from 'react';
import {Routes,Route, Link} from 'react-router-dom'
import { Button } from '@mui/material';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const Starred =({items})=>{




const[starred,setStarred] = useState(items)




const deleteHandler =(id)=>{


    

    const result = starred.filter((item) => item.id !== id);
    setStarred(result);


}

    return(
        <div>
              <Link to='/'>Home</Link>
            <h1>Starred Component</h1>

            <ImageList variant="masonry" cols={4} gap={8}>

       

            {

                 starred?.map((item)=>{
                    return(
                    <>
                    <ImageListItem key={item.id}>
                    <img key={item.id} src={item.urls.small} alt={item.alt_description}/>
                    <Button variant='contained' color='error' onClick={()=>deleteHandler(item.id)}>Delete</Button>
                    </ImageListItem>
                   
                    </>
                    )
                 })
          
            }

</ImageList>
        </div>
    )
}