import { actionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import Post from "./Post";
import { BsClipboardPlus } from "react-icons/bs";
import styles from "./Bulletin.module.css";
import { useFetch } from "../../../../hooks";

const Bulletin = () => {
  const [bulletins, setBulletins] = useFetch("/bulletin");

  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddBulletin = () => {
    showModal({
      name: "MANAGE_POST",
      title: "Create Bulletin",
      post: {},
      setBulletins,
    });
  };

  return (
    <>
      <div className={styles.bulletinHeader}>
        <h2 className={styles.bulletinTitle}>Bulletins</h2>
        <div onClick={handleAddBulletin}>
          <BsClipboardPlus className={styles.addBulletinIcon} />
        </div>
      </div>

      <div className={styles.container}>
        {bulletins?.map((post, index) => {
          if (index > 3) {
            return;
          }
          return (
            <Post key={post._id} post={post} setBulletins={setBulletins} />
          );
        })}
      </div>
    </>
  );
};

export default Bulletin;
