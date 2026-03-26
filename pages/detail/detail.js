// pages/detail/detail.js
const ALL_DATA = [
  {
    id: 1, name: '太和殿', desc: '紫禁城最宏伟的殿宇，皇帝举行大典之所',
    history: { img: 'https://picsum.photos/160/160?random=21', desc: '太和殿始建于明永乐十八年（1420年），是紫禁城内体量最大、等级最高的建筑，明清两代共举行皇帝登基、大婚、册立皇后等重大典礼。' },
    feature: { img: 'https://picsum.photos/160/160?random=22', desc: '殿高35.05米，面阔11间，进深5间，重檐庑殿顶，屋脊两端安置高3.4米的大吻，殿内金砖铺地，陈设铜鼎、铜鹤等礼器。' },
    value:   { img: 'https://picsum.photos/160/160?random=23', desc: '太和殿是中国现存规模最大的木质结构建筑之一，被列为全国重点文物保护单位，每年吸引数百万游客参观，是中华文明的重要象征。' }
  },
  {
    id: 2, name: '乾清宫', desc: '皇帝日常起居与处理政务的地方',
    history: { img: 'https://picsum.photos/160/160?random=24', desc: '乾清宫建于明永乐十八年，是明代皇帝的寝宫，清顺治、康熙年间亦为皇帝居所，雍正以后皇帝移居养心殿，乾清宫改作处理政务之所。' },
    feature: { img: 'https://picsum.photos/160/160?random=25', desc: '乾清宫面阔9间，进深5间，重檐庑殿顶，正中设宝座，上悬\'正大光明\'匾，清代秘密建储制度下，传位诏书藏于此匾后方。' },
    value:   { img: 'https://picsum.photos/160/160?random=26', desc: '乾清宫见证了明清两代数十位皇帝的日常生活，\'正大光明\'匾额更成为清代政治文化的重要符号，是研究封建帝制的珍贵实物。' }
  },
  {
    id: 3, name: '御花园', desc: '皇家私家花园，古木参天，奇石异卉',
    history: { img: 'https://picsum.photos/160/160?random=27', desc: '御花园建于明永乐十八年，位于紫禁城中轴线北端，面积约11000平方米，历经明清两代多次修缮扩建，是皇室休闲游憩之所。' },
    feature: { img: 'https://picsum.photos/160/160?random=28', desc: '园内有钦安殿、万春亭、千秋亭等20余座建筑，古柏苍松遮天蔽日，奇石假山错落有致，是中国古典园林艺术的典型代表。' },
    value:   { img: 'https://picsum.photos/160/160?random=29', desc: '御花园是北京中轴线上唯一的皇家园林遗存，其造园手法和植物配置对后世园林设计影响深远，现为故宫博物院重要参观区域。' }
  },
  {
    id: 4, name: '角楼', desc: '紫禁城四角的瞭望楼，造型精巧绝伦',
    history: { img: 'https://picsum.photos/160/160?random=30', desc: '角楼建于明永乐十八年，位于紫禁城城墙四角，共4座，据说是工匠鲁班设计，历经600年风雨仍屹立不倒，是紫禁城的标志性建筑。' },
    feature: { img: 'https://picsum.photos/160/160?random=31', desc: '角楼为三重檐多角攒尖顶，共有72条脊，9梁18柱72条脊的构造极为复杂精巧，被誉为中国古代建筑艺术的结晶。' },
    value:   { img: 'https://picsum.photos/160/160?random=32', desc: '角楼与护城河相映成辉，是北京最具代表性的景观之一，出现在无数摄影作品和文艺创作中，是故宫文化符号的重要组成部分。' }
  },
  {
    id: 5, name: '午门', desc: '紫禁城正门，气势威严',
    history: { img: 'https://picsum.photos/160/160?random=33', desc: '午门始建于明永乐十八年，是紫禁城的正南门，也是紫禁城中最高大的城门，明清两代皇帝在此颁布诏令、出征凯旋献俘。' },
    feature: { img: 'https://picsum.photos/160/160?random=34', desc: '午门平面呈\'凹\'字形，中间正楼面阔9间，两翼各有一楼，城台上建有五座楼，俗称\'五凤楼\'，总高37.95米，气势磅礴。' },
    value:   { img: 'https://picsum.photos/160/160?random=35', desc: '午门现为故宫博物院举办大型展览的主要场所之一，其宏伟的体量和精湛的建筑工艺，是研究明清宫廷建筑的重要标本。' }
  },
  {
    id: 6, name: '神武门', desc: '紫禁城北门，历史上皇后选秀入宫之处',
    history: { img: 'https://picsum.photos/160/160?random=36', desc: '神武门建于明永乐十八年，是紫禁城北门，清代是皇后嫔妃出入宫廷的通道，选秀入宫的女子也由此门进入，故又称\'玄武门\'。' },
    feature: { img: 'https://picsum.photos/160/160?random=37', desc: '神武门城楼面阔5间，进深1间，单檐庑殿顶，城台上设铜缸，为宫廷消防设施，整体造型端庄稳重，与午门形成南北呼应。' },
    value:   { img: 'https://picsum.photos/160/160?random=38', desc: '神武门现为故宫博物院正式出口，城楼上设有古代建筑馆，展示明清建筑模型与文献，是游客了解紫禁城建筑史的重要窗口。' }
  },
  // 花园数据
  {
    id: 101, name: '御花园', desc: '皇家私家花园，亭台楼阁，古木奇石',
    history: { img: 'https://picsum.photos/160/160?random=39', desc: '御花园建于明永乐年间，是紫禁城内最主要的皇家园林，历经明清两代修缮，现存建筑格局基本保持明代原状。' },
    feature: { img: 'https://picsum.photos/160/160?random=40', desc: '园内遍植古柏、翠竹，堆砌太湖石假山，设有钦安殿、万春亭、千秋亭等精美建筑，四季景色各异，美不胜收。' },
    value:   { img: 'https://picsum.photos/160/160?random=41', desc: '御花园是故宫中保存最完整的皇家园林，展现了中国传统造园艺术的精髓，是世界文化遗产故宫的重要组成部分。' }
  },
  {
    id: 102, name: '慈宁宫花园', desc: '太后专属花园，清幽雅致',
    history: { img: 'https://picsum.photos/160/160?random=42', desc: '慈宁宫花园位于慈宁宫前，始建于明代，是专供太后、太妃们游赏休憩的花园，清代多次改建，形成现有格局。' },
    feature: { img: 'https://picsum.photos/160/160?random=43', desc: '花园以临溪亭为中心，松柏参天，花木扶疏，布局疏朗，体现了皇家园林端庄而不失自然野趣的独特风格。' },
    value:   { img: 'https://picsum.photos/160/160?random=44', desc: '慈宁宫花园现对外开放，园内保存有多株数百年古树，是研究明清皇家园林文化和女性宫廷生活的珍贵遗址。' }
  },
  {
    id: 103, name: '建福宫花园', desc: '乾隆御园，珍宝云集',
    history: { img: 'https://picsum.photos/160/160?random=45', desc: '建福宫花园由清乾隆皇帝主持修建，是其存放珍玩古董的私人空间，1923年一场大火将其大部分焚毁，2000年代完成复建。' },
    feature: { img: 'https://picsum.photos/160/160?random=46', desc: '花园建筑精巧，廊庑相连，亭榭错落，装饰华丽，室内保存有大量乾隆时期的陈设文物，代表清代宫廷装饰艺术巅峰。' },
    value:   { img: 'https://picsum.photos/160/160?random=47', desc: '建福宫花园的复建是中国文化遗产保护的重要工程，为研究清代宫廷生活、工艺美术及建筑技术提供了宝贵实物资料。' }
  },
  {
    id: 104, name: '宁寿宫花园', desc: '乾隆退位后的养老之所',
    history: { img: 'https://picsum.photos/160/160?random=48', desc: '宁寿宫花园又称乾隆花园，建于清乾隆三十六年至四十一年，是乾隆皇帝为自己退位后修建的养老宫苑，被誉为\'宫中之宫\'。' },
    feature: { img: 'https://picsum.photos/160/160?random=49', desc: '花园南北长约160米，东西宽约37米，分四进院落，各具特色，融汇南北造园手法，是清代宫廷园林艺术的集大成之作。' },
    value:   { img: 'https://picsum.photos/160/160?random=50', desc: '宁寿宫花园正在由故宫博物院与世界文化遗产基金会联合修缮，被视为全球最重要的文化遗产保护项目之一。' }
  },
  // 城楼数据
  {
    id: 201, name: '午门城楼', desc: '紫禁城正门城楼，五凤楼之称',
    history: { img: 'https://picsum.photos/160/160?random=51', desc: '午门城楼建于明永乐十八年，是紫禁城正门之上的城楼建筑群，明清两代于此举行献俘、颁诏等重大礼仪活动。' },
    feature: { img: 'https://picsum.photos/160/160?random=52', desc: '城楼由正楼与两翼阙楼共五座组成，俗称\'五凤楼\'，总高37.95米，重檐庑殿顶，黄琉璃瓦，是中国城楼建筑的杰出代表。' },
    value:   { img: 'https://picsum.photos/160/160?random=53', desc: '午门城楼现为故宫举办临时展览的重要场所，宏伟的体量和丰富的历史内涵使其成为北京最具标志性的历史建筑之一。' }
  },
  {
    id: 202, name: '角楼', desc: '四角瞭望楼，九梁十八柱七十二条脊',
    history: { img: 'https://picsum.photos/160/160?random=54', desc: '角楼建于明永乐年间，位于紫禁城城墙四角，相传由工匠技师耗费巨大智慧设计而成，是建筑史上的传奇之作。' },
    feature: { img: 'https://picsum.photos/160/160?random=55', desc: '角楼为三重檐十字脊角楼，共有9梁18柱72条脊，结构极为复杂，造型玲珑精巧，与护城河水面相映，景色绝美。' },
    value:   { img: 'https://picsum.photos/160/160?random=56', desc: '角楼是北京最受摄影师喜爱的古建筑之一，四季晨昏各有不同风貌，是故宫文化传播中出现频率最高的视觉符号。' }
  },
  {
    id: 203, name: '神武门', desc: '紫禁城北门，宫廷生活的重要通道',
    history: { img: 'https://picsum.photos/160/160?random=57', desc: '神武门建于明永乐年间，清代为皇后嫔妃出入的专用通道，1924年溥仪出宫亦由此门离开，见证了清王朝的终结。' },
    feature: { img: 'https://picsum.photos/160/160?random=58', desc: '神武门城楼面阔5间，单檐庑殿顶，城台内设有马道，供守卫巡逻，城楼内现设古代建筑馆，陈列精美建筑模型。' },
    value:   { img: 'https://picsum.photos/160/160?random=59', desc: '神武门是故宫博物院主要出口，每日迎送数万游客，城楼上的古建馆是普及中国建筑知识的重要公众教育基地。' }
  },
  {
    id: 204, name: '东华门', desc: '紫禁城东门，文武大臣出入之所',
    history: { img: 'https://picsum.photos/160/160?random=60', desc: '东华门建于明永乐十八年，是紫禁城东侧城门，明清两代文武大臣上朝、宫廷物资运输均经此门，地位仅次于午门。' },
    feature: { img: 'https://picsum.photos/160/160?random=61', desc: '东华门城楼面阔5间，重檐庑殿顶，与西华门形制相同，城台开三券洞，中门平时不开，只在皇帝出行时使用。' },
    value:   { img: 'https://picsum.photos/160/160?random=62', desc: '东华门是故宫东侧的重要出入口，附近是故宫东华门夜市旧址，现为研究明清宫廷礼制和城市形态的重要历史节点。' }
  },
  {
    id: 205, name: '西华门', desc: '紫禁城西门，内廷与外界的连接',
    history: { img: 'https://picsum.photos/160/160?random=63', desc: '西华门建于明永乐十八年，是紫禁城西侧城门，清代太监、宫女及部分物资由此进出，也是宫内与中南海往来的通道。' },
    feature: { img: 'https://picsum.photos/160/160?random=64', desc: '西华门城楼与东华门形制对称，面阔5间，重檐庑殿顶，三券洞城台，整体造型端庄，与红墙黄瓦相得益彰。' },
    value:   { img: 'https://picsum.photos/160/160?random=65', desc: '西华门是故宫西侧参观路线的重要节点，附近的武英殿区域近年来修缮开放，成为故宫西部参观的新热点区域。' }
  }
]

Page({
  data: {
    item: null
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const item = ALL_DATA.find(d => d.id === id) || null
    if (item) {
      this.setData({ item })
      wx.setNavigationBarTitle({ title: item.name })
    } else {
      wx.showToast({ title: '未找到数据', icon: 'none' })
    }
  }
})
