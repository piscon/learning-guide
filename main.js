document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#tab-navigation button');
    const allSections = document.querySelectorAll('main > section');
    const underline = document.getElementById('tab-underline');

    function updateUnderline(element) {
        underline.style.left = `${element.offsetLeft}px`;
        underline.style.width = `${element.offsetWidth}px`;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.replace('tab-active', 'tab-inactive'));
            tab.classList.replace('tab-inactive', 'tab-active');
            updateUnderline(tab);
            allSections.forEach(s => s.classList.remove('active'));
            const targetId = tab.dataset.tab;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    const initialActiveTab = document.querySelector('#tab-navigation .tab-active');
    if (initialActiveTab) {
        const initialTargetId = initialActiveTab.dataset.tab;
        const initialTargetSection = document.getElementById(initialTargetId);
        allSections.forEach(s => s.classList.remove('active'));
        if (initialTargetSection) {
            initialTargetSection.classList.add('active');
            setTimeout(() => updateUnderline(initialActiveTab), 50);
        }
    }

    const chartLabelColor = 'rgba(203, 213, 225, 0.8)';
    const chartTitleColor = 'rgba(241, 245, 249, 1)';
    const chartBorderColor = '#1e293b';

    const ctx = document.getElementById('learningTimeChart').getContext('2d');
    window.learningTimeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['被动观看教程', '主动编码实践'],
            datasets: [{
                label: '时间分配',
                data: [80, 20],
                backgroundColor: ['#fca5a5', '#86efac'],
                borderColor: [chartBorderColor, chartBorderColor],
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: chartLabelColor, font: {size: 14} } },
                title: { display: true, text: '“教程地狱”中的典型时间分配', color: chartTitleColor, font: { size: 16 } }
            },
            cutout: '60%'
        }
    });

    const projects = [
        { stage: 1, lang: 'python', title: '猜数字游戏', desc: '计算机生成随机数，用户猜测，并获得提示。', concepts: '变量, input(), if-else, while循环, random模块', best_practice: '为用户输入添加错误处理，例如确保输入的是数字。' },
        { stage: 1, lang: 'python', title: '命令行计算器', desc: '实现加、减、乘、除运算的命令行程序。', concepts: '函数, 参数, 用户输入, 错误处理', best_practice: '使用 `argparse` 库来创建更健壮的命令行接口。' },
        { stage: 2, lang: 'python', title: '天气查询应用 (API)', desc: '调用免费天气API，获取并显示指定城市的天气。', concepts: 'requests库, JSON解析, 字典, API请求', best_practice: '使用 `.env` 文件管理API密钥，不要硬编码在代码中。' },
        { stage: 2, lang: 'python', title: '简单的网站爬虫', desc: '抓取特定网页的文章标题和链接。', concepts: 'requests, BeautifulSoup, for循环, 列表', best_practice: '遵守网站的 `robots.txt` 规则，并添加适当的延时，避免对服务器造成过大压力。' },
        { stage: 3, lang: 'python', title: '个人开销追踪Web应用', desc: '使用Flask或Django，构建记录开销并生成报告的Web应用。', concepts: 'Web框架, 数据库, ORM, 用户认证', best_practice: '使用 `pytest` 编写单元测试，确保核心业务逻辑（如记账、统计）的正确性。' },
        { stage: 1, lang: 'go', title: '简单的Web服务器', desc: '使用标准库构建一个响应"Hello, World!"的Web服务器。', concepts: 'net/http, HandleFunc, Go模块管理', best_practice: '将不同的路由处理逻辑拆分到独立的函数中，而不是全部写在 `main` 函数里。' },
        { stage: 1, lang: 'go', title: '命令行待办事项工具', desc: '通过命令行管理待办事项，数据存储在本地文件。', concepts: 'os包, struct, json/csv, bufio', best_practice: '使用 `cobra` 或 `urfave/cli` 库来创建更强大的命令行接口。' },
        { stage: 2, lang: 'go', title: 'CRUD API服务', desc: '使用Gin或Fiber等框架，构建一个完整的增删改查API。', concepts: 'Web框架, 路由, 模型绑定, RESTful', best_practice: '定义清晰的 API 版本（如 `/api/v1/`），并为API响应设计统一的数据结构。' },
        { stage: 2, lang: 'go', title: '并发Web爬虫', desc: '并发地抓取多个页面以提高速度。', concepts: 'Goroutines, Channels, sync.WaitGroup', best_practice: '使用带缓冲的Channel来控制并发数量，避免开启过多的goroutine耗尽系统资源。' },
        { stage: 3, lang: 'go', title: '实时聊天应用', desc: '使用WebSocket，构建允许多用户实时在线聊天的Web应用。', concepts: 'Websockets, 并发连接管理, Channels', best_practice: '为每个WebSocket连接设置读写超时，并实现心跳机制来处理断开的连接。' },
        { stage: 1, lang: 'php', title: '简单的联系表单', desc: '创建HTML表单，PHP脚本接收数据并发送邮件。', concepts: '$_POST, HTML表单, mail()函数, 数据验证', best_practice: '对所有用户输入进行严格的验证和过滤，防止XSS攻击。使用 `htmlspecialchars` 输出内容。' },
        { stage: 1, lang: 'php', title: '随机名言生成器', desc: '每次刷新页面时，从预定义的数组中随机显示一条名言。', concepts: 'PHP数组, rand(), echo', best_practice: '将业务逻辑（选择名言）与表现逻辑（HTML输出）分离，即使在简单的脚本中也要养成好习惯。' },
        { stage: 2, lang: 'php', title: '简单的博客/留言板', desc: '发布文章并显示列表，数据存储在MySQL中。', concepts: 'PDO/MySQLi, SQL, 密码哈希', best_practice: '始终使用预处理语句（Prepared Statements）来执行SQL查询，以防止SQL注入。' },
        { stage: 2, lang: 'php', title: '文件上传和展示系统', desc: '允许用户上传图片，并以图库形式展示。', concepts: '$_FILES, move_uploaded_file(), 文件安全', best_practice: '严格验证上传文件的类型、大小，并对文件名进行重命名，防止恶意文件上传。' },
        { stage: 3, lang: 'php', title: '简单的内容管理系统(CMS)', desc: '构建后台系统，管理前台内容。', concepts: '用户认证, 后台界面, MVC思想', best_practice: '遵循 `PSR-4` 自动加载规范来组织您的类文件，并使用 Composer 的 `autoload` 功能。' },
    ];
    const projectGrid = document.getElementById('project-grid');
    const filterButtons = document.querySelectorAll('#language-filter button');
    const langColors = {
        python: 'bg-blue-900/40 text-blue-200',
        go: 'bg-sky-900/40 text-sky-200',
        php: 'bg-violet-900/40 text-violet-200'
    };
    const stageColors = {
        1: 'border-gray-600',
        2: 'border-gray-500',
        3: 'border-gray-400'
    };
    function renderProjects(filterLang) {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';
        const filteredProjects = projects.filter(p => filterLang === 'all' || p.lang === filterLang);
        filteredProjects.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = `project-card flex flex-col p-5 rounded-xl border-t-4 ${stageColors[p.stage]} bg-slate-800/50 shadow-md`;
            card.style.animationDelay = `${index * 70}ms`;
            card.dataset.lang = p.lang;
            card.innerHTML = `
                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${langColors[p.lang]}">${p.lang.toUpperCase()}</span>
                        <span class="text-xs font-medium text-slate-400">阶段 ${p.stage}</span>
                    </div>
                    <h4 class="font-bold text-lg text-slate-100 mb-2">${p.title}</h4>
                    <p class="text-sm text-slate-400 mb-4 leading-relaxed">${p.desc}</p>
                    <div class="pt-3 border-t border-slate-700">
                       <p class="text-xs text-slate-400 font-semibold mb-1">核心概念:</p>
                       <p class="text-sm text-slate-300">${p.concepts}</p>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-dashed border-slate-700">
                    <p class="text-xs font-semibold text-teal-400 mb-1">💡 最佳实践:</p>
                    <p class="text-sm text-slate-300">${p.best_practice}</p>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-teal-500', 'text-white');
                    btn.classList.add('bg-slate-700', 'text-slate-300');
                });
                button.classList.add('bg-teal-500', 'text-white');
                button.classList.remove('bg-slate-700', 'text-slate-300');
                renderProjects(button.dataset.lang);
            });
        });
    }
    renderProjects('all');
});
