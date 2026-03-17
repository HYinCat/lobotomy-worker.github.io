// 游戏状态
const gameState = {
  sanity: 100,
  health: 100,
  efficiency: 80,
  day: 1,
  log: "欢迎你，新员工。今天是你在 Lobotomy Corporation 的第一天。请选择你的行动。\n"
};

// 更新UI显示
function updateUI() {
  document.getElementById("sanity").textContent = gameState.sanity;
  document.getElementById("health").textContent = gameState.health;
  document.getElementById("efficiency").textContent = gameState.efficiency;
  document.getElementById("log").textContent = gameState.log;
}

// 添加日志
function addLog(text) {
  gameState.log += "\n" + text;
  updateUI();
  // 滚动到底部
  const logEl = document.getElementById("log");
  logEl.scrollTop = logEl.scrollHeight;
}

// 行动定义
const actions = {
  work: {
    name: "进行收容单元工作",
    run: () => {
      const sanityChange = Math.floor(Math.random() * 20) - 15;
      const efficiencyChange = Math.floor(Math.random() * 15) + 5;
      gameState.sanity = Math.max(0, Math.min(100, gameState.sanity + sanityChange));
      gameState.efficiency = Math.max(0, Math.min(100, gameState.efficiency + efficiencyChange));
      addLog(`你完成了一次收容单元工作。精神值 ${sanityChange > 0 ? "+" : ""}${sanityChange}，工作效率 +${efficiencyChange}。`);
      checkGameOver();
    }
  },
  rest: {
    name: "去休息室休息",
    run: () => {
      const sanityChange = Math.floor(Math.random() * 20) + 10;
      const healthChange = Math.floor(Math.random() * 10) + 5;
      gameState.sanity = Math.min(100, gameState.sanity + sanityChange);
      gameState.health = Math.min(100, gameState.health + healthChange);
      addLog(`你在休息室放松了片刻。精神值 +${sanityChange}，体力值 +${healthChange}。`);
    }
  },
  train: {
    name: "参加员工培训",
    run: () => {
      const efficiencyChange = Math.floor(Math.random() * 10) + 10;
      const sanityChange = -Math.floor(Math.random() * 10);
      gameState.efficiency = Math.min(100, gameState.efficiency + efficiencyChange);
      gameState.sanity = Math.max(0, gameState.sanity + sanityChange);
      addLog(`你参加了培训。工作效率 +${efficiencyChange}，精神值 ${sanityChange}。`);
      checkGameOver();
    }
  },
  inspect: {
    name: "巡查设施",
    run: () => {
      const healthChange = Math.floor(Math.random() * 10) - 5;
      const sanityChange = Math.floor(Math.random() * 10) - 5;
      gameState.health = Math.max(0, Math.min(100, gameState.health + healthChange));
      gameState.sanity = Math.max(0, Math.min(100, gameState.sanity + sanityChange));
      addLog(`你巡查了设施。体力值 ${healthChange > 0 ? "+" : ""}${healthChange}，精神值 ${sanityChange > 0 ? "+" : ""}${sanityChange}。`);
      checkGameOver();
    }
  }
};

// 检查游戏结束
function checkGameOver() {
  if (gameState.sanity <= 0) {
    addLog("\n⚠️ 你的精神彻底崩溃，被强制送离设施。游戏结束。");
    disableAllButtons();
  } else if (gameState.health <= 0) {
    addLog("\n⚠️ 你的体力耗尽，陷入昏迷。游戏结束。");
    disableAllButtons();
  }
}

// 禁用所有按钮
function disableAllButtons() {
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.disabled = true;
  });
}

// 渲染行动按钮
function renderActions() {
  const actionsEl = document.getElementById("actions");
  actionsEl.innerHTML = "";
  for (const key in actions) {
    const action = actions[key];
    const btn = document.createElement("button");
    btn.className = "action-btn";
    btn.textContent = action.name;
    btn.onclick = action.run;
    actionsEl.appendChild(btn);
  }
}

// 初始化游戏
function initGame() {
  updateUI();
  renderActions();
}

// 页面加载完成后启动游戏
window.onload = initGame;
