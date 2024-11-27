from firebase_functions import scheduler_fn
from src.handlers.tokyo.setagaya.scraping import Scraping
from src.models.r2 import R2
from datetime import datetime
import os


EVERY_07_50_AM_SCHEDULE = "50 7 * * *"


@scheduler_fn.on_schedule(
    schedule=EVERY_07_50_AM_SCHEDULE, timezone=scheduler_fn.Timezone("Asia/Tokyo")
)
def setagaya_sougou_availability(event: scheduler_fn.ScheduledEvent) -> None:
    "毎朝7時50分に世田谷総合運動場の陸上競技場貸出状況を取得する関数"
    url = "https://www.se-sports.or.jp/facility/sougou/"
    title, body = Scraping(url).execute()
    html = f"""
    <h1>{title}</h1>
    <div>{body}</div>
    """

    # 現在の日付と時間を "YYYYMMDDHHMMSS" 形式で生成
    today_yyyymmddss = datetime.now().strftime("%Y%m%d%H%M%S")
    key = f"setagaya/{today_yyyymmddss}"
    r2Client = R2(bucket=os.environ.get("R2_TRACK_BUCKET"))
    r2Client.put_object(html, key)

    # ダウンロード用事前署名URLの生成
    # download_url = r2Client.generate_presigned_url(
    #     key_name, operation="get_object", expiration=600
    # )
    # print("ダウンロード用URL:", download_url)

    # # アップロード用事前署名URLの生成
    # upload_url = r2Client.generate_presigned_url(
    #     key_name, operation="put_object", expiration=600
    # )

    # print("アップロード用URL:", upload_url)
    # print(r2Client.list_buckets())
    print(html)
