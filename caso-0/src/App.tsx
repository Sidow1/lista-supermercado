import type { Item } from "./types";

import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      api.list().then(setItems);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input name="text" type="text" autoFocus />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text} <button onClick={() => deleteItem(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
