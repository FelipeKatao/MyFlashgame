/**
 * Plugins Manager Module for MyFlashGame
 * Handles Plugin Screen UI, Installing, Uninstalling, and configuring plugins
 */

class PluginsManager {
  constructor() {
    this.pluginList = [
      'PluginEnglishAdvanced',
      'PluginJapanese',
      'PluginCalculus',
      'PluginPWANotifications'
    ];
  }

  get plugins() {
    return [
      window.PluginEnglishAdvanced,
      window.PluginJapanese,
      window.PluginCalculus,
      window.PluginPWANotifications
    ].filter(Boolean);
  }

  init() {
    this.render();
  }

  render() {
    const container = document.getElementById('plugins-cards-grid');
    if (!container) return;

    let html = '';

    this.plugins.forEach((plugin) => {
      if (!plugin) return;

      const isInstalled = window.storage.isPluginInstalled(plugin.id);

      let customConfigHtml = '';

      if (isInstalled && plugin.id === 'pwa-notifications') {
        const notifSettings = window.storage.data.notificationSettings || { category: 'Todas', intervalMinutes: 1 };
        const categories = window.storage.data.categories || [];

        let catOptionsHtml = `<option value="Todas" ${notifSettings.category === 'Todas' ? 'selected' : ''}>Todas as Matérias</option>`;
        categories.forEach(cat => {
          catOptionsHtml += `<option value="${cat}" ${notifSettings.category === cat ? 'selected' : ''}>${cat}</option>`;
        });

        customConfigHtml = `
          <div class="my-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left space-y-3">
            <h4 class="text-xs font-black uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
              <i class="fa-solid fa-sliders text-orange-500"></i> Configuração de Notificação
            </h4>
            
            <div>
              <label for="plugin-notif-category-select" class="block text-[11px] font-bold text-slate-600 mb-1">
                Matéria a Notificar (Reprovado / Pendente):
              </label>
              <select id="plugin-notif-category-select" onchange="window.pluginsManager.saveNotificationConfig()" class="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500">
                ${catOptionsHtml}
              </select>
            </div>

            <div>
              <label for="plugin-notif-interval-select" class="block text-[11px] font-bold text-slate-600 mb-1">
                Frequência das Notificações:
              </label>
              <select id="plugin-notif-interval-select" onchange="window.pluginsManager.saveNotificationConfig()" class="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="1" ${notifSettings.intervalMinutes == 1 ? 'selected' : ''}>1 Minuto (Teste Rápido)</option>
                <option value="5" ${notifSettings.intervalMinutes == 5 ? 'selected' : ''}>5 Minutos</option>
                <option value="15" ${notifSettings.intervalMinutes == 15 ? 'selected' : ''}>15 Minutos</option>
                <option value="30" ${notifSettings.intervalMinutes == 30 ? 'selected' : ''}>30 Minutos</option>
                <option value="60" ${notifSettings.intervalMinutes == 60 ? 'selected' : ''}>1 Hora</option>
                <option value="120" ${notifSettings.intervalMinutes == 120 ? 'selected' : ''}>2 Horas</option>
              </select>
            </div>
          </div>
        `;
      }

      let actionButtons = '';
      if (isInstalled) {
        if (plugin.id === 'pwa-notifications') {
          actionButtons += `
            <div class="space-y-2">
              <button onclick="window.PluginPWANotifications.triggerSampleNotification()" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-bell"></i> Testar Notificação Agora
              </button>
              <button onclick="window.PluginPWANotifications.promptInstallPWA()" class="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-900 font-extrabold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-download"></i> Instalar na Tela Inicial (PWA)
              </button>
              <button onclick="window.pluginsManager.uninstallPlugin('${plugin.id}')" class="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 text-xs transition-colors flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-trash-can"></i> Remover Plugin
              </button>
            </div>
          `;
        } else {
          actionButtons = `
            <button onclick="window.pluginsManager.uninstallPlugin('${plugin.id}')" class="w-full py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-extrabold rounded-xl border border-red-200 transition-colors text-sm flex items-center justify-center gap-2">
              <i class="fa-solid fa-trash-can"></i> Remover Plugin
            </button>
          `;
        }
      } else {
        actionButtons = `
          <button onclick="window.pluginsManager.installPlugin('${plugin.id}')" class="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2">
            <i class="fa-solid fa-download"></i> Instalar Plugin
          </button>
        `;
      }

      html += `
        <div class="bg-white rounded-3xl border ${isInstalled ? 'border-green-300 shadow-md' : 'border-amber-200 shadow-sm'} p-6 flex flex-col justify-between hover:shadow-lg transition-all">
          <div>
            <div class="flex items-center justify-between gap-3 mb-4">
              <div class="w-12 h-12 rounded-2xl ${isInstalled ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-orange-600'} flex items-center justify-center text-2xl font-bold">
                <i class="fa-solid ${plugin.icon || 'fa-plug'}"></i>
              </div>
              ${isInstalled 
                ? `<span class="px-3 py-1 rounded-full text-xs font-black bg-green-100 text-green-800 border border-green-300"><i class="fa-solid fa-circle-check mr-1"></i> Instalado</span>`
                : `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">Disponível</span>`
              }
            </div>

            <h3 class="text-xl font-black text-slate-900 mb-2">${plugin.name}</h3>
            <p class="text-slate-600 text-xs sm:text-sm mb-2 leading-relaxed">${plugin.description}</p>
            ${customConfigHtml}
          </div>

          <div class="pt-4 border-t border-slate-100">
            ${actionButtons}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  saveNotificationConfig() {
    const catSelect = document.getElementById('plugin-notif-category-select');
    const intervalSelect = document.getElementById('plugin-notif-interval-select');

    if (catSelect && intervalSelect) {
      window.storage.setNotificationSettings(catSelect.value, intervalSelect.value);
      if (window.PluginPWANotifications) {
        window.PluginPWANotifications.startNotificationScheduler();
      }
      if (window.app) window.app.showNotification("Configuração de Notificação salva!");
    }
  }

  installPlugin(pluginId) {
    const plugin = this.plugins.find(p => p && p.id === pluginId);
    if (!plugin) return;

    const res = plugin.install();
    if (res && res.success) {
      if (window.app) window.app.showNotification(`Plugin "${plugin.name}" instalado com sucesso!`);
      this.render();
      if (window.manageCards) window.manageCards.render();
      if (window.gameEngine) window.gameEngine.loadCardQueue();
      if (window.app) window.app.updateHeaderStats();
    }
  }

  uninstallPlugin(pluginId) {
    const plugin = this.plugins.find(p => p && p.id === pluginId);
    if (!plugin) return;

    if (confirm(`Deseja mesmo remover o plugin "${plugin.name}"?`)) {
      const res = plugin.uninstall();
      if (res && res.success) {
        if (window.app) window.app.showNotification(`Plugin "${plugin.name}" removido.`);
        this.render();
        if (window.manageCards) window.manageCards.render();
        if (window.gameEngine) window.gameEngine.loadCardQueue();
        if (window.app) window.app.updateHeaderStats();
      }
    }
  }
}

window.pluginsManager = new PluginsManager();
