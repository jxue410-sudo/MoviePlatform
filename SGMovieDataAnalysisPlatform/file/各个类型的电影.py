import csv
from collections import Counter


# 读取电影信息表并统计各种类型电影的数量
def count_movies_by_genre(file_path):
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        genres = [genre.strip() if genre.strip() else '未知' for row in reader for genre in row['类型'].split(',')]
        movies_by_genre = Counter(genres)
    return movies_by_genre


# 将统计结果写入 CSV 文件
def write_results_to_csv(results, output_file):
    with open(output_file, mode='w', encoding='utf-8', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['类型', '电影数量'])
        for genre, count in results.items():
            writer.writerow([genre, count])


def count2():
    # 调用函数统计各种类型电影的数量
    movies_count_by_genre = count_movies_by_genre('csv_files/movies_info.csv')

    # 将统计结果写入 CSV 文件
    write_results_to_csv(movies_count_by_genre, 'csv_files/movies_count_by_genre.csv')

    print("统计结果已保存到 csv_files/movies_count_by_genre.csv 文件中。")
