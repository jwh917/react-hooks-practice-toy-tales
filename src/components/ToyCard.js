import React from "react";

function ToyCard({toy, goodWillDel, likeButton}) {
  const {name, image, likes} = toy

  function handleToyDelete() {
    // console.log(toy);
    // goodWillDel(toy)
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => goodWillDel(toy));
  }

  function handleToyLikes() {
    // console.log(toy);
    // console.log(toy.likes);
    const newLikes = toy.likes + 1
    // console.log(newLikes);

    // likeButton(toy)

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({likes: newLikes}),
    })
      .then((r) => r.json())
      .then((newLikes) => likeButton(newLikes));
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleToyLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleToyDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
