import { useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import {
  useDeletePostMutation,
  useGetPostsMutation,
  useSavePostMutation,
} from "./api/apiManagement";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  allPosts,
  deletePost,
  savePost,
  loadingState,
  currentTheme,
} from "./redux/reducer";
import SyncLoader from "react-spinners/SyncLoader";

function App() {
  const dispatch = useDispatch();
  const postsSelect = useSelector(allPosts);
  const loading = useSelector(loadingState);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const removePost = (id, postId) => {
    if (!id) return;
    dispatch(deletePost(id, postId));
  };

  const savePo = (object) => {
    if (!inputRef.current.value) return;
    dispatch(savePost(object));
    inputRef.current.value = "";
  };

  console.log(postsSelect);
  return (
    <div className="App">
      <div className="postList">
        <div>
          {loading ? (
            <div className="loader">
              <SyncLoader color="#3053b4" margin={5} />
            </div>
          ) : (
            <>
              {postsSelect.map((element) => (
                <div onClick={() => removePost(element.id, element.postId)} key={element.postId}>
                  {element?.postTitle}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div>
        <input type="text" ref={inputRef}></input>
        <button
          onClick={() => {
            savePo({
              postTitle: inputRef.current.value,
              postContent: "Hello",
              postAuthor: "World",
            });
          }}
        >
          Add post
        </button>
      </div>
    </div>
  );
}

export default App;
