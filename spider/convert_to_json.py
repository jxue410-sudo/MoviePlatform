import os
import csv
import json


def convert_to_json():
    # 检查并创建json_files目录
    if not os.path.exists('json_files'):
        os.makedirs('json_files')

    # 遍历csv_files目录下的所有文件
    for filename in os.listdir('csv_files'):
        if filename.endswith('.csv'):
            csv_filepath = os.path.join('csv_files', filename)
            json_filename = os.path.splitext(filename)[0] + '.json'
            json_filepath = os.path.join('json_files', json_filename)

            # 读取CSV文件并将其转换为JSON格式
            with open(csv_filepath, 'r', encoding='utf-8') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                data = [row for row in csv_reader]

            # 将数据写入JSON文件
            with open(json_filepath, 'w', encoding='utf-8') as json_file:
                json.dump(data, json_file, indent=4, ensure_ascii=False)

            print(f'转换完成：{csv_filepath} -> {json_filepath}')
