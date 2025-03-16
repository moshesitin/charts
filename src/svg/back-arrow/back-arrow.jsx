import styles from "./back-arrow.module.css";

export const BackArrow = () => (
    <svg
        className={styles.svg}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_142_2103)">
            <path
                d="M35 15L38.525 18.525L27.075 30L38.525 41.475L35 45L20 30L35 15Z"
                fill="#7C7C7C"
            />
        </g>
        <defs>
            <clipPath id="clip0_142_2103">
                <rect
                    width="60px"
                    height="60px"
                    fill="white"
                    transform="matrix(-1 0 0 1 60 0)"
                />
            </clipPath>
        </defs>
    </svg>
);
