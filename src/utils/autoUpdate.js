let lastSrcs; // 存储路径
const scriptReg = /<script.*?src="(.*?)"/g; // 解析请求回来的html值
let isUpdating = false; // 是否正在更新
const timeData = 1000 * 60; // 检查间隔时间

function fetchHTML() {
  return fetch('/?timestep=' + Date.now()).then((res) => res.text());
}

async function getScripts(html) {
  scriptReg.lastIndex = 0;
  const result = [];
  let match;

  while ((match = scriptReg.exec(html))) {
    result.push(match[1]);
  }
  return result;
}

async function needUpdate() {
  const newHtml = await fetchHTML();
  const newScripts = await getScripts(newHtml);

  if (!lastSrcs) {
    lastSrcs = newScripts;
    return false;
  }

  if (lastSrcs.length !== newScripts.length || !lastSrcs.every((src, i) => src === newScripts[i])) {
    lastSrcs = newScripts;
    return true;
  }

  return false;
}

function autRef() {
  if (isUpdating) return; // 如果正在更新，则不重复执行

  isUpdating = true;
  needUpdate()
    .then((willUp) => {
      isUpdating = false;

      if (willUp) {
        const result = confirm('数据更新点击确认刷新当前页');
        if (result) {
          location.reload(); // 刷新当前页
        }
      }
    })
    .catch((error) => {
      isUpdating = false;
      console.error('Error during update check:', error);
    })
    .finally(() => {
      setTimeout(autRef, timeData); // 间隔后再次执行
    });
}

autRef();
