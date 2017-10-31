const natural = require('natural');
const Segment = require('segment');

class Bot {
  constructor() {
    this.qa = [];
    const segment = (this.segment = new Segment());
    segment.useDefault(); // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
    this.classifier = new natural.BayesClassifier();
  }

  /**
   * 定义问题
   * @param question
   * @param answer
   * @param cases
   * @returns {Bot}
   */
  defineQuestion(question, answer, cases) {
    while (cases.length) {
      const _case = cases.shift();
      if (_case) {
        this.classifier.addDocument(
          this.segment.doSegment(_case).map(v => [v.w]), // 中文分词
          question
        );
      }
    }
    this.qa.push({
      question,
      answer
    });
    return this;
  }

  /**
   * 询问
   * @param text
   * @returns {*}
   */
  ask(text) {
    const question = this.classifier.classify(this.segment.doSegment(text).map(v => [v.w]));
    const index = this.qa.findIndex(v => v.question === question);
    if (index >= 0) {
      return this.qa[index].answer;
    } else {
      return null;
    }
  }

  /**
   * 训练
   */
  train() {
    this.classifier.train();
    return this;
  }
}

module.exports = Bot;
