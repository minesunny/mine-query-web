import json
import os
from pathlib import Path
def gci(filepath):
#遍历filepath下所有文件，包括子目录
  files = os.listdir(filepath)
  for fi in files:
    fi_d = os.path.join(filepath,fi)
    if os.path.isdir(fi_d):
      gci(fi_d)
    else :
        if(fi_d.endswith(".properties")):
            json_data = {}
            with open(fi_d, 'r+', encoding='utf-8') as file:
                for line in file:
                    line = line.strip()
                    if "=" in line:  # 确保是键值对
                        key, value = line.split("=", 1)  # 只分割一次，避免值中有等号
                        json_data[key.strip()] = value.strip()
                with open(fi_d.replace("properties", "json"), "w", encoding="utf-8") as f:
                    json.dump(json_data, f, ensure_ascii=False, indent=4)
#递归遍历/root目录下所有文件
gci('D:\\Downloads\\mine-query-web\\public\\locales')
