-- ============================================================
-- seed data for MVP
-- ============================================================

-- admin emails (add your real admin email)
INSERT INTO admin_emails (email) VALUES
  ('sutepun3@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- areas (23ku east/west + tama)
INSERT INTO areas (slug, name, "group", description) VALUES
  ('arakawa', '荒川区', '23ku-east', '荒川区で家具大型荷物運搬・空港送迎に対応しています。'),
  ('taito', '台東区', '23ku-east', '台東区の大型家具運搬・空港送迎に対応しています。'),
  ('sumida', '墨田区', '23ku-east', '墨田区の大型家具運搬・空港送迎に対応しています。'),
  ('koto', '江東区', '23ku-east', '江東区の大型家具運搬・空港送迎に対応しています。'),
  ('adachi', '足立区', '23ku-east', '足立区の大型家具運搬・空港送迎に対応しています。'),
  ('katsushika', '葛飾区', '23ku-east', '葛飾区の大型家具運搬・空港送迎に対応しています。'),
  ('edogawa', '江戸川区', '23ku-east', '江戸川区の大型家具運搬・空港送迎に対応しています。'),

  ('shinjuku', '新宿区', '23ku-west', '新宿区の大型家具運搬・空港送迎に対応しています。'),
  ('shibuya', '渋谷区', '23ku-west', '渋谷区の大型家具運搬・空港送迎に対応しています。'),
  ('nakano', '中野区', '23ku-west', '中野区の大型家具運搬・空港送迎に対応しています。'),
  ('suginami', '杉並区', '23ku-west', '杉並区の大型家具運搬・空港送迎に対応しています。'),
  ('nerima', '練馬区', '23ku-west', '練馬区の大型家具運搬・空港送迎に対応しています。'),
  ('setagaya', '世田谷区', '23ku-west', '世田谷区の大型家具運搬・空港送迎に対応しています。'),
  ('meguro', '目黒区', '23ku-west', '目黒区の大型家具運搬・空港送迎に対応しています。'),

  ('hachioji', '八王子市', 'tama', '八王子市の大型家具運搬・空港送迎に対応しています。'),
  ('tachikawa', '立川市', 'tama', '立川市の大型家具運搬・空港送迎に対応しています。'),
  ('machida', '町田市', 'tama', '町田市の大型家具運搬・空港送迎に対応しています。')
ON CONFLICT (slug) DO NOTHING;

-- cases (sample)
INSERT INTO cases (type, title, body, area_slug, image_urls) VALUES
  ('kagu', '大型冷蔵庫とソファの安全運搬', 'EV養生を行い、安全に搬出・搬入しました。', 'arakawa', '{}'),
  ('kagu', 'ベッドフレームの分解搬出', '搬出経路を養生し、分解作業も丁寧に対応しました。', 'shinjuku', '{}'),
  ('airport', '早朝の羽田空港送迎', '4:30出発でフライトに合わせて送迎しました。', 'koto', '{}'),
  ('airport', '成田空港送迎（深夜便）', '荷物の積載と深夜対応をスムーズに実施。', 'setagaya', '{}'),
  ('kagu', '洗濯機と段ボールの運搬', '短距離移動で迅速に対応しました。', 'taito', '{}')
ON CONFLICT DO NOTHING;
