import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//instead of id (able to use id, index, uuid generator)
//instead of || (ternary, useState return stmt)
//amount 4 col should have sum of amt
//all rows amt should display at bottom
//delete only selected rows(checkbox)
//select all items and vice versa
//while selecting all items, if any of the rows is unchecked at that time, the select all checkbox also have to uncheck

const TableForm = () => {
  const tableHeader = [
    "FirstName",
    "MiddleName",
    "PhoneNo",
    "Marital Status",
    "Amount 1",
    "Amount 2",
    "Amount 3",
    "Amount 4",
    "check",
    "Action",
  ];
  const obj = {
    id: "",
    firstName: "",
    middleName: "",
    phoneNo: "",
    maritalStatus: "",
    Amount1: 0,
    Amount2: 0,
    Amount3: 0,
    Amount4: 0,
    isChecked: false,
    // checkedList: [],
  };
  const [tableData, setTableData] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  // const [tableData, setTableData] = useState(() => {
  //   const storedData = localStorage.getItem('data');
  //   return storedData ? JSON.parse(storedData) : [];
  // });

  const add = () => {
    // const s = [...tableData, obj];
    // console.log(s, "s ", tableData);
    setTableData([...tableData, { ...obj, id: new Date().getTime() }]);
  };
  // console.log(tableData);

  const deleteRow = (id) => {
    const deletedTable = tableData.filter((t) => t.id !== id);
    console.log(deletedTable, "deletedTable");
    setTableData(deletedTable);
    // const deletedTable = tableData.filter((t) => )
  };

  const handleEvent = (e, i) => {
    // const a = tableData.map((t) => {
    //   if (e.target.id == t.id) {
    //     return { ...t, [e.target.name]: e.target.value };
    //   }
    //   return t;
    // });
    // setTableData(a);
    // if (e.target.checked) {
    //   // console.log(e.target.name, e.target.value, e.target.id);
    //   // setCheckedList([...checkedList, e.target.value])
    //   setCheckedList((preData) => {
    //     // console.log(preData, "preeee");
    //     const newArr = [...preData];
    //     // newArr.push(e.target.value)
    //     const newArr1 = [...newArr, e.target.value];
    //     // console.log(newArr1, "neww");
    //     return newArr1;
    //   });
    // } else {
    //   setIsChecked(true);
    //   const unChecked = checkedList.filter((li) => {
    //     console.log(li, e.target.value);
    //     return li !== e.target.value;
    //   });
    //   setCheckedList(unChecked);
    // }
    // if(e.target.checked)
    console.log(checkedList, "checkedList");
    setTableData((prevData) => {
      const newList = [...prevData];
      const rowData = newList[i];
      // console.log(rowData, "change", "rowData");

      if (e.target.name == "isChecked") {
        console.log(e.target.checked, e.target.value);
        rowData[e.target.name] = e.target.checked;
      } else {
        rowData[e.target.name] = e.target.value;
      }
      if (e.target.name === "Amount1" || "Amount2" || "Amount4") {
        rowData["Amount4"] =
          Number(rowData.Amount1) + +rowData.Amount2 + +rowData.Amount3;
      }
      newList[i] = rowData;
      return newList;
    });

    // const s = [...tableData, { ...obj }];
    // console.log(s, "s ", tableData);
    // const q = [...tableData, { ...obj, [e.target.name]: e.target.value }];
    // console.log(q, "q");
    // setTableData([...tableData, { ...obj, [e.target.name]: e.target.value }]);
  };

  const saveData = () => {
    setTableData([...tableData]);
    const a = tableData.reduce((acc, ini) => {
      // console.log(ini.Amount4);
      return ini.Amount4 + acc;
    }, 0);
    console.log(a, "a");
    setTotalAmt(a);
    // localStorage.setItem("total", JSON.stringify(totalAmt));
    // console.log(tableData, "tableData");
    // localStorage.setItem("data", JSON.stringify(tableData));
    alert("successfully saved");
  };

  // useEffect(() => {
  //   setCheckedList([])
  //   const dataList = localStorage.getItem("data");
  //   // const data = JSON.parse(dataList);
  //   // setTableData(data);
  //   setTableData(dataList ? JSON.parse(dataList) : []);
  // }, []);

  const deleteAll = (tableData) => {
    console.log(checkedList);
    // const list = [...checkedList];
    const list = tableData.filter((li) => !li.isChecked);
    // console.log(list, 'list');
    // const deleteSelectedList = tableData.filter(
    //   (data) => !list.includes(data.id)
    // );
    // console.log(deleteSelectedList);
    console.log(list);
    if (window.confirm("Do you wanna delete all the users data?")) {
      console.log("YESss");
      setTableData(list);
      setIsChecked(true);
      // localStorage.setItem("data", JSON.stringify([]));
    }
  };

  // useEffect(() => {
  //   const a = document.getElementsByClassName("check-box1");
  //   console.log(a, a.checked);
  // }, [isChecked]);

  const selectAll = (e, table) => {
    setIsChecked(false);
    console.log(e, "e");
    if (e.target.checked) {
      const allData = table.map((li) => "Delete" + li.id);
      console.log(allData, "all");
      setCheckedList(allData);
    } else {
      setIsChecked(true);
      setCheckedList([]);
    }
  };

  return (
    <div>
      <div className="table">
        <table>
          {tableHeader.map((header, index) => (
            <th key={index} style={{ width: "0%" }}>
              {header === "check" ? (
                <input
                  type="checkbox"
                  className="check-box1"
                  value={"selectAll"}
                  onChange={(e) => selectAll(e, tableData)}
                  checked={!isChecked}
                  name="checked"
                ></input>
              ) : (
                header
              )}
            </th>
          ))}
          {/* {!tableData.length ? <h1>Add any user</h1> : ( */}
          <tbody className="body">
            {/* {console.log(tableData)} */}
            {tableData.map((t, i) => (
              <tr key={t.id}>
                <td>
                  <input
                    name="firstName"
                    value={t.firstName}
                    type="text"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                {tableData.firstName}
                <td>
                  <input
                    name="middleName"
                    value={t.middleName}
                    type="text"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                <td>
                  <input
                    name="phoneNo"
                    value={t.phoneNo}
                    type="number"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                <td className="in">
                  <select
                    name="maritalStatus"
                    value={t.maritalStatus}
                    className="input1"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  >
                    <option value="" className="inputOpt">
                      Select marital status
                    </option>
                    <option value="Married" className="inputOpt">
                      Married
                    </option>
                    <option value="Unmarried" className="inputOpt">
                      Unmarried
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    name="Amount1"
                    value={t.Amount1}
                    type="number"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                <td>
                  <input
                    name="Amount2"
                    value={t.Amount2}
                    type="number"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                <td>
                  <input
                    name="Amount3"
                    value={t.Amount3}
                    type="number"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                  />
                </td>
                <td>
                  <input
                    name="Amount4"
                    value={t.Amount4}
                    type="number"
                    className="input"
                    onChange={(e) => handleEvent(e, i)}
                    id={t.id}
                    disabled
                  />
                </td>
                {/* <div className="action"> */}
                <td>
                  <input
                    type="checkbox"
                    className="check-box"
                    name="isChecked"
                    value={`Delete${t.id}`}
                    // checked={checkedList.includes(`Delete${t.id}`)}
                    checked={t.isChecked}
                    onChange={(e) => handleEvent(e, i)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => deleteRow(t.id)}
                    icon={faTrash}
                    style={{
                      color: "#FF0000",
                      marginLeft: "20px",
                      cursor: "pointer",
                    }}
                  />
                </td>
                {/* </div> */}
              </tr>
            ))}
          </tbody>
          {/* )} */}
        </table>
      </div>
      <div className="footer">
        <h4 style={{ float: "right", marginRight: "150px", marginTop: "10px" }}>
          TOTAL AMOUNT: {totalAmt}
        </h4>
        <button onClick={add} className="btn-add">
          ADD
        </button>
        <button onClick={() => saveData(tableData)} className="btn-save">
          SAVE
        </button>
        <button onClick={() => deleteAll(tableData)} className="btn-del">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default TableForm;
