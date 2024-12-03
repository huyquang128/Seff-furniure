const listSetting = [
    { title: 'Chọn chế độ' },
    { title: 'Ngôn ngữ' },
    { title: 'Xác thực 2 bước' },
    { title: 'Thông báo trên máy tính' },
    { title: 'Thông báo email' },
];

function Setting() {
    return (
        <div>
            {listSetting.map((item, index) => (
                <div key={index} className="border-b border-gray-100 p-4">
                    {item.title}
                </div>
            ))}
        </div>
    );
}

export default Setting;
