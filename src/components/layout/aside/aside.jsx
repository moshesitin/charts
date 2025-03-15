import styles from "./aside.module.css";
import { useState } from "react";
import classNames from "classnames";
import { AsideMenu } from "./aside-menu/aside-menu";
import { AsideMessages } from "./aside-messages/aside-messages";

const M_DATA = [
  {
    id: 0,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 1,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 2,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 3,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 4,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 5,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 6,
    title: "18:22 20/12/24 -  20:22 21/12/24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];
const W_DATA = [
  {
    id: 0,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 1,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 2,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 3,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 4,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 5,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 6,
    title: "18:22 20.12.24",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

export const Aside = () => {
  const [menuIsActive, setMenuIsActive] = useState(false);

  const toggleActive = () => {
    setMenuIsActive(!menuIsActive);
  };

  return (
    <div
      className={classNames(styles.aside, {
        [styles.active]: menuIsActive,
      })}
    >
      <AsideMenu toggleActive={toggleActive} menuIsActive={menuIsActive} />
      <div className={styles.messages}>
        <AsideMessages title={"Сообщения"} messages={M_DATA} />
        <AsideMessages title={"Предупреждения"} messages={W_DATA} />
      </div>
    </div>
  );
};
