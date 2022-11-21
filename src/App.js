import { useEffect, useMemo, useRef } from "react";
import "./App.css";
import {
  useDeletePostMutation,
  useGetPostsMutation,
  useSavePostMutation,
} from "./api/apiManagement";

import { useSelector, useDispatch } from "react-redux";
import { getPosts, allPosts, deletePost, savePost, loadingState } from "./redux/reducer";
import SyncLoader from "react-spinners/SyncLoader";

function App() {
  const dispatch = useDispatch();
  const postsSelect = useSelector(allPosts);
  const loading = useSelector(loadingState);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const removePost = (id) => {
    console.log(id);
    if (!id) return;
    dispatch(deletePost(id));
  };

  const savePo = (object) => {
    if (!inputRef.current.value) return;
    dispatch(savePost(object));
    inputRef.current.value = "";
  };

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
              {Boolean(postsSelect?.length) &&
                postsSelect.map((element) => (
                  <div onClick={() => removePost(element.id)} key={element.id}>
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
