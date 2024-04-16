import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const initialState = {
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
  };
  const [totalAmt, setTotalAmt] = useState(() => {
    const amount = localStorage.getItem("total");
    return amount ? JSON.parse(amount) : 0;
  });
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [isChecked, setIsChecked] = useState(false);

  const add = () => {
    setTableData([...tableData, { ...initialState, id: new Date().getTime() }]);
  };

  const deleteRow = (id) => {
    const deletedTable = tableData.filter((t) => t.id !== id);
    setTableData(deletedTable);
  };

  const handleEvent = (e, i) => {
    setTableData((prevData) => {
      const newList = [...prevData];
      const rowData = newList[i];
      if (e.target.name === "isChecked") {
        rowData[e.target.name] = e.target.checked;
        setIsChecked(false);
      } else {
        rowData[e.target.name] = e.target.value;
      }
      if (e.target.name === "Amount1" || "Amount2" || "Amount3") {
        rowData["Amount4"] =
          Number(rowData.Amount1) + +rowData.Amount2 + +rowData.Amount3;
      }
      newList[i] = rowData;
      console.log(newList[i]);
      return newList;
    });
  };

  const saveData = () => {
    setTableData([...tableData]);
    const amount = tableData.reduce((acc, ini) => {
      return ini.Amount4 + acc;
    }, 0);
    setTotalAmt(amount);
    localStorage.setItem("total", JSON.stringify(amount));
    localStorage.setItem("data", JSON.stringify(tableData));
    alert("successfully saved");
  };

  const deleteAll = (tableData) => {
    const list = tableData.filter((li) => !li.isChecked);
    if (window.confirm("Do you wanna delete all the users data?")) {
      setTableData(list);
      setIsChecked(false);
      localStorage.setItem("data", JSON.stringify([]));
    }
  };

  const selectAll = (e) => {
    setIsChecked(true);
    if (e.target.checked) {
      //in map assigning will mutate the original array as well
      tableData.map((li) => {
        return (li.isChecked = true);
      });
    } else {
      setIsChecked(false);
      tableData.map((li) => {
        return (li.isChecked = false);
      });
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
                  onChange={(e) => selectAll(e)}
                  checked={isChecked}
                  name="checked"
                ></input>
              ) : (
                header
              )}
            </th>
          ))}
          <tbody className="body">
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
                <td>
                  <input
                    type="checkbox"
                    className="check-box"
                    name="isChecked"
                    value={`Delete${t.id}`}
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
              </tr>
            ))}
          </tbody>
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
