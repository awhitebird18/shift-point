import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import { Button } from "../../../../components";
import { Input } from "antd";
import styles from "./ScheduleAction.module.css";

const ScheduleAction = ({ setStep }) => {
  const [newSchedule, setNewSchedule] = useState(null);
  const nameInputRef = useRef();
  const dispatch = useDispatch();

  const { createSchedule } = bindActionCreators(actionCreators, dispatch);

  const handleViewSchedules = () => {
    setStep(2);
  };

  const handleNewSchedule = () => {
    setNewSchedule({ name: "" });
  };

  const handleSave = () => {
    createSchedule(nameInputRef.current.state.value);

    setStep(2);
  };

  return (
    <div className={styles.container}>
      {!newSchedule ? (
        <Button
          className={styles.button}
          type="secondary"
          onClick={handleViewSchedules}
          style={{ width: "100%" }}
        >
          View Schedules
        </Button>
      ) : (
        <div className={styles.nameInput}>
          <span>Enter Schedule Name</span>
          <Input ref={nameInputRef} />
        </div>
      )}
      <Button
        className={styles.button}
        onClick={!newSchedule ? handleNewSchedule : handleSave}
        style={{ width: "100%" }}
      >
        {!newSchedule ? "New Schedule" : "Save"}
      </Button>
    </div>
  );
};

export default ScheduleAction;
