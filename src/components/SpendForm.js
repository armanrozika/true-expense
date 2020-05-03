import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { GlobalContext } from "../GlobalProvider";

function SpendForm({ showAdd, closeShowAdd }) {
  const [expense, setExpense] = useContext(GlobalContext);
  const [value, setValue] = useState({
    category: "food",
    amount: "",
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("expense")
      .onSnapshot((snapshot) => {
        const newExpense = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setExpense(newExpense);
        //set value here, value is the initial value, current value is the argument given, if any
        //it is because setExpense fired?
        setValue({ ...value });
        closeShowAdd();
      });

    return () => unsubscribe();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const dateArray = date.split("/");
    const valueToSend = {
      ...value,
      amount: value.amount ? Number(value.amount) : 0,
      day: dateArray[0],
      month: dateArray[1],
      year: dateArray[2],
    };
    firebase.firestore().collection("expense").add(valueToSend);
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
        //set value here, current value is the same as value
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
        //set value here, current value is the same as value
        onChange={(e) => setValue({ ...value, amount: e.target.value })}
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}

export default SpendForm;
