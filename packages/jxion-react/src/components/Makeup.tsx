import React from "react";
import styles from "@jxion/design/src/components/UstadMakeUp.module.scss";

interface MakeupProps {
  announcementId: string;
}

export const Makeup: React.FC<MakeupProps> = ({ announcementId }) => {
  return (
    <div className={styles.makeup}>
      <div className={styles.makeup__content}>
        <span className={styles.makeup__text}>{announcementId}</span>
      </div>
    </div>
  );
};

export default Makeup;
