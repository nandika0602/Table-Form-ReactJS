import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// const handleEvent = (e, i) => {
//   // const a = tableData.map((t) => {
//   //   if (e.target.id == t.id) {
//   //     return { ...t, [e.target.name]: e.target.value };
//   //   }
//   //   return t;
//   // });
//   // setTableData(a);
//   // if (e.target.checked) {
//   //   // console.log(e.target.name, e.target.value, e.target.id);
//   //   // setCheckedList([...checkedList, e.target.value])
//   //   setCheckedList((preData) => {
//   //     // console.log(preData, "preeee");
//   //     const newArr = [...preData];
//   //     // newArr.push(e.target.value)
//   //     const newArr1 = [...newArr, e.target.value];
//   //     // console.log(newArr1, "neww");
//   //     return newArr1;
//   //   });
//   // } else {
//   //   setIsChecked(true);
//   //   const unChecked = checkedList.filter((li) => {
//   //     console.log(li, e.target.value);
//   //     return li !== e.target.value;
//   //   });
//   //   setCheckedList(unChecked);
//   // }
//   // if(e.target.checked)
//   // console.log(checkedList, "checkedList");
//   setTableData((prevData) => {
//     const newList = [...prevData];
//     const rowData = newList[i];
//     // console.log(rowData, "change", "rowData");
//     if (e.target.name === "isChecked") {
//       console.log(e.target.checked, e.target.value, e.target.name);
//       rowData[e.target.name] = e.target.checked;
//       // obj.isChecked = false
//       setIsChecked(true);
//     } else {
//       console.log(rowData);
//       rowData[e.target.name] = e.target.value;
//       // const a = tableHeader.map((h,i) => {
//       //   if(h === 'check') {
//       //   }
//       // })
//       rowData["checked"] = false;
//     }
//     if (e.target.name === "Amount1" || "Amount2" || "Amount3") {
//       rowData["Amount4"] =
//         Number(rowData.Amount1) + +rowData.Amount2 + +rowData.Amount3;
//     }
//     newList[i] = rowData;
//     return newList;
//   });

//   // const s = [...tableData, { ...obj }];
//   // console.log(s, "s ", tableData);
//   // const q = [...tableData, { ...obj, [e.target.name]: e.target.value }];
//   // console.log(q, "q");
//   // setTableData([...tableData, { ...obj, [e.target.name]: e.target.value }]);
// };