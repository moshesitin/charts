import styles from "./next-arrow.module.css";

export const NextArrow = () => (
    <svg
        className={styles.svg}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_142_2102)">
            <path
                d="M21.475 18.525L25 15L40 30L25 45L21.475 41.475L32.925 30L21.475 18.525Z"
                fill="#7C7C7C"
            />
        </g>
        <defs>
            <clipPath id="clip0_142_2102">
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
