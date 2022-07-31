// Components
import { Select } from "antd";
const { Option } = Select;

// Styles
import styles from "./TimesheetRules.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const TimesheetRules = ({ employeeTimesheetRules, setCurrentEmployee }) => {
  const [timesheetRules] = useFetch("timesheetrules");

  const overtimeOptions = timesheetRules?.overtime.map((el) => {
    return <Option value={el._id}>{el.name}</Option>;
  });

  const breakOptions = timesheetRules?.breakTemplates.map((el) => {
    return <Option value={el.templateId}>{el.templateName}</Option>;
  });

  const handleChange = (value, field) => {
    setCurrentEmployee((prev) => {
      return {
        ...prev,
        timesheetrules: { ...prev.timesheetrules, [field]: value },
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Overtime Rules</h3>
        <Select
          value={employeeTimesheetRules?.overtimeTemplateId}
          onChange={(e) => handleChange(e, "overtimeTemplateId")}
          style={{ flexGrow: "1" }}
        >
          {overtimeOptions}
        </Select>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Break Rules</h3>
        <Select
          value={employeeTimesheetRules?.breakTemplateId}
          onChange={(e) => handleChange(e, "breakTemplateId")}
          style={{ flexGrow: "1" }}
        >
          {breakOptions}
        </Select>
      </div>
    </div>
  );
};

export default TimesheetRules;