import csv
from collections import Counter
def count1():
    # 读取电影信息表并统计各个地区和类型电影的数量
    def count_movies_by_region_and_genre(file_path):
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            movies_by_region_and_genre = Counter()
            for row in reader:
                region = row.get('上线地区', '未知').strip()
                genres = [genre.strip() if genre.strip() else '未知' for genre in row.get('类型', '').split(',')]
                for genre in genres:
                    movies_by_region_and_genre[(region, genre)] += 1
        return movies_by_region_and_genre

    # 将统计结果写入 CSV 文件
    def write_results_to_csv(results, output_file):
        with open(output_file, mode='w', encoding='utf-8', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['地区', '类型', '电影数量'])
            for (region, genre), count in results.items():
                writer.writerow([region, genre, count])

    # 调用函数统计各个地区和类型电影的数量
    movies_count_by_region_and_genre = count_movies_by_region_and_genre('csv_files/movies_info.csv')

    # 将统计结果写入 CSV 文件
    write_results_to_csv(movies_count_by_region_and_genre, 'csv_files/movies_count_by_region_and_genre.csv')

    print("统计结果已保存到 csv_files/movies_count_by_region_and_genre.csv 文件中。")