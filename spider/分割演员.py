import csv
import json


def split2():
    # 创建一个存储演员信息的列表
    actors_data = []

    # 读取CSV文件
    with open('csv_files/actors_info.csv', 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            movie_name = row['电影名称']
            english_name = row['英文名称']
            year = row['年份']
            actors_info_json = row['演员信息']

            # 将演员信息转换为Python字典
            actors_info = json.loads(actors_info_json)

            # 遍历每个演员信息
            for actor in actors_info:
                actor_name = actor['演员名称']
                actor_english_name = actor['演员英文名称']
                actor_img_link = actor['演员图片链接']

                # 将演员信息添加到演员数据列表中
                actors_data.append({
                    '电影名称': movie_name,
                    '英文名称': english_name,
                    '年份': year,
                    '演员名称': actor_name,
                    '演员英文名称': actor_english_name,
                    '演员图片链接': actor_img_link
                })

    # 将演员信息写入另一个CSV文件
    with open('csv_files/separated_actors_info.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['电影名称', '英文名称', '年份', '演员名称', '演员英文名称', '演员图片链接']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # 写入表头
        writer.writeheader()

        # 写入演员信息
        for actor_info in actors_data:
            writer.writerow(actor_info)

    print("演员信息已保存到 csv_files/separated_actors_info.csv 文件中。")
