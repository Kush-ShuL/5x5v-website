// 在这里添加您的JavaScript代码
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// IP复制功能
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.dataset.clipboardTarget;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const textToCopy = targetElement.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('IP地址已复制到剪贴板！');
            }).catch(err => {
                console.error('Failed to copy IP address: ', err);
                alert('复制IP地址失败！');
            });
        }
    });
});

// 获取服务器状态
const serverIp = '5x5v.org';
const apiUrl = `https://api.mcsrvstat.us/3/${serverIp}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const serverStatusElement = document.getElementById('server-status');
        const onlinePlayersElement = document.getElementById('online-players');

        const serverMotdElement = document.getElementById('server-motd');
        const serverIconElement = document.getElementById('server-icon');

        if (data.online) {
            serverStatusElement.textContent = '在线';
            serverStatusElement.style.color = '#28a745'; // 绿色
            onlinePlayersElement.textContent = `${data.players.online}/${data.players.max}`;
            if (data.motd && data.motd.clean) {
                serverMotdElement.innerHTML = '';
                data.motd.html.forEach(line => {
                     const lineElement = document.createElement('div');
                     lineElement.innerHTML = line;
                     serverMotdElement.appendChild(lineElement);
                 });
            }
            if (data.icon) {
                serverIconElement.src = data.icon;
                serverIconElement.style.display = 'block';
                console.log('Server icon data (Base64):', data.icon);
            } else {
                console.log('No server icon returned by API.');
            }
        } else {
            serverStatusElement.textContent = '离线';
            serverStatusElement.style.color = '#dc3545'; // 红色
            onlinePlayersElement.textContent = 'N/A';
            serverMotdElement.textContent = '服务器离线';
            serverIconElement.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('获取服务器状态失败:', error);
        document.getElementById('server-status').textContent = '无法获取';
        document.getElementById('online-players').textContent = 'N/A';
    });

console.log("5X5V 网站脚本已加载！");