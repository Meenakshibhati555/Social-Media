import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import Footer from "./components/Footer";
import { useState } from "react";
import PostListprovider from "./store/post-list-store";

function App() {
  //making state
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    // Yhe PostListProvider yaha per as a parent Component work kare gy aur baski sare components is k child work kare gy
    <PostListprovider>
      <div className="app-container">
        {/* selectedtab is a props and  this {selectedTab} is a props value */}
        {/* Now pass setSelectedTab ko as onClick Listner pass kare gy in sidebar m */}
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} ></Sidebar>

        <div className="content">
          <Header></Header>
          {selectedTab === "Home" ? (<PostList></PostList>) : (<CreatePost></CreatePost>) }
          <Footer></Footer>
        </div>
      </div>
    </PostListprovider>
  );
}

export default App;
