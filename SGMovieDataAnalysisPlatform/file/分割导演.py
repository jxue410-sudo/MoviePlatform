import csv
from collections import defaultdict
import json


def split1():
    # 步骤 1: 读取原始电影信息表
    with open('csv_files/movies_info.csv', mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        movies = list(reader)

    # 步骤 2: 统计每位导演的电影数量
    directors_info = defaultdict(int)
    for movie in movies:
        director_info_str = movie.get('导演信息', '')  # 获取导演信息字符串
        try:
            director_info = json.loads(director_info_str)  # 将 JSON 字符串解析为字典
            director_name = director_info.get('导演名称', '')
            director_english_name = director_info.get('导演英文名称', '')
            if director_name.strip() or director_english_name.strip():  # 至少有一个不为空
                combined_name = f"{director_name} ({director_english_name})"  # 组合中文名称和英文名称
            else:
                combined_name = "无名氏"  # 中英文名称均为空，记录为“无名氏”
            directors_info[combined_name] += 1
        except json.JSONDecodeError:
            print("Error decoding JSON:", director_info_str)

    # 步骤 3: 将统计结果写入 CSV 文件
    with open('csv_files/directors_movies_count.csv', mode='w', encoding='utf-8', newline='') as file:
        fieldnames = ['导演名称', '电影数量']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()
        for director, count in directors_info.items():
            writer.writerow({'导演名称': director, '电影数量': count})

    print("导演分割完成！结果保存到 csv_files/directors_movies_count.csv 文件中")
