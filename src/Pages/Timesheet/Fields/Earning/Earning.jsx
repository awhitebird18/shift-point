import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State/index.js";

// Components
import { Select } from "antd";

// Styles
import styles from "../InputStyles.module.css";

// Functions
import { v4 as uuidv4 } from "uuid";
import { updateEarning } from "../../Functions/timecardFunctions.js";

const EarningField = ({ timedata, earningOptions, date, employee }) => {
  const dispatch = useDispatch();

  const { storeTimecard } = bindActionCreators(actionCreators, dispatch);

  const earning = timedata.earningId ? timedata.earningId : "";

  const inputChangeHandler = (e) => {
    const updatedTimedata = updateEarning(
      {
        ...timedata,
        id: timedata.id ? timedata.id : uuidv4(),
        date,
        eeNum: employee.eeNum,
      },
      e
    );

    const employeeEarning = employee.earnings.find((el) => {
      return el.earningId === e;
    });

    if (employeeEarning) {
      updatedTimedata.rate = employeeEarning.rate;
    }

    storeTimecard(updatedTimedata);
  };

  return (
    <Select
      className={`border--gray ${styles.field}`}
      value={earning}
      bordered={false}
      onChange={(e) => inputChangeHandler(e)}
    >
      {earningOptions}
    </Select>
  );
};

export default EarningField;