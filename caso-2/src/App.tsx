import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [listItem, setListItem] = useState("");

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    if (listItem === "") return;

    setItems((items) =>
      items.concat({
        id: items.length + 1,
        completed: false,
        text: listItem,
      })
    );

    setListItem("");
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input
          name="text"
          type="text"
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text}{" "}
            <button onClick={() => handleRemove(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
