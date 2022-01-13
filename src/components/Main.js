import React , {useState, useEffect} from 'react';
import Dexie from "dexie";
import "./main.css"
import Music from './music'


const Main=()=> {
    const db = new Dexie("ReactDexie");
    //create the database store
    db.version(1).stores({
        posts: "title, file"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })
    
    //set the state and property
    const [postTitle, setTitle] = useState("");
    const [postMusicFile, setMusicFile] = useState("");
    const [posts, setPosts] = useState("");


    const getFile = (e) => {
        console.log(e)
    
        let reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload= (e) => {
            setMusicFile(reader.result);
        }
        
    }
    const deletePost = async(id) => {
        console.log(id);
        db.posts.delete(id);
        let allPosts = await db.posts.toArray();
        //set the posts
        setPosts(allPosts);
    }

    const getsubmitInfo = (e) => {
        e.preventDefault();
        if(postTitle !== "" && postMusicFile !== ""){
            let post = {
                title: postTitle,
                file: postMusicFile
            }
            
            db.posts.add(post).then(async() => {
                //retrieve all posts inside the database
                let allPosts = await db.posts.toArray();
                //set the posts
                setPosts(allPosts);
            });
            
        }
        
        
    }
    useEffect(() => {

        //get all posts from the database
        const getPosts = async() => {
            let allPosts = await db.posts.toArray();
            setPosts(allPosts);
        }
        getPosts();
  
    }, [])
    let postData;
   

    if(posts.length > 0) {
        
       
        postData = <div className="container box">
            <div className="row">
                    {
                        posts.map(post => {
                            console.log(post.file)
                             return <div className='col md-2' key={post.title}>
                              <div className='m'> 
                             <Music 
                             title={post.title}
                             file={post.file}
                             />
                             <button className=" btn btn-danger delete" onClick={() => deletePost(post.title)}>Delete</button>
                             </div>
                             </div>
                         
                        })
                    }
                    </div>
                    </div>
    }else{
        postData = <div className="message">
                     <p className="text-center" style={{marginTop:'50px'}}> There are no posts to show</p>
                   </div>
    }


    return (
        <>
         <h1 className="text-center" style={{marginTop:'50px',margin:'35px 0 px'}}>IOT Ready</h1>
        <div className='container above'>
       
        <form onSubmit={getsubmitInfo}>
  <div class="mb-3">
    <label  class="form-label">Name of Audio</label>
    <input type="text" name="title" class="form-control" onChange={e => setTitle(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>

  </div>
  <div class="row g-3 align-items-center">
  <div class="col-auto">
  <label htmlFor="cover" >Choose a Audio file :</label>
  </div>
  <div class="col-auto">
  <input type="file" id="cover" name="file" className='form-control' onChange={e => getFile(e.target.files)} />
  </div>
  </div>
  <button type="submit"  value="Submit" className="btn btn-primary submit">Post</button>
</form>
        
         
            
          
            </div>
            {postData}
            </>
      );
    
}

export default Main
