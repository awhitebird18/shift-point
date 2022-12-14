import { actionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import styles from "./Payment.module.css";
import moment from "moment";

const EarningRow = ({
  earning,
  earningList,
  currentEmployee,
  setCurrentEmployee,
}) => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleEditEarning = () => {
    showModal({
      name: "EARNING_DETAILED",
      title: "Edit Earning",
      earning,
      earningList,
      currentEmployee,
      setCurrentEmployee,
    });
  };

  const earningDB = earningList.find((el) => {
    return el._id === earning.earningId;
  });

  return (
    <div
      className={`list-item--lg ${styles.columns}`}
      onClick={handleEditEarning}
    >
      <div>{earningDB?.name}</div>
      <div>{earning?.primary ? "Primary" : "Secondary"}</div>
      <div>{`$${earning?.rate}.00`}</div>

      <div className="hide--tablet">
        {moment(earning.effectiveDate).format("MMMM D YYYY")}
      </div>

      <div className="hide--tablet">$0.00</div>
    </div>
  );
};

export default EarningRow;
