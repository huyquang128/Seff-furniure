/* eslint-disable react/prop-types */
const CustomActiveDot = (props) => {
    const { cx, cy, value } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={6} // Kích thước chấm
            fill="#000" // Màu chấm
            stroke="#FF69B4" // Màu viền
            strokeWidth={4} // Độ dày viền
            style={{ cursor: 'pointer' }}
        >
            {/* Hiển thị giá trị ngay trên chấm */}
            {/* <title>{value}</title> */}
        </circle>
    );
};

export default CustomActiveDot;
