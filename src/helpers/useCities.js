const cities = [
  {
    CityName: '臺北市',
    CityEngName: 'Taipei City',
    AreaList: [
      { ZipCode: '100', AreaName: '中正區', AreaEngName: 'Zhongzheng Dist.' },
      { ZipCode: '103', AreaName: '大同區', AreaEngName: 'Datong Dist.' },
      { ZipCode: '104', AreaName: '中山區', AreaEngName: 'Zhongshan Dist.' },
      { ZipCode: '105', AreaName: '松山區', AreaEngName: 'Songshan Dist.' },
      { ZipCode: '106', AreaName: '大安區', AreaEngName: 'Da’an Dist.' },
      { ZipCode: '108', AreaName: '萬華區', AreaEngName: 'Wanhua Dist.' },
      { ZipCode: '110', AreaName: '信義區', AreaEngName: 'Xinyi Dist.' },
      { ZipCode: '111', AreaName: '士林區', AreaEngName: 'Shilin Dist.' },
      { ZipCode: '112', AreaName: '北投區', AreaEngName: 'Beitou Dist.' },
      { ZipCode: '114', AreaName: '內湖區', AreaEngName: 'Neihu Dist.' },
      { ZipCode: '115', AreaName: '南港區', AreaEngName: 'Nangang Dist.' },
      { ZipCode: '116', AreaName: '文山區', AreaEngName: 'Wenshan Dist.' }
    ]
  },
  {
    CityName: '基隆市',
    CityEngName: 'Keelung City',
    AreaList: [
      { ZipCode: '200', AreaName: '仁愛區', AreaEngName: 'Ren’ai Dist.' },
      { ZipCode: '201', AreaName: '信義區', AreaEngName: 'Xinyi Dist.' },
      { ZipCode: '202', AreaName: '中正區', AreaEngName: 'Zhongzheng Dist.' },
      { ZipCode: '203', AreaName: '中山區', AreaEngName: 'Zhongshan Dist.' },
      { ZipCode: '204', AreaName: '安樂區', AreaEngName: 'Anle Dist.' },
      { ZipCode: '205', AreaName: '暖暖區', AreaEngName: 'Nuannuan Dist.' },
      { ZipCode: '206', AreaName: '七堵區', AreaEngName: 'Qidu Dist.' }
    ]
  },
  {
    CityName: '新北市',
    CityEngName: 'New Taipei City',
    AreaList: [
      { ZipCode: '207', AreaName: '萬里區', AreaEngName: 'Wanli Dist.' },
      { ZipCode: '208', AreaName: '金山區', AreaEngName: 'Jinshan Dist.' },
      { ZipCode: '220', AreaName: '板橋區', AreaEngName: 'Banqiao Dist.' },
      { ZipCode: '221', AreaName: '汐止區', AreaEngName: 'Xizhi Dist.' },
      { ZipCode: '222', AreaName: '深坑區', AreaEngName: 'Shenkeng Dist.' },
      { ZipCode: '223', AreaName: '石碇區', AreaEngName: 'Shiding Dist.' },
      { ZipCode: '224', AreaName: '瑞芳區', AreaEngName: 'Ruifang Dist.' },
      { ZipCode: '226', AreaName: '平溪區', AreaEngName: 'Pingxi Dist.' },
      { ZipCode: '227', AreaName: '雙溪區', AreaEngName: 'Shuangxi Dist.' },
      { ZipCode: '228', AreaName: '貢寮區', AreaEngName: 'Gongliao Dist.' },
      { ZipCode: '231', AreaName: '新店區', AreaEngName: 'Xindian Dist.' },
      { ZipCode: '232', AreaName: '坪林區', AreaEngName: 'Pinglin Dist.' },
      { ZipCode: '233', AreaName: '烏來區', AreaEngName: 'Wulai Dist.' },
      { ZipCode: '234', AreaName: '永和區', AreaEngName: 'Yonghe Dist.' },
      { ZipCode: '235', AreaName: '中和區', AreaEngName: 'Zhonghe Dist.' },
      { ZipCode: '236', AreaName: '土城區', AreaEngName: 'Tucheng Dist.' },
      { ZipCode: '237', AreaName: '三峽區', AreaEngName: 'Sanxia Dist.' },
      { ZipCode: '238', AreaName: '樹林區', AreaEngName: 'Shulin Dist.' },
      { ZipCode: '239', AreaName: '鶯歌區', AreaEngName: 'Yingge Dist.' },
      { ZipCode: '241', AreaName: '三重區', AreaEngName: 'Sanchong Dist.' },
      { ZipCode: '242', AreaName: '新莊區', AreaEngName: 'Xinzhuang Dist.' },
      { ZipCode: '243', AreaName: '泰山區', AreaEngName: 'Taishan Dist.' },
      { ZipCode: '244', AreaName: '林口區', AreaEngName: 'Linkou Dist.' },
      { ZipCode: '247', AreaName: '蘆洲區', AreaEngName: 'Luzhou Dist.' },
      { ZipCode: '248', AreaName: '五股區', AreaEngName: 'Wugu Dist.' },
      { ZipCode: '249', AreaName: '八里區', AreaEngName: 'Bali Dist.' },
      { ZipCode: '251', AreaName: '淡水區', AreaEngName: 'Tamsui Dist.' },
      { ZipCode: '252', AreaName: '三芝區', AreaEngName: 'Sanzhi Dist.' },
      { ZipCode: '253', AreaName: '石門區', AreaEngName: 'Shimen Dist.' }
    ]
  },
  {
    CityName: '連江縣',
    CityEngName: 'Lienchiang County',
    AreaList: [
      { ZipCode: '209', AreaName: '南竿鄉', AreaEngName: 'Nangan Township' },
      { ZipCode: '210', AreaName: '北竿鄉', AreaEngName: 'Beigan Township' },
      { ZipCode: '211', AreaName: '莒光鄉', AreaEngName: 'Juguang Township' },
      { ZipCode: '212', AreaName: '東引鄉', AreaEngName: 'Dongyin Township' }
    ]
  },
  {
    CityName: '宜蘭縣',
    CityEngName: 'Yilan County',
    AreaList: [
      { ZipCode: '260', AreaName: '宜蘭市', AreaEngName: 'Yilan City' },
      { ZipCode: '263', AreaName: '壯圍鄉', AreaEngName: 'Zhuangwei Township' },
      { ZipCode: '261', AreaName: '頭城鎮', AreaEngName: 'Toucheng Township' },
      { ZipCode: '262', AreaName: '礁溪鄉', AreaEngName: 'Jiaoxi Township' },
      { ZipCode: '264', AreaName: '員山鄉', AreaEngName: 'Yuanshan Township' },
      { ZipCode: '265', AreaName: '羅東鎮', AreaEngName: 'Luodong Township' },
      { ZipCode: '266', AreaName: '三星鄉', AreaEngName: 'Sanxing Township' },
      { ZipCode: '267', AreaName: '大同鄉', AreaEngName: 'Datong Township' },
      { ZipCode: '268', AreaName: '五結鄉', AreaEngName: 'Wujie Township' },
      { ZipCode: '269', AreaName: '冬山鄉', AreaEngName: 'Dongshan Township' },
      { ZipCode: '270', AreaName: '蘇澳鎮', AreaEngName: 'Su’ao Township' },
      { ZipCode: '272', AreaName: '南澳鄉', AreaEngName: 'Nan’ao Township' },
      { ZipCode: '290', AreaName: '釣魚臺', AreaEngName: 'Diaoyutai' }
    ]
  },
  {
    CityName: '釣魚臺',
    CityEngName: 'Diauyutai',
    AreaList: [
      { ZipCode: '290', AreaName: '釣魚臺', AreaEngName: 'Diaoyutai' }
    ]
  },
  {
    CityName: '新竹市',
    CityEngName: 'Hsinchu City',
    AreaList: [
      { ZipCode: '300', AreaName: '東區', AreaEngName: 'East Dist.' },
      { ZipCode: '300', AreaName: '北區', AreaEngName: 'North Dist.' },
      { ZipCode: '300', AreaName: '香山區', AreaEngName: 'Xiangshan Dist.' }
    ]
  },
  {
    CityName: '新竹縣',
    CityEngName: 'Hsinchu County',
    AreaList: [
      { ZipCode: '308', AreaName: '寶山鄉', AreaEngName: 'Baoshan Township' },
      { ZipCode: '302', AreaName: '竹北市', AreaEngName: 'Zhubei City' },
      { ZipCode: '303', AreaName: '湖口鄉', AreaEngName: 'Hukou Township' },
      { ZipCode: '304', AreaName: '新豐鄉', AreaEngName: 'Xinfeng Township' },
      { ZipCode: '305', AreaName: '新埔鎮', AreaEngName: 'Xinpu Township' },
      { ZipCode: '306', AreaName: '關西鎮', AreaEngName: 'Guanxi Township' },
      { ZipCode: '307', AreaName: '芎林鄉', AreaEngName: 'Qionglin Township' },
      { ZipCode: '310', AreaName: '竹東鎮', AreaEngName: 'Zhudong Township' },
      { ZipCode: '311', AreaName: '五峰鄉', AreaEngName: 'Wufeng Township' },
      { ZipCode: '312', AreaName: '橫山鄉', AreaEngName: 'Hengshan Township' },
      { ZipCode: '313', AreaName: '尖石鄉', AreaEngName: 'Jianshi Township' },
      { ZipCode: '314', AreaName: '北埔鄉', AreaEngName: 'Beipu Township' },
      { ZipCode: '315', AreaName: '峨眉鄉', AreaEngName: 'Emei Township' }
    ]
  },
  {
    CityName: '桃園市',
    CityEngName: 'Taoyuan City',
    AreaList: [
      { ZipCode: '320', AreaName: '中壢區', AreaEngName: 'Zhongli Dist.' },
      { ZipCode: '324', AreaName: '平鎮區', AreaEngName: 'Pingzhen Dist.' },
      { ZipCode: '325', AreaName: '龍潭區', AreaEngName: 'Longtan Dist.' },
      { ZipCode: '326', AreaName: '楊梅區', AreaEngName: 'Yangmei Dist.' },
      { ZipCode: '327', AreaName: '新屋區', AreaEngName: 'Xinwu Dist.' },
      { ZipCode: '328', AreaName: '觀音區', AreaEngName: 'Guanyin Dist.' },
      { ZipCode: '330', AreaName: '桃園區', AreaEngName: 'Taoyuan Dist.' },
      { ZipCode: '333', AreaName: '龜山區', AreaEngName: 'Guishan Dist.' },
      { ZipCode: '334', AreaName: '八德區', AreaEngName: 'Bade Dist.' },
      { ZipCode: '335', AreaName: '大溪區', AreaEngName: 'Daxi Dist.' },
      { ZipCode: '336', AreaName: '復興區', AreaEngName: 'Fuxing Dist.' },
      { ZipCode: '337', AreaName: '大園區', AreaEngName: 'Dayuan Dist.' },
      { ZipCode: '338', AreaName: '蘆竹區', AreaEngName: 'Luzhu Dist.' }
    ]
  },
  {
    CityName: '苗栗縣',
    CityEngName: 'Miaoli County',
    AreaList: [
      { ZipCode: '350', AreaName: '竹南鎮', AreaEngName: 'Zhunan Township' },
      { ZipCode: '351', AreaName: '頭份市', AreaEngName: 'Toufen City' },
      { ZipCode: '352', AreaName: '三灣鄉', AreaEngName: 'Sanwan Township' },
      { ZipCode: '353', AreaName: '南庄鄉', AreaEngName: 'Nanzhuang Township' },
      { ZipCode: '354', AreaName: '獅潭鄉', AreaEngName: 'Shitan Township' },
      { ZipCode: '356', AreaName: '後龍鎮', AreaEngName: 'Houlong Township' },
      { ZipCode: '357', AreaName: '通霄鎮', AreaEngName: 'Tongxiao Township' },
      { ZipCode: '358', AreaName: '苑裡鎮', AreaEngName: 'Yuanli Township' },
      { ZipCode: '360', AreaName: '苗栗市', AreaEngName: 'Miaoli City' },
      { ZipCode: '361', AreaName: '造橋鄉', AreaEngName: 'Zaoqiao Township' },
      { ZipCode: '362', AreaName: '頭屋鄉', AreaEngName: 'Touwu Township' },
      { ZipCode: '363', AreaName: '公館鄉', AreaEngName: 'Gongguan Township' },
      { ZipCode: '364', AreaName: '大湖鄉', AreaEngName: 'Dahu Township' },
      { ZipCode: '365', AreaName: '泰安鄉', AreaEngName: 'Tai’an Township' },
      { ZipCode: '366', AreaName: '銅鑼鄉', AreaEngName: 'Tongluo Township' },
      { ZipCode: '367', AreaName: '三義鄉', AreaEngName: 'Sanyi Township' },
      { ZipCode: '368', AreaName: '西湖鄉', AreaEngName: 'Xihu Township' },
      { ZipCode: '369', AreaName: '卓蘭鎮', AreaEngName: 'Zhuolan Township' }
    ]
  },
  {
    CityName: '臺中市',
    CityEngName: 'Taichung City',
    AreaList: [
      { ZipCode: '400', AreaName: '中區', AreaEngName: 'Central Dist.' },
      { ZipCode: '401', AreaName: '東區', AreaEngName: 'East Dist.' },
      { ZipCode: '402', AreaName: '南區', AreaEngName: 'South Dist.' },
      { ZipCode: '403', AreaName: '西區', AreaEngName: 'West Dist.' },
      { ZipCode: '404', AreaName: '北區', AreaEngName: 'North Dist.' },
      { ZipCode: '406', AreaName: '北屯區', AreaEngName: 'Beitun Dist.' },
      { ZipCode: '407', AreaName: '西屯區', AreaEngName: 'Xitun Dist.' },
      { ZipCode: '408', AreaName: '南屯區', AreaEngName: 'Nantun Dist.' },
      { ZipCode: '411', AreaName: '太平區', AreaEngName: 'Taiping Dist.' },
      { ZipCode: '412', AreaName: '大里區', AreaEngName: 'Dali Dist.' },
      { ZipCode: '413', AreaName: '霧峰區', AreaEngName: 'Wufeng Dist.' },
      { ZipCode: '414', AreaName: '烏日區', AreaEngName: 'Wuri Dist.' },
      { ZipCode: '420', AreaName: '豐原區', AreaEngName: 'Fengyuan Dist.' },
      { ZipCode: '421', AreaName: '后里區', AreaEngName: 'Houli Dist.' },
      { ZipCode: '422', AreaName: '石岡區', AreaEngName: 'Shigang Dist.' },
      { ZipCode: '423', AreaName: '東勢區', AreaEngName: 'Dongshi Dist.' },
      { ZipCode: '424', AreaName: '和平區', AreaEngName: 'Heping Dist.' },
      { ZipCode: '426', AreaName: '新社區', AreaEngName: 'Xinshe Dist.' },
      { ZipCode: '427', AreaName: '潭子區', AreaEngName: 'Tanzi Dist.' },
      { ZipCode: '428', AreaName: '大雅區', AreaEngName: 'Daya Dist.' },
      { ZipCode: '429', AreaName: '神岡區', AreaEngName: 'Shengang Dist.' },
      { ZipCode: '432', AreaName: '大肚區', AreaEngName: 'Dadu Dist.' },
      { ZipCode: '433', AreaName: '沙鹿區', AreaEngName: 'Shalu Dist.' },
      { ZipCode: '434', AreaName: '龍井區', AreaEngName: 'Longjing Dist.' },
      { ZipCode: '435', AreaName: '梧棲區', AreaEngName: 'Wuqi Dist.' },
      { ZipCode: '436', AreaName: '清水區', AreaEngName: 'Qingshui Dist.' },
      { ZipCode: '437', AreaName: '大甲區', AreaEngName: 'Dajia Dist.' },
      { ZipCode: '438', AreaName: '外埔區', AreaEngName: 'Waipu Dist.' },
      { ZipCode: '439', AreaName: '大安區', AreaEngName: 'Da’an Dist.' }
    ]
  },
  {
    CityName: '彰化縣',
    CityEngName: 'Changhua County',
    AreaList: [
      { ZipCode: '500', AreaName: '彰化市', AreaEngName: 'Changhua City' },
      { ZipCode: '502', AreaName: '芬園鄉', AreaEngName: 'Fenyuan Township' },
      { ZipCode: '503', AreaName: '花壇鄉', AreaEngName: 'Huatan Township' },
      { ZipCode: '504', AreaName: '秀水鄉', AreaEngName: 'Xiushui Township' },
      { ZipCode: '505', AreaName: '鹿港鎮', AreaEngName: 'Lukang Township' },
      { ZipCode: '506', AreaName: '福興鄉', AreaEngName: 'Fuxing Township' },
      { ZipCode: '507', AreaName: '線西鄉', AreaEngName: 'Xianxi Township' },
      { ZipCode: '508', AreaName: '和美鎮', AreaEngName: 'Hemei Township' },
      { ZipCode: '509', AreaName: '伸港鄉', AreaEngName: 'Shengang Township' },
      { ZipCode: '510', AreaName: '員林市', AreaEngName: 'Yuanlin City' },
      { ZipCode: '511', AreaName: '社頭鄉', AreaEngName: 'Shetou Township' },
      { ZipCode: '512', AreaName: '永靖鄉', AreaEngName: 'Yongjing Township' },
      { ZipCode: '513', AreaName: '埔心鄉', AreaEngName: 'Puxin Township' },
      { ZipCode: '514', AreaName: '溪湖鎮', AreaEngName: 'Xihu Township' },
      { ZipCode: '515', AreaName: '大村鄉', AreaEngName: 'Dacun Township' },
      { ZipCode: '516', AreaName: '埔鹽鄉', AreaEngName: 'Puyan Township' },
      { ZipCode: '520', AreaName: '田中鎮', AreaEngName: 'Tianzhong Township' },
      { ZipCode: '521', AreaName: '北斗鎮', AreaEngName: 'Beidou Township' },
      { ZipCode: '522', AreaName: '田尾鄉', AreaEngName: 'Tianwei Township' },
      { ZipCode: '523', AreaName: '埤頭鄉', AreaEngName: 'Pitou Township' },
      { ZipCode: '524', AreaName: '溪州鄉', AreaEngName: 'Xizhou Township' },
      { ZipCode: '525', AreaName: '竹塘鄉', AreaEngName: 'Zhutang Township' },
      { ZipCode: '526', AreaName: '二林鎮', AreaEngName: 'Erlin Township' },
      { ZipCode: '527', AreaName: '大城鄉', AreaEngName: 'Dacheng Township' },
      { ZipCode: '528', AreaName: '芳苑鄉', AreaEngName: 'Fangyuan Township' },
      { ZipCode: '530', AreaName: '二水鄉', AreaEngName: 'Ershui Township' }
    ]
  },
  {
    CityName: '南投縣',
    CityEngName: 'Nantou County',
    AreaList: [
      { ZipCode: '540', AreaName: '南投市', AreaEngName: 'Nantou City' },
      { ZipCode: '541', AreaName: '中寮鄉', AreaEngName: 'Zhongliao Township' },
      { ZipCode: '542', AreaName: '草屯鎮', AreaEngName: 'Caotun Township' },
      { ZipCode: '544', AreaName: '國姓鄉', AreaEngName: 'Guoxing Township' },
      { ZipCode: '545', AreaName: '埔里鎮', AreaEngName: 'Puli Township' },
      { ZipCode: '546', AreaName: '仁愛鄉', AreaEngName: 'Ren’ai Township' },
      { ZipCode: '551', AreaName: '名間鄉', AreaEngName: 'Mingjian Township' },
      { ZipCode: '552', AreaName: '集集鎮', AreaEngName: 'Jiji Township' },
      { ZipCode: '553', AreaName: '水里鄉', AreaEngName: 'Shuili Township' },
      { ZipCode: '555', AreaName: '魚池鄉', AreaEngName: 'Yuchi Township' },
      { ZipCode: '556', AreaName: '信義鄉', AreaEngName: 'Xinyi Township' },
      { ZipCode: '557', AreaName: '竹山鎮', AreaEngName: 'Zhushan Township' },
      { ZipCode: '558', AreaName: '鹿谷鄉', AreaEngName: 'Lugu Township' }
    ]
  },
  {
    CityName: '嘉義市',
    CityEngName: 'Chiayi City',
    AreaList: [
      { ZipCode: '600', AreaName: '西區', AreaEngName: 'West Dist.' },
      { ZipCode: '600', AreaName: '東區', AreaEngName: 'East Dist.' }
    ]
  },
  {
    CityName: '嘉義縣',
    CityEngName: 'Chiayi County',
    AreaList: [
      { ZipCode: '602', AreaName: '番路鄉', AreaEngName: 'Fanlu Township' },
      { ZipCode: '603', AreaName: '梅山鄉', AreaEngName: 'Meishan Township' },
      { ZipCode: '604', AreaName: '竹崎鄉', AreaEngName: 'Zhuqi Township' },
      { ZipCode: '605', AreaName: '阿里山鄉', AreaEngName: 'Alishan Township' },
      { ZipCode: '606', AreaName: '中埔鄉', AreaEngName: 'Zhongpu Township' },
      { ZipCode: '607', AreaName: '大埔鄉', AreaEngName: 'Dapu Township' },
      { ZipCode: '608', AreaName: '水上鄉', AreaEngName: 'Shuishang Township' },
      { ZipCode: '611', AreaName: '鹿草鄉', AreaEngName: 'Lucao Township' },
      { ZipCode: '612', AreaName: '太保市', AreaEngName: 'Taibao City' },
      { ZipCode: '613', AreaName: '朴子市', AreaEngName: 'Puzi City' },
      { ZipCode: '614', AreaName: '東石鄉', AreaEngName: 'Dongshi Township' },
      { ZipCode: '615', AreaName: '六腳鄉', AreaEngName: 'Liujiao Township' },
      { ZipCode: '616', AreaName: '新港鄉', AreaEngName: 'Xingang Township' },
      { ZipCode: '621', AreaName: '民雄鄉', AreaEngName: 'Minxiong Township' },
      { ZipCode: '622', AreaName: '大林鎮', AreaEngName: 'Dalin Township' },
      { ZipCode: '623', AreaName: '溪口鄉', AreaEngName: 'Xikou Township' },
      { ZipCode: '624', AreaName: '義竹鄉', AreaEngName: 'Yizhu Township' },
      { ZipCode: '625', AreaName: '布袋鎮', AreaEngName: 'Budai Township' }
    ]
  },
  {
    CityName: '雲林縣',
    CityEngName: 'Yunlin County',
    AreaList: [
      { ZipCode: '630', AreaName: '斗南鎮', AreaEngName: 'Dounan Township' },
      { ZipCode: '631', AreaName: '大埤鄉', AreaEngName: 'Dapi Township' },
      { ZipCode: '632', AreaName: '虎尾鎮', AreaEngName: 'Huwei Township' },
      { ZipCode: '633', AreaName: '土庫鎮', AreaEngName: 'Tuku Township' },
      { ZipCode: '634', AreaName: '褒忠鄉', AreaEngName: 'Baozhong Township' },
      { ZipCode: '635', AreaName: '東勢鄉', AreaEngName: 'Dongshi Township' },
      { ZipCode: '636', AreaName: '臺西鄉', AreaEngName: 'Taixi Township' },
      { ZipCode: '637', AreaName: '崙背鄉', AreaEngName: 'Lunbei Township' },
      { ZipCode: '638', AreaName: '麥寮鄉', AreaEngName: 'Mailiao Township' },
      { ZipCode: '640', AreaName: '斗六市', AreaEngName: 'Douliu City' },
      { ZipCode: '643', AreaName: '林內鄉', AreaEngName: 'Linnei Township' },
      { ZipCode: '646', AreaName: '古坑鄉', AreaEngName: 'Gukeng Township' },
      { ZipCode: '647', AreaName: '莿桐鄉', AreaEngName: 'Citong Township' },
      { ZipCode: '648', AreaName: '西螺鎮', AreaEngName: 'Xiluo Township' },
      { ZipCode: '649', AreaName: '二崙鄉', AreaEngName: 'Erlun Township' },
      { ZipCode: '651', AreaName: '北港鎮', AreaEngName: 'Beigang Township' },
      { ZipCode: '652', AreaName: '水林鄉', AreaEngName: 'Shuilin Township' },
      { ZipCode: '653', AreaName: '口湖鄉', AreaEngName: 'Kouhu Township' },
      { ZipCode: '654', AreaName: '四湖鄉', AreaEngName: 'Sihu Township' },
      { ZipCode: '655', AreaName: '元長鄉', AreaEngName: 'Yuanchang Township' }
    ]
  },
  {
    CityName: '臺南市',
    CityEngName: 'Tainan City',
    AreaList: [
      { ZipCode: '700', AreaName: '中西區', AreaEngName: 'West Central Dist.' },
      { ZipCode: '701', AreaName: '東區', AreaEngName: 'East Dist.' },
      { ZipCode: '702', AreaName: '南區', AreaEngName: 'South Dist.' },
      { ZipCode: '704', AreaName: '北區', AreaEngName: 'North Dist.' },
      { ZipCode: '708', AreaName: '安平區', AreaEngName: 'Anping Dist.' },
      { ZipCode: '709', AreaName: '安南區', AreaEngName: 'Annan Dist.' },
      { ZipCode: '710', AreaName: '永康區', AreaEngName: 'Yongkang Dist.' },
      { ZipCode: '711', AreaName: '歸仁區', AreaEngName: 'Guiren Dist.' },
      { ZipCode: '712', AreaName: '新化區', AreaEngName: 'Xinhua Dist.' },
      { ZipCode: '713', AreaName: '左鎮區', AreaEngName: 'Zuozhen Dist.' },
      { ZipCode: '714', AreaName: '玉井區', AreaEngName: 'Yujing Dist.' },
      { ZipCode: '715', AreaName: '楠西區', AreaEngName: 'Nanxi Dist.' },
      { ZipCode: '716', AreaName: '南化區', AreaEngName: 'Nanhua Dist.' },
      { ZipCode: '717', AreaName: '仁德區', AreaEngName: 'Rende Dist.' },
      { ZipCode: '718', AreaName: '關廟區', AreaEngName: 'Guanmiao Dist.' },
      { ZipCode: '719', AreaName: '龍崎區', AreaEngName: 'Longqi Dist.' },
      { ZipCode: '720', AreaName: '官田區', AreaEngName: 'Guantian Dist.' },
      { ZipCode: '721', AreaName: '麻豆區', AreaEngName: 'Madou Dist.' },
      { ZipCode: '722', AreaName: '佳里區', AreaEngName: 'Jiali Dist.' },
      { ZipCode: '723', AreaName: '西港區', AreaEngName: 'Xigang Dist.' },
      { ZipCode: '724', AreaName: '七股區', AreaEngName: 'Qigu Dist.' },
      { ZipCode: '725', AreaName: '將軍區', AreaEngName: 'Jiangjun Dist.' },
      { ZipCode: '726', AreaName: '學甲區', AreaEngName: 'Xuejia Dist.' },
      { ZipCode: '727', AreaName: '北門區', AreaEngName: 'Beimen Dist.' },
      { ZipCode: '730', AreaName: '新營區', AreaEngName: 'Xinying Dist.' },
      { ZipCode: '731', AreaName: '後壁區', AreaEngName: 'Houbi Dist.' },
      { ZipCode: '732', AreaName: '白河區', AreaEngName: 'Baihe Dist.' },
      { ZipCode: '733', AreaName: '東山區', AreaEngName: 'Dongshan Dist.' },
      { ZipCode: '734', AreaName: '六甲區', AreaEngName: 'Liujia Dist.' },
      { ZipCode: '735', AreaName: '下營區', AreaEngName: 'Xiaying Dist.' },
      { ZipCode: '736', AreaName: '柳營區', AreaEngName: 'Liuying Dist.' },
      { ZipCode: '737', AreaName: '鹽水區', AreaEngName: 'Yanshui Dist.' },
      { ZipCode: '741', AreaName: '善化區', AreaEngName: 'Shanhua Dist.' },
      { ZipCode: '744', AreaName: '新市區', AreaEngName: 'Xinshi Dist.' },
      { ZipCode: '742', AreaName: '大內區', AreaEngName: 'Danei Dist.' },
      { ZipCode: '743', AreaName: '山上區', AreaEngName: 'Shanshang Dist.' },
      { ZipCode: '745', AreaName: '安定區', AreaEngName: 'Anding Dist.' }
    ]
  },
  {
    CityName: '高雄市',
    CityEngName: 'Kaohsiung City',
    AreaList: [
      { ZipCode: '800', AreaName: '新興區', AreaEngName: 'Xinxing Dist.' },
      { ZipCode: '801', AreaName: '前金區', AreaEngName: 'Qianjin Dist.' },
      { ZipCode: '802', AreaName: '苓雅區', AreaEngName: 'Lingya Dist.' },
      { ZipCode: '803', AreaName: '鹽埕區', AreaEngName: 'Yancheng Dist.' },
      { ZipCode: '804', AreaName: '鼓山區', AreaEngName: 'Gushan Dist.' },
      { ZipCode: '805', AreaName: '旗津區', AreaEngName: 'Qijin Dist.' },
      { ZipCode: '806', AreaName: '前鎮區', AreaEngName: 'Qianzhen Dist.' },
      { ZipCode: '807', AreaName: '三民區', AreaEngName: 'Sanmin Dist.' },
      { ZipCode: '811', AreaName: '楠梓區', AreaEngName: 'Nanzi Dist.' },
      { ZipCode: '812', AreaName: '小港區', AreaEngName: 'Xiaogang Dist.' },
      { ZipCode: '813', AreaName: '左營區', AreaEngName: 'Zuoying Dist.' },
      { ZipCode: '814', AreaName: '仁武區', AreaEngName: 'Renwu Dist.' },
      { ZipCode: '815', AreaName: '大社區', AreaEngName: 'Dashe Dist.' },
      { ZipCode: '817', AreaName: '東沙群島', AreaEngName: 'Dongsha Islands' },
      { ZipCode: '819', AreaName: '南沙群島', AreaEngName: 'Nansha Islands' },
      { ZipCode: '820', AreaName: '岡山區', AreaEngName: 'Gangshan Dist.' },
      { ZipCode: '821', AreaName: '路竹區', AreaEngName: 'Luzhu Dist.' },
      { ZipCode: '822', AreaName: '阿蓮區', AreaEngName: 'Alian Dist.' },
      { ZipCode: '823', AreaName: '田寮區', AreaEngName: 'Tianliao Dist.' },
      { ZipCode: '824', AreaName: '燕巢區', AreaEngName: 'Yanchao Dist.' },
      { ZipCode: '825', AreaName: '橋頭區', AreaEngName: 'Qiaotou Dist.' },
      { ZipCode: '826', AreaName: '梓官區', AreaEngName: 'Ziguan Dist.' },
      { ZipCode: '827', AreaName: '彌陀區', AreaEngName: 'Mituo Dist.' },
      { ZipCode: '828', AreaName: '永安區', AreaEngName: 'Yong’an Dist.' },
      { ZipCode: '829', AreaName: '湖內區', AreaEngName: 'Hunei Dist.' },
      { ZipCode: '830', AreaName: '鳳山區', AreaEngName: 'Fengshan Dist.' },
      { ZipCode: '831', AreaName: '大寮區', AreaEngName: 'Daliao Dist.' },
      { ZipCode: '832', AreaName: '林園區', AreaEngName: 'Linyuan Dist.' },
      { ZipCode: '833', AreaName: '鳥松區', AreaEngName: 'Niaosong Dist.' },
      { ZipCode: '840', AreaName: '大樹區', AreaEngName: 'Dashu Dist.' },
      { ZipCode: '842', AreaName: '旗山區', AreaEngName: 'Qishan Dist.' },
      { ZipCode: '843', AreaName: '美濃區', AreaEngName: 'Meinong Dist.' },
      { ZipCode: '844', AreaName: '六龜區', AreaEngName: 'Liugui Dist.' },
      { ZipCode: '845', AreaName: '內門區', AreaEngName: 'Neimen Dist.' },
      { ZipCode: '846', AreaName: '杉林區', AreaEngName: 'Shanlin Dist.' },
      { ZipCode: '847', AreaName: '甲仙區', AreaEngName: 'Jiaxian Dist.' },
      { ZipCode: '848', AreaName: '桃源區', AreaEngName: 'Taoyuan Dist.' },
      { ZipCode: '849', AreaName: '那瑪夏區', AreaEngName: 'Namaxia Dist.' },
      { ZipCode: '851', AreaName: '茂林區', AreaEngName: 'Maolin Dist.' },
      { ZipCode: '852', AreaName: '茄萣區', AreaEngName: 'Qieding Dist.' }
    ]
  },
  {
    CityName: '南海島',
    CityEngName: 'Nanhai',
    AreaList: [
      { ZipCode: '817', AreaName: '東沙群島', AreaEngName: 'Dongsha Islands' },
      { ZipCode: '819', AreaName: '南沙群島', AreaEngName: 'Nansha Islands' }
    ]
  },
  {
    CityName: '澎湖縣',
    CityEngName: 'Penghu County',
    AreaList: [
      { ZipCode: '880', AreaName: '馬公市', AreaEngName: 'Magong City' },
      { ZipCode: '881', AreaName: '西嶼鄉', AreaEngName: 'Xiyu Township' },
      { ZipCode: '882', AreaName: '望安鄉', AreaEngName: 'Wang’an Township' },
      { ZipCode: '883', AreaName: '七美鄉', AreaEngName: 'Qimei Township' },
      { ZipCode: '884', AreaName: '白沙鄉', AreaEngName: 'Baisha Township' },
      { ZipCode: '885', AreaName: '湖西鄉', AreaEngName: 'Huxi Township' }
    ]
  },
  {
    CityName: '金門縣',
    CityEngName: 'Kinmen County',
    AreaList: [
      { ZipCode: '890', AreaName: '金沙鎮', AreaEngName: 'Jinsha Township' },
      { ZipCode: '891', AreaName: '金湖鎮', AreaEngName: 'Jinhu Township' },
      { ZipCode: '892', AreaName: '金寧鄉', AreaEngName: 'Jinning Township' },
      { ZipCode: '893', AreaName: '金城鎮', AreaEngName: 'Jincheng Township' },
      { ZipCode: '894', AreaName: '烈嶼鄉', AreaEngName: 'Lieyu Township' },
      { ZipCode: '896', AreaName: '烏坵鄉', AreaEngName: 'Wuqiu Township' }
    ]
  },
  {
    CityName: '屏東縣',
    CityEngName: 'Pingtung County',
    AreaList: [
      { ZipCode: '900', AreaName: '屏東市', AreaEngName: 'Pingtung City' },
      { ZipCode: '901', AreaName: '三地門鄉', AreaEngName: 'Sandimen Township' },
      { ZipCode: '902', AreaName: '霧臺鄉', AreaEngName: 'Wutai Township' },
      { ZipCode: '903', AreaName: '瑪家鄉', AreaEngName: 'Majia Township' },
      { ZipCode: '904', AreaName: '九如鄉', AreaEngName: 'Jiuru Township' },
      { ZipCode: '905', AreaName: '里港鄉', AreaEngName: 'Ligang Township' },
      { ZipCode: '906', AreaName: '高樹鄉', AreaEngName: 'Gaoshu Township' },
      { ZipCode: '907', AreaName: '鹽埔鄉', AreaEngName: 'Yanpu Township' },
      { ZipCode: '908', AreaName: '長治鄉', AreaEngName: 'Changzhi Township' },
      { ZipCode: '909', AreaName: '麟洛鄉', AreaEngName: 'Linluo Township' },
      { ZipCode: '911', AreaName: '竹田鄉', AreaEngName: 'Zhutian Township' },
      { ZipCode: '912', AreaName: '內埔鄉', AreaEngName: 'Neipu Township' },
      { ZipCode: '913', AreaName: '萬丹鄉', AreaEngName: 'Wandan Township' },
      { ZipCode: '920', AreaName: '潮州鎮', AreaEngName: 'Chaozhou Township' },
      { ZipCode: '921', AreaName: '泰武鄉', AreaEngName: 'Taiwu Township' },
      { ZipCode: '922', AreaName: '來義鄉', AreaEngName: 'Laiyi Township' },
      { ZipCode: '923', AreaName: '萬巒鄉', AreaEngName: 'Wanluan Township' },
      { ZipCode: '924', AreaName: '崁頂鄉', AreaEngName: 'Kanding Township' },
      { ZipCode: '925', AreaName: '新埤鄉', AreaEngName: 'Xinpi Township' },
      { ZipCode: '926', AreaName: '南州鄉', AreaEngName: 'Nanzhou Township' },
      { ZipCode: '927', AreaName: '林邊鄉', AreaEngName: 'Linbian Township' },
      { ZipCode: '928', AreaName: '東港鎮', AreaEngName: 'Donggang Township' },
      { ZipCode: '929', AreaName: '琉球鄉', AreaEngName: 'Liuqiu Township' },
      { ZipCode: '931', AreaName: '佳冬鄉', AreaEngName: 'Jiadong Township' },
      { ZipCode: '932', AreaName: '新園鄉', AreaEngName: 'Xinyuan Township' },
      { ZipCode: '940', AreaName: '枋寮鄉', AreaEngName: 'Fangliao Township' },
      { ZipCode: '941', AreaName: '枋山鄉', AreaEngName: 'Fangshan Township' },
      { ZipCode: '942', AreaName: '春日鄉', AreaEngName: 'Chunri Township' },
      { ZipCode: '943', AreaName: '獅子鄉', AreaEngName: 'Shizi Township' },
      { ZipCode: '944', AreaName: '車城鄉', AreaEngName: 'Checheng Township' },
      { ZipCode: '945', AreaName: '牡丹鄉', AreaEngName: 'Mudan Township' },
      { ZipCode: '946', AreaName: '恆春鎮', AreaEngName: 'Hengchun Township' },
      { ZipCode: '947', AreaName: '滿州鄉', AreaEngName: 'Manzhou Township' }
    ]
  },
  {
    CityName: '臺東縣',
    CityEngName: 'Taitung County',
    AreaList: [
      { ZipCode: '950', AreaName: '臺東市', AreaEngName: 'Taitung City' },
      { ZipCode: '951', AreaName: '綠島鄉', AreaEngName: 'Ludao Township' },
      { ZipCode: '952', AreaName: '蘭嶼鄉', AreaEngName: 'Lanyu Township' },
      { ZipCode: '953', AreaName: '延平鄉', AreaEngName: 'Yanping Township' },
      { ZipCode: '954', AreaName: '卑南鄉', AreaEngName: 'Beinan Township' },
      { ZipCode: '955', AreaName: '鹿野鄉', AreaEngName: 'Luye Township' },
      { ZipCode: '956', AreaName: '關山鎮', AreaEngName: 'Guanshan Township' },
      { ZipCode: '957', AreaName: '海端鄉', AreaEngName: 'Haiduan Township' },
      { ZipCode: '958', AreaName: '池上鄉', AreaEngName: 'Chishang Township' },
      { ZipCode: '959', AreaName: '東河鄉', AreaEngName: 'Donghe Township' },
      { ZipCode: '961', AreaName: '成功鎮', AreaEngName: 'Chenggong Township' },
      { ZipCode: '962', AreaName: '長濱鄉', AreaEngName: 'Changbin Township' },
      { ZipCode: '963', AreaName: '太麻里鄉', AreaEngName: 'Taimali Township' },
      { ZipCode: '964', AreaName: '金峰鄉', AreaEngName: 'Jinfeng Township' },
      { ZipCode: '965', AreaName: '大武鄉', AreaEngName: 'Dawu Township' },
      { ZipCode: '966', AreaName: '達仁鄉', AreaEngName: 'Daren Township' }
    ]
  },
  {
    CityName: '花蓮縣',
    CityEngName: 'Hualien County',
    AreaList: [
      { ZipCode: '970', AreaName: '花蓮市', AreaEngName: 'Hualien City' },
      { ZipCode: '971', AreaName: '新城鄉', AreaEngName: 'Xincheng Township' },
      { ZipCode: '972', AreaName: '秀林鄉', AreaEngName: 'Xiulin Township' },
      { ZipCode: '973', AreaName: '吉安鄉', AreaEngName: 'Ji’an Township' },
      { ZipCode: '974', AreaName: '壽豐鄉', AreaEngName: 'Shoufeng Township' },
      { ZipCode: '975', AreaName: '鳳林鎮', AreaEngName: 'Fenglin Township' },
      { ZipCode: '976', AreaName: '光復鄉', AreaEngName: 'Guangfu Township' },
      { ZipCode: '977', AreaName: '豐濱鄉', AreaEngName: 'Fengbin Township' },
      { ZipCode: '978', AreaName: '瑞穗鄉', AreaEngName: 'Ruisui Township' },
      { ZipCode: '979', AreaName: '萬榮鄉', AreaEngName: 'Wanrong Township' },
      { ZipCode: '981', AreaName: '玉里鎮', AreaEngName: 'Yuli Township' },
      { ZipCode: '982', AreaName: '卓溪鄉', AreaEngName: 'Zhuoxi Township' },
      { ZipCode: '983', AreaName: '富里鄉', AreaEngName: 'Fuli Township' }
    ]
  }
]

const shallowCities = cities.map((item) => {
  const city = item
  delete city.AreaList
  return city
})

const useCities = () => {
  return { cities, shallowCities }
}

export { useCities }
