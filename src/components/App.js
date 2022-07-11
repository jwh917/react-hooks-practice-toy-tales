import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [toys, setToys] = useState([])

  const [nameInput, setNameInput] = useState("")
  const [imgInput, setImgInput] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toyData) => setToys(toyData));
  }, []);


  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function toyFormSubmit(event){
    // console.log(event)
    event.preventDefault()

    // console.log(nameInput, imgInput)
    const newToy = {
      name: nameInput,
      image: imgInput,
      likes: 0
    }

    if(newToy.name === "" || newToy.image === "") return

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((newToyData) => setToys([...toys, newToyData]));

  }

  function toyNameInput(event){
    // console.log(event.target.value)
    setNameInput(event.target.value)
  }

  function toyImgInput(event){
    // console.log(event.target.value)
    setImgInput(event.target.value)
  }

  function goodWillDel(deletedToy){
    // console.log(deletedToy)
    const updatedToys = toys.filter((toy) => toy.id !== deletedToy.id);
    setToys(updatedToys)
  }

  function likeButton(updatedToy){
    // console.log(updatedToy)
    const updatedToys = toys.map((toy) => {
      if (toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm toyFormSubmit={toyFormSubmit} toyNameInput={toyNameInput} toyImgInput={toyImgInput}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} goodWillDel={goodWillDel} likeButton={likeButton}/>
    </>
  );
}

export default App;
