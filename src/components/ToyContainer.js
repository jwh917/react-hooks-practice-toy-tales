import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, goodWillDel, likeButton}) {
  // console.log(toys)

  const toysDisplayed = toys.map((toy) => {
    return (
      <ToyCard
      key={toy.id}
      toy={toy}
      goodWillDel={goodWillDel}
      likeButton={likeButton}
      />
    )})

  return (
    // <div id="toy-collection">{/* Render the collection of ToyCards */}</div>
    <div id="toy-collection">{toysDisplayed}</div>
  );
}

export default ToyContainer;
