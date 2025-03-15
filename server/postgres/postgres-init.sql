CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE IF NOT EXISTS user_info (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_name VARCHAR NOT NULL,
	signed BOOLEAN NOT NULL DEFAULT true,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coworker (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	dept VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	ename VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	hired BOOLEAN NOT NULL DEFAULT true,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stamp_card (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_name VARCHAR NOT NULL,
	point integer NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stamp_card_record (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	card_id uuid NOT NULL,
	date TIMESTAMP NOT NULL,
	coworker_id uuid NOT NULL,
	point integer NOT NULL DEFAULT 1,
	description VARCHAR NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_card_id FOREIGN KEY (card_id) REFERENCES stamp_card(id),
	CONSTRAINT fk_coworker_id FOREIGN KEY (coworker_id) REFERENCES coworker(id)
);

-- ver.20250310
-- regex1 "([0-9-]+)\n#([0-9]+)" "$1#$2"
-- regex2 (.+)\t(.+)\t([a-zA-Z- \._]+)\t.*\t([a-z\._-]+@softbi.com)\n INSERT INTO coworker(dept, "name", ename, email) VALUES ('$1', '$2', '$3', '$4');\n
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理', '石德隆', 'Stone', 'stone@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '謝武星', 'Richard', 'richard@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部', '黃適和', 'Martin', 'martinhuang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-業務行銷部', '吳宗霖', 'Eric', 'eric@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-業務行銷部', '陶震宇', 'Tony', 'tony@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總', '賴紅霞', 'Hun-Shai', 'hunshai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-管理部', '傅曾梅', 'Carol', 'carol_fu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '李澐', 'Vivian', 'vivian@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '陳麓文', 'Luwen-Chen', 'luwenchen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('副總', '字正宇', 'Toby', 'toby@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '盧佳君', 'Vivien Lu', 'vivienlu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '葉佳明', 'Jerry', 'jerryea@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '趙泓瑋', 'Hongwei', 'hongwei@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '葉怡婷', 'Elsa', 'elsayeh@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '洪錦雲', 'Gina', 'ginahung@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部', '林文泓', 'Marco', 'marco@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '鄭乙靚', 'Egin', 'egin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '李銓維', 'Eric_Lee', 'eric_lee@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '吳尚哲', 'Abel', 'abel@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '游湘薇', 'Ellen', 'ellen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '林世峰', 'Polyp', 'polyp@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '黃筱鈞', 'April', 'april@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '洪敏娟', 'Mia Hung', 'mia@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '顏子量', 'Tzu-Liang', 'tzu-liang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳維瑄', 'Monica', 'monica.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '方業溥', 'Maxwell', 'maxwell@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳淑珠', 'Hikari', 'hikari.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '曾怡萱', 'Ina', 'yihsuan.tseng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '林品榮', 'Eddie', 'eddie.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '范晏凌', 'Judy', 'judy.fan@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳秋妙', 'Piko', 'piko.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳姿夙', 'Vivian.Chen', 'vivian.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '楊鴻娟', 'Terresa', 'terresa.yang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '劉文彬', 'Do bin', 'dobin.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '林嘉玲', 'Mandy', 'mandy.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '林鴻維', 'Tom', 'tom.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '許柏凱', 'Pokai.hsu', 'pokai.hsu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-資訊部', '陳偉恩', 'Wayne', 'wayne.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-人工智能', '周易', 'Allen', 'allen.chou@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '林賢怡', 'Phoebe', 'phoebe.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '王耿堂', 'Dean Wang', 'dean.wang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-人工智能', '張廷勖', 'Keroppi', 'keroppi.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳婉菁', 'Ivy', 'ivy.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '王裕澄', 'Allen.Wang', 'allen.wang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '曹世維', 'Shihwei.Tsao', 'shihwei.tsao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '蘇慧玲', 'Claire', 'claire.su@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '曾維堅', 'Shanlin', 'shanlin.tseng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '張儀銘', 'Alter', 'alter.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '劉至逢', 'Mike', 'mike.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '蕭遠平', 'Joe', 'joe.xiao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '周芳安', 'Ann', 'ann.chou@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '胡益銘', 'Yiming.Hu ', 'yiming.hu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '賴倩怡', 'Esther', 'esther.lai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '李協益', 'Sam', 'sam.li@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '張筱妮', 'Nini.Chang', 'nini.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '蔡明佑', 'Miky', 'miky.tsai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '陳建翔', 'Jason.Chen', 'jason.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '黃靜宜', 'Carie.Wong', 'carie.wong@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '李冠儀', 'Sio', 'sio.li@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '李敬恩', 'Nick', 'nick.li@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '許中昱', 'Middle', 'middle.hsu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '劉慶祥', 'George.liu', 'george.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '莊宗鎰', 'Yi.chuang', 'yi.chuang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '楊開平', 'Kelvin', 'kelvin.yang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '宋潮諱', 'Kurt', 'kurt.sung@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '高芷淇', 'Bella', 'bella.kao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-管理部', '蔡蓓欣', 'Yuki', 'yuki.tsai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '鄭棨元', 'Qiyuan.tang', 'qiyuan.tang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '林建辰', 'Roger', 'jianchen.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '許文馨', 'Ava', 'ava.hsu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '黃子易', 'Bill', 'bill.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '蕭靖議', 'Frank', 'frank.xiao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '左宇', 'Darrien', 'darrien.zuo@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '楊智誠', 'Max', 'max.yang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '張琬琳', 'Zonafy', 'zonafy.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳灝天', 'George', 'george.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '鍾丞斌', 'Bin', 'bin.chung@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '高郁雁', 'Anna', 'anna.kao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '劉宜桓', 'Raven', 'raven.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '徐宥茂', 'Vic', 'vic.hsu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '劉善維', 'Cliff', 'cliff.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '趙芷琳', 'Sharon', 'sharon.chao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險產品', '陳珮瑩', 'Pearl', 'pearl.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '李明哲', 'Jerry', 'jerry.lee@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '鐘妍妮', 'Nini', 'nini.chung@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '劉冠廷', 'Jimmy', 'jimmy.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '林敬軒', 'James', 'james.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '黄寶慧', 'Minta', 'minta.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '鍾書維', 'Steve', 'steve.chung@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳偉民', 'Tommy', 'tommy.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '黃雅淳', 'Claire', 'claire.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '呂宜霖', 'Lily', 'lily.lu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '楊喬博', 'Paul', 'paul.yang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '鄧宇珍', 'Carol', 'carol.deng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '王劭君', 'Charlie', 'charlie.wang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '蔡尚宸', 'Leo', 'leo.tsai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '盧柏文', 'Bevan', 'bevan.lu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '王姵穎', 'Faye', 'faye.wang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-管理部', '許辰瑄', 'Bella', 'bella.hsu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '游雅瑄', 'Grace', 'grace.yu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '黃瀞儀', 'Sofia', 'sofia.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '林佳誼', 'Vina', 'vina.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '蔣齊諺', 'Yves', 'yves.chiang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳世賢', 'Gary', 'gary.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '葉豐羽', 'Lyndon', 'lyndon.yeh@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '程馨誼', 'Debby', 'debby.cheng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '林昊田', 'Tian', 'tian.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '黃昱翔', 'Matthew', 'matthew.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '謝佳純', 'Judy', 'judy.hsieh@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('總經理室-管理部', '張芷瑄', 'Stacy', 'stacy.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '成宇翔', 'Peter', 'peter.cheng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '游家詠', 'Christine', 'christine.yu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳靖', 'Jean', 'jean.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '蘇姿瑜', 'Joy', 'joy.su@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '胡庭愷', 'Tingkai', 'tingkai.hu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '禤詠詩', 'Milly', 'milly.hsuan@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '蘇聖翔', 'Sven', 'sven.su@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '鄭柔淳', 'Candice', 'candice.cheng@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '張家菱', 'Anita', 'anita.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '呂沅錡', 'Alfred', 'alfred.lu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '詹政樺', 'Danny', 'danny.chan@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '吳珮瑄', 'Lily', 'lily.wu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品三部-資產配置', '莊怡雯', 'Fiona', 'fiona.chuang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '林宣丞', 'Jason', 'jason.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '白耕榕', 'Jacob', 'jacob.bai@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '林桓鈺', 'Alfred', 'alfred.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '王思涵', 'Lisa', 'lisa.wang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '林宣鰲', 'Anfernee', 'anfernee.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '蘇怡瑄', 'Jolin', 'jolin.su@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '張哲瑋', 'Matrix', 'matrix.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '高逸雯', 'YIWEN', 'yiwen.kao@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '黃子容', 'Clare', 'clare.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳品君', 'Zoe', 'zoe.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('執行副總室-專案辦公室', '黃詳淵', 'Wolf', 'wolf.huang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '劉峻瑋', 'Max', 'max.liu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品四部-保險專案', '陳瓊玉', 'Emma', 'emma.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '謝佩倫', 'Penny', 'peilun.hsieh@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品二部-投資機器人', '林姿彣', 'Wen', 'wen.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '林晉璿', 'Zuo', 'zuo.lin@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品一部-產品開發', '張瓊文', 'Joan', 'joan.chang@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '吳宇凡', 'Irene', 'irene.wu@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '陳育揚', 'Leon', 'leon.chen@softbi.com');
INSERT INTO coworker(dept, "name", ename, email) VALUES ('產品五部-系統維運', '賴致源', 'Levi', 'levi.lai@softbi.com');
