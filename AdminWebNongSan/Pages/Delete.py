import json

# Đọc file JSON gốc
with open("D:\Visual Studio Code\Assignment Nodejs\Assignment 2\Admin\Pages\hotel_data_100.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Xóa trường "_id" nếu có
for item in data:
    item.pop("_id", None)

# Ghi ra file mới
with open("./hotel_data_no_id.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
