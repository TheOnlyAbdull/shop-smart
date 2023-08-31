import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);

  const [price, setPrice] = useState(0);
  const [item, setItem] = useState("");

  function handleAddItem(e) {
    e.preventDefault();
    if (!item && !price) return;

    const newItem = { item, price, isBought: false };

    setItems((curr) => [...curr, newItem]);

    setItem("");
    setPrice(0);
  }

  function handleDeleteItem(item) {
    setItems((curr) => curr.filter((i) => i.item !== item));
  }

  function handleMarkedItem(id) {
    setItems((item) =>
      item.map((i) => (i.item === id ? { ...i, isBought: !i.isBought } : i))
    );
  }

  return (
    <div className="App">
      <Header />
      <InputItem
        price={price}
        item={item}
        setItem={setItem}
        setPrice={setPrice}
        onAddItem={handleAddItem}
      />
      <ShopingList
        items={items}
        onDelete={handleDeleteItem}
        onMark={handleMarkedItem}
      />
      {items <= 0 ? <AddItemToList /> : ""}
      <Total lists={items} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="logo">ShopSmart</div>
    </header>
  );
}

function InputItem({ price, item, setItem, setPrice, onAddItem }) {
  return (
    <form className="input-todo" onSubmit={onAddItem}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="input"
        placeholder="Add Item"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="input"
        placeholder="$ Price"
      />
      <button className="add">➕</button>
    </form>
  );
}

function ShopingList({ items, setItems, onDelete, onMark }) {
  return (
    <main className="list-container">
      <ul>
        {items.map((list) => (
          <ShopingItem
            item={list}
            handleDeleteItem={onDelete}
            setItems={setItems}
            key={list.item}
            handleMarkedItem={onMark}
          />
        ))}
      </ul>
    </main>
  );
}

function ShopingItem({ item, handleDeleteItem, handleMarkedItem }) {
  return (
    <li className="list-content">
      <span>
        <input
          type="checkbox"
          value={item.isBought}
          onChange={() => handleMarkedItem(item.item)}
        />
        <span className={`item ${item.isBought ? "gotten" : ""}`}>
          {item.item}
        </span>
      </span>
      <span>${item.price}</span>
      <span className="cancel" onClick={() => handleDeleteItem(item.item)}>
        ❌
      </span>
    </li>
  );
}

function Total({ lists }) {
  const amountLeft = lists
    .filter((list) => !list.isBought)
    .reduce((acc, curr) => curr.price + acc, 0);
  const amountSpent = lists
    .filter((list) => list.isBought)
    .reduce((acc, curr) => curr.price + acc, 0);
  return (
    <div className="total">
      <span>TOTAL SPENT: ${amountSpent}</span>
      <span>TOTAL LEFT: ${amountLeft}</span>
    </div>
  );
}

function AddItemToList() {
  return (
    <div className="add-container">
      <h2 className="add-item">ADD ITEM TO LIST !!!</h2>
    </div>
  );
}
