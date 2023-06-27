//请求首页
let lastSrcs; // 存储路径
const scriptReg = /<script.*?src="(.*?)"/g; // 解析请求回来的html值
async function getScripts() {

  const html = await fetch('/?timestep=' + Date.now()).then((res) => res.text());
  scriptReg.lastIndex = 0;// 正则分析页面所有url地址
  const result = [];
  let match;

  while ((match = scriptReg.exec(html))) {
    result.push(match[1]);
  }
  return result;
}
async function needUpdate() {
  const newScripts = await getScripts();//调用newScripts
  if (!lastSrcs) {//如果之前没有保存页面js地址的话，进行一次保存，初始化并存下当前数据
    lastSrcs = newScripts;
    return false;
  }
  let result = false;
  if (lastSrcs.length !== newScripts.length) {
    result = true;
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  lastSrcs = newScripts;
  return result;
}
const timeData = 2000;//检查间隔时间

function autRef() {
  setTimeout(async () => {
    const willUp = await needUpdate();//调用检查更新函数
    if (willUp) {
      const result = confirm('数据更新点击确认刷新当前页');
      if (result) {
        location.reload();//刷新当前页
      }
    };
    autRef();
  }, timeData);
}

autRef();