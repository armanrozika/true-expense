import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { GlobalContext } from "../GlobalProvider";

function SpendForm({ showAdd, closeShowAdd }) {
  const [expense, setExpense] = useContext(GlobalContext);
  const [value, setValue] = useState({
    category: "",
    amount: 0,
    date: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("expense")
      .onSnapshot((snapshot) => {
        const newExpense = snapshot.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        });
        setExpense(newExpense);
        closeShowAdd();
      });

    return () => unsubscribe();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("expense").add(value);
  };

  return (
    <form
      className={`component-add ${showAdd ? "bottom-0" : "bottom-min-100"}`}
      onSubmit={onSubmit}
    >
      <select
        name=""
        id=""
        value={value.category}
        onChange={(e) => setValue({ ...value, category: e.target.value })}
      >
        <option value="food">Food</option>
        <option value="snack">Snack</option>
        <option value="cigarette">Cigarette</option>
        <option value="kosan">Kosan</option>
        <option value="fams">Fams</option>
        <option value="others">Others</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={value.amount}
        onChange={(e) => setValue({ ...value, amount: e.target.value })}
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default SpendForm;
