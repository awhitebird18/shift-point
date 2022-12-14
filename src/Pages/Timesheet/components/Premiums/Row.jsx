import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import styles from "./Row.module.css";
import PremiumSelect from "./PremiumSelect";
import { Menu, Dropdown, Input } from "antd";
import { BsInfoSquareFill } from "react-icons/bs";
import { convertToHours12 } from "../../functions/timesheetUtils";
import { v4 as uuidv4 } from "uuid";

export default function PremiumRow({ premiumData, premiumList, timedata, breakDeductions }) {
  const dispatch = useDispatch();

  const { storeTimecard, updatePremiumTime, updatePremiumField } = bindActionCreators(actionCreators, dispatch);

  const addNewPremium = () => {
    timedata.premiums.push({
      premiumId: "",
      start: "",
      end: "",
      status: "",
      unpaid: false,
      id: uuidv4(),
    });
    storeTimecard(timedata);
  };

  // Add/ Remove Dropdown menu
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={addNewPremium}>Add Premium</div>
      </Menu.Item>
      <Menu.Divider />
      {premiumData.premiumId && (
        <Menu.Item key="1">
          <div onClick={() => {}}>Remove Premium</div>
        </Menu.Item>
      )}
    </Menu>
  );

  // Format Data
  const premiumDisplay = {
    ...premiumData,
    premiumId: premiumData.premiumId ? premiumData.premiumId : "",
    status: premiumData.status ? premiumData.status : "approved",
    remove: premiumData.remove ? premiumData.remove : "",
    start:
      Object.prototype.toString.call(premiumData.start) === "[object Date]"
        ? convertToHours12(premiumData.start)
        : premiumData.start
        ? premiumData.start
        : "",
    end:
      Object.prototype.toString.call(premiumData.end) === "[object Date]"
        ? convertToHours12(premiumData.end)
        : premiumData.end
        ? premiumData.end
        : "",
    hours:
      Object.prototype.toString.call(premiumData.start) === "[object Date]" &&
      Object.prototype.toString.call(premiumData.end) === "[object Date]"
        ? ((premiumData.end.getTime() - premiumData.start.getTime()) / 3600000).toFixed(2) - breakDeductions
        : "",
  };

  // Outputs correct status class
  function statusClasses() {
    if (!premiumDisplay.status) return "";

    return `${styles.status} ${styles[premiumDisplay.status]}`;
  }

  const premiumOptions = premiumList.map((premiumEl, index) => {
    return (
      <Option key={index} value={premiumEl._id}>
        {premiumEl.name}
      </Option>
    );
  });

  return (
    <tr className={styles.row}>
      {/* Type Input */}
      <td className={styles.selects}>
        <PremiumSelect premiumId={premiumDisplay.premiumId} premiumOptions={premiumOptions} premiumData={premiumData} timedata={timedata} />
      </td>

      {/* Start */}
      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
          bordered={false}
          value={premiumDisplay.start ? premiumDisplay.start : ""}
          onChange={(e) =>
            updatePremiumTime(e.target.value, "start", premiumData, {
              ...timedata,
            })
          }
        />
      </td>

      {/* End */}
      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
          bordered={false}
          value={premiumDisplay.end ? premiumDisplay.end : ""}
          onChange={(e) =>
            updatePremiumTime(e.target.value, "end", premiumData, {
              ...timedata,
            })
          }
        />
      </td>

      {/* Hours */}
      <td className={styles.time}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
          bordered={false}
          placeholder={premiumDisplay.hours}
        />
      </td>

      {/* Rate*/}
      <td className={styles.td}>
        <Input
          style={{
            width: "100%",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
          bordered={false}
          value={premiumData.rate ? premiumData.rate : ""}
          onChange={(e) => {
            updatePremiumField(e.target.value, "rate", { ...premiumData }, { ...timedata });
          }}
        />
      </td>

      {/* Status Input */}
      <td className={styles.td}>
        {premiumDisplay.status && (
          <button
            name="status"
            className={statusClasses()}
            onClick={(e) => updatePremiumField(e.target.value, "status", { ...premiumData }, { ...timedata })}
          >
            {`${premiumDisplay.status.toString().toUpperCase()[0]}${premiumDisplay.status.toString().substring(1)}`}
          </button>
        )}
      </td>

      {/* Info */}
      <td className={styles.time}>
        <button className={styles.infoButton}>
          <Dropdown overlayClassName={styles.overlay} overlay={menu} trigger={["click"]} placement="bottomRight" arrow={true}>
            <span onClick={(e) => e.preventDefault()}>
              {
                <BsInfoSquareFill
                  style={{
                    color: "#bfbfbf",
                    fontSize: "1.8rem",
                  }}
                />
              }
            </span>
          </Dropdown>
        </button>
      </td>
    </tr>
  );
}
