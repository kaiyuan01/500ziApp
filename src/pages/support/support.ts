import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, NavController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'support.html'
})
export class SupportPage {

  submitted: boolean = false;
  supportMessage: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {

  }

  ionViewDidEnter() {
    let toast = this.toastCtrl.create({
      message: '请试试我们的500字检测仪吧...', // 'This does not actually send a support request.',
      duration: 3000
    });
    toast.present();
  }

  submit500Zi(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.supportMessage = '';
      this.submitted = false;

      // Process the text ...
      var the500zi = '\n\r\t “”：，。／？～！＃¥％……&＊（）——＋、｜｛｝［］ ""[]{}-_+#%^&()=abcdefghijklmnopqrstuvwxyz~|:?/\\1234567890。，；！、@＊¥$的 一 不 是 了 人 在 有 我 他 这 为 之 来 大 以 个 中 上 们 到 说 国 和 地 也 子 时 道 出 而 要 于 就 下 得 可 你 年 生 自 会 那 后 能 对 着 事 其 里 所 去 行 过 家 十 用 发 天 如 然 作 方 成 者 多 日 都 三 小 军 二 无 同 么 经 法 当 起 与 好 看 学 进 种 将 还 分 此 心 前 面 又 定 见 只 主 没 公 从 知 使 部 本 动 现 因 开 些 理 长 明 样 意 已 月 正 想 实 把 但 相 两 民 她 力 文 等 外 第 王 高 问 太 头 情 西 机 它 回 并 间 手 四 关 重 应 工 性 全 门 老 点 身 东 由 何 向 至 物 战 业 被 政 内 五 儿 及 入 先 己 安 或 利 很 最 书 制 美 山 体 什 新 话 名 曰 合 加 世 平 水 常 果 位 信 度 产 立 声 南 代 走 女 言 马 金 处 便 通 命 特 给 数 次 海 今 表 原 斯 义 各 州 化 口 任 真 才 几 教 官 少 司 德 解 神 则 必 兵 气 打 员 再 论 别 听 提 万 死 更 比 受 百 做 尔 即 元 报 直 白 总 非 建 夫 北 未 张 令 反 士 师 许 条 变 系 计 且 认 目 光 管 路 接 城 活 保 结 题 却 指 感 难 量 务 治 取 场 思 电 空 边 统 件 期 克 帝 亲 复 住 请 市 六 放 风 资 求 史 色 形 望 传 八 府 眼 领 清 决 笑 告 叫 队 强 往 区 交 武 达 社 权 科 九 设 李 观 记 改 展 字 故 品 议 象 花 七 完 林 基 服 带 据 界 云 觉 像 院 飞 远 收 石 众 车 候 类 程 转 共 千 式 失 流 每 该 朝 始 连 术 近 格 济 干 运 怎 步 台 让 江 河 识 规 拉 切 极 持 若 英 争 功 深 备 造 阳 快 集 布 尽 周 宗 病 华 称 罗 爱 导 确 呢 办 节 根 击 商 陈 火 兴 京 注 虽 杀 父 存 臣 准 广 首 乎 具 甚 黄 满 容 单 联 调 吃 古 算 坐 早 引 须 离 证 约 母 组 房 曾 似 易 随 精 视 尚 断 乃 影 除 青 初 息 守 党 半 县 轻 质 语 越 况 举 皇 钱 历 留 乐 章 照 器 写 团 诸 闻';

     // loop thru text
     var rares = "";
     var i = 0;
     for (var char of this.supportMessage) {
         console.log(char); // is it me you're looking for?
         if( the500zi.indexOf(char) < 0
		&& rares.indexOf(char) < 0 ) { // make sure NO DUPlicates in resulting word list
         	console.log('Rarely used: ' + i + ': ' + char); // is it me you're looking for?
		rares += char; 
		i++;
         }
     }

     var  theMessage = '您的大作里以下词不在最常用500字之列：\n' + rares;


      console.log('Rarely used: [' + theMessage + ']' ); // is it me you're looking for?
      let toast = this.toastCtrl.create({
        //message: 'Your support request has been sent.',
        message: theMessage,
        duration: 6000
      });
      toast.present();
    }
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.supportMessage = '';
      var  theMessage = '您的反馈是：' + this.supportMessage;
      this.submitted = false;

      let toast = this.toastCtrl.create({
        //message: 'Your support request has been sent.',
        message: 'Support message was sent: ' + theMessage,
        duration: 3000
      });
      toast.present();
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  ionViewCanLeave(): boolean | Promise<boolean> {
    // If the support message is empty we should just navigate
    if (!this.supportMessage || this.supportMessage.trim().length === 0) {
      return true;
    }

    return new Promise((resolve: any, reject: any) => {
      let alert = this.alertCtrl.create({
        title: 'Leave this page?',
        message: 'Are you sure you want to leave this page? Your support message will not be submitted.'
      });
      alert.addButton({ text: 'Stay', handler: reject });
      alert.addButton({ text: 'Leave', role: 'cancel', handler: resolve });

      alert.present();
    });
  }
}
