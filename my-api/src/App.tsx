import React from 'react';
import axios from 'axios';

interface IPost {
  id: number;
  userId?: number;
  title: string;
  body: string;
}

const defaultPosts:IPost[] = [];

const App = () => {

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");



  React.useEffect(() => {
    // TODO - get posts
    axios
    .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000,
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? 'Request Cancelled'
          : ex.code === 'ECONNABORTED'
          ? 'A timeout has occurred'
          : ex.response.status === 404
          ? 'Resource Not Found'
          : 'An unexpected error has occurred';

        setError(error);
        setLoading(false);
    });
  }, []);

  return (
    <div className="App">
     <ul className="posts">
       {posts.map((post) => (
        <li key={post.id}>
         <h3>{post.title}</h3>
         <p>{post.body}</p>
        </li>
      ))}
     </ul>
     {error && <p className="error">{error}</p>}
   </div>
   );

}
export default App;
